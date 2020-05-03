import { IRequestJar } from './types';
import { CookieJar as ToughCookieJar, Cookie } from 'tough-cookie';

export function unwrapCookieJarFromRequestJar<T = ToughCookieJar>(requestJar: IRequestJar<T>)
{
	return requestJar._jar;
}

export default unwrapCookieJarFromRequestJar
