"use strict";
/**
 * Created by user on 2018/4/29/029.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDOM_ResourceLoader = exports.BaseResourceLoader = exports.abstractResourceLoader = void 0;
let JSDOM_ResourceLoader = getJSDOMResourceLoader();
exports.JSDOM_ResourceLoader = JSDOM_ResourceLoader;
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
//# sourceMappingURL=resource-loader.js.map