"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KEYS = require("jsdom-global/keys");
const pack_1 = require("../pack");
function globalJsdom(html, options = {}) {
    if (exports.global.navigator &&
        exports.global.navigator.userAgent &&
        exports.global.navigator.userAgent.indexOf('Node.js') > -1 &&
        exports.global.document &&
        typeof exports.global.document.destroy === 'function') {
        return {
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
    KEYS.forEach(function (key) {
        exports.global[key] = window[key];
    });
    exports.global.document = window.document;
    exports.global.window = window;
    window.console = exports.global.console;
    jsdom.destroy = destroy;
    function destroy() {
        cleanup(exports.global);
    }
    return {
        jsdom,
        window,
        document: document,
        cleanup: destroy,
        global: exports.global,
        XMLHttpRequest: window.XMLHttpRequest,
    };
}
exports.globalJsdom = globalJsdom;
function cleanup(global) {
    KEYS.forEach(function (key) { delete global[key]; });
}
exports.cleanup = cleanup;
const self = require("./index");
exports.default = self;
