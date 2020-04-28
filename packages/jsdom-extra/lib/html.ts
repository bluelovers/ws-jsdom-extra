/**
 * Created by user on 2018/3/18/018.
 */

import sniffHTMLEncoding from 'html-encoding-sniffer';
import whatwgEncoding from 'whatwg-encoding';
import { minify, Options as IMinifyOptions } from 'html-minifier';

import { JSDOM } from 'jsdom';

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

export function minifyHTML(html, options: IMinifyOptions = {}, logError: boolean | number = true): string
{
	let err;

	options = Object.assign({
		collapseWhitespace: true,
		preserveLineBreaks: true,
		conservativeCollapse: true,
		caseSensitive: true,
	}, options);

	try
	{
		let ret = minify(html, options);

		return ret;
	}
	catch (e)
	{
		err = e;

		if (logError)
		{
			if (logError < 0)
			{
				console.error('[minifyHTML]', err.toString());
			}
			else
			{
				console.error('[minifyHTML]', err.toString().split(/[\r\n]/)[0]);
			}
		}
	}

	return html;
}
