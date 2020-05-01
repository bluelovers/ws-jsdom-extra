/**
 * Created by user on 2020/4/29.
 */

import { minifyHTML, tryMinifyHTML } from './minify';
import { normalizeHTML, INormalizeHTML } from './normalize';
import { tryMinifyHTMLOfElem } from './jquery';

export { minifyHTML, tryMinifyHTML }
export { normalizeHTML, INormalizeHTML }
export { tryMinifyHTMLOfElem }

export default tryMinifyHTML
