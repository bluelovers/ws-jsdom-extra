"use strict";
/**
 * Created by user on 2018/2/19/019.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDOM = void 0;
__exportStar(require("../index"), exports);
// @ts-ignore
const class_proxy_1 = require("class-proxy");
const pack_1 = require("./pack");
const jsdom_1 = require("jsdom");
const __JSDOM = class_proxy_1.createClassProxy2(jsdom_1.JSDOM, {
    // @ts-ignore
    construct(target, args) {
        return pack_1.createJSDOM(...args);
    }
});
exports.JSDOM = __JSDOM;
exports.JSDOM.fromFile = pack_1.fromFile;
exports.JSDOM.fromURL = pack_1.fromURL;
exports.default = exports.JSDOM;
/*
export let jsdom = new JSDOM();

console.log(JSDOM);
console.log(jsdom);
*/
//# sourceMappingURL=class.js.map