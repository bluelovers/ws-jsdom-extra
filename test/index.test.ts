/**
 * Created by user on 2018/2/6/006.
 */

import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import { JSDOM, createJSDOM, isPacked, SYMBOL_RAW } from '..';

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
		it(`test`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual;
			let expected;

			let jsdom = createJSDOM();

			expect(jsdom._options).to.be.ok;
			expect(jsdom._options.ConstructorOptions).to.be.ok;
			expect(jsdom.document).to.be.ok;
			expect(jsdom.window).to.be.ok;
			expect(jsdom.$).to.be.ok;
			expect(jsdom[SYMBOL_RAW]).to.be.ok;

			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			done();
		});
	});
});
