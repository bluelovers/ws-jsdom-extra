/// <reference types="jquery" />
import { JSDOM } from 'jsdom';
export interface IOptionsCreateQuery {
    createQuery?(jsdom: JSDOM, options?: IOptionsCreateQuery): Partial<JQueryStatic>;
    disableJQuery?: boolean;
    disableCheerio?: boolean;
}
export declare function createQuery(jsdom: any, options?: IOptionsCreateQuery): Partial<JQueryStatic>;
import * as self from './query';
export default self;
