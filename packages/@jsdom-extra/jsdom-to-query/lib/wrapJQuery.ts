/// <reference types="jquery" />
import { JSDOM } from 'jsdom';

export function wrapJQuery(jsdom: JSDOM, JQuery?: JQueryStatic): JQueryStatic
{
	// @ts-ignore
	return (JQuery ?? require("jquery") as JQueryStatic)(jsdom.window).noConflict(true)
}

export default wrapJQuery
