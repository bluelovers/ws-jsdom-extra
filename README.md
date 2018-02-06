# jsdom-extra

> JSDOM with extra prototype

`npm i jsdom-extra`

## demo

### createJSDOM

with create jsdom with extra prototype

```ts
interface IJSDOM extends JSDOM
{
	$: JQueryStatic,
	url: URL,
	document: Document,

	_options: IJSDOM_Symbol_Options,

	then<T>(cb: (jsdom: IJSDOM) => T): T
}

createJSDOM(html?: string | Buffer | BinaryData, options: IOptions = {})
```

### fake Promise then

```ts
// fake .then, not realy Promise
createJSDOM().then(function (jsdom)
{
	console.log(jsdom._options);
});
```

### packJSDOM(jsdom: JSDOM): IJSDOM

pack any jsdom object with extra

```ts
import { JSDOM } from 'jsdom';
import { packJSDOM } from 'jsdom-extra';

let jsdom2 = new JSDOM();

// will overwrite jsdom2 too
packJSDOM(jsdom2) // => return jsdom2
```

### lazy overwrite / require

will overwrite global JSDOM

```ts
import JSDOM from 'jsdom-extra/auto';
const JSDOM = require("jsdom-extra/auto").JSDOM;
```
