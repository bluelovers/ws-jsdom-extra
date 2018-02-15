"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
exports.toughCookie = jsdom_1.toughCookie;
const deepmerge = require("deepmerge-plus");
const pack_1 = require("./pack");
exports.URL = pack_1.URL;
exports.URLImpl = pack_1.URLImpl;
const index_1 = require("./index");
const parseContentType = require("content-type-parser");
exports.parseContentType = parseContentType;
const isPlainObject = require("is-plain-object");
const sniffHTMLEncoding = require("html-encoding-sniffer");
const whatwgEncoding = require("whatwg-encoding");
const cookies_1 = require("./cookies");
exports.LazyCookieJar = cookies_1.LazyCookieJar;
exports.LazyCookie = cookies_1.LazyCookie;
const cookies_2 = require("./cookies");
exports.CookieJar = cookies_2.CookieJar;
exports.RequestJar = cookies_2.RequestJar;
exports.wrapCookieJarForRequest = cookies_2.wrapCookieJarForRequest;
var const_1 = require("./const");
exports.DEFAULT_USER_AGENT = const_1.DEFAULT_USER_AGENT;
const const_2 = require("./const");
function fromURL(url, options) {
    return index_1.Promise.resolve().then(function () {
        const parsedURL = new pack_1.URL(url);
        url = parsedURL.href;
        let opts = {};
        options = pack_1.packOptions(options, function (options) {
            opts = options;
        });
        options = normalizeFromURLOptions(options);
        let requestOptions = normalizeRequestOptions(options);
        return index_1.request(url, requestOptions)
            .then((res) => {
            return requestToJSDOM(res, parsedURL, options, requestOptions);
        })
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
        parsedURL = new pack_1.URL(parsedURL);
    }
    let opts = {};
    options = pack_1.packOptions(options, function (options) {
        opts = options;
    });
    options = normalizeFromURLOptions(options);
    const parsedContentType = parseContentType(res.headers["content-type"]);
    const transportLayerEncodingLabel = parsedContentType && parsedContentType.get("charset");
    options = Object.assign(options, {
        url: res.request.href + parsedURL.hash,
        contentType: res.headers["content-type"],
        referrer: res.request.getHeader("referer"),
    });
    let body = normalizeHTML(res.body, transportLayerEncodingLabel).html;
    let jsdom = new jsdom_1.JSDOM(body, options);
    jsdom[const_2.SYMBOL_RAW] = jsdom[const_2.SYMBOL_RAW] || {};
    jsdom[const_2.SYMBOL_RAW].options = jsdom[const_2.SYMBOL_RAW].options || {};
    jsdom[const_2.SYMBOL_RAW].options.options = jsdom[const_2.SYMBOL_RAW].options.options || options;
    jsdom[const_2.SYMBOL_RAW].options.ConstructorOptions = jsdom[const_2.SYMBOL_RAW].options.ConstructorOptions || opts;
    jsdom[const_2.SYMBOL_RAW].options.Response = res;
    if (requestOptions) {
        jsdom[const_2.SYMBOL_RAW].options.requestOptions = jsdom[const_2.SYMBOL_RAW].options.requestOptions || requestOptions;
    }
    return jsdom;
}
exports.requestToJSDOM = requestToJSDOM;
function normalizeRequestOptions(options, _requestOptions) {
    let requestOptions = {
        resolveWithFullResponse: true,
        encoding: null,
        gzip: true,
        headers: {
            "User-Agent": options.userAgent || const_2.DEFAULT_USER_AGENT,
            Referer: options.referrer,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en"
        },
        jar: cookies_2.wrapCookieJarForRequest(options.cookieJar)
    };
    if (options.requestOptions || _requestOptions) {
        requestOptions = deepmerge.all([
            requestOptions,
            options.requestOptions || {},
            _requestOptions || {},
            {
                encoding: null,
            },
        ], {
            isMergeableObject(value, isMergeable) {
                let bool = isMergeable(value);
                if (bool && typeof value == 'object' && !Array.isArray(value)) {
                    bool = isPlainObject(value);
                }
                return bool;
            },
        });
    }
    return requestOptions;
}
exports.normalizeRequestOptions = normalizeRequestOptions;
function normalizeFromURLOptions(options) {
    const normalized = Object.assign({}, options);
    if (options.userAgent === undefined) {
        normalized.userAgent = const_2.DEFAULT_USER_AGENT;
    }
    if (options.referrer !== undefined) {
        normalized.referrer = (new pack_1.URL(options.referrer)).href;
    }
    if (options.cookieJar === undefined) {
        normalized.cookieJar = new cookies_1.LazyCookieJar();
    }
    delete normalized.url;
    delete normalized.contentType;
    return normalized;
}
exports.normalizeFromURLOptions = normalizeFromURLOptions;
function normalizeHTML(html = '', transportLayerEncodingLabel) {
    let encoding = "UTF-8";
    if (ArrayBuffer.isView(html)) {
        html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
    }
    else if (html instanceof ArrayBuffer) {
        html = Buffer.from(html);
    }
    if (Buffer.isBuffer(html)) {
        encoding = sniffHTMLEncoding(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
        html = whatwgEncoding.decode(html, encoding);
    }
    else {
        html = String(html);
    }
    return { html, encoding };
}
const self = require("./from-url");
exports.default = self;
