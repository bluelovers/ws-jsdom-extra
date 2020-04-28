/**
 * Created by user on 2018/4/29/029.
 */

import IJSDOM_ResourceLoader from 'jsdom/lib/jsdom/browser/resources/resource-loader';

let JSDOM_ResourceLoader = getJSDOMResourceLoader();

function getJSDOMResourceLoader()
{
	let _mod: typeof IJSDOM_ResourceLoader;
	try
	{
		_mod = require('jsdom/lib/jsdom/browser/resource-loader');
	}
	catch (e)
	{
		_mod = require('jsdom/lib/jsdom/browser/resources/resource-loader');
	}

	return _mod;
}

export type IOptionsWithWindowOptionsWithResourceLoader = {
	windowOptions?: {
		resourceLoader?: typeof IJSDOM_ResourceLoader | BaseResourceLoader | any,
	},
}

export abstract class abstractResourceLoader
{
	abstract readFile(filePath, options?: { defaultEncoding?, detectMetaCharset? }, callback?)

	abstract wrapCookieJarForRequest(cookieJar)

	abstract enqueue(element, resourceUrl?, callback?)

	abstract download(url, options?, callback?)

	abstract load(element, urlString?, options?, callback?)
}

export type IOptionsResourceLoader = {
	fnResourceLoader?: Partial<IResourceLoader>,
}

export class BaseResourceLoader extends abstractResourceLoader
{
	options?: IOptionsResourceLoader;

	constructor(options: IOptionsResourceLoader = {})
	{
		super();

		if (options && options.fnResourceLoader)
		{
			Object.assign(this, options.fnResourceLoader);
		}
	}

	readFile(filePath, options?: { defaultEncoding?, detectMetaCharset? }, callback?)
	readFile(...argv)
	{
		return JSDOM_ResourceLoader.readFile(...argv);
	}

	wrapCookieJarForRequest(cookieJar)
	wrapCookieJarForRequest(...argv)
	{
		return JSDOM_ResourceLoader.wrapCookieJarForRequest(...argv);
	}

	enqueue(element, resourceUrl?, callback?)
	enqueue(...argv)
	{
		return JSDOM_ResourceLoader.enqueue(...argv);
	}

	download(url, options?, callback?)
	download(...argv)
	{
		return JSDOM_ResourceLoader.download(...argv);
	}

	load(element, urlString?, options?, callback?)
	load(...argv)
	{
		return JSDOM_ResourceLoader.load(...argv);
	}
}

export interface IResourceLoader
{
	readFile(filePath, options?: { defaultEncoding?, detectMetaCharset? }, callback?)

	wrapCookieJarForRequest(cookieJar)

	enqueue(element, resourceUrl?, callback?)

	download(url, options?, callback?)

	load(element, urlString?, options?, callback?)
}

export type ITypeResourceLoader<T> =
	T extends abstractResourceLoader ? abstractResourceLoader :
		T extends typeof IJSDOM_ResourceLoader ? typeof IJSDOM_ResourceLoader :
			any
	;

export { JSDOM_ResourceLoader }

export default BaseResourceLoader
