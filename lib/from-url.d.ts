import { CookieJar, FromUrlOptions } from 'jsdom';
import { IJSDOM, IOptions } from './pack';
import { Promise } from './index';
export declare const DEFAULT_USER_AGENT: string;
export { CookieJar };
export interface ICookieJar extends CookieJar {
    enableLooseMode?: boolean;
    store?: {
        idx?: {};
    };
}
export interface IFromUrlOptions extends Partial<IOptions & FromUrlOptions> {
    requestOptions?: Partial<IRequestOptions>;
    cookieJar?: ICookieJar;
}
export interface IRequestOptions {
    resolveWithFullResponse: boolean;
    encoding: any;
    gzip: boolean;
    headers: {
        "User-Agent": any;
        Referer: any;
        Accept: string;
        "Accept-Language": string;
    };
    jar: any;
}
export declare function fromURL(url: string, options?: IFromUrlOptions): Promise<IJSDOM>;
export declare function normalizeRequestOptions(options: IFromUrlOptions): Partial<IRequestOptions>;
export declare function normalizeFromURLOptions(options: Partial<IFromUrlOptions>): Partial<IFromUrlOptions>;
export interface INormalizeHTML {
    html: string;
    encoding: string;
}
import * as self from './from-url';
export default self;
