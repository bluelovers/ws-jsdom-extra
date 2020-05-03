/// <reference types="jsdom" />
import { IConstructorOptions as IJSDOMConstructorOptions } from 'jsdom-extra';
import { VirtualConsole } from '@jsdom-extra/virtual-console';
export declare function getVirtualConsole<T = typeof VirtualConsole>(jsdomOptions?: IJSDOMConstructorOptions, VirtualConsoleLib?: T): T;
