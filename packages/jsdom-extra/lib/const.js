"use strict";
/**
 * Created by user on 2018/2/6/006.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RUN_SCRIPTS_OUTSIDE_ONLY = exports.RUN_SCRIPTS_DANGEROUSLY = exports.DEFAULT_HTML2 = exports.DEFAULT_HTML = exports.SYMBOL_PACKED = exports.SYMBOL_PACKED_OPTIONS = exports.SYMBOL_RAW = exports.DEFAULT_USER_AGENT = void 0;
// @ts-ignore
const package_json_1 = require("../package.json");
// @ts-ignore
exports.DEFAULT_USER_AGENT = `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${package_json_1.version}`;
exports.SYMBOL_RAW = Symbol.for('SYMBOL_RAW');
exports.SYMBOL_PACKED_OPTIONS = Symbol.for('SYMBOL_PACKED_OPTIONS');
exports.SYMBOL_PACKED = Symbol.for('SYMBOL_PACKED');
exports.DEFAULT_HTML = '<html><head></head><body></body></html>';
exports.DEFAULT_HTML2 = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';
exports.RUN_SCRIPTS_DANGEROUSLY = 'dangerously';
exports.RUN_SCRIPTS_OUTSIDE_ONLY = 'outside-only';
//export default exports as typeof import('./const');
//# sourceMappingURL=const.js.map