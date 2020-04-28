"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDOM_ResourceLoader = exports.BaseResourceLoader = exports.abstractResourceLoader = exports.getJSDOMResourceLoader = void 0;
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
class abstractResourceLoader {
}
exports.abstractResourceLoader = abstractResourceLoader;
class BaseResourceLoader extends abstractResourceLoader {
    constructor(options = {}) {
        super();
        if (options && options.fnResourceLoader) {
            Object.assign(this, options.fnResourceLoader);
        }
    }
    readFile(...argv) {
        return JSDOM_ResourceLoader.readFile(...argv);
    }
    wrapCookieJarForRequest(...argv) {
        return JSDOM_ResourceLoader.wrapCookieJarForRequest(...argv);
    }
    enqueue(...argv) {
        return JSDOM_ResourceLoader.enqueue(...argv);
    }
    download(...argv) {
        return JSDOM_ResourceLoader.download(...argv);
    }
    load(...argv) {
        return JSDOM_ResourceLoader.load(...argv);
    }
}
exports.BaseResourceLoader = BaseResourceLoader;
exports.default = BaseResourceLoader;
//# sourceMappingURL=index.js.map