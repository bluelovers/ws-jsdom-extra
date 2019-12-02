/**
 * Created by user on 2018/2/6/006.
 */

import { chai, relative, expect, path, assert, util } from './_local-dev';

// @ts-ignore
import { describe, before, beforeEach, it, ITest } from 'mocha';

import { JSDOM, createJSDOM, isPackedJSDOM, SYMBOL_RAW, fromFile } from '..';
import CONSTS from '../lib/const';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	beforeEach(function ()
	{
		// @ts-ignore
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`suite`, () =>
	{
		// @ts-ignore
		it(`simple check`, function ()
		{
			return fromFile(path.join(__dirname, './res/test.html'))

				.then(function (jsdom)
				{
					let html = jsdom.serialize();

					console.log(html);

					console.log(jsdom._options);

					expect(html).to.be.equal(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Hello</title>` +
						`</head><body><p>Hi</p>\n</body></html>`);
				})
				.catch(function (e)
				{
					//done();
					return Promise.reject(e);

					//return Promise.resolve(e);
				})
				.then(function (r)
				{
					//done(r);
					return Promise.resolve(r);
				})
			;
		});
	});
});
