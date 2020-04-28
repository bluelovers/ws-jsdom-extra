/**
 * Created by user on 2018/2/6/006.
 */

import { LazyCookie } from '../lib/cookies';
import { IJSDOM, packJSDOM } from '../lib/pack';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import { IFromUrlOptions, normalizeFromURLOptions, CookieJar, DEFAULT_USER_AGENT, normalizeRequestOptions, wrapCookieJarForRequest, requestToJSDOM, URL, LazyCookieJar } from '../lib/from-url';
import * as CONSTS from '../lib/const';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`suite`, () =>
	{
		// @ts-ignore
		it(`url & contentType will be remove`, mochaAsync(function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let options: IFromUrlOptions = {
				// @ts-ignore
				url: '123',
				// @ts-ignore
				contentType: '456',
			};

			let actual = normalizeFromURLOptions(options);
			let expected = {
				"userAgent": DEFAULT_USER_AGENT,
				"cookieJar": new LazyCookieJar(),
			};

			console.dir(actual.cookieJar);
			console.dir(expected.cookieJar);

			console.log(actual);
			//console.log(expected);

			//delete actual.cookieJar;
			//delete expected.cookieJar;

			expect(actual).to.be.deep.equal(expected);

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

		}));

		it(`normalizeRequestOptions`, mochaAsync(function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let options: IFromUrlOptions = {
				// @ts-ignore
				url: '123',
				// @ts-ignore
				contentType: '456',

				requestOptions: {
					method: 'POST',
					form: {
						keyword: '',
						compType: '',
						Page: 1,
					},
				},
			};

			let actual = normalizeRequestOptions(normalizeFromURLOptions(options));
			let expected = {
				"encoding": null,
				"form": {
					"Page": 1,
					"compType": "",
					"keyword": "",
				},
				"gzip": true,
				"headers": {
					"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"Accept-Language": "en",
					"Referer": undefined,
					"User-Agent": CONSTS.DEFAULT_USER_AGENT,
				},
				"jar": wrapCookieJarForRequest(new LazyCookieJar()),
				"method": "POST",
				"resolveWithFullResponse": true,
			};

			console.log(actual);
			//console.log(expected);

			//delete actual.jar;
			//delete expected.jar;

			expect(actual).to.be.deep.equal(expected);

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		}));

		it(`requestToJSDOM`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let options: IFromUrlOptions = {
				// @ts-ignore
				url: 'http://www.google.com',
				// @ts-ignore
				contentType: '456',

				requestOptions: {
					method: 'POST',
					form: {
						keyword: '',
						compType: '',
						Page: 1,
					},
				},
			};

			let opts = normalizeFromURLOptions(options);

			let actual = normalizeRequestOptions(opts);
			let expected = {
				"encoding": null,
				"form": {
					"Page": 1,
					"compType": "",
					"keyword": "",
				},
				"gzip": true,
				"headers": {
					"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"Accept-Language": "en",
					"Referer": undefined,
					"User-Agent": CONSTS.DEFAULT_USER_AGENT,
				},
				"jar": wrapCookieJarForRequest(new LazyCookieJar()),
				"method": "POST",
				"resolveWithFullResponse": true,
			};

			// @ts-ignore
			let url =  new URL(options.url);

			// @ts-ignore
			let jsdom: IJSDOM = requestToJSDOM({
				headers: {},
				// @ts-ignore
				body: '',
				request: {
					href: url.href,
					getHeader()
					{
						return url.href
					},
				},
			}, url, opts, actual);

			jsdom = packJSDOM(jsdom);

			//console.log(jsdom._options);

			console.log(jsdom._options.requestOptions);
			//console.log(expected);

			//delete jsdom._options.requestOptions.jar;
			//delete expected.jar;

			//expect(jsdom._options.requestOptions.jar).to.be.deep.equal(expected.jar);

			expect(jsdom._options.requestOptions).to.be.deep.equal(expected);

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});
	});
});
