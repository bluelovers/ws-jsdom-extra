/// <reference types="jquery" />
/// <reference types="cheerio" />
import { JSDOM } from 'jsdom';
import CheerioAPI from 'cheerio';
import wrapQuery from './lib/wrapQuery';
import wrapJQuery from './lib/wrapJQuery';
import wrapCheerio from './lib/wrapCheerio';

export type IOptionsCreateQuery<T = Partial<JQueryStatic>, O = any, J = JSDOM> = {
	createQuery?(jsdom: J, options?: O): T,

	disableJQuery?: boolean,
	disableCheerio?: boolean,

	JQueryLib?: JQueryStatic,
	CheerioLib?: CheerioAPI,
}

export function createQuery<T = Partial<JQueryStatic>, O = any, J = JSDOM>(jsdom, options: IOptionsCreateQuery<T, O, J> = {})
{
	if (isDefined(options.createQuery))
	{
		return wrapQuery(jsdom, options as O, options.createQuery)
	}

	if (!options.disableJQuery)
	{
		try
		{
			return wrapJQuery(jsdom, options.JQueryLib)
		}
		catch (e)
		{
		}
	}

	if (!options.disableCheerio)
	{
		try
		{
			return wrapCheerio(jsdom, options.CheerioLib)
		}
		catch (e)
		{
		}
	}

	throw new ReferenceError(`can't found module "jquery" or "cheerio"`)
}

function isDefined<T>(obj: T): obj is Exclude<T, null | void | never>
{
	return obj !== null && typeof obj !== 'undefined'
}

export default createQuery
