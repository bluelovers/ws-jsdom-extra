/**
 * Created by user on 2018/2/6/006.
 */

// @ts-ignore
import { version as packageVersion } from '../package.json';

export const DEFAULT_USER_AGENT = `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${packageVersion}`;

export const SYMBOL_RAW = Symbol.for('raw_query');

import * as self from './const';
export default self;
//export default exports;
