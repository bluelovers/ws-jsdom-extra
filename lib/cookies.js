"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
exports.CookieJar = jsdom_1.CookieJar;
const toughCookie = require("tough-cookie");
exports.toughCookie = toughCookie;
const resource_loader_1 = require("jsdom/lib/jsdom/browser/resource-loader");
exports.wrapCookieJarForRequest = resource_loader_1.wrapCookieJarForRequest;
const moment = require("moment");
exports.moment = moment;
class LazyCookie extends toughCookie.Cookie {
    constructor(prop = {}) {
        if (!prop.expires || prop.expires === -1) {
            prop.expires = moment().add(1, 'year');
        }
        else if (typeof prop.expires == 'number') {
            prop.expires = moment().add(prop.expires, 's');
        }
        for (let key in prop) {
            if (moment.isMoment(prop[key])) {
                prop[key] = prop[key].toDate();
            }
        }
        super(prop);
        console.log(this);
    }
    static create(prop, ...argv) {
        return new this(prop, ...argv);
    }
}
exports.LazyCookie = LazyCookie;
class LazyCookieJar extends jsdom_1.CookieJar {
    constructor(data = {}, url) {
        super();
        url = (url || '').toString();
        for (let key in data) {
            if (data[key] === null || typeof data[key] != 'object') {
                this.setCookieSync(new LazyCookie({
                    key,
                    value: data[key],
                }), url);
            }
            else if (data[key] instanceof toughCookie.Cookie) {
                this.setCookieSync(data[key], url);
            }
            else if (data[key]) {
                this.setCookieSync(new LazyCookie(data[key]), url);
            }
        }
    }
    setCookieSync(cookieOrString, currentUrl, options = {}, ...argv) {
        if (typeof cookieOrString == 'string') {
            cookieOrString = toughCookie.Cookie.parse(cookieOrString);
        }
        else if (!(cookieOrString instanceof toughCookie.Cookie)) {
            cookieOrString = new LazyCookie(cookieOrString);
        }
        if (!currentUrl) {
            if (cookieOrString instanceof toughCookie.Cookie) {
                currentUrl = `http://` + cookieOrString.canonicalizedDomain();
            }
        }
        else if (typeof currentUrl != 'string') {
            currentUrl = currentUrl.toString();
        }
        return super.setCookieSync(cookieOrString, currentUrl, options, ...argv);
    }
    static create(data = {}, url) {
        return new this(data, url);
    }
    wrapForRequest() {
        return resource_loader_1.wrapCookieJarForRequest(this);
    }
    static unwrapFromRequest(jar) {
        return jar._jar;
    }
    getAllCookies() {
        let cookies;
        this.store.getAllCookies(function (err, cookie) {
            cookies = cookie;
        });
        return cookies;
    }
}
exports.LazyCookieJar = LazyCookieJar;
const self = require("./cookies");
exports.default = self;
