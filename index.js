"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib/pack"));
var cookies_1 = require("./lib/cookies");
exports.LazyCookie = cookies_1.LazyCookie;
exports.LazyCookieJar = cookies_1.LazyCookieJar;
const pack_1 = require("./lib/pack");
exports.default = pack_1.JSDOM;
