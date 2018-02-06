"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("../package.json");
exports.DEFAULT_USER_AGENT = `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${package_json_1.version}`;
exports.SYMBOL_RAW = Symbol.for('raw_query');
const self = require("./const");
exports.default = self;
