/// <reference types="jquery" />
/// <reference types="cheerio" />
import { JSDOM } from 'jsdom';
export declare type IOptionsCreateQuery<T = Partial<JQueryStatic>, O = any, J = JSDOM> = {
    createQuery?(jsdom: J, options?: O): T;
    disableJQuery?: boolean;
    disableCheerio?: boolean;
    JQueryLib?: JQueryStatic;
    CheerioLib?: CheerioAPI;
};
export declare function createQuery<T = Partial<JQueryStatic>, O = any, J = JSDOM>(jsdom: any, options?: IOptionsCreateQuery<T, O, J>): JQueryStatic | CheerioStatic | T;
export default createQuery;
