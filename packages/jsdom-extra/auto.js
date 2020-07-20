"use strict";
/**
 * Created by user on 2018/2/6/006.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDOM = exports.fromFile = exports.fromURL = exports.URL = void 0;
__exportStar(require("jsdom"), exports);
const jsdom_1 = require("jsdom");
const jsdom_url_1 = require("jsdom-url");
Object.defineProperty(exports, "URL", { enumerable: true, get: function () { return jsdom_url_1.URL; } });
const pack_1 = require("./lib/pack");
Object.defineProperty(exports, "fromURL", { enumerable: true, get: function () { return pack_1.fromURL; } });
Object.defineProperty(exports, "fromFile", { enumerable: true, get: function () { return pack_1.fromFile; } });
pack_1.auto(jsdom_1.JSDOM);
class JSDOM extends jsdom_1.JSDOM {
    constructor(html, options = {}) {
        let opts = {};
        pack_1.packOptions(options, function (options) {
            opts = options;
        });
        super(html, options);
        let jsdom;
        // @ts-ignore
        jsdom = this;
        jsdom._options.ConstructorOptions = opts;
        jsdom._options.options = options;
    }
}
exports.JSDOM = JSDOM;
// @ts-ignore
JSDOM.fromFile = pack_1.fromFile;
// @ts-ignore
JSDOM.fromURL = pack_1.fromURL;
exports.default = JSDOM;
/*
let jsdom = new JSDOM();

console.log(jsdom.url);

//pack(jsdom);

console.log(jsdom.$(':root'));

console.log(jsdom._options);
*/
//# sourceMappingURL=auto.js.map