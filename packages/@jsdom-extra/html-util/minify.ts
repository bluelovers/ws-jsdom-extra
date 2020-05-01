/**
 * Created by user on 2020/4/29.
 */

import { Options as IMinifyOptions, minify } from 'html-minifier';

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

export function tryMinifyHTML(html: string, throwError?: boolean | ((html: string) => any))
{
	try
	{
		html = minifyHTML(html);

		if (typeof throwError === 'function')
		{
			return throwError(html);
		}
	}
	catch (e)
	{
		if (throwError === true)
		{
			throw e;
		}
	}

	return html;
}



export default minifyHTML
