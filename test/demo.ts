/**
 * Created by user on 2018/2/6/006.
 */

import { createJSDOM } from '..';

let jsdom = createJSDOM();

console.log(jsdom.url);

console.log(jsdom.$(':root'));

console.log(jsdom._options);
