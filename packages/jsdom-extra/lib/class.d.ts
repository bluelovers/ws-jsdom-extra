/**
 * Created by user on 2018/2/19/019.
 */
/// <reference types="jquery" />
export * from '../index';
import { ClassProxyStatic } from 'class-proxy';
import { IJSDOM, fromFile, IFromUrlOptions, IJSDOM_Symbol_Options } from './pack';
import { JSDOM as _JSDOM } from 'jsdom';
import Bluebird from 'bluebird';
export declare type IJSDOM_STATIC = ClassProxyStatic<IJSDOM> & typeof _JSDOM & {
    fromFile: typeof fromFile;
    fromURL: IFromURLApi;
};
export interface IFromURLApi<T = IJSDOMC> {
    (url: string | URL, options?: IFromUrlOptions): Bluebird<T>;
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
