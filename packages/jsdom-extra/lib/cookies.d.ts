/**
 * Created by user on 2018/2/7/007.
 */
/// <reference types="jsdom" />
/// <reference types="moment" />
import toughCookie from 'tough-cookie';
import { LazyCookie, LazyCookieJar as LazyCookieJar2 } from 'lazy-cookies';
export { toughCookie };
import { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar } from './cookies/request-jar';
import moment from './util/moment';
export { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar };
export { LazyCookie };
export declare type RequestCookieJar = IRequestCookieJar<CookieJar | LazyCookieJar>;
export declare class LazyCookieJar extends LazyCookieJar2 {
    static create(store?: any, options?: {}, data?: {}, url?: string | URL): LazyCookieJar;
    wrapForRequest(): IRequestCookieJar<LazyCookieJar>;
    static unwrapFromRequest(jar: RequestCookieJar): CookieJar | LazyCookieJar;
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
