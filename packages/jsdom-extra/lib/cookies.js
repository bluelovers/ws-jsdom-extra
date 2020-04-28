"use strict";
/**
 * Created by user on 2018/2/7/007.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyCookieJar = exports.LazyCookie = exports.wrapCookieJarForRequest = exports.RequestJar = exports.CookieJar = exports.toughCookie = void 0;
const tough_cookie_1 = __importDefault(require("tough-cookie"));
exports.toughCookie = tough_cookie_1.default;
const lazy_cookies_1 = require("lazy-cookies");
Object.defineProperty(exports, "LazyCookie", { enumerable: true, get: function () { return lazy_cookies_1.LazyCookie; } });
const request_jar_1 = require("./cookies/request-jar");
Object.defineProperty(exports, "CookieJar", { enumerable: true, get: function () { return request_jar_1.CookieJar; } });
Object.defineProperty(exports, "RequestJar", { enumerable: true, get: function () { return request_jar_1.RequestJar; } });
Object.defineProperty(exports, "wrapCookieJarForRequest", { enumerable: true, get: function () { return request_jar_1.wrapCookieJarForRequest; } });
class LazyCookieJar extends lazy_cookies_1.LazyCookieJar {
    static create(store, options = {}, data = {}, url) {
        return new this(store, options, data, url);
    }
    wrapForRequest() {
        return request_jar_1.wrapCookieJarForRequest(this);
    }
    static unwrapFromRequest(jar) {
        return jar._jar;
    }
}
exports.LazyCookieJar = LazyCookieJar;
//export default exports as typeof import('./cookies');
//# sourceMappingURL=cookies.js.map