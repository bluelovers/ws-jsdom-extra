/**
 * Created by user on 2018/3/18/018.
 */

import * as sniffHTMLEncoding from 'html-encoding-sniffer';
import * as whatwgEncoding from 'whatwg-encoding';
import { minify, Options as IMinifyOptions } from 'html-minifier';

export { IMinifyOptions }

export interface INormalizeHTML
{
	html: string,
	encoding: string,
}

export function normalizeHTML(html: string, transportLayerEncodingLabel?: string): INormalizeHTML
export function normalizeHTML(html: Buffer, transportLayerEncodingLabel?: string): INormalizeHTML
export function normalizeHTML(html: ArrayBuffer, transportLayerEncodingLabel?: string): INormalizeHTML
export function normalizeHTML(html: any = '', transportLayerEncodingLabel?: string): INormalizeHTML
{
	let encoding = "UTF-8";

	if (ArrayBuffer.isView(html))
	{
		// @ts-ignore
		html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
	}
	else if (html instanceof ArrayBuffer)
	{
		html = Buffer.from(html);
	}

	if (Buffer.isBuffer(html))
	{
		encoding = sniffHTMLEncoding(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
		html = whatwgEncoding.decode(html, encoding);
	}
	else
	{
		html = String(html);
	}

	return { html, encoding };
}

export function minifyHTML(html, options: IMinifyOptions = {}): string
{
	return minify(html, Object.assign({
		collapseWhitespace: true,
		preserveLineBreaks: true,
		conservativeCollapse: true,
	}, options));
}

import * as self from './html';
export default self;
