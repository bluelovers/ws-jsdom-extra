import { tryMinifyHTML } from './minify';

export function tryMinifyHTMLOfElem<T extends any = HTMLElement>(target: JQuery<T>)
{
	let html = target.html();

	let html2 = tryMinifyHTML(html);

	if (html2 !== html)
	{
		target.html(html)
	}

	return target;
}
