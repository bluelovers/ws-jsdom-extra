/**
 * Created by user on 2020/4/29.
 */
import IJSDOM_ResourceLoader from 'jsdom/lib/jsdom/browser/resources/resource-loader';
export declare type IJSDOM_ResourceLoader = typeof import('jsdom/lib/jsdom/browser/resources/resource-loader');
export declare function getJSDOMResourceLoader(): IJSDOM_ResourceLoader;
declare let JSDOM_ResourceLoader: IJSDOM_ResourceLoader;
export { JSDOM_ResourceLoader };
export default getJSDOMResourceLoader;
