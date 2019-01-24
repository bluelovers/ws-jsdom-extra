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
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSwyREFBNEQ7QUFDNUQsa0RBQW1EO0FBQ25ELGlEQUFrRTtBQWFsRSxTQUFnQixhQUFhLENBQUMsT0FBWSxFQUFFLEVBQUUsMkJBQW9DO0lBRWpGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUV2QixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQzVCO1FBRUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNsRTtTQUNJLElBQUksSUFBSSxZQUFZLFdBQVcsRUFDcEM7UUFDQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6QjtJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDekI7UUFDQyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSwyQkFBMkIsRUFBRSxDQUFDLENBQUM7UUFDckcsSUFBSSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdDO1NBRUQ7UUFDQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBekJELHNDQXlCQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBMEIsRUFBRSxFQUFFLFdBQTZCLElBQUk7SUFFL0YsSUFBSSxHQUFHLENBQUM7SUFFUixPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2QixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsb0JBQW9CLEVBQUUsSUFBSTtRQUMxQixhQUFhLEVBQUUsSUFBSTtLQUNuQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRVosSUFDQTtRQUNDLElBQUksR0FBRyxHQUFHLHNCQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWhDLE9BQU8sR0FBRyxDQUFDO0tBQ1g7SUFDRCxPQUFPLENBQUMsRUFDUjtRQUNDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFUixJQUFJLFFBQVEsRUFDWjtZQUNDLElBQUksUUFBUSxHQUFHLENBQUMsRUFDaEI7Z0JBQ0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDOUM7aUJBRUQ7Z0JBQ0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0Q7S0FDRDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQW5DRCxnQ0FtQ0M7QUFFRCxrQkFBZSxPQUFrQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8zLzE4LzAxOC5cbiAqL1xuXG5pbXBvcnQgc25pZmZIVE1MRW5jb2RpbmcgPSByZXF1aXJlKCdodG1sLWVuY29kaW5nLXNuaWZmZXInKTtcbmltcG9ydCB3aGF0d2dFbmNvZGluZyA9IHJlcXVpcmUoJ3doYXR3Zy1lbmNvZGluZycpO1xuaW1wb3J0IHsgbWluaWZ5LCBPcHRpb25zIGFzIElNaW5pZnlPcHRpb25zIH0gZnJvbSAnaHRtbC1taW5pZmllcic7XG5cbmltcG9ydCB7IEpTRE9NIH0gZnJvbSAnanNkb20nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3JtYWxpemVIVE1MXG57XG5cdGh0bWw6IHN0cmluZyxcblx0ZW5jb2Rpbmc6IHN0cmluZyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUhUTUwoaHRtbDogc3RyaW5nLCB0cmFuc3BvcnRMYXllckVuY29kaW5nTGFiZWw/OiBzdHJpbmcpOiBJTm9ybWFsaXplSFRNTFxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUhUTUwoaHRtbDogQnVmZmVyLCB0cmFuc3BvcnRMYXllckVuY29kaW5nTGFiZWw/OiBzdHJpbmcpOiBJTm9ybWFsaXplSFRNTFxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUhUTUwoaHRtbDogQXJyYXlCdWZmZXIsIHRyYW5zcG9ydExheWVyRW5jb2RpbmdMYWJlbD86IHN0cmluZyk6IElOb3JtYWxpemVIVE1MXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplSFRNTChodG1sOiBhbnkgPSAnJywgdHJhbnNwb3J0TGF5ZXJFbmNvZGluZ0xhYmVsPzogc3RyaW5nKTogSU5vcm1hbGl6ZUhUTUxcbntcblx0bGV0IGVuY29kaW5nID0gXCJVVEYtOFwiO1xuXG5cdGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoaHRtbCkpXG5cdHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0aHRtbCA9IEJ1ZmZlci5mcm9tKGh0bWwuYnVmZmVyLCBodG1sLmJ5dGVPZmZzZXQsIGh0bWwuYnl0ZUxlbmd0aCk7XG5cdH1cblx0ZWxzZSBpZiAoaHRtbCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKVxuXHR7XG5cdFx0aHRtbCA9IEJ1ZmZlci5mcm9tKGh0bWwpO1xuXHR9XG5cblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihodG1sKSlcblx0e1xuXHRcdGVuY29kaW5nID0gc25pZmZIVE1MRW5jb2RpbmcoaHRtbCwgeyBkZWZhdWx0RW5jb2Rpbmc6IFwid2luZG93cy0xMjUyXCIsIHRyYW5zcG9ydExheWVyRW5jb2RpbmdMYWJlbCB9KTtcblx0XHRodG1sID0gd2hhdHdnRW5jb2RpbmcuZGVjb2RlKGh0bWwsIGVuY29kaW5nKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRodG1sID0gU3RyaW5nKGh0bWwpO1xuXHR9XG5cblx0cmV0dXJuIHsgaHRtbCwgZW5jb2RpbmcgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbmlmeUhUTUwoaHRtbCwgb3B0aW9uczogSU1pbmlmeU9wdGlvbnMgPSB7fSwgbG9nRXJyb3I6IGJvb2xlYW4gfCBudW1iZXIgPSB0cnVlKTogc3RyaW5nXG57XG5cdGxldCBlcnI7XG5cblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGNvbGxhcHNlV2hpdGVzcGFjZTogdHJ1ZSxcblx0XHRwcmVzZXJ2ZUxpbmVCcmVha3M6IHRydWUsXG5cdFx0Y29uc2VydmF0aXZlQ29sbGFwc2U6IHRydWUsXG5cdFx0Y2FzZVNlbnNpdGl2ZTogdHJ1ZSxcblx0fSwgb3B0aW9ucyk7XG5cblx0dHJ5XG5cdHtcblx0XHRsZXQgcmV0ID0gbWluaWZ5KGh0bWwsIG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXHRjYXRjaCAoZSlcblx0e1xuXHRcdGVyciA9IGU7XG5cblx0XHRpZiAobG9nRXJyb3IpXG5cdFx0e1xuXHRcdFx0aWYgKGxvZ0Vycm9yIDwgMClcblx0XHRcdHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignW21pbmlmeUhUTUxdJywgZXJyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdbbWluaWZ5SFRNTF0nLCBlcnIudG9TdHJpbmcoKS5zcGxpdCgvW1xcclxcbl0vKVswXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGh0bWw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCgnLi9odG1sJyk7XG4iXX0=