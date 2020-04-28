/**
 * Created by user on 2018/2/6/006.
 */
/// <reference types="jquery" />
/// <reference types="node" />
export * from 'jsdom';
import { BinaryData, JSDOM as _JSDOM } from 'jsdom';
import { URL } from 'jsdom-url';
export { URL };
import { IJSDOM_Symbol_Options, IConstructorOptions, fromURL, fromFile } from './lib/pack';
export { fromURL, fromFile };
export declare class JSDOM extends _JSDOM {
    $: JQueryStatic;
    url: URL;
    document: Document;
    _options: IJSDOM_Symbol_Options;
    constructor(html?: string | Buffer | BinaryData, options?: IConstructorOptions);
}
export default JSDOM;
