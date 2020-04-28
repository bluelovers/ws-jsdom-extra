/**
 * Created by user on 2018/2/6/006.
 */

// @ts-ignore
import { version as packageVersion } from '../package.json';
// @ts-ignore
export const DEFAULT_USER_AGENT = `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${packageVersion}`;

export const SYMBOL_RAW = Symbol.for('SYMBOL_RAW');
export const SYMBOL_PACKED_OPTIONS = Symbol.for('SYMBOL_PACKED_OPTIONS');
export const SYMBOL_PACKED = Symbol.for('SYMBOL_PACKED');

export const DEFAULT_HTML = '<html><head></head><body></body></html>';
export const DEFAULT_HTML2 = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';

export const RUN_SCRIPTS_DANGEROUSLY = 'dangerously';
export const RUN_SCRIPTS_OUTSIDE_ONLY = 'outside-only';

//export default exports as typeof import('./const');
