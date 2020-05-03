"use strict";
/**
 * Created by user on 2020/5/3.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapCookieJarFromRequestJar = exports.wrapCookieJarForRequest = exports.CookieJar = void 0;
const jsdom_1 = require("./jsdom");
Object.defineProperty(exports, "CookieJar", { enumerable: true, get: function () { return jsdom_1.CookieJar; } });
const wrapCookieJarForRequest_1 = require("./lib/wrapCookieJarForRequest");
Object.defineProperty(exports, "wrapCookieJarForRequest", { enumerable: true, get: function () { return wrapCookieJarForRequest_1.wrapCookieJarForRequest; } });
const unwrapCookieJarFromRequestJar_1 = require("./lib/unwrapCookieJarFromRequestJar");
Object.defineProperty(exports, "unwrapCookieJarFromRequestJar", { enumerable: true, get: function () { return unwrapCookieJarFromRequestJar_1.unwrapCookieJarFromRequestJar; } });
exports.default = jsdom_1.CookieJar;
//# sourceMappingURL=index.js.map