"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseUserReferer = exports.getResponseUserAgent = exports.getResponseCookieJar = exports.getResponseUrlFromResponseWithConfig = exports.getResponseUrlFromResponse = exports.getResponseUrl = void 0;
function getResponseUrl(rp) {
    return getResponseUrlFromResponse(rp) || getResponseUrlFromResponseWithConfig(rp);
}
exports.getResponseUrl = getResponseUrl;
function getResponseUrlFromResponse(rp) {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = rp === null || rp === void 0 ? void 0 : rp.request) === null || _a === void 0 ? void 0 : _a.res) === null || _b === void 0 ? void 0 : _b.responseUrl) === null || _c === void 0 ? void 0 : _c.toString) === null || _d === void 0 ? void 0 : _d.call(_c);
}
exports.getResponseUrlFromResponse = getResponseUrlFromResponse;
function getResponseUrlFromResponseWithConfig(rp) {
    var _a, _b, _c;
    return (_c = (_b = (_a = rp === null || rp === void 0 ? void 0 : rp.config) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.toString) === null || _c === void 0 ? void 0 : _c.call(_b);
}
exports.getResponseUrlFromResponseWithConfig = getResponseUrlFromResponseWithConfig;
function getResponseCookieJar(rp) {
    var _a;
    // @ts-ignore
    let cookieJar = (_a = rp === null || rp === void 0 ? void 0 : rp.config) === null || _a === void 0 ? void 0 : _a.jar;
    if (typeof cookieJar === 'object') {
        return cookieJar;
    }
}
exports.getResponseCookieJar = getResponseCookieJar;
function getResponseUserAgent(rp) {
    var _a, _b;
    let headers = (_a = rp === null || rp === void 0 ? void 0 : rp.config) === null || _a === void 0 ? void 0 : _a.headers;
    return (_b = headers === null || headers === void 0 ? void 0 : headers['user-agent']) !== null && _b !== void 0 ? _b : headers === null || headers === void 0 ? void 0 : headers['User-Agent'];
}
exports.getResponseUserAgent = getResponseUserAgent;
function getResponseUserReferer(rp) {
    var _a, _b;
    let headers = (_a = rp === null || rp === void 0 ? void 0 : rp.config) === null || _a === void 0 ? void 0 : _a.headers;
    return (_b = headers === null || headers === void 0 ? void 0 : headers['referer']) !== null && _b !== void 0 ? _b : headers === null || headers === void 0 ? void 0 : headers['Referer'];
}
exports.getResponseUserReferer = getResponseUserReferer;
//# sourceMappingURL=util.js.map