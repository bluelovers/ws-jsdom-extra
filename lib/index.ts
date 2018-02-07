/**
 * Created by user on 2018/2/6/006.
 */

import * as Promise from 'bluebird';
import * as request from 'request-promise';

export { Promise, request }

export function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}

import * as self from './index';
export default self;
//export default exports;
