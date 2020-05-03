"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosResponseToJSDOMOptions = void 0;
/**
 * Created by user on 2020/5/3.
 */
const util_1 = require("./util");
const virtualConsole_1 = require("../virtualConsole");
function axiosResponseToJSDOMOptions(opts) {
    let response = opts === null || opts === void 0 ? void 0 : opts.response;
    let jsdomOptions = (opts === null || opts === void 0 ? void 0 : opts.jsdomOptions) || {};
    jsdomOptions = {
        ...jsdomOptions,
        userAgent: jsdomOptions.userAgent || util_1.getResponseUserAgent(response),
        referrer: jsdomOptions.referrer || util_1.getResponseUserReferer(response),
        url: jsdomOptions.url || util_1.getResponseUrl(response),
        cookieJar: jsdomOptions.cookieJar || util_1.getResponseCookieJar(response),
        virtualConsole: virtualConsole_1.getVirtualConsole(jsdomOptions)
    };
    return jsdomOptions;
}
exports.axiosResponseToJSDOMOptions = axiosResponseToJSDOMOptions;
exports.default = axiosResponseToJSDOMOptions;
//# sourceMappingURL=index.js.map