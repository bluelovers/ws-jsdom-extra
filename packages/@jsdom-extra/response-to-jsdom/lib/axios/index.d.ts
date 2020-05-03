/// <reference types="jsdom" />
/// <reference types="jquery" />
import { AxiosResponse } from 'axios';
import { IConstructorOptions as IJSDOMConstructorOptions } from 'jsdom-extra/lib/pack';
export interface IOptions {
    response?: AxiosResponse;
    jsdomOptions?: IJSDOMConstructorOptions;
}
export declare function axiosResponseToJSDOMOptions(opts?: IOptions): Partial<import("jsdom").ConstructorOptions & import("@jsdom-extra/jsdom-to-query").IOptionsCreateQuery<Partial<JQueryStatic>, any, import("jsdom").JSDOM> & import("jsdom-extra/lib/pack").IOptions & {
    minifyHTML?: boolean;
} & import("@jsdom-extra/resource-loader").IOptionsWithWindowOptionsWithResourceLoader>;
export default axiosResponseToJSDOMOptions;
