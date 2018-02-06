/**
 * Created by user on 2018/2/6/006.
 */

export * from 'jsdom';
import { BinaryData, DOMWindow, JSDOM as _JSDOM } from 'jsdom';
import { URL } from 'jsdom-url';
export { URL }

import {
	createJSDOM, IJSDOM, IOptions, packJSDOM, SYMBOL_RAW, packOptions, IJSDOM_Symbol_Options,
	IConstructorOptions
} from './lib/pack';

packJSDOM(_JSDOM.prototype);

export class JSDOM extends _JSDOM
{
	$: JQueryStatic;
	url: URL;
	document: Document;
	_options: IJSDOM_Symbol_Options;

	constructor(html?: string | Buffer | BinaryData, options: IConstructorOptions = {})
	{
		let opts = {};

		packOptions(options, function (options)
		{
			opts = options;
		});

		super(html, options);

		let jsdom: IJSDOM;

		// @ts-ignore
		jsdom = this;

		jsdom._options.ConstructorOptions = opts;
		jsdom._options.options = options;
	}
}

export default JSDOM;

/*
let jsdom = new JSDOM();

console.log(jsdom.url);

//pack(jsdom);

console.log(jsdom.$(':root'));

console.log(jsdom._options);
*/
