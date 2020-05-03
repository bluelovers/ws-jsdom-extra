"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCookieJarForRequest = void 0;
/*
export class RequestJar
{
    _jar: ToughCookieJar

    constructor(store?) {}

    setCookie(cookieOrStr, uri, options?)
    {
        return this._jar.setCookieSync(cookieOrStr, uri, options || {})
    }

    getCookieString(uri)
    {
        return this._jar.getCookieStringSync(uri)
    }

    getCookies(uri)
    {
        return this._jar.getCookiesSync(uri)
    }

}

 */
const jar = _wrapCookieJarForRequest();
function _wrapCookieJarForRequest() {
    try {
        return require("jsdom/lib/jsdom/living/helpers/wrap-cookie-jar-for-request");
    }
    catch (e) {
        return require("jsdom/jsdom/living/helpers/wrap-cookie-jar-for-request");
    }
}
function wrapCookieJarForRequest(cookieJar) {
    return jar(cookieJar);
}
exports.wrapCookieJarForRequest = wrapCookieJarForRequest;
exports.default = wrapCookieJarForRequest;
//# sourceMappingURL=wrapCookieJarForRequest.js.map