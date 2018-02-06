"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("jsdom"));
const jsdom_1 = require("jsdom");
const jsdom_url_1 = require("jsdom-url");
exports.URL = jsdom_url_1.URL;
const pack_1 = require("./lib/pack");
pack_1.packJSDOM(jsdom_1.JSDOM.prototype);
class JSDOM extends jsdom_1.JSDOM {
    constructor(html, options = {}) {
        let opts = {};
        pack_1.packOptions(options, function (options) {
            opts = options;
        });
        super(html, options);
        let jsdom;
        jsdom = this;
        jsdom._options.ConstructorOptions = opts;
        jsdom._options.options = options;
    }
}
exports.JSDOM = JSDOM;
exports.default = JSDOM;
