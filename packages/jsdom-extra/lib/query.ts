/// <reference types="jquery" />
/// <reference types="cheerio" />
import _createQuery, { IOptionsCreateQuery } from '@jsdom-extra/jsdom-to-query';

export { IOptionsCreateQuery }

export function createQuery(jsdom, options: IOptionsCreateQuery = {}): Partial<JQueryStatic>
{
	return _createQuery(jsdom, options) as any
}

//export default exports as typeof import('./query');
