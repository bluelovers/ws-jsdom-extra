/// <reference types="jquery" />
/// <reference types="node" />
import { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, BinaryData, DOMWindow } from 'jsdom';
import { URL } from 'jsdom-url';
import { IOptionsCreateQuery } from './query';
export { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, DOMWindow };
export declare const SYMBOL_RAW: symbol;
export declare const JSDOM_PROTOTYPE_COPY: JSDOM;
export interface IOptions extends ConstructorOptions, IOptionsCreateQuery {
    beforeParse?(window: DOMWindow, jsdom?: IJSDOM): void;
}
export interface IJSDOM_Symbol {
    $: JQueryStatic;
    window: DOMWindow;
    url: URL;
    options: IJSDOM_Symbol_Options;
}
export interface IJSDOM_Symbol_Options {
    ConstructorOptions?: Partial<ConstructorOptions>;
    options?: Partial<IOptions>;
}
export interface IJSDOM extends JSDOM {
    $: JQueryStatic;
    url: URL;
    document: Document;
    _options: IJSDOM_Symbol_Options;
    then<T>(cb: (jsdom: IJSDOM) => T): T;
}
export declare function auto(): typeof JSDOM;
export declare function createJSDOM(html?: string | Buffer | BinaryData, options?: IOptions): IJSDOM;
export declare function packOptions(options?: IOptions, cb?: (opts: IOptions, window?, jsdom?) => void): IOptions;
export declare function isPacked(jsdom: any): boolean;
export declare function packJSDOM(jsdom: JSDOM): IJSDOM;
import * as self from './pack';
export default self;
