"use strict";
/**
 * Created by user on 2018/2/15/015.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCookieJarForRequest = exports.unwrapCookieJarFromRequest = exports.RequestJar = exports.CookieJar = exports.toughCookie = void 0;
const tough_cookie_1 = __importDefault(require("tough-cookie"));
exports.toughCookie = tough_cookie_1.default;
const cookie_1 = require("@jsdom-extra/cookie");
Object.defineProperty(exports, "unwrapCookieJarFromRequest", { enumerable: true, get: function () { return cookie_1.unwrapCookieJarFromRequestJar; } });
Object.defineProperty(exports, "wrapCookieJarForRequest", { enumerable: true, get: function () { return cookie_1.wrapCookieJarForRequest; } });
const jsdom_1 = require("jsdom");
Object.defineProperty(exports, "CookieJar", { enumerable: true, get: function () { return jsdom_1.CookieJar; } });
//export interface IRequestCookieJar<T = toughCookie.CookieJar> extends IRequestCookieJarSource
//{
//	_jar: T,
//}
const cookies_1 = require("request/lib/cookies");
exports.RequestJar = cookies_1._RequestJar;
//export default exports as typeof import('./request-jar');
//# sourceMappingURL=request-jar.js.map