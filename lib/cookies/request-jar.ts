/**
 * Created by user on 2018/2/15/015.
 */

import * as toughCookie from 'tough-cookie';

export { toughCookie }

import { CookieJar } from 'jsdom';

export { CookieJar }

import { CookieJar as IRequestCookieJarSource } from 'request';

export { IRequestCookieJarSource }

export type IRequestCookieJar<T = toughCookie.CookieJar> =
	IRequestCookieJarSource
	//& toughCookie.CookieJar.Options
	& {
	_jar?: T,
	store?: toughCookie.Store,
};

//export interface IRequestCookieJar<T = toughCookie.CookieJar> extends IRequestCookieJarSource
//{
//	_jar: T,
//}

import { _RequestJar } from 'request/lib/cookies';

export const RequestJar = _RequestJar as {
	new <T = toughCookie.CookieJar>(store?: toughCookie.Store,
		options?: toughCookie.CookieJar.Options
	): IRequestCookieJar<T>,
};

import { LazyCookieJar } from '../cookies';

import { wrapCookieJarForRequest } from 'jsdom/lib/jsdom/browser/resource-loader';

export declare function wrapCookieJarForRequest(cookieJar: LazyCookieJar): IRequestCookieJar<LazyCookieJar>;
export declare function wrapCookieJarForRequest(cookieJar: CookieJar): IRequestCookieJar<CookieJar>;
export declare function wrapCookieJarForRequest<T>(cookieJar: T): IRequestCookieJar<T>;

export function unwrapCookieJarFromRequest<T = CookieJar | LazyCookieJar>(requestJar: IRequestCookieJar<T>)
{
	return requestJar._jar;
}

export { wrapCookieJarForRequest }

import * as self from './request-jar';

export default self;
//export default exports;
