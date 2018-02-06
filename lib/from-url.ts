/**
 * Created by user on 2018/2/6/006.
 */

import { JSDOM, CookieJar, FromUrlOptions } from 'jsdom';
import * as deepmerge from 'deepmerge-plus';
import { wrapCookieJarForRequest } from 'jsdom/lib/jsdom/browser/resource-loader';
import { IJSDOM, IOptions, isPacked, packJSDOM, packOptions, URL } from './pack';
import { Promise } from './index';
import * as request from 'request';
import * as parseContentType from 'content-type-parser';
import * as isPlainObject from 'is-plain-object';
import * as sniffHTMLEncoding from 'html-encoding-sniffer';
import * as whatwgEncoding from 'whatwg-encoding';

// @ts-ignore
import { version as packageVersion } from '../package.json';

export const DEFAULT_USER_AGENT = `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${packageVersion}`;

export { CookieJar }

export interface ICookieJar extends CookieJar
{
	enableLooseMode?: boolean,
	store?: {
		idx?: {},
	},
}

export interface IFromUrlOptions extends Partial<IOptions & FromUrlOptions>
{
	requestOptions?: Partial<IRequestOptions>,
	cookieJar?: ICookieJar,
}

export interface IRequestOptions
{
	resolveWithFullResponse: boolean;
	encoding: any;
	gzip: boolean;
	headers: {
		"User-Agent": any;
		Referer: any;
		Accept: string;
		"Accept-Language": string;
	};
	jar: any;
}

export function fromURL(url: string, options?: IFromUrlOptions): Promise<IJSDOM>
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
				const parsedContentType = parseContentType(res.headers["content-type"]);
				const transportLayerEncodingLabel = parsedContentType && parsedContentType.get("charset");

				options = Object.assign(options, {
					url: res.request.href + parsedURL.hash,
					contentType: res.headers["content-type"],
					referrer: res.request.getHeader("referer"),
					//[transportLayerEncodingLabelHiddenOption]: transportLayerEncodingLabel
				});

				let body = normalizeHTML(res.body, transportLayerEncodingLabel).html;

				return new JSDOM(body, options);
			})
			.then(function (jsdom: IJSDOM)
			{
				if (!isPacked(jsdom))
				{
					packJSDOM(jsdom);
				}

				jsdom._options.ConstructorOptions = opts;
				jsdom._options.options = options;

				return jsdom;
			})
			;
	});
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
		requestOptions = deepmerge(requestOptions, options.requestOptions, {
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

export function normalizeFromURLOptions(options: Partial<IFromUrlOptions>): Partial<IFromUrlOptions>
{
	// Normalization of options which must be done before the rest of the fromURL code can use them, because they are
	// given to request()
	const normalized: IFromUrlOptions = Object.assign({}, options);
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
