"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
exports.JSDOM = jsdom_1.JSDOM;
exports.VirtualConsole = jsdom_1.VirtualConsole;
exports.CookieJar = jsdom_1.CookieJar;
exports.toughCookie = jsdom_1.toughCookie;
const jsdom_url_1 = require("jsdom-url");
const query_1 = require("./query");
exports.SYMBOL_RAW = Symbol.for('raw_query');
exports.JSDOM_PROTOTYPE_COPY = Object.assign({}, jsdom_1.JSDOM.prototype);
function auto() {
    packJSDOM(jsdom_1.JSDOM.prototype);
    return jsdom_1.JSDOM;
}
exports.auto = auto;
function createJSDOM(html, options = {}) {
    let opts = {};
    packOptions(options, function (options) {
        opts = options;
    });
    let jsdom = new jsdom_1.JSDOM(html, options);
    if (!isPacked(jsdom)) {
        packJSDOM(jsdom);
    }
    jsdom._options.ConstructorOptions = opts;
    jsdom._options.options = options;
    return jsdom;
}
exports.createJSDOM = createJSDOM;
function packOptions(options = {}, cb) {
    let old_beforeParse;
    if (options.beforeParse) {
        old_beforeParse = options.beforeParse;
    }
    options.beforeParse = function (window, jsdom) {
        let opts = {};
        if (old_beforeParse) {
            old_beforeParse(window, jsdom);
        }
        opts = Object.assign({}, this);
        if (jsdom) {
            jsdom[exports.SYMBOL_RAW].options.ConstructorOptions = opts;
        }
        cb && cb(opts, window, jsdom);
    };
    return options;
}
exports.packOptions = packOptions;
function isPacked(jsdom) {
    return (exports.SYMBOL_RAW in jsdom);
}
exports.isPacked = isPacked;
function packJSDOM(jsdom) {
    if (isPacked(jsdom)) {
        return jsdom;
    }
    function chk(who) {
        if (who instanceof jsdom_1.JSDOM) {
            return;
        }
        throw new Error(`object not a instance of JSDOM`);
    }
    Object.defineProperties(jsdom, {
        [exports.SYMBOL_RAW]: {
            value: {
                options: {},
            },
        },
        _options: {
            get() {
                chk(this);
                return this[exports.SYMBOL_RAW].options;
            },
            set(val = {}) {
                this[exports.SYMBOL_RAW].options = val;
            }
        },
        document: {
            get() {
                chk(this);
                return this.window.document;
            },
        },
        url: {
            get() {
                chk(this);
                if (!this[exports.SYMBOL_RAW].url || this[exports.SYMBOL_RAW].window !== this.window || this[exports.SYMBOL_RAW].window.location.href !== this.window.location.href) {
                    this[exports.SYMBOL_RAW].window = this.window;
                    this[exports.SYMBOL_RAW].url = new jsdom_url_1.URL(this.window.location.href);
                }
                return this[exports.SYMBOL_RAW].url;
            }
        },
        $: {
            get() {
                chk(this);
                if (!this[exports.SYMBOL_RAW].$ || this[exports.SYMBOL_RAW].window !== this.window) {
                    this[exports.SYMBOL_RAW].window = this.window;
                    this[exports.SYMBOL_RAW].$ = query_1.createQuery(this, this[exports.SYMBOL_RAW].options);
                }
                return this[exports.SYMBOL_RAW].$;
            },
        },
        then: {
            get() {
                return function (cb) {
                    return cb(this);
                };
            }
        },
    });
    return jsdom;
}
exports.packJSDOM = packJSDOM;
const self = require("./pack");
exports.default = self;
