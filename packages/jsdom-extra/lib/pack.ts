/**
 * Created by user on 2018/2/6/006.
 */

/// <reference types="jquery" />

import {
	JSDOM,
	VirtualConsole,
	CookieJar,
	toughCookie,
	ConstructorOptions,
	BinaryData,
	DOMWindow,
	FileOptions as FromFileOptions,
	BaseOptions as FromUrlOptions, BaseOptions, FileOptions,
//	Options as IOptionsJSDOMSource
} from 'jsdom';
import { URL, URLImpl } from 'jsdom-url';
import { LazyCookieJar } from './cookies';
import { IOptionsCreateQuery, createQuery } from './query';
import { ICookieJar, IFromUrlOptions, IRequestOptions } from './from-url';

export { fromURL } from './from-url';
import { array_unique } from 'array-hyper-unique';

export { URL, URLImpl }
export { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, DOMWindow }

export * from './const';
import { SYMBOL_RAW } from './const';
import * as CONSTS from './const';
import Bluebird from 'bluebird';
import { minifyHTML } from '@jsdom-extra/html-util/minify';
import { normalizeHTML } from '@jsdom-extra/html-util/normalize';
import { IOptionsWithWindowOptionsWithResourceLoader } from '@jsdom-extra/resource-loader';

export const JSDOM_PROTOTYPE_COPY = Object.assign({}, JSDOM.prototype);

export interface IOptions
{
	beforeParse?(window: DOMWindow, jsdom?: IJSDOM): void;

	//runScripts?: 'dangerously' | 'outside-only',
	//resources?: 'usable',

	url?: string | URL;
	referrer?: string | URL;

	virtualConsole?: VirtualConsole | false,

	/**
	 * userAgent affects the value read from navigator.userAgent, as well as the User-Agent header sent while fetching subresources.
	 * It defaults to `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${jsdomVersion}`.
	 */
	userAgent?: string;
	/**
	 * includeNodeLocations preserves the location info produced by the HTML parser,
	 * allowing you to retrieve it with the nodeLocation() method (described below).
	 * It defaults to false to give the best performance,
	 * and cannot be used with an XML content type since our XML parser does not support location info.
	 */
	includeNodeLocations?: boolean;
	runScripts?: 'dangerously' | 'outside-only';
	resources?: 'usable';
	cookieJar?: CookieJar | ICookieJar | LazyCookieJar;
}

export { IOptionsCreateQuery }

//export type IOptionsJSDOM = IOptionsCreateQuery & Partial<IOptionsJSDOMSource> & IOptions;
/*
export interface IOptionsJSDOM extends IOptionsCreateQuery, IOptions
{

}
*/

export type IOptionsJSDOM = IOptionsCreateQuery & IOptions & {
	minifyHTML?: boolean,
} & IOptionsWithWindowOptionsWithResourceLoader;

export type IConstructorOptions = Partial<ConstructorOptions & IOptionsJSDOM>;
export type IFromFileOptions = Partial<IOptionsJSDOM & FromFileOptions>;
export { IFromUrlOptions }
export type IAllOptions = Partial<IConstructorOptions & IFromFileOptions & IFromUrlOptions>;

export interface IJSDOM_Symbol
{
	$: JQueryStatic,
	window: DOMWindow,
	url: URL,

	options: IJSDOM_Symbol_Options,
}

export interface IJSDOM_Symbol_Options
{
	ConstructorOptions?: Partial<ConstructorOptions>,
	options?: Partial<IOptions>,
	requestOptions?: Partial<IRequestOptions>,

	Response?,
	body?,
}

export interface IJSDOM_EXTEND extends JSDOM
{
	$: JQueryStatic,
	url: URL,
	document: Document,

	_options: IJSDOM_Symbol_Options,

	fakeThen<T>(cb: (jsdom: IJSDOM) => T): T
}

export type IJSDOM = JSDOM & IJSDOM_EXTEND;

export function auto(JSDOM)
{
	packJSDOM(JSDOM.prototype);
	return JSDOM;
}

export function createJSDOM(html?: string | Buffer | BinaryData, options: IConstructorOptions = {}): IJSDOM
{
	let opts = {};

	options = packOptions(options, function (options)
	{
		opts = options;
	});

	if (options.minifyHTML)
	{
		html = normalizeHTML(html as string).html;
		html = minifyHTML(html);
	}

	let jsdom = new JSDOM(html, options) as IJSDOM;

	if (!isPackedJSDOM(jsdom))
	{
		packJSDOM(jsdom);
	}

	jsdom._options.ConstructorOptions = opts;
	jsdom._options.options = options;

	return jsdom;
}

export function asyncJSDOM(html?: string | Buffer | BinaryData, options: IConstructorOptions = {}): Bluebird<IJSDOM>
{
	return Bluebird.resolve().then(function ()
	{
		return createJSDOM(html, options);
	});
}

