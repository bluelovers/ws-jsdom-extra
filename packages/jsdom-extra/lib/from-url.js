"use strict";
/**
 * Created by user on 2018/2/6/006.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeFromURLOptions = exports.normalizeRequestOptions = exports.requestToJSDOM = exports.fromURL = exports.toughCookie = exports.URLImpl = exports.URL = exports.parseContentType = exports.wrapCookieJarForRequest = exports.RequestJar = exports.CookieJar = exports.LazyCookie = exports.LazyCookieJar = void 0;
const jsdom_1 = require("jsdom");
Object.defineProperty(exports, "toughCookie", { enumerable: true, get: function () { return jsdom_1.toughCookie; } });
const deepmerge_plus_1 = __importDefault(require("deepmerge-plus"));
const pack_1 = require("./pack");
const jsdom_url_1 = require("jsdom-url");
Object.defineProperty(exports, "URL", { enumerable: true, get: function () { return jsdom_url_1.URL; } });
Object.defineProperty(exports, "URLImpl", { enumerable: true, get: function () { return jsdom_url_1.URLImpl; } });
const request_1 = __importDefault(require("./util/request"));
const content_type_parser_1 = __importDefault(require("content-type-parser"));
exports.parseContentType = content_type_parser_1.default;
const is_plain_object_1 = __importDefault(require("is-plain-object"));
const lazy_cookies_1 = require("lazy-cookies");
Object.defineProperty(exports, "LazyCookie", { enumerable: true, get: function () { return lazy_cookies_1.LazyCookie; } });
const cookies_1 = require("./cookies");
Object.defineProperty(exports, "LazyCookieJar", { enumerable: true, get: function () { return cookies_1.LazyCookieJar; } });
const cookies_2 = require("./cookies");
Object.defineProperty(exports, "CookieJar", { enumerable: true, get: function () { return cookies_2.CookieJar; } });
Object.defineProperty(exports, "RequestJar", { enumerable: true, get: function () { return cookies_2.RequestJar; } });
Object.defineProperty(exports, "wrapCookieJarForRequest", { enumerable: true, get: function () { return cookies_2.wrapCookieJarForRequest; } });
var const_1 = require("./const");
Object.defineProperty(exports, "DEFAULT_USER_AGENT", { enumerable: true, get: function () { return const_1.DEFAULT_USER_AGENT; } });
const const_2 = require("./const");
const html_1 = require("./html");
const bluebird_1 = require("./util/bluebird");
function fromURL(url, options) {
    return bluebird_1.Bluebird.resolve().then(function () {
        const parsedURL = new jsdom_url_1.URL(url);
        url = parsedURL.href;
        let opts = {};
        options = pack_1.packOptions(options, function (options) {
            opts = options;
        });
        options = normalizeFromURLOptions(options);
        let requestOptions = normalizeRequestOptions(options);
        let _request = options.libRequestPromise || request_1.default;
        return _request(url, requestOptions)
            .then((res) => {
            // @ts-ignore
            return requestToJSDOM(res, parsedURL, options, requestOptions);
        })
            // @ts-ignore
            .then(function (jsdom) {
            if (!pack_1.isPackedJSDOM(jsdom)) {
                pack_1.packJSDOM(jsdom);
            }
            jsdom._options.ConstructorOptions = opts;
            jsdom._options.options = options;
            jsdom._options.requestOptions = requestOptions;
            return jsdom;
        });
    });
}
exports.fromURL = fromURL;
function requestToJSDOM(res, parsedURL, options, requestOptions) {
    if (typeof parsedURL == 'string') {
        // @ts-ignore
        parsedURL = new jsdom_url_1.URL(parsedURL);
    }
    let opts = {};
    options = pack_1.packOptions(options, function (options) {
        opts = options;
    });
    options = normalizeFromURLOptions(options);
    const parsedContentType = content_type_parser_1.default(res.headers["content-type"]);
    const transportLayerEncodingLabel = parsedContentType && parsedContentType.get("charset");
    options = Object.assign(options, {
        // @ts-ignore
        url: res.request.href + parsedURL.hash,
        contentType: res.headers["content-type"],
        referrer: res.request.getHeader("referer"),
    });
    let body = html_1.normalizeHTML(res.body, transportLayerEncodingLabel).html;
    if (options.minifyHTML) {
        body = html_1.minifyHTML(body);
    }
    let jsdom = new jsdom_1.JSDOM(body, options);
    jsdom[const_2.SYMBOL_RAW] = jsdom[const_2.SYMBOL_RAW] || {};
    jsdom[const_2.SYMBOL_RAW].options = jsdom[const_2.SYMBOL_RAW].options || {};
    jsdom[const_2.SYMBOL_RAW].options.options = jsdom[const_2.SYMBOL_RAW].options.options || options;
    jsdom[const_2.SYMBOL_RAW].options.ConstructorOptions = jsdom[const_2.SYMBOL_RAW].options.ConstructorOptions || opts;
    jsdom[const_2.SYMBOL_RAW].options.Response = res;
    jsdom[const_2.SYMBOL_RAW].options.body = body;
    if (requestOptions) {
        jsdom[const_2.SYMBOL_RAW].options.requestOptions = jsdom[const_2.SYMBOL_RAW].options.requestOptions || requestOptions;
    }
    // @ts-ignore
    return jsdom;
}
exports.requestToJSDOM = requestToJSDOM;
function normalizeRequestOptions(options, _requestOptions) {
    // @ts-ignore
    let requestOptions = {
        resolveWithFullResponse: true,
        encoding: null,
        gzip: true,
        headers: {
            "User-Agent": options.userAgent || const_2.DEFAULT_USER_AGENT,
            // @ts-ignore
            Referer: options.referrer,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en"
        },
        // @ts-ignore
        jar: cookies_2.wrapCookieJarForRequest(options.cookieJar)
    };
    if (options.requestOptions || _requestOptions) {
        requestOptions = deepmerge_plus_1.default.all([
            requestOptions,
            options.requestOptions || {},
            _requestOptions || {},
            {
                encoding: null,
            },
        ], {
            //keyValueOrMode: true,
            isMergeableObject(value, isMergeable) {
                let bool = isMergeable(value);
                if (bool && typeof value == 'object' && !Array.isArray(value)) {
                    // @ts-ignore
                    bool = is_plain_object_1.default(value);
                }
                return bool;
            },
        });
    }
    return requestOptions;
}
exports.normalizeRequestOptions = normalizeRequestOptions;
function normalizeFromURLOptions(options) {
    // Normalization of options which must be done before the rest of the fromURL code can use them, because they are
    // given to request()
    const normalized = Object.assign({}, options);
    if (options.userAgent === undefined) {
        // @ts-ignore
        normalized.userAgent = const_2.DEFAULT_USER_AGENT;
    }
    if (options.referrer !== undefined) {
        // @ts-ignore
        normalized.referrer = (new jsdom_url_1.URL(options.referrer)).href;
    }
    if (options.cookieJar === undefined) {
        // @ts-ignore
        normalized.cookieJar = new cookies_1.LazyCookieJar();
    }
    // @ts-ignore
    delete normalized.url;
    // @ts-ignore
    delete normalized.contentType;
    return normalized;
    // All other options don't need to be processed yet, and can be taken care of in the normal course of things when
    // `fromURL` calls `new JSDOM(html, options)`.
}
exports.normalizeFromURLOptions = normalizeFromURLOptions;
//export default exports as typeof import('./from-url');
//# sourceMappingURL=from-url.js.map