import { IConstructorOptions as IJSDOMConstructorOptions } from 'jsdom-extra';
import { VirtualConsole } from '@jsdom-extra/virtual-console';

export function getVirtualConsole<T = typeof VirtualConsole>(jsdomOptions?: IJSDOMConstructorOptions, VirtualConsoleLib?: T): T
{
	// @ts-ignore
	return jsdomOptions?.virtualConsole || new (VirtualConsoleLib ?? VirtualConsole)();
}
