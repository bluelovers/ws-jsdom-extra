"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
exports.CookieJar = jsdom_1.CookieJar;
exports.toughCookie = jsdom_1.toughCookie;
const deepmerge = require("deepmerge-plus");
const resource_loader_1 = require("jsdom/lib/jsdom/browser/resource-loader");
exports.wrapCookieJarForRequest = resource_loader_1.wrapCookieJarForRequest;
const pack_1 = require("./pack");
const index_1 = require("./index");
const parseContentType = require("content-type-parser");
exports.parseContentType = parseContentType;
const isPlainObject = require("is-plain-object");
const sniffHTMLEncoding = require("html-encoding-sniffer");
const whatwgEncoding = require("whatwg-encoding");
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
        return index_1.request(url, requestOptions).then(res => {
            return requestToJSDOM(res, parsedURL, options);
        })
            .then(function (jsdom) {
            if (!pack_1.isPackedJSDOM(jsdom)) {
                pack_1.packJSDOM(jsdom);
            }
            jsdom._options.ConstructorOptions = opts;
            jsdom._options.options = options;
            return jsdom;
        });
    });
}
exports.fromURL = fromURL;
function requestToJSDOM(res, parsedURL, options) {
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
    jsdom[const_2.SYMBOL_RAW].options.ConstructorOptions = opts;
    return jsdom;
}
exports.requestToJSDOM = requestToJSDOM;
function normalizeRequestOptions(options) {
    let requestOptions = {
        resolveWithFullResponse: true,
        encoding: null,
        gzip: true,
        headers: {
            "User-Agent": options.userAgent,
            Referer: options.referrer,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en"
        },
        jar: resource_loader_1.wrapCookieJarForRequest(options.cookieJar)
    };
    if (options.requestOptions) {
        requestOptions = deepmerge.all([
            requestOptions, options.requestOptions, {
                encoding: null,
            }
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
        normalized.cookieJar = new jsdom_1.CookieJar();
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
