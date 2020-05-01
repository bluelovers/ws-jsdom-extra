"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryMinifyHTMLOfElem = void 0;
const minify_1 = require("./minify");
function tryMinifyHTMLOfElem(target) {
    let html = target.html();
    let html2 = minify_1.tryMinifyHTML(html);
    if (html2 !== html) {
        target.html(html);
    }
    return target;
}
exports.tryMinifyHTMLOfElem = tryMinifyHTMLOfElem;
//# sourceMappingURL=jquery.js.map