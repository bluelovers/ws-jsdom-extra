/**
 * Created by user on 2018/2/7/007.
 */

import toughCookie from 'tough-cookie';
import { LazyCookie, LazyCookieJar as LazyCookieJar2 } from 'lazy-cookies';

export { toughCookie }

import { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar } from './cookies/request-jar';
import { URL } from './pack';
import moment from 'moment';

export { CookieJar, RequestJar, wrapCookieJarForRequest, IRequestCookieJar }

export { LazyCookie }

/*
export class LazyCookie extends toughCookie.Cookie
{
	constructor(prop: Partial<LazyCookie.Properties> = {}, ...argv)
	{
		if (!prop.expires || prop.expires === -1)
		{
			prop.expires = moment().add(1, 'year');
		}
		else if (typeof prop.expires == 'number')
		{
			prop.expires = moment().add(prop.expires, 's');
		}

		for (let key in prop)
		{
			if (moment.isMoment(prop[key]))
			{
				prop[key] = prop[key].toDate();
			}
		}

		super(prop as toughCookieProperties);

		//console.log(this);
	}

	static create(prop?: Partial<LazyCookie.Properties>, ...argv)
	{
		return new this(prop, ...argv)
	}
}

 */

export type RequestCookieJar = IRequestCookieJar<CookieJar | LazyCookieJar>

export class LazyCookieJar extends LazyCookieJar2
{

	static create(store?, options = {}, data = {}, url?: string | URL)
	{
		return new this(store, options, data, url);
	}

	wrapForRequest(): IRequestCookieJar<LazyCookieJar>
	{
		return wrapCookieJarForRequest(this);
	}

	static unwrapFromRequest(jar: RequestCookieJar)
	{
		return jar._jar;
	}

}

/*
console.log(LazyCookieJar.create().setCookieSync({
	key: 'over18',
	//value: 'yes',
}, 'http://syosetu.com'));

console.log(LazyCookieJar.create().setCookieSync('over18=yes', 'http://syosetu.com'));

let jar = LazyCookieJar.create();

jar.setCookieSync('over18=yes', 'http://syosetu.com');
console.dir(jar.store.getAllCookies(function (err, cookie)
{
	console.dir(cookie);

	console.dir(new LazyCookie(cookie[0]));
}));
console.log(444444);
*/

export namespace LazyCookie
{
	export interface Properties
	{
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

export interface toughCookieProperties
{
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

//export default exports as typeof import('./cookies');
