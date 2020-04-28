/**
 * Created by user on 2020/4/29.
 */
import IJSDOM_ResourceLoader from 'jsdom/lib/jsdom/browser/resources/resource-loader';

export type IJSDOM_ResourceLoader = typeof import('jsdom/lib/jsdom/browser/resources/resource-loader');

export function getJSDOMResourceLoader(): IJSDOM_ResourceLoader
{
	let _mod: IJSDOM_ResourceLoader;
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

let JSDOM_ResourceLoader: IJSDOM_ResourceLoader = getJSDOMResourceLoader();

export { JSDOM_ResourceLoader };

export default getJSDOMResourceLoader;
