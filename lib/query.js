"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createQuery(jsdom, options = {}) {
    if (options.createQuery) {
        return options.createQuery(jsdom, options);
    }
    if (!options.disableJQuery) {
        try {
            const jQuery = require("jquery");
            return jQuery(jsdom.window)
                .noConflict(true);
        }
        catch (e) {
        }
    }
    if (!options.disableCheerio) {
        try {
            const cheerio = require("cheerio");
            return cheerio.load(jsdom.serialize());
        }
        catch (e) {
        }
    }
    throw new ReferenceError(`can't found module "jquery" or "cheerio"`);
}
exports.createQuery = createQuery;
const self = require("./query");
exports.default = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWNBLFNBQWdCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsVUFBK0IsRUFBRTtJQUVuRSxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQ3ZCO1FBQ0MsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMzQztJQUVELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUMxQjtRQUNDLElBQ0E7WUFDQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztpQkFDekIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUNoQjtTQUNGO1FBQ0QsT0FBTyxDQUFDLEVBQ1I7U0FDQztLQUNEO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQzNCO1FBQ0MsSUFDQTtZQUNDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLENBQUMsRUFDUjtTQUNDO0tBQ0Q7SUFFRCxNQUFNLElBQUksY0FBYyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7QUFDckUsQ0FBQztBQWxDRCxrQ0FrQ0M7QUFFRCxnQ0FBK0I7QUFDL0Isa0JBQWUsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSlNET00gfSBmcm9tICdqc2RvbSc7XG5pbXBvcnQgKiBhcyBqUXVlcnkgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8yLzYvMDA2LlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnNDcmVhdGVRdWVyeVxue1xuXHRjcmVhdGVRdWVyeT8oanNkb206IEpTRE9NLCBvcHRpb25zPzogSU9wdGlvbnNDcmVhdGVRdWVyeSk6IFBhcnRpYWw8SlF1ZXJ5U3RhdGljPixcblx0ZGlzYWJsZUpRdWVyeT86IGJvb2xlYW4sXG5cdGRpc2FibGVDaGVlcmlvPzogYm9vbGVhbixcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5KGpzZG9tLCBvcHRpb25zOiBJT3B0aW9uc0NyZWF0ZVF1ZXJ5ID0ge30pOiBQYXJ0aWFsPEpRdWVyeVN0YXRpYz5cbntcblx0aWYgKG9wdGlvbnMuY3JlYXRlUXVlcnkpXG5cdHtcblx0XHRyZXR1cm4gb3B0aW9ucy5jcmVhdGVRdWVyeShqc2RvbSwgb3B0aW9ucyk7XG5cdH1cblxuXHRpZiAoIW9wdGlvbnMuZGlzYWJsZUpRdWVyeSlcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGNvbnN0IGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cdFx0XHRyZXR1cm4galF1ZXJ5KGpzZG9tLndpbmRvdylcblx0XHRcdFx0Lm5vQ29uZmxpY3QodHJ1ZSlcblx0XHRcdFx0O1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFvcHRpb25zLmRpc2FibGVDaGVlcmlvKVxuXHR7XG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0Y29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoXCJjaGVlcmlvXCIpO1xuXHRcdFx0cmV0dXJuIGNoZWVyaW8ubG9hZChqc2RvbS5zZXJpYWxpemUoKSk7XG5cdFx0fVxuXHRcdGNhdGNoIChlKVxuXHRcdHtcblx0XHR9XG5cdH1cblxuXHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYGNhbid0IGZvdW5kIG1vZHVsZSBcImpxdWVyeVwiIG9yIFwiY2hlZXJpb1wiYClcbn1cblxuaW1wb3J0ICogYXMgc2VsZiBmcm9tICcuL3F1ZXJ5J1xuZXhwb3J0IGRlZmF1bHQgc2VsZjtcbiJdfQ==