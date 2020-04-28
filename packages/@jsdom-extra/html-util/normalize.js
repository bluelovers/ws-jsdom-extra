"use strict";
/**
 * Created by user on 2020/4/29.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeHTML = void 0;
const html_encoding_sniffer_1 = __importDefault(require("html-encoding-sniffer"));
const whatwg_encoding_1 = __importDefault(require("whatwg-encoding"));
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
        encoding = html_encoding_sniffer_1.default(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
        html = whatwg_encoding_1.default.decode(html, encoding);
    }
    else {
        html = String(html);
    }
    return { html, encoding };
}
exports.normalizeHTML = normalizeHTML;
exports.default = normalizeHTML;
//# sourceMappingURL=normalize.js.map