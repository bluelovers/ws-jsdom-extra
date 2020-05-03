/**
 * Created by user on 2020/5/3.
 */

import { CookieJar } from './jsdom';
import { wrapCookieJarForRequest } from './lib/wrapCookieJarForRequest';
import { unwrapCookieJarFromRequestJar } from './lib/unwrapCookieJarFromRequestJar';

export { CookieJar }
export { wrapCookieJarForRequest, unwrapCookieJarFromRequestJar }

export default CookieJar

