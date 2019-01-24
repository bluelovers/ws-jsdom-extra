import { JSDOM } from 'jsdom';
export interface IOptionsCreateQuery {
    createQuery?(jsdom: JSDOM, options?: IOptionsCreateQuery): Partial<JQueryStatic>;
    disableJQuery?: boolean;
    disableCheerio?: boolean;
}
export declare function createQuery(jsdom: any, options?: IOptionsCreateQuery): Partial<JQueryStatic>;
declare const _default: typeof import("./query");
export default _default;
