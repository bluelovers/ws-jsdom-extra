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
const jsdom_1 = require("jsdom");
Object.defineProperty(exports, "CookieJar", { enumerable: true, get: function () { return jsdom_1.CookieJar; } });
//export interface IRequestCookieJar<T = toughCookie.CookieJar> extends IRequestCookieJarSource
//{
//	_jar: T,
//}
const cookies_1 = require("request/lib/cookies");
exports.RequestJar = cookies_1._RequestJar;
// @ts-ignore
//import { wrapCookieJarForRequest } from 'jsdom/lib/jsdom/browser/resource-loader';
const wrapCookieJarForRequest = _wrapCookieJarForRequest();
exports.wrapCookieJarForRequest = wrapCookieJarForRequest;
//export declare function wrapCookieJarForRequest(cookieJar: LazyCookieJar): IRequestCookieJar<LazyCookieJar>;
//export declare function wrapCookieJarForRequest(cookieJar: CookieJar): IRequestCookieJar<CookieJar>;
//export declare function wrapCookieJarForRequest<T>(cookieJar: T): IRequestCookieJar<T>;
function unwrapCookieJarFromRequest(requestJar) {
    return requestJar._jar;
}
exports.unwrapCookieJarFromRequest = unwrapCookieJarFromRequest;
//export default exports as typeof import('./request-jar');
function _wrapCookieJarForRequest() {
    try {
        return require("jsdom/lib/jsdom/living/helpers/wrap-cookie-jar-for-request");
    }
    catch (e) {
        return require("jsdom/jsdom/living/helpers/wrap-cookie-jar-for-request");
    }
}
//# sourceMappingURL=request-jar.js.map