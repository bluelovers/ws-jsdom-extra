"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_proxy_1 = require("class-proxy");
const pack_1 = require("./pack");
const jsdom_1 = require("jsdom");
const __JSDOM = class_proxy_1.createClassProxy2(jsdom_1.JSDOM, {
    construct(target, args) {
        let jsdom = new target(...args);
        return pack_1.packJSDOM(jsdom);
    }
});
exports.JSDOM = __JSDOM;
exports.jsdom = new exports.JSDOM();
console.log(exports.JSDOM);
console.log(exports.jsdom);
const self = require("./class");
exports.default = self;
