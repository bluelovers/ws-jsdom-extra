import { JSDOM } from 'jsdom';
import * as jQuery from 'jquery';

/**
 * Created by user on 2018/2/6/006.
 */

export interface IOptionsCreateQuery
{
	createQuery?(jsdom: JSDOM, options?: IOptionsCreateQuery): Partial<JQueryStatic>,
	disableJQuery?: boolean,
	disableCheerio?: boolean,
}

export function createQuery(jsdom, options: IOptionsCreateQuery = {}): Partial<JQueryStatic>
{
	if (options.createQuery)
	{
		return options.createQuery(jsdom, options);
	}

	if (!options.disableJQuery)
	{
		try
		{
			const jQuery = require("jquery");
			return jQuery(jsdom.window)
				.noConflict(true)
				;
		}
		catch (e)
		{
		}
	}

	if (!options.disableCheerio)
	{
		try
		{
			const cheerio = require("cheerio");
			return cheerio.load(jsdom.serialize());
		}
		catch (e)
		{
		}
	}

	throw new ReferenceError(`can't found module "jquery" or "cheerio"`)
}

export default exports as typeof import('./query');
