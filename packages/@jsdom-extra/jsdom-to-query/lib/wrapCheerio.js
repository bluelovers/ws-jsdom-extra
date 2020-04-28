"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCheerio = void 0;
function wrapCheerio(jsdom, cheerio) {
    // @ts-ignore
    return (cheerio !== null && cheerio !== void 0 ? cheerio : require("cheerio")).load(jsdom.serialize());
}
exports.wrapCheerio = wrapCheerio;
exports.default = wrapCheerio;
//# sourceMappingURL=wrapCheerio.js.map