"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResourceLoader = exports.abstractResourceLoader = void 0;
/**
 * Created by user on 2020/4/29.
 */
const resource_loader_1 = require("./resource-loader");
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
        return resource_loader_1.JSDOM_ResourceLoader.readFile(...argv);
    }
    wrapCookieJarForRequest(...argv) {
        return resource_loader_1.JSDOM_ResourceLoader.wrapCookieJarForRequest(...argv);
    }
    enqueue(...argv) {
        return resource_loader_1.JSDOM_ResourceLoader.enqueue(...argv);
    }
    download(...argv) {
        return resource_loader_1.JSDOM_ResourceLoader.download(...argv);
    }
    load(...argv) {
        return resource_loader_1.JSDOM_ResourceLoader.load(...argv);
    }
}
exports.BaseResourceLoader = BaseResourceLoader;
exports.default = BaseResourceLoader;
//# sourceMappingURL=index.js.map