/**
 * Created by user on 2018/2/19/019.
 */

import jQuery from 'jquery';
export * from '../index';
import { ClassProxyStatic, IClassProxyHandler } from 'class-proxy';
// @ts-ignore
import { createClassProxy2 } from 'class-proxy';
import { createJSDOM, URL, IJSDOM, packJSDOM, fromFile, fromURL, IFromUrlOptions, IJSDOM_Symbol_Options } from './pack';
import { JSDOM as _JSDOM } from 'jsdom';
import Bluebird from 'bluebird';

export type IJSDOM_STATIC = ClassProxyStatic<IJSDOM> & typeof _JSDOM & {
	fromFile: typeof fromFile;
	fromURL: IFromURLApi;
};

export interface IFromURLApi<T = IJSDOMC>
{
	(url: string | URL, options?: IFromUrlOptions): Bluebird<T>
}

const __JSDOM = createClassProxy2(_JSDOM, {
	// @ts-ignore
	construct(target, args)
	{
		return createJSDOM(...args);
	}
}) as typeof IJSDOMC | IJSDOM_STATIC;

export const JSDOM = __JSDOM as typeof IJSDOMC;

// @ts-ignore
export declare class IJSDOMC extends _JSDOM
{
	static fromFile: typeof fromFile;
	static fromURL: IFromURLApi;

	$: JQueryStatic;
	url: URL;
	document: Document;

	_options: IJSDOM_Symbol_Options;

	fakeThen<T>(cb: (jsdom: IJSDOMC) => T): T
}

JSDOM.fromFile = fromFile;
JSDOM.fromURL = fromURL;

export default JSDOM;

/*
export let jsdom = new JSDOM();

console.log(JSDOM);
console.log(jsdom);
*/
