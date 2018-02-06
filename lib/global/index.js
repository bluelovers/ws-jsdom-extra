"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KEYS = require("jsdom-global/keys");
const pack_1 = require("../pack");
function globalJsdom(html, options = {}) {
    if (global.navigator &&
        global.navigator.userAgent &&
        global.navigator.userAgent.indexOf('Node.js') > -1 &&
        global.document &&
        typeof global.document.destroy === 'function') {
        return {
            window: global.window,
            document: global.document,
            cleanup: global.document.destroy,
            global,
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
        global[key] = window[key];
    });
    global.document = window.document;
    global.window = window;
    window.console = global.console;
    jsdom.destroy = destroy;
    function destroy() {
        cleanup(global);
    }
    return {
        jsdom,
        window,
        document: document,
        cleanup: destroy,
        global,
    };
}
exports.globalJsdom = globalJsdom;
function cleanup(global) {
    KEYS.forEach(function (key) { delete global[key]; });
}
exports.cleanup = cleanup;
const self = require("./index");
exports.default = self;
