import { IRequestJar } from './types';
import { CookieJar as ToughCookieJar } from 'tough-cookie';
export declare function unwrapCookieJarFromRequestJar<T = ToughCookieJar>(requestJar: IRequestJar<T>): T;
export default unwrapCookieJarFromRequestJar;
