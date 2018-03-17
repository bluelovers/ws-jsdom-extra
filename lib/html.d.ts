/// <reference types="node" />
import { Options as IMinifyOptions } from 'html-minifier';
export { IMinifyOptions };
export interface INormalizeHTML {
    html: string;
    encoding: string;
}
export declare function normalizeHTML(html: string, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function normalizeHTML(html: Buffer, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function normalizeHTML(html: ArrayBuffer, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function minifyHTML(html: any, options?: IMinifyOptions): string;
import * as self from './html';
export default self;
