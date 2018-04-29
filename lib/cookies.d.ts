import * as toughCookie from 'tough-cookie';
export { toughCookie };
import { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar } from './cookies/request-jar';
export { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar };
import * as moment from 'moment';
export { moment };
export declare class LazyCookie extends toughCookie.Cookie {
    constructor(prop?: Partial<LazyCookie.Properties>, ...argv: any[]);
    static create(prop?: Partial<LazyCookie.Properties>, ...argv: any[]): self.LazyCookie;
}
export declare type RequestCookieJar = IRequestCookieJar<CookieJar | LazyCookieJar>;
export declare class LazyCookieJar extends CookieJar {
    enableLooseMode?: boolean;
    rejectPublicSuffixes?: boolean;
    store?: toughCookie.Store;
    constructor(store?: any, options?: {}, data?: {}, url?: string | URL);
    setData(data?: {}, url?: string | URL): this;
    setCookieSync(cookieOrString: LazyCookie.Properties | toughCookie.Cookie | string, currentUrl?: string | URL, options?: toughCookie.CookieJar.SetCookieOptions, ...argv: any[]): any;
    static create(store?: any, options?: {}, data?: {}, url?: string | URL): self.LazyCookieJar;
    wrapForRequest(): IRequestCookieJar<self.LazyCookieJar>;
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
