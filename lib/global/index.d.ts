import { DOMWindow } from 'jsdom';
import { IConstructorOptions, IJSDOM, JSDOM } from '../pack';
export interface Global extends NodeJS.Global {
    navigator: {
        userAgent: string;
    };
    document: Document & {
        destroy();
    };
    window: DOMWindow;
}
export interface IOptions {
    JSDOM: typeof JSDOM;
    createJSDOM(): IJSDOM;
    createJSDOM: IJSDOM;
}
export interface IGlobalJSDOM extends JSDOM {
    destroy?(): any;
}
export declare function globalJsdom<T>(html?: any, options?: Partial<T & IConstructorOptions & IOptions>): globalJsdom.IReturn;
export declare function cleanup(global: any): void;
export declare namespace globalJsdom {
    interface IReturn {
        jsdom?: IGlobalJSDOM;
        window: DOMWindow;
        document: Document;
        cleanup: () => void;
        global?: Global;
    }
}
import * as self from './index';
export default self;
