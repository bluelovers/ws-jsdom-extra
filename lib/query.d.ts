/// <reference types="jquery" />
import { JSDOM } from 'jsdom';
/**
 * Created by user on 2018/2/6/006.
 */
export interface IOptionsCreateQuery {
    createQuery?(jsdom: JSDOM, options?: IOptionsCreateQuery): Partial<JQueryStatic>;
    disableJQuery?: boolean;
    disableCheerio?: boolean;
}
export declare function createQuery(jsdom: any, options?: IOptionsCreateQuery): Partial<JQueryStatic>;
