/**
 * Created by user on 2018/2/6/006.
 */

import {
	JSDOM,
	VirtualConsole,
	CookieJar,
	toughCookie,
	ConstructorOptions,
	BinaryData,
	DOMWindow,
	FromFileOptions,
	FromUrlOptions,
	Options as OptionsJSDOM
} from 'jsdom';
import * as jQuery from 'jquery';
import { URL } from 'jsdom-url';
import { IOptionsCreateQuery, createQuery } from './query';
import { IFromUrlOptions } from './from-url';

export { fromURL } from './from-url';
import { Promise, array_unique } from './index';

export { Promise }
export { URL }
export { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, DOMWindow }

export * from './const';
import CONSTS, { SYMBOL_RAW } from './const';

export const JSDOM_PROTOTYPE_COPY = Object.assign({}, JSDOM.prototype);

export interface IOptions
{
	beforeParse?(window: DOMWindow, jsdom?: IJSDOM): void;

	//runScripts?: 'dangerously' | 'outside-only',
	//resources?: 'usable',

	url?: string | URL;
	referrer?: string | URL;

	virtualConsole?: VirtualConsole | false,
}

export type IOptionsJSDOM = Partial<IOptionsCreateQuery & OptionsJSDOM & IOptions>;

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
}

export interface IJSDOM extends JSDOM
{
	$: JQueryStatic,
	url: URL,
	document: Document,

	_options: IJSDOM_Symbol_Options,

	fakeThen<T>(cb: (jsdom: IJSDOM) => T): T
}

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

	let jsdom = new JSDOM(html, options) as IJSDOM;

	if (!isPackedJSDOM(jsdom))
	{
		packJSDOM(jsdom);
	}

	jsdom._options.ConstructorOptions = opts;
	jsdom._options.options = options;

	return jsdom;
}

export function asyncJSDOM(html?: string | Buffer | BinaryData, options: IConstructorOptions = {}): Promise<IJSDOM>
{
	return Promise.resolve().then(function ()
	{
		return createJSDOM(html, options);
	});
}

export function fromFile(url: string, options?: IFromFileOptions): Promise<IJSDOM>
{
	return Promise.resolve().then(function ()
	{
		let opts = {};

		options = packOptions(options, function (options)
		{
			opts = options;
		});

		return JSDOM.fromFile(url, options)
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
		options.url = (new URL(options.url)).href;
	}

	if (options.referrer !== undefined)
	{
		options.referrer = (new URL(options.referrer)).href;
	}

	if (!options.beforeParse || !options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS])
	{
		let old_beforeParse;

		if (options.beforeParse)
		{
			old_beforeParse = options.beforeParse;
		}

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

					this[SYMBOL_RAW].$ = createQuery(this, this[SYMBOL_RAW].options);
				}

				return this[SYMBOL_RAW].$;
			},
		},

		fakeThen: {
			get()
			{
				return function (cb: <T>(jsdom: IJSDOM) => T)
				{
					return cb(this);
				}
			}
		},
	});

	return jsdom as IJSDOM;
}

import * as self from './pack';

export default self;
