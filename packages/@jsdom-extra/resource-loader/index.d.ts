/**
 * Created by user on 2020/4/29.
 */
import { IJSDOM_ResourceLoader } from './resource-loader';
export declare type IOptionsWithWindowOptionsWithResourceLoader = {
    windowOptions?: {
        resourceLoader?: IJSDOM_ResourceLoader | BaseResourceLoader | any;
    };
};
export declare abstract class abstractResourceLoader {
    abstract readFile(filePath: any, options?: {
        defaultEncoding?: any;
        detectMetaCharset?: any;
    }, callback?: any): any;
    abstract wrapCookieJarForRequest(cookieJar: any): any;
    abstract enqueue(element: any, resourceUrl?: any, callback?: any): any;
    abstract download(url: any, options?: any, callback?: any): any;
    abstract load(element: any, urlString?: any, options?: any, callback?: any): any;
}
export declare type IOptionsResourceLoader = {
    fnResourceLoader?: Partial<IResourceLoader>;
};
export declare class BaseResourceLoader extends abstractResourceLoader {
    options?: IOptionsResourceLoader;
    constructor(options?: IOptionsResourceLoader);
    readFile(filePath: any, options?: {
        defaultEncoding?: any;
        detectMetaCharset?: any;
    }, callback?: any): any;
    wrapCookieJarForRequest(cookieJar: any): any;
    enqueue(element: any, resourceUrl?: any, callback?: any): any;
    download(url: any, options?: any, callback?: any): any;
    load(element: any, urlString?: any, options?: any, callback?: any): any;
}
export interface IResourceLoader {
    readFile(filePath: any, options?: {
        defaultEncoding?: any;
        detectMetaCharset?: any;
    }, callback?: any): any;
    wrapCookieJarForRequest(cookieJar: any): any;
    enqueue(element: any, resourceUrl?: any, callback?: any): any;
    download(url: any, options?: any, callback?: any): any;
    load(element: any, urlString?: any, options?: any, callback?: any): any;
}
export declare type ITypeResourceLoader<T> = T extends abstractResourceLoader ? abstractResourceLoader : T extends IJSDOM_ResourceLoader ? IJSDOM_ResourceLoader : any;
export default BaseResourceLoader;
