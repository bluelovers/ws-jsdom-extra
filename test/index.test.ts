/**
 * Created by user on 2018/2/6/006.
 */

import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import { JSDOM, createJSDOM, isPackedJSDOM, SYMBOL_RAW } from '..';
import CONSTS from '../lib/const';

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
		it(`simple check`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual;
			let expected;

			let jsdom = createJSDOM();

			expect(isPackedJSDOM(jsdom)).to.be.ok;

			expect(jsdom._options).to.be.ok;
			expect(jsdom._options.ConstructorOptions).to.be.ok;
			expect(jsdom.document).to.be.ok;
			expect(jsdom.window).to.be.ok;
			//expect(jsdom.$).to.be.ok;
			expect(jsdom[SYMBOL_RAW]).to.be.ok;
			expect(jsdom[CONSTS.SYMBOL_PACKED]).to.be.deep.equal(true);

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			console.log(jsdom._options);

			console.log(jsdom.cookieJar.serializeSync());

			done();
		});
	});
});
