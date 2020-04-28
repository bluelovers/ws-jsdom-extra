"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapJQuery = void 0;
function wrapJQuery(jsdom, JQuery) {
    // @ts-ignore
    return (JQuery !== null && JQuery !== void 0 ? JQuery : require("jquery"))(jsdom.window).noConflict(true);
}
exports.wrapJQuery = wrapJQuery;
exports.default = wrapJQuery;
//# sourceMappingURL=wrapJQuery.js.map