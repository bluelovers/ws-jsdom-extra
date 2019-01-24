/**
 * Created by user on 2018/2/6/006.
 */

import Promise = require('bluebird');
import request = require('request-promise');
import { ResponseRequest } from 'request';

export { Promise, request }
export { ResponseRequest }

export function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}

export default exports as typeof import('./index');
