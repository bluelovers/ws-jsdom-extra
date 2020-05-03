/// <reference types="jsdom" />
/**
 * Created by user on 2020/5/3.
 */
import { AxiosResponse } from 'axios';
import { CookieJar } from 'jsdom-extra';
export declare function getResponseUrl(rp: AxiosResponse): string;
export declare function getResponseUrlFromResponse(rp: AxiosResponse): string;
export declare function getResponseUrlFromResponseWithConfig(rp: AxiosResponse): string;
export declare function getResponseCookieJar(rp: AxiosResponse): CookieJar;
export declare function getResponseUserAgent(rp: AxiosResponse): string;
export declare function getResponseUserReferer(rp: AxiosResponse): string;
