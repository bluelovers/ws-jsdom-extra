/**
 * Created by user on 2020/5/3.
 */
import { CookieJar as ToughCookieJar } from 'tough-cookie';
import { IRequestJar } from './types';
export declare function wrapCookieJarForRequest<T = ToughCookieJar>(cookieJar: any): IRequestJar<T>;
export default wrapCookieJarForRequest;
