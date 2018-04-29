/// <reference types="request-promise" />
/// <reference types="request" />
/// <reference types="bluebird" />
/// <reference types="node" />
import * as CoreRequest from 'request';
import { JSDOM, toughCookie } from 'jsdom';
import { IJSDOM, IOptionsJSDOM, URL, URLImpl } from './pack';
import { Promise, request, ResponseRequest } from './index';
import * as parseContentType from 'content-type-parser';
import { LazyCookieJar, LazyCookie, RequestCookieJar } from './cookies';
export { LazyCookieJar, LazyCookie };
import { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar } from './cookies';
export { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar };
export { parseContentType };
export { URL, URLImpl };
export { DEFAULT_USER_AGENT } from './const';
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
export declare function fromURL(url: string | URL, options?: IFromUrlOptions): Promise<IJSDOM>;
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
export declare function requestToJSDOM<T = JSDOM>(res: IResponse, parsedURL: URL | string, options: Partial<IFromUrlOptions>, requestOptions?: IRequestOptions): T;
export declare function normalizeRequestOptions(options: IFromUrlOptions, _requestOptions?: IRequestOptions): Partial<IRequestOptions>;
export declare function normalizeFromURLOptions<T>(options: Partial<T & IFromUrlOptions>): Partial<T & IFromUrlOptions>;
import * as self from './from-url';
export default self;
