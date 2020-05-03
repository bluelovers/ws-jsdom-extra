"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVirtualConsole = void 0;
const virtual_console_1 = require("@jsdom-extra/virtual-console");
function getVirtualConsole(jsdomOptions, VirtualConsoleLib) {
    // @ts-ignore
    return (jsdomOptions === null || jsdomOptions === void 0 ? void 0 : jsdomOptions.virtualConsole) || new (VirtualConsoleLib !== null && VirtualConsoleLib !== void 0 ? VirtualConsoleLib : virtual_console_1.VirtualConsole)();
}
exports.getVirtualConsole = getVirtualConsole;
//# sourceMappingURL=virtualConsole.js.map