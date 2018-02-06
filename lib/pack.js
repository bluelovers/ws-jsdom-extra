"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
exports.JSDOM = jsdom_1.JSDOM;
exports.VirtualConsole = jsdom_1.VirtualConsole;
exports.CookieJar = jsdom_1.CookieJar;
exports.toughCookie = jsdom_1.toughCookie;
const jsdom_url_1 = require("jsdom-url");
exports.URL = jsdom_url_1.URL;
const query_1 = require("./query");
var from_url_1 = require("./from-url");
exports.fromURL = from_url_1.fromURL;
const index_1 = require("./index");
exports.Promise = index_1.Promise;
__export(require("./const"));
const const_1 = require("./const");
exports.JSDOM_PROTOTYPE_COPY = Object.assign({}, jsdom_1.JSDOM.prototype);
function auto() {
    packJSDOM(jsdom_1.JSDOM.prototype);
    return jsdom_1.JSDOM;
}
exports.auto = auto;
function createJSDOM(html, options = {}) {
    let opts = {};
    options = packOptions(options, function (options) {
        opts = options;
    });
    let jsdom = new jsdom_1.JSDOM(html, options);
    if (!isPackedJSDOM(jsdom)) {
        packJSDOM(jsdom);
    }
    jsdom._options.ConstructorOptions = opts;
    jsdom._options.options = options;
    return jsdom;
}
exports.createJSDOM = createJSDOM;
function asyncJSDOM(html, options = {}) {
    return index_1.Promise.resolve().then(function () {
        return createJSDOM(html, options);
    });
}
exports.asyncJSDOM = asyncJSDOM;
function fromFile(url, options) {
    return index_1.Promise.resolve().then(function () {
        let opts = {};
        options = packOptions(options, function (options) {
            opts = options;
        });
        return jsdom_1.JSDOM.fromFile(url, options)
            .then(function (jsdom) {
            if (!isPackedJSDOM(jsdom)) {
                packJSDOM(jsdom);
            }
            jsdom._options.ConstructorOptions = opts;
            jsdom._options.options = options;
            return jsdom;
        });
    });
}
exports.fromFile = fromFile;
function packOptions(options = {}, cb) {
    if (options.url !== undefined) {
        options.url = (new jsdom_url_1.URL(options.url)).href;
    }
    if (options.referrer !== undefined) {
        options.referrer = (new jsdom_url_1.URL(options.referrer)).href;
    }
    if (!options.beforeParse || !options.beforeParse[const_1.default.SYMBOL_PACKED_OPTIONS]) {
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
                jsdom[const_1.SYMBOL_RAW] = jsdom[const_1.SYMBOL_RAW] || {};
                jsdom[const_1.SYMBOL_RAW].options = jsdom[const_1.SYMBOL_RAW].options || {};
                jsdom[const_1.SYMBOL_RAW].options.ConstructorOptions = opts;
            }
            let cbs;
            cbs = (opts.beforeParse && opts.beforeParse[const_1.default.SYMBOL_PACKED_OPTIONS])
                .concat(options.beforeParse[const_1.default.SYMBOL_PACKED_OPTIONS]);
            index_1.array_unique(cbs)
                .forEach(function (cb) {
                cb(opts, window, jsdom);
            });
        };
        options.beforeParse[const_1.default.SYMBOL_PACKED_OPTIONS] = [] || options.beforeParse[const_1.default.SYMBOL_PACKED_OPTIONS];
    }
    cb && options.beforeParse[const_1.default.SYMBOL_PACKED_OPTIONS].push(cb);
    return options;
}
exports.packOptions = packOptions;
function isPackedJSDOM(jsdom) {
    return (const_1.default.SYMBOL_PACKED in jsdom);
}
exports.isPackedJSDOM = isPackedJSDOM;
function packJSDOM(jsdom) {
    if (isPackedJSDOM(jsdom)) {
        return jsdom;
    }
    function chk(who) {
        if (who instanceof jsdom_1.JSDOM) {
            return;
        }
        throw new Error(`object not a instance of JSDOM`);
    }
    Object.defineProperties(jsdom, {
        [const_1.default.SYMBOL_PACKED]: {
            get() {
                return true;
            }
        },
        [const_1.SYMBOL_RAW]: {
            value: Object.assign({
                options: {},
            }, jsdom[const_1.SYMBOL_RAW]),
        },
        _options: {
            get() {
                chk(this);
                return this[const_1.SYMBOL_RAW].options;
            },
            set(val = {}) {
                this[const_1.SYMBOL_RAW].options = val;
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
                if (!this[const_1.SYMBOL_RAW].url || this[const_1.SYMBOL_RAW].window !== this.window || this[const_1.SYMBOL_RAW].window.location.href !== this.window.location.href) {
                    this[const_1.SYMBOL_RAW].window = this.window;
                    this[const_1.SYMBOL_RAW].url = new jsdom_url_1.URL(this.window.location.href);
                }
                return this[const_1.SYMBOL_RAW].url;
            }
        },
        $: {
            get() {
                chk(this);
                if (!this[const_1.SYMBOL_RAW].$ || this[const_1.SYMBOL_RAW].window !== this.window) {
                    this[const_1.SYMBOL_RAW].window = this.window;
                    this[const_1.SYMBOL_RAW].$ = query_1.createQuery(this, this[const_1.SYMBOL_RAW].options);
                }
                return this[const_1.SYMBOL_RAW].$;
            },
        },
        fakeThen: {
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
