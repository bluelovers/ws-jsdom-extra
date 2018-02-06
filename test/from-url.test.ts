/**
 * Created by user on 2018/2/6/006.
 */

import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import { IFromUrlOptions, normalizeFromURLOptions, CookieJar, DEFAULT_USER_AGENT, normalizeRequestOptions, wrapCookieJarForRequest } from '../lib/from-url';

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
		it(`url & contentType will be remove`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let options: IFromUrlOptions = {
				// @ts-ignore
				url: '123',
				contentType: '456',
			};

			let actual = normalizeFromURLOptions(options);
			let expected = {
				"userAgent": DEFAULT_USER_AGENT,
				"cookieJar": new CookieJar(),
			};

			console.log(actual);
			//console.log(expected);

			expect(actual).to.be.deep.equal(expected);

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			done();
		});

		it(`normalizeRequestOptions`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let options: IFromUrlOptions = {
				// @ts-ignore
				url: '123',
				contentType: '456',

				requestOptions: {
					method: 'POST',
					form: {
						keyword: '',
						compType: '',
						Page: 1,
					},
				}
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
					"User-Agent": "Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/1.0.0",
				},
				"jar": wrapCookieJarForRequest(new CookieJar()),
				"method": "POST",
				"resolveWithFullResponse": true,
			};

			console.log(actual);
			//console.log(expected);

			expect(actual).to.be.deep.equal(expected);

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			done();
		});
	});
});
