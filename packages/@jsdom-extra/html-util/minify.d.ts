/**
 * Created by user on 2020/4/29.
 */
import { Options as IMinifyOptions } from 'html-minifier';
export declare function minifyHTML(html: any, options?: IMinifyOptions, logError?: boolean | number): string;
export declare function tryMinifyHTML(html: string, throwError?: boolean | ((html: string) => any)): any;
export default minifyHTML;
