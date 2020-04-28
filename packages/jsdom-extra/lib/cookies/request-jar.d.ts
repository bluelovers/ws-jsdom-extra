/**
 * Created by user on 2018/2/15/015.
 */
import toughCookie from 'tough-cookie';
export { toughCookie };
import { CookieJar } from 'jsdom';
export { CookieJar };
import { CookieJar as IRequestCookieJarSource } from 'request';
export { IRequestCookieJarSource };
export declare type IRequestCookieJar<T = toughCookie.CookieJar> = IRequestCookieJarSource & {
    _jar?: T;
    store?: toughCookie.Store;
};
export declare const RequestJar: new <T = toughCookie.CookieJar>(store?: toughCookie.Store, options?: toughCookie.CookieJar.Options) => IRequestCookieJar<T>;
import { LazyCookieJar } from '../cookies';
declare const wrapCookieJarForRequest: any;
export declare function unwrapCookieJarFromRequest<T = CookieJar | LazyCookieJar>(requestJar: IRequestCookieJar<T>): T;
export { wrapCookieJarForRequest };
