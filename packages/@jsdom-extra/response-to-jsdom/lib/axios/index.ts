/**
 * Created by user on 2020/5/3.
 */
import { getResponseUrl, getResponseCookieJar, getResponseUserAgent, getResponseUserReferer } from './util';
import { AxiosResponse } from 'axios';
import { IConstructorOptions as IJSDOMConstructorOptions, VirtualConsole } from 'jsdom-extra/lib/pack';
import { getVirtualConsole } from '../virtualConsole';

export interface IOptions
{
	response?: AxiosResponse,
	jsdomOptions?: IJSDOMConstructorOptions,
}

export function axiosResponseToJSDOMOptions(opts?: IOptions)
{
	let response = opts?.response;
	let jsdomOptions = opts?.jsdomOptions || {};

	jsdomOptions = {
		...jsdomOptions,
		userAgent: jsdomOptions.userAgent || getResponseUserAgent(response),
		referrer: jsdomOptions.referrer || getResponseUserReferer(response),
		url: jsdomOptions.url || getResponseUrl(response),
		cookieJar: jsdomOptions.cookieJar || getResponseCookieJar(response),
		virtualConsole: getVirtualConsole(jsdomOptions)
	};

	return jsdomOptions
}

export default axiosResponseToJSDOMOptions
