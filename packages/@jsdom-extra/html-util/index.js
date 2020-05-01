"use strict";
/**
 * Created by user on 2020/4/29.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryMinifyHTMLOfElem = exports.normalizeHTML = exports.tryMinifyHTML = exports.minifyHTML = void 0;
const minify_1 = require("./minify");
Object.defineProperty(exports, "minifyHTML", { enumerable: true, get: function () { return minify_1.minifyHTML; } });
Object.defineProperty(exports, "tryMinifyHTML", { enumerable: true, get: function () { return minify_1.tryMinifyHTML; } });
const normalize_1 = require("./normalize");
Object.defineProperty(exports, "normalizeHTML", { enumerable: true, get: function () { return normalize_1.normalizeHTML; } });
const jquery_1 = require("./jquery");
Object.defineProperty(exports, "tryMinifyHTMLOfElem", { enumerable: true, get: function () { return jquery_1.tryMinifyHTMLOfElem; } });
exports.default = minify_1.tryMinifyHTML;
//# sourceMappingURL=index.js.map