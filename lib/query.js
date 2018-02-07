"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createQuery(jsdom, options = {}) {
    if (options.createQuery) {
        return options.createQuery(jsdom, options);
    }
    if (!options.disableJQuery) {
        try {
            const jQuery = require("jquery");
            return jQuery(jsdom.window)
                .noConflict(true);
        }
        catch (e) {
        }
    }
    if (!options.disableCheerio) {
        try {
            const cheerio = require("cheerio");
            return cheerio.load(jsdom.serialize());
        }
        catch (e) {
        }
    }
    throw new ReferenceError(`can't found module "jquery" or "cheerio"`);
}
exports.createQuery = createQuery;
const self = require("./query");
exports.default = self;
