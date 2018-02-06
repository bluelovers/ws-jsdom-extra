/// <reference types="jquery" />
/// <reference types="node" />
export * from 'jsdom';
import { BinaryData, JSDOM as _JSDOM } from 'jsdom';
import { URL } from 'jsdom-url';
export { URL };
import { IOptions, IJSDOM_Symbol_Options } from './lib/pack';
export declare class JSDOM extends _JSDOM {
    $: JQueryStatic;
    url: URL;
    document: Document;
    _options: IJSDOM_Symbol_Options;
    constructor(html?: string | Buffer | BinaryData, options?: IOptions);
}
export default JSDOM;
