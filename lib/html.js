"use strict";
/**
 * Created by user on 2018/3/18/018.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyHTML = exports.normalizeHTML = void 0;
const sniffHTMLEncoding = require("html-encoding-sniffer");
const whatwgEncoding = require("whatwg-encoding");
const html_minifier_1 = require("html-minifier");
function normalizeHTML(html = '', transportLayerEncodingLabel) {
    let encoding = "UTF-8";
    if (ArrayBuffer.isView(html)) {
        // @ts-ignore
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
exports.normalizeHTML = normalizeHTML;
function minifyHTML(html, options = {}, logError = true) {
    let err;
    options = Object.assign({
        collapseWhitespace: true,
        preserveLineBreaks: true,
        conservativeCollapse: true,
        caseSensitive: true,
    }, options);
    try {
        let ret = html_minifier_1.minify(html, options);
        return ret;
    }
    catch (e) {
        err = e;
        if (logError) {
            if (logError < 0) {
                console.error('[minifyHTML]', err.toString());
            }
            else {
                console.error('[minifyHTML]', err.toString().split(/[\r\n]/)[0]);
            }
        }
    }
    return html;
}
exports.minifyHTML = minifyHTML;
exports.default = exports;
//# sourceMappingURL=html.js.map