/// <reference types="jquery" />
/// <reference types="node" />
import { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, BinaryData, DOMWindow, FromFileOptions, FromUrlOptions } from 'jsdom';
import { URL } from 'jsdom-url';
import { IOptionsCreateQuery } from './query';
export { URL };
export { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, DOMWindow };
export declare const SYMBOL_RAW: symbol;
export declare const JSDOM_PROTOTYPE_COPY: JSDOM;
export interface IOptions extends IOptionsCreateQuery {
    beforeParse?(window: DOMWindow, jsdom?: IJSDOM): void;
}
export declare type IConstructorOptions = Partial<IOptions & ConstructorOptions>;
export declare type IFromFileOptions = Partial<IOptions & FromFileOptions>;
export declare type IFromUrlOptions = Partial<IOptions & FromUrlOptions>;
export declare type IAllOptions = Partial<IConstructorOptions & IFromFileOptions & IFromUrlOptions>;
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
    fakeThen<T>(cb: (jsdom: IJSDOM) => T): T;
}
export declare function auto(): typeof JSDOM;
export declare function createJSDOM(html?: string | Buffer | BinaryData, options?: IConstructorOptions): IJSDOM;
export declare function fromFile(url: string, options?: IFromFileOptions): Promise<IJSDOM>;
export declare function fromURL(url: string, options?: IFromUrlOptions): Promise<IJSDOM>;
export declare function packOptions<T>(options?: Partial<T & IOptions>, cb?: (opts: IOptions, window?, jsdom?) => void): Partial<T & IOptions>;
export declare function isPacked(jsdom: any): boolean;
export declare function packJSDOM(jsdom: JSDOM): IJSDOM;
import * as self from './pack';
export default self;