export function fromFile(url: string, options?: IFromFileOptions): Bluebird<IJSDOM>
{
	return Bluebird.resolve().then(function ()
	{
		let opts = {};

		options = packOptions(options, function (options)
		{
			opts = options;
		});

		return JSDOM.fromFile(url, options)
			// @ts-ignore
			.then(function (jsdom: IJSDOM)
			{
				if (!isPackedJSDOM(jsdom))
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

export interface IPackOptionsHookCallback<T>
{
	(opts: Partial<T & IOptionsJSDOM>, window?: DOMWindow, jsdom?: JSDOM)
}

export function packOptions<T>(options: Partial<T & IOptionsJSDOM> = {},
	cb?: IPackOptionsHookCallback<T>
): Partial<T & IOptionsJSDOM>
{
	if (options.url !== undefined)
	{
		// @ts-ignore
		options.url = (new URL(options.url)).href;
	}

	if (options.referrer !== undefined)
	{
		// @ts-ignore
		options.referrer = (new URL(options.referrer)).href;
	}

	if (!options.beforeParse || !options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS])
	{
		let old_beforeParse;

		if (options.beforeParse)
		{
			old_beforeParse = options.beforeParse;
		}

		// @ts-ignore
		options.beforeParse = function (window: DOMWindow, jsdom?: IJSDOM)
		{
			let opts: Partial<T & IOptionsJSDOM> = {};

			if (old_beforeParse)
			{
				old_beforeParse(window, jsdom);
			}

			//console.log(this);
			opts = Object.assign({}, this);

			if (jsdom)
			{
				jsdom[SYMBOL_RAW] = jsdom[SYMBOL_RAW] || {};
				jsdom[SYMBOL_RAW].options = jsdom[SYMBOL_RAW].options || {};
				jsdom[SYMBOL_RAW].options.ConstructorOptions = opts;
			}

			let cbs: IPackOptionsHookCallback<T>[];

			cbs = (opts.beforeParse && opts.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS])
				.concat(options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS])
			;

			//cb && cb(opts, window, jsdom);
			array_unique(cbs)
				.forEach(function (cb: IPackOptionsHookCallback<T>)
				{
					cb(opts, window, jsdom);
				})
			;
		};
		options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS] = [] || options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS];
	}
	if (cb)
	{
		options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS].push(cb);

		options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS] = array_unique(options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS]);
	}

	if (options.virtualConsole === false)
	{
		// @ts-ignore
		options.virtualConsole = new VirtualConsole();
	}

	return options;
}

export function isPackedJSDOM(jsdom)
{
	//return (SYMBOL_RAW in jsdom);
	return (CONSTS.SYMBOL_PACKED in jsdom);
}

export function packJSDOM(jsdom: JSDOM): IJSDOM
{
	if (isPackedJSDOM(jsdom))
	{
		return jsdom as IJSDOM;
	}

	function chk(who)
	{
		if (who instanceof JSDOM)
		{
			return;
		}

		throw new Error(`object not a instance of JSDOM`);
	}

	Object.defineProperties(jsdom, {

		[CONSTS.SYMBOL_PACKED]: {
			get()
			{
				return true;
			}
		},

		[SYMBOL_RAW]: {
			value: Object.assign({
				options: {},
			}, jsdom[SYMBOL_RAW]) as IJSDOM_Symbol,
		},

		_options: {
			get()
			{
				chk(this);

				return this[SYMBOL_RAW].options;
			},
			set(val = {})
			{
				this[SYMBOL_RAW].options = val;
			}
		},

		document: {
			get()
			{
				chk(this);

				return this.window.document;
			},
		},

		url: {
			get()
			{
				chk(this);

				if (!this[SYMBOL_RAW].url || this[SYMBOL_RAW].window !== this.window || this[SYMBOL_RAW].window.location.href !== this.window.location.href)
				{
					this[SYMBOL_RAW].window = this.window;
					this[SYMBOL_RAW].url = new URL(this.window.location.href);
				}

				return this[SYMBOL_RAW].url;
			}
		},

		$: {
			get()
			{
				chk(this);

				if (!this[SYMBOL_RAW].$ || this[SYMBOL_RAW].window !== this.window)
				{
					this[SYMBOL_RAW].window = this.window;
					// @ts-ignore

					this[SYMBOL_RAW].$ = createQuery(this, this[SYMBOL_RAW].options.options);
				}

				return this[SYMBOL_RAW].$;
			},
		},

		fakeThen: {
			get()
			{
				return function (this: IJSDOM, cb: <T>(jsdom: IJSDOM) => T)
				{
					return cb(this);
				}
			}
		},
	});

	return jsdom as IJSDOM;
}

//export default exports as typeof import('./pack');
