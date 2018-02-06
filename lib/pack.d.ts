/// <reference types="jquery" />
/// <reference types="node" />
import { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, BinaryData, DOMWindow, FromFileOptions, Options as OptionsJSDOM } from 'jsdom';
import { URL } from 'jsdom-url';
import { IOptionsCreateQuery } from './query';
import { IFromUrlOptions } from './from-url';
export { fromURL } from './from-url';
import { Promise } from './index';
export { Promise };
export { URL };
export { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, DOMWindow };
export * from './const';
export declare const JSDOM_PROTOTYPE_COPY: JSDOM;
export interface IOptions {
    beforeParse?(window: DOMWindow, jsdom?: IJSDOM): void;
    url?: string | URL;
    referrer?: string | URL;
}
export declare type IOptionsJSDOM = Partial<IOptionsCreateQuery & OptionsJSDOM & IOptions>;
export declare type IConstructorOptions = Partial<ConstructorOptions & IOptionsJSDOM>;
export declare type IFromFileOptions = Partial<IOptionsJSDOM & FromFileOptions>;
export { IFromUrlOptions };
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
export declare function asyncJSDOM(html?: string | Buffer | BinaryData, options?: IConstructorOptions): Promise<IJSDOM>;
export declare function fromFile(url: string, options?: IFromFileOptions): Promise<IJSDOM>;
export declare function packOptions<T>(options?: Partial<T & IOptionsJSDOM>, cb?: (opts: Partial<T & IOptionsJSDOM>, window?, jsdom?) => void): Partial<T & IOptionsJSDOM>;
export declare function isPacked(jsdom: any): boolean;
export declare function packJSDOM(jsdom: JSDOM): IJSDOM;
import * as self from './pack';
export default self;
