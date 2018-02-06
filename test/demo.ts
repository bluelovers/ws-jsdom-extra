/**
 * Created by user on 2018/2/6/006.
 */

import { createJSDOM } from '..';

let jsdom = createJSDOM();

console.log(jsdom.url);

console.log(jsdom.$(':root').get(0));

console.log(jsdom._options);

// @ts-ignore
console.log(jsdom.__proto__);

// @ts-ignore
console.log(typeof String(jsdom.__proto__));

console.log(jsdom.document.documentElement);
