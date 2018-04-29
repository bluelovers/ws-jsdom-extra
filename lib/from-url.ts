/**
 * Created by user on 2018/2/6/006.
 */

import * as CoreRequest from 'request';
import { JSDOM, FromUrlOptions, toughCookie } from 'jsdom';
import * as deepmerge from 'deepmerge-plus';

import { IConstructorOptions, IJSDOM, IOptions, IOptionsJSDOM, isPackedJSDOM, packJSDOM, packOptions, URL, URLImpl } from './pack';
import { Promise, request, ResponseRequest } from './index';
import * as parseContentType from 'content-type-parser';
import * as isPlainObject from 'is-plain-object';
import { IOptionsWithWindowOptionsWithResourceLoader } from './browser/resource-loader';

import { LazyCookieJar, LazyCookie, RequestCookieJar } from './cookies';
export { LazyCookieJar, LazyCookie }

import { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar } from './cookies';
export { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar }

export { parseContentType }
export { URL, URLImpl }

export { DEFAULT_USER_AGENT } from './const';
import { DEFAULT_USER_AGENT, SYMBOL_RAW } from './const';

import { minifyHTML, normalizeHTML } from './html';

export { toughCookie }

export type ICookieJar = Partial<CookieJar> | Partial<LazyCookieJar>;

export interface IFromUrlOptions extends IOptionsJSDOM
{
	requestOptions?: IRequestOptions,
	cookieJar?: ICookieJar | Partial<LazyCookieJar>,

	libRequestPromise?,
}

export interface IRequestOptionsJSDOM extends Partial<request.RequestPromiseOptions>
{
	resolveWithFullResponse?: boolean;
	encoding?: null;
	gzip?: boolean;
	headers?: CoreRequest.Headers & {
		"User-Agent"?: string;
		Referer?: string;
		Accept?: string;
		"Accept-Language"?: string;
	};
	jar?: IRequestJar;
}

export interface IRequestOptions extends IRequestOptionsJSDOM
{
	method?: 'POST' | 'GET' | string,
	form?: {
		[key: string]: any,
		[key: number]: any,
	},
}

export type IRequestJar = RequestCookieJar;

export function fromURL(url: string | URL, options?: IFromUrlOptions): Promise<IJSDOM>
{
	return Promise.resolve().then(function ()
	{
		const parsedURL = new URL(url);
		url = parsedURL.href as string;

		let opts = {};

		options = packOptions(options, function (options)
		{
			opts = options;
		});

		options = normalizeFromURLOptions(options);
		let requestOptions = normalizeRequestOptions(options);

		let _request = options.libRequestPromise || request;

		return _request(url, requestOptions)
			.then((res: IResponse) =>
			{
				return requestToJSDOM(res, parsedURL, options, requestOptions);
			})
			// @ts-ignore
			.then(function (jsdom: IJSDOM)
			{
				if (!isPackedJSDOM(jsdom))
				{
					packJSDOM(jsdom);
				}

				jsdom._options.ConstructorOptions = opts;
				jsdom._options.options = options;
				jsdom._options.requestOptions = requestOptions;

				return jsdom as IJSDOM;
			})
			;
	});
}

export interface IResponse extends ResponseRequest
{
	headers: {
		[key: string]: any,
	},
	request: {
		href?: string;
		[key: string]: any,
	}
	body: Buffer,
}

export function requestToJSDOM<T = JSDOM>(res: IResponse, parsedURL: URL | string, options: Partial<IFromUrlOptions>, requestOptions?: IRequestOptions): T
{
	if (typeof parsedURL == 'string')
	{
		parsedURL = new URL(parsedURL);
	}

	let opts = {};

	options = packOptions(options, function (options)
	{
		opts = options;
	});
	options = normalizeFromURLOptions(options);

	const parsedContentType = parseContentType(res.headers["content-type"]);
	const transportLayerEncodingLabel = parsedContentType && parsedContentType.get("charset");

	options = Object.assign(options, {
		url: res.request.href + parsedURL.hash,
		contentType: res.headers["content-type"],
		referrer: res.request.getHeader("referer"),
		//[transportLayerEncodingLabelHiddenOption]: transportLayerEncodingLabel
	});

	let body = normalizeHTML(res.body, transportLayerEncodingLabel).html;

	if (options.minifyHTML)
	{
		body = minifyHTML(body);
	}

	let jsdom = new JSDOM(body, options as IConstructorOptions);

	jsdom[SYMBOL_RAW] = jsdom[SYMBOL_RAW] || {};
	jsdom[SYMBOL_RAW].options = jsdom[SYMBOL_RAW].options || {};
	jsdom[SYMBOL_RAW].options.options = jsdom[SYMBOL_RAW].options.options || options;
	jsdom[SYMBOL_RAW].options.ConstructorOptions = jsdom[SYMBOL_RAW].options.ConstructorOptions || opts;

	jsdom[SYMBOL_RAW].options.Response = res;
	jsdom[SYMBOL_RAW].options.body = body;

	if (requestOptions)
	{
		jsdom[SYMBOL_RAW].options.requestOptions = jsdom[SYMBOL_RAW].options.requestOptions || requestOptions;
	}

	// @ts-ignore
	return jsdom;
}

export function normalizeRequestOptions(options: IFromUrlOptions, _requestOptions?: IRequestOptions): Partial<IRequestOptions>
{
	// @ts-ignore
	let requestOptions: Partial<IRequestOptions> = {
		resolveWithFullResponse: true,
		encoding: null, // i.e., give me the raw Buffer
		gzip: true,
		headers: {
			"User-Agent": options.userAgent || DEFAULT_USER_AGENT,
			Referer: options.referrer,
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en"
		},
		jar: wrapCookieJarForRequest(options.cookieJar)
	};

	if (options.requestOptions || _requestOptions)
	{
		requestOptions = deepmerge.all([
			requestOptions,
			options.requestOptions || {},
			_requestOptions || {},
			{
				encoding: null,
			},
		], {
			//keyValueOrMode: true,
			isMergeableObject(value, isMergeable)
			{
				let bool = isMergeable(value);

				if (bool && typeof value == 'object' && !Array.isArray(value))
				{
					bool = isPlainObject(value);
				}

				return bool;
			},
		});
	}

	return requestOptions;
}

export function normalizeFromURLOptions<T>(options: Partial<T & IFromUrlOptions>): Partial<T & IFromUrlOptions>
{
	// Normalization of options which must be done before the rest of the fromURL code can use them, because they are
	// given to request()
	const normalized: Partial<T & IFromUrlOptions> = Object.assign({}, options);
	if (options.userAgent === undefined)
	{
		normalized.userAgent = DEFAULT_USER_AGENT;
	}

	if (options.referrer !== undefined)
	{
		normalized.referrer = (new URL(options.referrer)).href;
	}

	if (options.cookieJar === undefined)
	{
		normalized.cookieJar = new LazyCookieJar();
	}

	// @ts-ignore
	delete normalized.url;
	// @ts-ignore
	delete normalized.contentType;

	return normalized;

	// All other options don't need to be processed yet, and can be taken care of in the normal course of things when
	// `fromURL` calls `new JSDOM(html, options)`.
}



import * as self from './from-url'

export default self;
