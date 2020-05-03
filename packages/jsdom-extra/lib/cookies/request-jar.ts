/**
 * Created by user on 2018/2/15/015.
 */

import toughCookie from 'tough-cookie';
import { unwrapCookieJarFromRequestJar, wrapCookieJarForRequest } from '@jsdom-extra/cookie';

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

export { unwrapCookieJarFromRequestJar as unwrapCookieJarFromRequest }

export { wrapCookieJarForRequest }

//export default exports as typeof import('./request-jar');
