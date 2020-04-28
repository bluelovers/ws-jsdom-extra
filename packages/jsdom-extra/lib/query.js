"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuery = void 0;
/// <reference types="jquery" />
/// <reference types="cheerio" />
const jsdom_to_query_1 = __importDefault(require("@jsdom-extra/jsdom-to-query"));
function createQuery(jsdom, options = {}) {
    return jsdom_to_query_1.default(jsdom, options);
}
exports.createQuery = createQuery;
//export default exports as typeof import('./query');
//# sourceMappingURL=query.js.map