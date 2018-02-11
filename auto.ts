/**
 * Created by user on 2018/2/6/006.
 */

export * from 'jsdom';
import { BinaryData, JSDOM as _JSDOM } from 'jsdom';
import { URL } from 'jsdom-url';
export { URL }

import pack, {
	IJSDOM, auto, packOptions, IJSDOM_Symbol_Options,
	IConstructorOptions,

	fromURL,
	fromFile,
} from './lib/pack';

export { fromURL, fromFile }

auto(_JSDOM);

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

// @ts-ignore
JSDOM.fromFile = fromFile;
// @ts-ignore
JSDOM.fromURL = fromURL;

export default JSDOM;

/*
let jsdom = new JSDOM();

console.log(jsdom.url);

//pack(jsdom);

console.log(jsdom.$(':root'));

console.log(jsdom._options);
*/
