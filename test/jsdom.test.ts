/**
 * Created by user on 2018/2/6/006.
 */

import { SYMBOL_RAW } from '../lib/const';
import { IJSDOM, packJSDOM } from '../lib/pack';
import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import { JSDOM, createJSDOM, isPackedJSDOM } from '..';

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
		it(`createJSDOM: check JSDOM still is old JSDOM`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual;
			let expected;

			let jsdom1 = createJSDOM();
			let jsdom2 = new JSDOM();

			expect(isPackedJSDOM(jsdom1)).to.be.ok;
			expect(isPackedJSDOM(jsdom2)).to.be.not.ok;

			//expect(actual).to.be.ok;
			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			done();
		});

		// @ts-ignore
		it(`packJSDOM: keep exists Symbol(SYMBOL_RAW)`, function (done)
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			let actual;
			let expected;

			let jsdom1 = new JSDOM();

			jsdom1[SYMBOL_RAW] = {
				options: {
					a: 1,
					options: {
						b: 2,
					},
				},
			};

			expect(isPackedJSDOM(jsdom1)).to.be.not.ok;

			jsdom1 = packJSDOM(jsdom1) as IJSDOM;

			expect((jsdom1 as IJSDOM)._options).to.be.deep.equal({
				a: 1,
				options: {
					b: 2,
				},
			});

			console.log(jsdom1);

			console.log(jsdom1.serialize());

			//expect(actual).to.be.ok;
			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));

			done();
		});
	});
});
