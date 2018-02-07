"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYS = [];
const pack_1 = require("../pack");
function globalJsdom(html, options = {}) {
    if (exports.global.navigator &&
        exports.global.navigator.userAgent &&
        exports.global.navigator.userAgent.indexOf('Node.js') > -1 &&
        exports.global.document &&
        typeof exports.global.document.destroy === 'function') {
        return {
            jsdom: exports.global.$jsdom,
            window: exports.global.window,
            document: exports.global.document,
            cleanup: exports.global.document.destroy,
            global: exports.global,
            XMLHttpRequest: exports.global.window.XMLHttpRequest,
        };
    }
    let jsdom;
    if (options.JSDOM) {
        const JSDOM = options.JSDOM;
        delete options.JSDOM;
        delete options.createJSDOM;
        jsdom = new JSDOM(html, options);
    }
    else if (options.createJSDOM) {
        const create = options.createJSDOM;
        delete options.JSDOM;
        delete options.createJSDOM;
        if (typeof create == 'function') {
            jsdom = create(html, options);
        }
        else {
            jsdom = create;
        }
    }
    else {
        jsdom = pack_1.createJSDOM(html, options);
    }
    const window = jsdom.window;
    const document = window.document;
    if (exports.KEYS.length === 0) {
        exports.KEYS.push(...Object.getOwnPropertyNames(window).filter(k => !k.startsWith('_')).filter(k => !exports.global[k]));
        exports.KEYS.push('$jsdom');
    }
    exports.KEYS.forEach(function (key) {
        exports.global[key] = window[key];
    });
    exports.global.document = document;
    exports.global.window = window;
    window.console = exports.global.console;
    document.destroy = destroy;
    exports.global.$jsdom = jsdom;
    function destroy() {
        cleanup(exports.global);
    }
    return {
        jsdom,
        window,
        document,
        cleanup: destroy,
        global: exports.global,
        XMLHttpRequest: window.XMLHttpRequest,
    };
}
exports.globalJsdom = globalJsdom;
function cleanup(global) {
    exports.KEYS.forEach(function (key) { delete global[key]; });
}
exports.cleanup = cleanup;
const self = require("./index");
exports.default = self;
