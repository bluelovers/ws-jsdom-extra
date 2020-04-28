/**
 * Created by user on 2018/2/6/006.
 */
/// <reference types="jquery" />
/// <reference types="node" />
/// <reference types="bluebird" />
import { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, BinaryData, DOMWindow, FileOptions as FromFileOptions } from 'jsdom';
import { URL, URLImpl } from 'jsdom-url';
import { IOptionsWithWindowOptionsWithResourceLoader } from './browser/resource-loader';
import { LazyCookieJar } from './cookies';
import { IOptionsCreateQuery } from './query';
import { ICookieJar, IFromUrlOptions, IRequestOptions } from './from-url';
export { fromURL } from './from-url';
export { URL, URLImpl };
export { JSDOM, VirtualConsole, CookieJar, toughCookie, ConstructorOptions, DOMWindow };
export * from './const';
import { Bluebird } from './util/bluebird';
export declare const JSDOM_PROTOTYPE_COPY: JSDOM;
export interface IOptions {
    beforeParse?(window: DOMWindow, jsdom?: IJSDOM): void;
    url?: string | URL;
    referrer?: string | URL;
    virtualConsole?: VirtualConsole | false;
    /**
     * userAgent affects the value read from navigator.userAgent, as well as the User-Agent header sent while fetching subresources.
     * It defaults to `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${jsdomVersion}`.
     */
    userAgent?: string;
    /**
     * includeNodeLocations preserves the location info produced by the HTML parser,
     * allowing you to retrieve it with the nodeLocation() method (described below).
     * It defaults to false to give the best performance,
     * and cannot be used with an XML content type since our XML parser does not support location info.
     */
    includeNodeLocations?: boolean;
    runScripts?: 'dangerously' | 'outside-only';
    resources?: 'usable';
    cookieJar?: CookieJar | ICookieJar | LazyCookieJar;
}
export { IOptionsCreateQuery };
export declare type IOptionsJSDOM = IOptionsCreateQuery & IOptions & {
    minifyHTML?: boolean;
} & IOptionsWithWindowOptionsWithResourceLoader;
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
    Response?: any;
    body?: any;
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
export declare function asyncJSDOM(html?: string | Buffer | BinaryData, options?: IConstructorOptions): Bluebird<IJSDOM>;
export declare function fromFile(url: string, options?: IFromFileOptions): Bluebird<IJSDOM>;
export interface IPackOptionsHookCallback<T> {
    (opts: Partial<T & IOptionsJSDOM>, window?: DOMWindow, jsdom?: JSDOM): any;
}
export declare function packOptions<T>(options?: Partial<T & IOptionsJSDOM>, cb?: IPackOptionsHookCallback<T>): Partial<T & IOptionsJSDOM>;
export declare function isPackedJSDOM(jsdom: any): boolean;
export declare function packJSDOM(jsdom: JSDOM): IJSDOM;
