/**
 * Created by user on 2018/2/6/006.
 */
/// <reference types="node" />
import CoreRequest from 'request';
import { JSDOM, toughCookie } from 'jsdom';
import { IJSDOM, IOptionsJSDOM } from './pack';
import { URL, URLImpl } from 'jsdom-url';
import request, { ResponseRequest } from './util/request';
import parseContentType from 'content-type-parser';
import { LazyCookie } from 'lazy-cookies';
import { LazyCookieJar, RequestCookieJar } from './cookies';
export { LazyCookieJar, LazyCookie };
import { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar } from './cookies';
export { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar };
export { parseContentType };
export { URL, URLImpl };
export { DEFAULT_USER_AGENT } from './const';
import Bluebird from 'bluebird';
export { toughCookie };
export declare type ICookieJar = Partial<CookieJar> | Partial<LazyCookieJar>;
export interface IFromUrlOptions extends IOptionsJSDOM {
    requestOptions?: IRequestOptions;
    cookieJar?: ICookieJar | Partial<LazyCookieJar>;
    libRequestPromise?: any;
}
export interface IRequestOptionsJSDOM extends Partial<request.RequestPromiseOptions> {
    resolveWithFullResponse?: boolean;
    encoding?: null;
    gzip?: boolean;
    headers?: CoreRequest.Headers & {
        "User-Agent"?: string;
        Referer?: string;
        Accept?: string;
        "Accept-Language"?: string;
    };
    jar?: IRequestJar;
}
export interface IRequestOptions extends IRequestOptionsJSDOM {
    method?: 'POST' | 'GET' | string;
    form?: {
        [key: string]: any;
        [key: number]: any;
    };
}
export declare type IRequestJar = RequestCookieJar;
export declare function fromURL(url: string | URL, options?: IFromUrlOptions): Bluebird<IJSDOM>;
export interface IResponse extends Omit<ResponseRequest, 'body'> {
    headers: {
        [key: string]: any;
    };
    request: {
        href?: string;
        [key: string]: any;
    };
    body: Buffer | string;
}
export declare function requestToJSDOM<T = JSDOM>(res: IResponse, parsedURL: URL | string, options: Partial<IFromUrlOptions>, requestOptions?: IRequestOptions): T;
export declare function normalizeRequestOptions(options: IFromUrlOptions, _requestOptions?: IRequestOptions): Partial<IRequestOptions>;
export declare function normalizeFromURLOptions<T>(options: Partial<T & IFromUrlOptions>): Partial<T & IFromUrlOptions>;
