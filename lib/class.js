"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../index"));
const class_proxy_1 = require("class-proxy");
const pack_1 = require("./pack");
const jsdom_1 = require("jsdom");
const __JSDOM = class_proxy_1.createClassProxy2(jsdom_1.JSDOM, {
    construct(target, args) {
        return pack_1.createJSDOM(...args);
    }
});
exports.JSDOM = __JSDOM;
exports.JSDOM.fromFile = pack_1.fromFile;
exports.JSDOM.fromURL = pack_1.fromURL;
exports.default = exports.JSDOM;
