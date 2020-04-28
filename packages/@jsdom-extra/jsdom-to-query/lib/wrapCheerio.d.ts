/// <reference types="cheerio" />
import { JSDOM } from 'jsdom';
export declare function wrapCheerio(jsdom: JSDOM, cheerio?: CheerioAPI): CheerioStatic;
export default wrapCheerio;
