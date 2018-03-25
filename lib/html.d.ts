/// <reference types="node" />
import { Options as IMinifyOptions } from 'html-minifier';
export interface INormalizeHTML {
    html: string;
    encoding: string;
}
export declare function normalizeHTML(html: string, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function normalizeHTML(html: Buffer, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function normalizeHTML(html: ArrayBuffer, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function minifyHTML(html: any, options?: IMinifyOptions, logError?: boolean | number): string;
import * as self from './html';
export default self;
