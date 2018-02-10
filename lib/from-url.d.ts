/// <reference types="bluebird" />
/// <reference types="request" />
/// <reference types="node" />
import { JSDOM, CookieJar, FromUrlOptions, toughCookie } from 'jsdom';
import { wrapCookieJarForRequest } from 'jsdom/lib/jsdom/browser/resource-loader';
import { IJSDOM, IOptionsJSDOM, URL } from './pack';
import { Promise, request, ResponseRequest } from './index';
import * as parseContentType from 'content-type-parser';
import { LazyCookieJar, LazyCookie, RequestCookieJar } from './cookies';
export { LazyCookieJar, LazyCookie };
export { wrapCookieJarForRequest, parseContentType };
export { URL };
export { DEFAULT_USER_AGENT } from './const';
export { CookieJar, toughCookie };
export declare type ICookieJar = CookieJar | LazyCookieJar;
export interface IFromUrlOptions extends Partial<FromUrlOptions & IOptionsJSDOM> {
    requestOptions?: Partial<IRequestOptions>;
    cookieJar?: ICookieJar | LazyCookieJar;
}
export interface IRequestOptionsJSDOM extends request.RequestPromiseOptions {
    resolveWithFullResponse: boolean;
    encoding: null;
    gzip: boolean;
    headers: {
        "User-Agent": string;
        Referer: string;
        Accept: string;
        "Accept-Language": string;
    };
    jar: IRequestJar;
}
export interface IRequestOptions extends Partial<IRequestOptionsJSDOM> {
    method?: 'POST' | 'GET' | string;
    form?: {
        [key: string]: any;
        [key: number]: any;
    };
}
export declare type IRequestJar = RequestCookieJar;
export declare function fromURL(url: string | URL, options?: Partial<IFromUrlOptions>): Promise<IJSDOM>;
export interface IResponse extends ResponseRequest {
    headers: {
        [key: string]: any;
    };
    request: {
        href?: string;
        [key: string]: any;
    };
    body: Buffer;
}
export declare function requestToJSDOM<T = JSDOM>(res: IResponse, parsedURL: URL | string, options: Partial<IFromUrlOptions>, requestOptions?: Partial<IRequestOptions>): T;
export declare function normalizeRequestOptions(options: IFromUrlOptions, _requestOptions?: IRequestOptions): Partial<IRequestOptions>;
export declare function normalizeFromURLOptions<T>(options: Partial<T & IFromUrlOptions>): Partial<T & IFromUrlOptions>;
export interface INormalizeHTML {
    html: string;
    encoding: string;
}
import * as self from './from-url';
export default self;
