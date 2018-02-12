/// <reference types="request" />
import { CookieJar } from 'jsdom';
import * as toughCookie from 'tough-cookie';
import * as request from 'request';
export { CookieJar, toughCookie };
import { wrapCookieJarForRequest } from 'jsdom/lib/jsdom/browser/resource-loader';
export { wrapCookieJarForRequest };
import * as moment from 'moment';
export { moment };
export declare class LazyCookie extends toughCookie.Cookie {
    constructor(prop?: Partial<LazyCookie.Properties>);
    static create(prop?: Partial<LazyCookie.Properties>, ...argv: any[]): self.LazyCookie;
}
export interface RequestCookieJar extends request.CookieJar {
    _jar: CookieJar | LazyCookieJar;
}
export declare class LazyCookieJar extends CookieJar {
    enableLooseMode: boolean;
    store: toughCookie.Store;
    constructor(data?: {}, url?: string | URL);
    setCookieSync(cookieOrString: LazyCookie.Properties | toughCookie.Cookie | string, currentUrl?: string | URL, options?: toughCookie.CookieJar.SetCookieOptions, ...argv: any[]): void;
    static create(data?: {}, url?: string | URL): self.LazyCookieJar;
    wrapForRequest(): request.CookieJar & {
        _jar: LazyCookieJar;
    };
    static unwrapFromRequest(jar: RequestCookieJar): CookieJar | self.LazyCookieJar;
    getAllCookies(): toughCookie.Cookie[];
}
export declare namespace LazyCookie {
    interface Properties {
        key: string;
        value?: string;
        expires?: Date | moment.Moment | number;
        maxAge?: number | 'Infinity' | '-Infinity';
        domain?: string;
        path?: string;
        secure?: boolean;
        httpOnly?: boolean;
        extensions?: string[];
        creation?: Date | moment.Moment;
        creationIndex?: number;
        hostOnly?: boolean;
        pathIsDefault?: boolean;
        lastAccessed?: Date;
    }
}
export interface toughCookieProperties {
    key?: string;
    value?: string;
    expires?: Date;
    maxAge?: number | 'Infinity' | '-Infinity';
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    extensions?: string[];
    creation?: Date;
    creationIndex?: number;
    hostOnly?: boolean;
    pathIsDefault?: boolean;
    lastAccessed?: Date;
}
import * as self from './cookies';
export default self;
