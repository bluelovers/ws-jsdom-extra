import { JSDOM } from 'jsdom';

export function wrapQuery<T = Partial<JQueryStatic>, O = any, J = JSDOM>(jsdom: J, options?: O, createQuery?: (jsdom: J, options?: O) => T)
{
	return createQuery(jsdom, options)
}

export default wrapQuery
