/**
 * Created by user on 2018/2/7/007.
 */

import { CookieJar } from 'jsdom';
import * as toughCookie from 'tough-cookie';
import * as request from 'request';
export { CookieJar, toughCookie }

import { RequestJar } from 'request/lib/cookies';

import { wrapCookieJarForRequest } from 'jsdom/lib/jsdom/browser/resource-loader';
export { wrapCookieJarForRequest }

import { URL } from './pack';

import * as moment from 'moment';

export { moment }

export class LazyCookie extends toughCookie.Cookie
{
	constructor(prop: Partial<LazyCookie.Properties> = {})
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

		console.log(this);
	}

	static create(prop?: Partial<LazyCookie.Properties>, ...argv)
	{
		return new this(prop, ...argv)
	}
}

export interface RequestCookieJar extends request.CookieJar
{
	_jar: CookieJar | LazyCookieJar,
}

export class LazyCookieJar extends CookieJar
{
	public enableLooseMode: boolean;
	public store: toughCookie.Store;

	constructor(data = {}, url?: string | URL)
	{
		super();

		url = (url || '').toString();

		for (let key in data)
		{
			if (data[key] === null || typeof data[key] != 'object')
			{
				this.setCookieSync(new LazyCookie({
					key,
					value: data[key],
				}), url);
			}
			else if (data[key] instanceof toughCookie.Cookie)
			{
				this.setCookieSync(data[key], url);
			}
			else if (data[key])
			{
				this.setCookieSync(new LazyCookie(data[key]), url);
			}
		}
	}

	setCookieSync(cookieOrString: LazyCookie.Properties | toughCookie.Cookie | string, currentUrl?: string | URL, options: toughCookie.CookieJar.SetCookieOptions = {}, ...argv)
	{
		if (typeof cookieOrString == 'string')
		{
			cookieOrString = toughCookie.Cookie.parse(cookieOrString);
		}
		else if (!(cookieOrString instanceof toughCookie.Cookie))
		{
			cookieOrString = new LazyCookie(cookieOrString);
		}

		if (!currentUrl)
		{
			if (cookieOrString instanceof toughCookie.Cookie)
			{
				currentUrl = `http://` + cookieOrString.canonicalizedDomain();
			}
		}
		else if (typeof currentUrl != 'string')
		{
			currentUrl = currentUrl.toString();
		}

		return super.setCookieSync(cookieOrString as toughCookie.Cookie, currentUrl as string, options, ...argv)
	}

	static create(data = {}, url?: string | URL)
	{
		return new this(data, url);
	}

	wrapForRequest(): request.CookieJar & {
		_jar: LazyCookieJar,
	}
	{
		return wrapCookieJarForRequest(this);
	}

	static unwrapFromRequest(jar: RequestCookieJar)
	{
		return jar._jar;
	}

	getAllCookies()
	{
		let cookies: toughCookie.Cookie[];

		this.store.getAllCookies(function (err, cookie)
		{
			cookies = cookie;
		});

		return cookies;
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

import * as self from './cookies';
export default self;
