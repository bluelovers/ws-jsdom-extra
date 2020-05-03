/**
 * Created by user on 2020/5/3.
 */
import { AxiosError, AxiosInstance, AxiosStatic, AxiosResponse } from 'axios';
import { getValue } from 'dot-values2';
import { CookieJar } from 'jsdom-extra';

export function getResponseUrl(rp: AxiosResponse): string
{
	return getResponseUrlFromResponse(rp) || getResponseUrlFromResponseWithConfig(rp)
}

export function getResponseUrlFromResponse(rp: AxiosResponse): string
{
	return rp?.request?.res?.responseUrl?.toString?.()
}

export function getResponseUrlFromResponseWithConfig(rp: AxiosResponse): string
{
	return rp?.config?.url?.toString?.()
}

export function getResponseCookieJar(rp: AxiosResponse)
{
	// @ts-ignore
	let cookieJar = rp?.config?.jar as CookieJar

	if (typeof cookieJar === 'object')
	{
		return cookieJar
	}
}

export function getResponseUserAgent(rp: AxiosResponse): string
{
	let headers = rp?.config?.headers;

	return headers?.['user-agent'] ?? headers?.['User-Agent']
}

export function getResponseUserReferer(rp: AxiosResponse): string
{
	let headers = rp?.config?.headers;

	return headers?.['referer'] ?? headers?.['Referer']
}
