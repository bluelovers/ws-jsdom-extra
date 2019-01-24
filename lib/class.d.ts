/// <reference types="bluebird" />
export * from '../index';
import { ClassProxyStatic } from 'class-proxy';
import { Promise } from './index';
import { IJSDOM, fromFile, IFromUrlOptions, IJSDOM_Symbol_Options } from './pack';
import { JSDOM as _JSDOM } from 'jsdom';
export declare type IJSDOM_STATIC = ClassProxyStatic<IJSDOM> & typeof _JSDOM & {
    fromFile: typeof fromFile;
    fromURL: IFromURLApi;
};
export interface IFromURLApi<T = IJSDOMC> {
    (url: string | URL, options?: IFromUrlOptions): Promise<T>;
}
export declare const JSDOM: typeof IJSDOMC;
export declare class IJSDOMC extends _JSDOM {
    static fromFile: typeof fromFile;
    static fromURL: IFromURLApi;
    $: JQueryStatic;
    url: URL;
    document: Document;
    _options: IJSDOM_Symbol_Options;
    fakeThen<T>(cb: (jsdom: IJSDOMC) => T): T;
}
export default JSDOM;
