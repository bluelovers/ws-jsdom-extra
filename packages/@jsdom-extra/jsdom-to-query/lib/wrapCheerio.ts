/// <reference types="cheerio" />
import { JSDOM } from 'jsdom';
import CheerioAPI from 'cheerio';

export function wrapCheerio(jsdom: JSDOM, cheerio?: CheerioAPI)
{
	// @ts-ignore
	return (cheerio ?? require("cheerio") as CheerioAPI).load(jsdom.serialize())
}

export default wrapCheerio
