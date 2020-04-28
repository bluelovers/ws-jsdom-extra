"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDOM_ResourceLoader = exports.getJSDOMResourceLoader = void 0;
function getJSDOMResourceLoader() {
    let _mod;
    try {
        _mod = require('jsdom/lib/jsdom/browser/resource-loader');
    }
    catch (e) {
        _mod = require('jsdom/lib/jsdom/browser/resources/resource-loader');
    }
    return _mod;
}
exports.getJSDOMResourceLoader = getJSDOMResourceLoader;
let JSDOM_ResourceLoader = getJSDOMResourceLoader();
exports.JSDOM_ResourceLoader = JSDOM_ResourceLoader;
exports.default = getJSDOMResourceLoader;
//# sourceMappingURL=resource-loader.js.map