/// <reference types="jquery" />
import { JSDOM } from 'jsdom';
export declare function wrapQuery<T = Partial<JQueryStatic>, O = any, J = JSDOM>(jsdom: J, options?: O, createQuery?: (jsdom: J, options?: O) => T): T;
export default wrapQuery;
