/**
 * Created by user on 2020/5/3.
 */
import { CookieJar as ToughCookieJar, Cookie } from 'tough-cookie';
import { IRequestJar } from './types';

/*
export class RequestJar
{
	_jar: ToughCookieJar

	constructor(store?) {}

	setCookie(cookieOrStr, uri, options?)
	{
		return this._jar.setCookieSync(cookieOrStr, uri, options || {})
	}

	getCookieString(uri)
	{
		return this._jar.getCookieStringSync(uri)
	}

	getCookies(uri)
	{
		return this._jar.getCookiesSync(uri)
	}

}

 */

const jar = _wrapCookieJarForRequest()

function _wrapCookieJarForRequest(): <T = ToughCookieJar>(cookieJar: T) => IRequestJar<T>
{
	try
	{
		return require("jsdom/lib/jsdom/living/helpers/wrap-cookie-jar-for-request")
	}
	catch (e)
	{
		return require("jsdom/jsdom/living/helpers/wrap-cookie-jar-for-request")
	}
}

export function wrapCookieJarForRequest<T = ToughCookieJar>(cookieJar): IRequestJar<T>
{
	return jar(cookieJar);
}

export default wrapCookieJarForRequest
