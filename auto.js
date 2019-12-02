"use strict";
/**
 * Created by user on 2018/2/6/006.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("jsdom"));
const jsdom_1 = require("jsdom");
const jsdom_url_1 = require("jsdom-url");
exports.URL = jsdom_url_1.URL;
const pack_1 = require("./lib/pack");
exports.fromURL = pack_1.fromURL;
exports.fromFile = pack_1.fromFile;
pack_1.auto(jsdom_1.JSDOM);
class JSDOM extends jsdom_1.JSDOM {
    constructor(html, options = {}) {
        let opts = {};
        pack_1.packOptions(options, function (options) {
            opts = options;
        });
        super(html, options);
        let jsdom;
        // @ts-ignore
        jsdom = this;
        jsdom._options.ConstructorOptions = opts;
        jsdom._options.options = options;
    }
}
exports.JSDOM = JSDOM;
// @ts-ignore
JSDOM.fromFile = pack_1.fromFile;
// @ts-ignore
JSDOM.fromURL = pack_1.fromURL;
exports.default = JSDOM;
/*
let jsdom = new JSDOM();

console.log(jsdom.url);

//pack(jsdom);

console.log(jsdom.$(':root'));

console.log(jsdom._options);
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7OztBQUVILDJCQUFzQjtBQUN0QixpQ0FBb0Q7QUFDcEQseUNBQWdDO0FBQ3ZCLGNBREEsZUFBRyxDQUNBO0FBRVoscUNBTW9CO0FBRVgsa0JBSlIsY0FBTyxDQUlRO0FBQUUsbUJBSGpCLGVBQVEsQ0FHaUI7QUFFMUIsV0FBSSxDQUFDLGFBQU0sQ0FBQyxDQUFDO0FBRWIsTUFBYSxLQUFNLFNBQVEsYUFBTTtJQU9oQyxZQUFZLElBQW1DLEVBQUUsVUFBK0IsRUFBRTtRQUVqRixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFFZCxrQkFBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLE9BQU87WUFFckMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFckIsSUFBSSxLQUFhLENBQUM7UUFFbEIsYUFBYTtRQUNiLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFYixLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUN6QyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbEMsQ0FBQztDQUNEO0FBMUJELHNCQTBCQztBQUVELGFBQWE7QUFDYixLQUFLLENBQUMsUUFBUSxHQUFHLGVBQVEsQ0FBQztBQUMxQixhQUFhO0FBQ2IsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFPLENBQUM7QUFFeEIsa0JBQWUsS0FBSyxDQUFDO0FBRXJCOzs7Ozs7Ozs7O0VBVUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzIvNi8wMDYuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnanNkb20nO1xuaW1wb3J0IHsgQmluYXJ5RGF0YSwgSlNET00gYXMgX0pTRE9NIH0gZnJvbSAnanNkb20nO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAnanNkb20tdXJsJztcbmV4cG9ydCB7IFVSTCB9XG5cbmltcG9ydCBwYWNrLCB7XG5cdElKU0RPTSwgYXV0bywgcGFja09wdGlvbnMsIElKU0RPTV9TeW1ib2xfT3B0aW9ucyxcblx0SUNvbnN0cnVjdG9yT3B0aW9ucyxcblxuXHRmcm9tVVJMLFxuXHRmcm9tRmlsZSxcbn0gZnJvbSAnLi9saWIvcGFjayc7XG5cbmV4cG9ydCB7IGZyb21VUkwsIGZyb21GaWxlIH1cblxuYXV0byhfSlNET00pO1xuXG5leHBvcnQgY2xhc3MgSlNET00gZXh0ZW5kcyBfSlNET01cbntcblx0JDogSlF1ZXJ5U3RhdGljO1xuXHR1cmw6IFVSTDtcblx0ZG9jdW1lbnQ6IERvY3VtZW50O1xuXHRfb3B0aW9uczogSUpTRE9NX1N5bWJvbF9PcHRpb25zO1xuXG5cdGNvbnN0cnVjdG9yKGh0bWw/OiBzdHJpbmcgfCBCdWZmZXIgfCBCaW5hcnlEYXRhLCBvcHRpb25zOiBJQ29uc3RydWN0b3JPcHRpb25zID0ge30pXG5cdHtcblx0XHRsZXQgb3B0cyA9IHt9O1xuXG5cdFx0cGFja09wdGlvbnMob3B0aW9ucywgZnVuY3Rpb24gKG9wdGlvbnMpXG5cdFx0e1xuXHRcdFx0b3B0cyA9IG9wdGlvbnM7XG5cdFx0fSk7XG5cblx0XHRzdXBlcihodG1sLCBvcHRpb25zKTtcblxuXHRcdGxldCBqc2RvbTogSUpTRE9NO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGpzZG9tID0gdGhpcztcblxuXHRcdGpzZG9tLl9vcHRpb25zLkNvbnN0cnVjdG9yT3B0aW9ucyA9IG9wdHM7XG5cdFx0anNkb20uX29wdGlvbnMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cbn1cblxuLy8gQHRzLWlnbm9yZVxuSlNET00uZnJvbUZpbGUgPSBmcm9tRmlsZTtcbi8vIEB0cy1pZ25vcmVcbkpTRE9NLmZyb21VUkwgPSBmcm9tVVJMO1xuXG5leHBvcnQgZGVmYXVsdCBKU0RPTTtcblxuLypcbmxldCBqc2RvbSA9IG5ldyBKU0RPTSgpO1xuXG5jb25zb2xlLmxvZyhqc2RvbS51cmwpO1xuXG4vL3BhY2soanNkb20pO1xuXG5jb25zb2xlLmxvZyhqc2RvbS4kKCc6cm9vdCcpKTtcblxuY29uc29sZS5sb2coanNkb20uX29wdGlvbnMpO1xuKi9cbiJdfQ==