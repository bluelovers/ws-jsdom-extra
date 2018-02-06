/**
 * Created by user on 2018/2/6/006.
 */

import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import { IFromUrlOptions, normalizeFromURLOptions, CookieJar, DEFAULT_USER_AGENT } from '../lib/from-url';

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
			console.log(expected);

			expect(actual).to.be.deep.equal(expected);

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			done();
		});
	});
});
