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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packJSDOM = exports.isPackedJSDOM = exports.packOptions = exports.fromFile = exports.asyncJSDOM = exports.createJSDOM = exports.auto = exports.JSDOM_PROTOTYPE_COPY = exports.toughCookie = exports.CookieJar = exports.VirtualConsole = exports.JSDOM = exports.URLImpl = exports.URL = void 0;
/// <reference types="jquery" />
const jsdom_1 = require("jsdom");
Object.defineProperty(exports, "JSDOM", { enumerable: true, get: function () { return jsdom_1.JSDOM; } });
Object.defineProperty(exports, "VirtualConsole", { enumerable: true, get: function () { return jsdom_1.VirtualConsole; } });
Object.defineProperty(exports, "CookieJar", { enumerable: true, get: function () { return jsdom_1.CookieJar; } });
Object.defineProperty(exports, "toughCookie", { enumerable: true, get: function () { return jsdom_1.toughCookie; } });
const jsdom_url_1 = require("jsdom-url");
Object.defineProperty(exports, "URL", { enumerable: true, get: function () { return jsdom_url_1.URL; } });
Object.defineProperty(exports, "URLImpl", { enumerable: true, get: function () { return jsdom_url_1.URLImpl; } });
const query_1 = require("./query");
var from_url_1 = require("./from-url");
Object.defineProperty(exports, "fromURL", { enumerable: true, get: function () { return from_url_1.fromURL; } });
const array_hyper_unique_1 = require("array-hyper-unique");
__exportStar(require("./const"), exports);
const const_1 = require("./const");
const CONSTS = __importStar(require("./const"));
const bluebird_1 = require("./util/bluebird");
const minify_1 = require("@jsdom-extra/html-util/minify");
const normalize_1 = require("@jsdom-extra/html-util/normalize");
exports.JSDOM_PROTOTYPE_COPY = Object.assign({}, jsdom_1.JSDOM.prototype);
function auto(JSDOM) {
    packJSDOM(JSDOM.prototype);
    return JSDOM;
}
exports.auto = auto;
function createJSDOM(html, options = {}) {
    let opts = {};
    options = packOptions(options, function (options) {
        opts = options;
    });
    if (options.minifyHTML) {
        html = normalize_1.normalizeHTML(html).html;
        html = minify_1.minifyHTML(html);
    }
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
    return bluebird_1.Bluebird.resolve().then(function () {
        return createJSDOM(html, options);
    });
}
exports.asyncJSDOM = asyncJSDOM;
function fromFile(url, options) {
    return bluebird_1.Bluebird.resolve().then(function () {
        let opts = {};
        options = packOptions(options, function (options) {
            opts = options;
        });
        return jsdom_1.JSDOM.fromFile(url, options)
            // @ts-ignore
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
        // @ts-ignore
        options.url = (new jsdom_url_1.URL(options.url)).href;
    }
    if (options.referrer !== undefined) {
        // @ts-ignore
        options.referrer = (new jsdom_url_1.URL(options.referrer)).href;
    }
    if (!options.beforeParse || !options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS]) {
        let old_beforeParse;
        if (options.beforeParse) {
            old_beforeParse = options.beforeParse;
        }
        // @ts-ignore
        options.beforeParse = function (window, jsdom) {
            let opts = {};
            if (old_beforeParse) {
                old_beforeParse(window, jsdom);
            }
            //console.log(this);
            opts = Object.assign({}, this);
            if (jsdom) {
                jsdom[const_1.SYMBOL_RAW] = jsdom[const_1.SYMBOL_RAW] || {};
                jsdom[const_1.SYMBOL_RAW].options = jsdom[const_1.SYMBOL_RAW].options || {};
                jsdom[const_1.SYMBOL_RAW].options.ConstructorOptions = opts;
            }
            let cbs;
            cbs = (opts.beforeParse && opts.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS])
                .concat(options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS]);
            //cb && cb(opts, window, jsdom);
            array_hyper_unique_1.array_unique(cbs)
                .forEach(function (cb) {
                cb(opts, window, jsdom);
            });
        };
        options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS] = [] || options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS];
    }
    if (cb) {
        options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS].push(cb);
        options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS] = array_hyper_unique_1.array_unique(options.beforeParse[CONSTS.SYMBOL_PACKED_OPTIONS]);
    }
    if (options.virtualConsole === false) {
        // @ts-ignore
        options.virtualConsole = new jsdom_1.VirtualConsole();
    }
    return options;
}
exports.packOptions = packOptions;
function isPackedJSDOM(jsdom) {
    //return (SYMBOL_RAW in jsdom);
    return (CONSTS.SYMBOL_PACKED in jsdom);
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
        [CONSTS.SYMBOL_PACKED]: {
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
                    // @ts-ignore
                    this[const_1.SYMBOL_RAW].$ = query_1.createQuery(this, this[const_1.SYMBOL_RAW].options.options);
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
//export default exports as typeof import('./pack');
//# sourceMappingURL=pack.js.map