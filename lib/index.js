"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("bluebird");
exports.Promise = Promise;
const request = require("request");
exports.request = request;
function array_unique(array) {
    return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
    });
}
exports.array_unique = array_unique;
const self = require("./index");
exports.default = self;
