/**
 * Created by user on 2018/2/7/007.
 */

// @ts-ignore
import * as KEYS from 'jsdom-global/keys';
import { ConstructorOptions, DOMWindow } from 'jsdom';
import { IConstructorOptions, IJSDOM, createJSDOM, JSDOM } from '../pack';

export declare interface Global extends NodeJS.Global
{
	navigator: {
		userAgent: string
	},

	document: Document & {
		destroy(),
	},
	window: DOMWindow,
}

declare var global: Global;

export interface IOptions
{
	/**
	 * jsdom class that can call with new JSDOM
	 */
	JSDOM: typeof JSDOM,

	/**
	 * allow use exists jsdom or create function
	 * @returns {IJSDOM}
	 */
	createJSDOM(): IJSDOM,
	createJSDOM: IJSDOM,
}

export interface IGlobalJSDOM extends JSDOM
{
	destroy?(),
}

export function globalJsdom<T>(html?, options: Partial<T & IConstructorOptions & IOptions> = {}): globalJsdom.IReturn
{
	// Idempotency
	if (global.navigator &&
		global.navigator.userAgent &&
		global.navigator.userAgent.indexOf('Node.js') > -1 &&
		global.document &&
		typeof global.document.destroy === 'function')
	{
		return {
			window: global.window,
			document: global.document,
			cleanup: global.document.destroy,
			global,
		};
	}

	let jsdom: IGlobalJSDOM;
	if (options.JSDOM)
	{
		const JSDOM = options.JSDOM;
		delete options.JSDOM;
		delete options.createJSDOM;

		// @ts-ignore
		jsdom = new JSDOM(html, options);
	}
	else if (options.createJSDOM)
	{
		const create = options.createJSDOM;
		delete options.JSDOM;
		delete options.createJSDOM;

		if (typeof create == 'function')
		{
			jsdom = create(html, options);
		}
		else
		{
			jsdom = create;
		}
	}
	else
	{
		jsdom = createJSDOM(html, options);
	}

	const window = jsdom.window;

	KEYS.forEach(function (key)
	{
		global[key] = window[key]
	});

	// @ts-ignore
	global.document = window.document;
	global.window = window;

	// @ts-ignore
	window.console = global.console;
	// @ts-ignore
	jsdom.destroy = destroy;

	function destroy()
	{
		cleanup(global);
	}

	return {
		jsdom,
		window,
		document: document,
		cleanup: destroy,
		global,
	};
}

export function cleanup(global)
{
	KEYS.forEach(function (key) { delete global[key] });
}

export namespace globalJsdom
{
	export interface IReturn
	{
		jsdom?: IGlobalJSDOM;
		window: DOMWindow;
		document: Document;
		cleanup: () => void;
		global?: Global
	}
}

import * as self from './index';
export default self;
//export default exports;
