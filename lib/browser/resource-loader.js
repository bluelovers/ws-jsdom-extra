"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JSDOM_ResourceLoader = require("jsdom/lib/jsdom/browser/resource-loader");
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
