/**
 * Created by user on 2018/2/7/007.
 *
 * jsdom-global
 * global-jsdom
 */
/// <reference types="node" />
/// <reference types="mocha" />
export declare const KEYS: string[];
import { DOMWindow } from 'jsdom';
import { IConstructorOptions, IJSDOM, JSDOM } from '../pack';
export declare interface Global extends NodeJS.Global {
    navigator: {
        userAgent: string;
    };
    document: IGlobalDocument;
    window: IGlobalDOMWindow;
    $jsdom: IGlobalJSDOM;
}
export declare type IGlobalDOMWindow = DOMWindow & {
    XMLHttpRequest?: XMLHttpRequest;
};
export declare type IGlobalDocument = Document & {
    destroy?(): any;
};
export declare var global: Global;
export interface IOptions {
    /**
     * jsdom class that can call with new JSDOM
     */
    JSDOM: typeof JSDOM;
    /**
     * allow use exists jsdom or create function
     * @returns {IJSDOM}
     */
    createJSDOM: IJSDOM | {
        (...argv: any[]): IJSDOM;
    };
}
export declare type IGlobalJSDOM = IJSDOM;
export declare function globalJsdom<T>(html?: any, options?: Partial<T & IConstructorOptions & IOptions>): globalJsdom.IReturn;
export declare function cleanup(global: any): void;
export declare namespace globalJsdom {
    interface IReturn {
        jsdom?: IGlobalJSDOM;
        window: IGlobalDOMWindow;
        document: IGlobalDocument;
        cleanup: () => void;
        global?: Global;
        XMLHttpRequest?: XMLHttpRequest;
    }
}
