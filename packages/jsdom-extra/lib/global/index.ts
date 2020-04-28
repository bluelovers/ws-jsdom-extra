/**
 * Created by user on 2018/2/7/007.
 *
 * jsdom-global
 * global-jsdom
 */

/*
// @ts-ignore
import * as KEYS from 'jsdom-global/keys';
export { KEYS }
*/
export const KEYS: string[] = [];

import { ConstructorOptions, DOMWindow } from 'jsdom';
import { IConstructorOptions, IJSDOM, createJSDOM, JSDOM } from '../pack';

export declare interface Global extends NodeJS.Global
{
	navigator: {
		userAgent: string
	},

	document: IGlobalDocument,
	window: IGlobalDOMWindow,

	$jsdom: IGlobalJSDOM,
}

export type IGlobalDOMWindow = DOMWindow & {
	XMLHttpRequest?: XMLHttpRequest,
};

export type IGlobalDocument = Document & {
	destroy?(),
};

export declare var global: Global;

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
	//createJSDOM(): IJSDOM,
	createJSDOM: IJSDOM | {
		(...argv): IJSDOM
	},
}

export type IGlobalJSDOM = IJSDOM;

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
			jsdom: global.$jsdom,
			window: global.window,
			document: global.document,
			cleanup: global.document.destroy,
			global,
			XMLHttpRequest: global.window.XMLHttpRequest,
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
			// @ts-ignore
			jsdom = create(html, options);
		}
		else
		{
			// @ts-ignore
			jsdom = create;
		}
	}
	else
	{
		jsdom = createJSDOM(html, options);
	}

	// @ts-ignore
	const window: IGlobalDOMWindow = jsdom.window;
	const document: IGlobalDocument = window.document;

	if (KEYS.length === 0)
	{
		KEYS.push(...Object.getOwnPropertyNames(window).filter(k => !k.startsWith('_')).filter(k => !global[k]));
		// going to add our jsdom instance, see below
		KEYS.push('$jsdom');
	}

	KEYS.forEach(function (key)
	{
		global[key] = window[key]
	});

	global.document = document;
	global.window = window;

	// @ts-ignore
	window.console = global.console;

	document.destroy = destroy;

	global.$jsdom = jsdom;

	function destroy()
	{
		cleanup(global);
	}

	return {
		jsdom,
		window,
		document,
		cleanup: destroy,
		global,
		XMLHttpRequest: window.XMLHttpRequest,
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
		window: IGlobalDOMWindow;
		document: IGlobalDocument;
		cleanup: () => void;
		global?: Global,
		XMLHttpRequest?: XMLHttpRequest,
	}
}

//export default exports as typeof import('./index');
