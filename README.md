# jsdom-extra

> JSDOM with extra prototype ( jquery / cheerio )

`npm i jsdom-extra`

## optional install

```
if u didn't need jquery or cheerio, then no need install them.
but never try set/get $ from jsdom
or will throw Error
```

### use with jquery

`npm i jsdom-extra jquery`

### use with cheerio

`npm i jsdom-extra cheerio`

## demo

* [API](lib/pack.d.ts)

### jquery or cheerio

```ts
// return jquery or cheerio
let $ = createJSDOM().$;
$(':root').length;
```

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
// fake .then, not realy Promise, still is sync
createJSDOM().fakeThen(function (jsdom)
{
	console.log(jsdom._options);
});
```

### asyncJSDOM / Promise

```ts
asyncJSDOM().then(function (jsdom)
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

### fromURL

* [API: fromURL](lib/from-url.d.ts)

> allow use POST on fromURL

```ts
function fromURL(url: string, options?: IFromUrlOptions): Promise<IJSDOM>
```

```ts
export interface IFromUrlOptions extends Partial<FromUrlOptions & IOptionsJSDOM>
{
	requestOptions?: Partial<IRequestOptions>,
	cookieJar?: ICookieJar,
}

export interface IRequestOptionsJSDOM
{
	resolveWithFullResponse: boolean;
	encoding: null;
	gzip: boolean;
	headers: {
		"User-Agent": string;
		Referer: string;
		Accept: string;
		"Accept-Language": string;
	};
	jar: IRequestJar;
}

export interface IRequestOptions extends Partial<IRequestOptionsJSDOM>
{
	method?: 'POST' | 'GET' | string,
	form?: {
		[key: string]: any,
		[key: number]: any,
	},
}
```

### fromFile

```ts
function fromFile(url: string, options?: IFromFileOptions): Promise<IJSDOM>
```

### get the finally options that use on create JSDOM

```ts
createJSDOM()._options.ConstructorOptions
```

output

```ts
   { windowOptions: 
      { url: 'about:blank',
        referrer: '',
        contentType: 'text/html',
        parsingMode: 'html',
        userAgent: 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.6.2',
        parseOptions: [Object],
        runScripts: undefined,
        encoding: 'UTF-8',
        pretendToBeVisual: false,
        virtualConsole: [VirtualConsole],
        cookieJar: [CookieJar] },
     resources: undefined,
     beforeParse: [Function] }
```

### lazy overwrite / require

will overwrite global JSDOM

```ts
import JSDOM from 'jsdom-extra/auto';
const JSDOM = require("jsdom-extra/auto").JSDOM;
```

### globalJsdom

same as `jsdom-global`, but with

```ts
function globalJsdom<T>(html?, options: Partial<T & IConstructorOptions & IOptions> = {})
```

#### create

```ts
require("jsdom-extra/global")()

const globalJsdom = require("jsdom-extra/global");
globalJsdom();
```

```ts
let ret: {
       jsdom: IGlobalJSDOM;
       window: DOMWindow;
       document: Document;
       cleanup: () => void;
   };

ret = globalJsdom();
```

#### cleanup

```ts
ret.cleanup();
ret.jsdom.cleanup();
```

#### Mocha

__Simple:__ Use Mocha's `--require` option. Add this to the `test/mocha.opts` file (create it if it doesn't exist)

```
mocha --require jsdom-extra/lib/global/register
```

__Advanced:__ For finer control, you can instead add it via [mocha]'s `before` and `after` hooks.

```ts
before(function () {
  this.globalJsdom = require('jsdom-extra/global')()
})

after(function () {
  this.globalJsdom.cleanup()
})
```


[mocha]: https://mochajs.org/
