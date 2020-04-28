"use strict";
/**
 * Created by user on 2020/4/29.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyHTML = void 0;
const html_minifier_1 = require("html-minifier");
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
exports.default = minifyHTML;
//# sourceMappingURL=minify.js.map