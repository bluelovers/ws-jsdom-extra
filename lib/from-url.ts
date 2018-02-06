/**
 * Created by user on 2018/2/6/006.
 */

import { JSDOM, CookieJar, FromUrlOptions, toughCookie } from 'jsdom';
import * as deepmerge from 'deepmerge-plus';
import { wrapCookieJarForRequest } from 'jsdom/lib/jsdom/browser/resource-loader';
import { IConstructorOptions, IJSDOM, IOptions, IOptionsJSDOM, isPackedJSDOM, packJSDOM, packOptions, URL } from './pack';
import { Promise, request } from './index';
import * as parseContentType from 'content-type-parser';
import * as isPlainObject from 'is-plain-object';
import * as sniffHTMLEncoding from 'html-encoding-sniffer';
import * as whatwgEncoding from 'whatwg-encoding';

export { wrapCookieJarForRequest, parseContentType }
export { URL }

export { DEFAULT_USER_AGENT } from './const';
import { DEFAULT_USER_AGENT, SYMBOL_RAW } from './const';

export { CookieJar, toughCookie }

export interface ICookieJar extends CookieJar
{
	enableLooseMode?: boolean,
	store?: {
		idx?: {},
	},
}

export interface IFromUrlOptions extends Partial<FromUrlOptions & IOptionsJSDOM>
{
	requestOptions?: Partial<IRequestOptions>,
	cookieJar?: ICookieJar,
}

export interface IRequestOptionsJSDOM
{
	resolveWithFullResponse: boolean;
	encoding: null;
	gzip: boolean;
	headers: {
		"User-Agent": string;
		Referer: string;
		Accept: string;
		"Accept-Language": string;
	};
	jar: IRequestJar;
}

export interface IRequestOptions extends Partial<IRequestOptionsJSDOM>
{
	method?: 'POST' | 'GET' | string,
	form?: {
		[key: string]: any,
		[key: number]: any,
	},
}

export interface IRequestJar
{
	_jar: ICookieJar,
}

export function fromURL(url: string | URL, options?: Partial<IFromUrlOptions>): Promise<IJSDOM>
{
	return Promise.resolve().then(function ()
	{
		const parsedURL = new URL(url);
		url = parsedURL.href;

		let opts = {};

		options = packOptions(options, function (options)
		{
			opts = options;
		});

		options = normalizeFromURLOptions(options);
		let requestOptions = normalizeRequestOptions(options);

		return request(url, requestOptions).then(res =>
			{
				return requestToJSDOM(res, parsedURL, options, requestOptions);
			})
			.then(function (jsdom: IJSDOM)
			{
				if (!isPackedJSDOM(jsdom))
				{
					packJSDOM(jsdom);
				}

				jsdom._options.ConstructorOptions = opts;
				jsdom._options.options = options;
				jsdom._options.requestOptions = requestOptions;

				return jsdom;
			})
			;
	});
}

export interface IResponse
{
	headers: {
		[key: string]: any,
	},
	request: {
		href?
		[key: string]: any,
	}
	body,
}

export function requestToJSDOM<T = JSDOM>(res: IResponse, parsedURL: URL | string, options: Partial<IFromUrlOptions>, requestOptions?: Partial<IRequestOptions>): T
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

	let jsdom = new JSDOM(body, options as IConstructorOptions);

	jsdom[SYMBOL_RAW] = jsdom[SYMBOL_RAW] || {};
	jsdom[SYMBOL_RAW].options = jsdom[SYMBOL_RAW].options || {};
	jsdom[SYMBOL_RAW].options.ConstructorOptions = jsdom[SYMBOL_RAW].options.ConstructorOptions || opts;
	if (requestOptions)
	{
		jsdom[SYMBOL_RAW].options.requestOptions = jsdom[SYMBOL_RAW].options.requestOptions || requestOptions;
	}

	// @ts-ignore
	return jsdom;
}

export function normalizeRequestOptions(options: IFromUrlOptions): Partial<IRequestOptions>
{
	let requestOptions: Partial<IRequestOptions> = {
		resolveWithFullResponse: true,
		encoding: null, // i.e., give me the raw Buffer
		gzip: true,
		headers: {
			"User-Agent": options.userAgent,
			Referer: options.referrer,
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en"
		},
		jar: wrapCookieJarForRequest(options.cookieJar)
	};

	if (options.requestOptions)
	{
		requestOptions = deepmerge.all([
			requestOptions, options.requestOptions, {
				encoding: null,
			}
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
		normalized.cookieJar = new CookieJar();
	}

	// @ts-ignore
	delete normalized.url;
	// @ts-ignore
	delete normalized.contentType;

	return normalized;

	// All other options don't need to be processed yet, and can be taken care of in the normal course of things when
	// `fromURL` calls `new JSDOM(html, options)`.
}

export interface INormalizeHTML
{
	html: string,
	encoding: string,
}

function normalizeHTML(html: string, transportLayerEncodingLabel: string): INormalizeHTML
function normalizeHTML(html: Buffer, transportLayerEncodingLabel: string): INormalizeHTML
function normalizeHTML(html: ArrayBuffer, transportLayerEncodingLabel: string): INormalizeHTML
function normalizeHTML(html: any = '', transportLayerEncodingLabel: string): INormalizeHTML
{
	let encoding = "UTF-8";

	if (ArrayBuffer.isView(html))
	{
		// @ts-ignore
		html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
	}
	else if (html instanceof ArrayBuffer)
	{
		html = Buffer.from(html);
	}

	if (Buffer.isBuffer(html))
	{
		encoding = sniffHTMLEncoding(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
		html = whatwgEncoding.decode(html, encoding);
	}
	else
	{
		html = String(html);
	}

	return { html, encoding };
}

import * as self from './from-url'

export default self;
