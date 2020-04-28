"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuery = void 0;
const wrapQuery_1 = __importDefault(require("./lib/wrapQuery"));
const wrapJQuery_1 = __importDefault(require("./lib/wrapJQuery"));
const wrapCheerio_1 = __importDefault(require("./lib/wrapCheerio"));
function createQuery(jsdom, options = {}) {
    if (isDefined(options.createQuery)) {
        return wrapQuery_1.default(jsdom, options, options.createQuery);
    }
    if (!options.disableJQuery) {
        try {
            return wrapJQuery_1.default(jsdom, options.JQueryLib);
        }
        catch (e) {
        }
    }
    if (!options.disableCheerio) {
        try {
            return wrapCheerio_1.default(jsdom, options.CheerioLib);
        }
        catch (e) {
        }
    }
    throw new ReferenceError(`can't found module "jquery" or "cheerio"`);
}
exports.createQuery = createQuery;
function isDefined(obj) {
    return obj !== null && typeof obj !== 'undefined';
}
exports.default = createQuery;
//# sourceMappingURL=index.js.map