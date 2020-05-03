import { CookieJar as ToughCookieJar, Cookie } from 'tough-cookie';

declare class RequestJar<C = ToughCookieJar>
{
	_jar: C;

	constructor(store?: any);

	setCookie(cookieOrStr: any, uri: any, options?: any): void;

	getCookieString(uri: any): string;

	getCookies(uri: any): Cookie[];
}

export type IRequestJar<C = ToughCookieJar> = RequestJar<C>
