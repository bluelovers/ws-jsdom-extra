/// <reference types="jquery" />
/// <reference types="node" />
/// <reference types="bluebird" />
import { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, BinaryData, DOMWindow, FromFileOptions } from 'jsdom';
import { URL, URLImpl } from 'jsdom-url';
import { LazyCookieJar } from './cookies';
import { IOptionsCreateQuery } from './query';
import { ICookieJar, IFromUrlOptions, IRequestOptions } from './from-url';
export { fromURL } from './from-url';
import { Promise } from './index';
export { Promise };
export { URL, URLImpl };
export { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, DOMWindow };
export * from './const';
export declare const JSDOM_PROTOTYPE_COPY: JSDOM;
export interface IOptions {
    beforeParse?(window: DOMWindow, jsdom?: IJSDOM): void;
    url?: string | URL;
    referrer?: string | URL;
    virtualConsole?: VirtualConsole | false;
    userAgent?: string;
    includeNodeLocations?: boolean;
    runScripts?: 'dangerously' | 'outside-only';
    resources?: 'usable';
    cookieJar?: CookieJar | ICookieJar | LazyCookieJar;
}
export { IOptionsCreateQuery };
export declare type IOptionsJSDOM = IOptionsCreateQuery & IOptions & {
    minifyHTML?: boolean;
};
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
    requestOptions?: Partial<IRequestOptions>;
}
export interface IJSDOM_EXTEND extends JSDOM {
    $: JQueryStatic;
    url: URL;
    document: Document;
    _options: IJSDOM_Symbol_Options;
    fakeThen<T>(cb: (jsdom: IJSDOM) => T): T;
}
export declare type IJSDOM = JSDOM & IJSDOM_EXTEND;
export declare function auto(JSDOM: any): any;
export declare function createJSDOM(html?: string | Buffer | BinaryData, options?: IConstructorOptions): IJSDOM;
export declare function asyncJSDOM(html?: string | Buffer | BinaryData, options?: IConstructorOptions): Promise<IJSDOM>;
export declare function fromFile(url: string, options?: IFromFileOptions): Promise<IJSDOM>;
export interface IPackOptionsHookCallback<T> {
    (opts: Partial<T & IOptionsJSDOM>, window?: DOMWindow, jsdom?: JSDOM): any;
}
export declare function packOptions<T>(options?: Partial<T & IOptionsJSDOM>, cb?: IPackOptionsHookCallback<T>): Partial<T & IOptionsJSDOM>;
export declare function isPackedJSDOM(jsdom: any): boolean;
export declare function packJSDOM(jsdom: JSDOM): IJSDOM;
import * as self from './pack';
export default self;
