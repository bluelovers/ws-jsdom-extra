"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sniffHTMLEncoding = require("html-encoding-sniffer");
const whatwgEncoding = require("whatwg-encoding");
const html_minifier_1 = require("html-minifier");
function normalizeHTML(html = '', transportLayerEncodingLabel) {
    let encoding = "UTF-8";
    if (ArrayBuffer.isView(html)) {
        html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
    }
    else if (html instanceof ArrayBuffer) {
        html = Buffer.from(html);
    }
    if (Buffer.isBuffer(html)) {
        encoding = sniffHTMLEncoding(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
        html = whatwgEncoding.decode(html, encoding);
    }
    else {
        html = String(html);
    }
    return { html, encoding };
}
exports.normalizeHTML = normalizeHTML;
function minifyHTML(html, options = {}, logError = true) {
    let err;
    options = Object.assign({
        collapseWhitespace: true,
        preserveLineBreaks: true,
        conservativeCollapse: true,
        caseSensitive: true,
    }, options);
    try {
        let ret = html_minifier_1.minify(html, options);
        return ret;
    }
    catch (e) {
        err = e;
        if (logError) {
            if (logError < 0) {
                console.error('[minifyHTML]', err.toString());
            }
            else {
                console.error('[minifyHTML]', err.toString().split(/[\r\n]/)[0]);
            }
        }
    }
    return html;
}
exports.minifyHTML = minifyHTML;
const self = require("./html");
exports.default = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSwyREFBMkQ7QUFDM0Qsa0RBQWtEO0FBQ2xELGlEQUFrRTtBQWFsRSxTQUFnQixhQUFhLENBQUMsT0FBWSxFQUFFLEVBQUUsMkJBQW9DO0lBRWpGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUV2QixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQzVCO1FBRUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNsRTtTQUNJLElBQUksSUFBSSxZQUFZLFdBQVcsRUFDcEM7UUFDQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6QjtJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDekI7UUFDQyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSwyQkFBMkIsRUFBRSxDQUFDLENBQUM7UUFDckcsSUFBSSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO1NBRUQ7UUFDQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBekJELHNDQXlCQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBMEIsRUFBRSxFQUFFLFdBQTZCLElBQUk7SUFFL0YsSUFBSSxHQUFHLENBQUM7SUFFUixPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2QixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsb0JBQW9CLEVBQUUsSUFBSTtRQUMxQixhQUFhLEVBQUUsSUFBSTtLQUNuQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRVosSUFDQTtRQUNDLElBQUksR0FBRyxHQUFHLHNCQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWhDLE9BQU8sR0FBRyxDQUFDO0tBQ1g7SUFDRCxPQUFPLENBQUMsRUFDUjtRQUNDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFUixJQUFJLFFBQVEsRUFDWjtZQUNDLElBQUksUUFBUSxHQUFHLENBQUMsRUFDaEI7Z0JBQ0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDOUM7aUJBRUQ7Z0JBQ0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0Q7S0FDRDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQW5DRCxnQ0FtQ0M7QUFFRCwrQkFBK0I7QUFFL0Isa0JBQWUsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8zLzE4LzAxOC5cbiAqL1xuXG5pbXBvcnQgKiBhcyBzbmlmZkhUTUxFbmNvZGluZyBmcm9tICdodG1sLWVuY29kaW5nLXNuaWZmZXInO1xuaW1wb3J0ICogYXMgd2hhdHdnRW5jb2RpbmcgZnJvbSAnd2hhdHdnLWVuY29kaW5nJztcbmltcG9ydCB7IG1pbmlmeSwgT3B0aW9ucyBhcyBJTWluaWZ5T3B0aW9ucyB9IGZyb20gJ2h0bWwtbWluaWZpZXInO1xuXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gJ2pzZG9tJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm9ybWFsaXplSFRNTFxue1xuXHRodG1sOiBzdHJpbmcsXG5cdGVuY29kaW5nOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVIVE1MKGh0bWw6IHN0cmluZywgdHJhbnNwb3J0TGF5ZXJFbmNvZGluZ0xhYmVsPzogc3RyaW5nKTogSU5vcm1hbGl6ZUhUTUxcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVIVE1MKGh0bWw6IEJ1ZmZlciwgdHJhbnNwb3J0TGF5ZXJFbmNvZGluZ0xhYmVsPzogc3RyaW5nKTogSU5vcm1hbGl6ZUhUTUxcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVIVE1MKGh0bWw6IEFycmF5QnVmZmVyLCB0cmFuc3BvcnRMYXllckVuY29kaW5nTGFiZWw/OiBzdHJpbmcpOiBJTm9ybWFsaXplSFRNTFxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUhUTUwoaHRtbDogYW55ID0gJycsIHRyYW5zcG9ydExheWVyRW5jb2RpbmdMYWJlbD86IHN0cmluZyk6IElOb3JtYWxpemVIVE1MXG57XG5cdGxldCBlbmNvZGluZyA9IFwiVVRGLThcIjtcblxuXHRpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGh0bWwpKVxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGh0bWwgPSBCdWZmZXIuZnJvbShodG1sLmJ1ZmZlciwgaHRtbC5ieXRlT2Zmc2V0LCBodG1sLmJ5dGVMZW5ndGgpO1xuXHR9XG5cdGVsc2UgaWYgKGh0bWwgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcilcblx0e1xuXHRcdGh0bWwgPSBCdWZmZXIuZnJvbShodG1sKTtcblx0fVxuXG5cdGlmIChCdWZmZXIuaXNCdWZmZXIoaHRtbCkpXG5cdHtcblx0XHRlbmNvZGluZyA9IHNuaWZmSFRNTEVuY29kaW5nKGh0bWwsIHsgZGVmYXVsdEVuY29kaW5nOiBcIndpbmRvd3MtMTI1MlwiLCB0cmFuc3BvcnRMYXllckVuY29kaW5nTGFiZWwgfSk7XG5cdFx0aHRtbCA9IHdoYXR3Z0VuY29kaW5nLmRlY29kZShodG1sLCBlbmNvZGluZyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0aHRtbCA9IFN0cmluZyhodG1sKTtcblx0fVxuXG5cdHJldHVybiB7IGh0bWwsIGVuY29kaW5nIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5pZnlIVE1MKGh0bWwsIG9wdGlvbnM6IElNaW5pZnlPcHRpb25zID0ge30sIGxvZ0Vycm9yOiBib29sZWFuIHwgbnVtYmVyID0gdHJ1ZSk6IHN0cmluZ1xue1xuXHRsZXQgZXJyO1xuXG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRjb2xsYXBzZVdoaXRlc3BhY2U6IHRydWUsXG5cdFx0cHJlc2VydmVMaW5lQnJlYWtzOiB0cnVlLFxuXHRcdGNvbnNlcnZhdGl2ZUNvbGxhcHNlOiB0cnVlLFxuXHRcdGNhc2VTZW5zaXRpdmU6IHRydWUsXG5cdH0sIG9wdGlvbnMpO1xuXG5cdHRyeVxuXHR7XG5cdFx0bGV0IHJldCA9IG1pbmlmeShodG1sLCBvcHRpb25zKTtcblxuXHRcdHJldHVybiByZXQ7XG5cdH1cblx0Y2F0Y2ggKGUpXG5cdHtcblx0XHRlcnIgPSBlO1xuXG5cdFx0aWYgKGxvZ0Vycm9yKVxuXHRcdHtcblx0XHRcdGlmIChsb2dFcnJvciA8IDApXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1ttaW5pZnlIVE1MXScsIGVyci50b1N0cmluZygpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignW21pbmlmeUhUTUxdJywgZXJyLnRvU3RyaW5nKCkuc3BsaXQoL1tcXHJcXG5dLylbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBodG1sO1xufVxuXG5pbXBvcnQgKiBhcyBzZWxmIGZyb20gJy4vaHRtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IHNlbGY7XG4iXX0=