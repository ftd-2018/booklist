export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
	'[object Boolean]': 'boolean',
	'[object Number]': 'number',
	'[object String]': 'string',
	'[object Function]': 'function',
	'[object Array]': 'array',
	'[object Date]': 'date',
	'[object RegExp]': 'regExp',
	'[object Undefined]': 'undefined',
	'[object Null]': 'null',
	'[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

/**
 * 深拷贝
 */
export const deepCopy = (obj) => {
	const t = typeOf(obj);
	  let o;

	  if (t === 'array') {
		o = [];
	  } else if (t === 'object') {
		o = {};
	  } else {
		return obj;
	  }

	  if (t === 'array') {
		for (let i = 0; i < obj.length; i++) {
		  o.push(deepCopy(obj[i]));
		}
	  } else if (t === 'object') {
		for (let i in obj) {
		  o[i] = deepCopy(obj[i]);
		}
	  }
	  return o;
}

export const removeNull = function(obj){
	let o = deepCopy(obj);
	let param = {};
	for(let k in o){
		if(o[k] != null && o[k] != undefined && o[k] != '' ){
			param[k] = o[k];
		}
	}
	return param;
}