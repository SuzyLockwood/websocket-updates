(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/classlist.js/classList.js":
/*!************************************************!*\
  !*** ./node_modules/classlist.js/classList.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		if (ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}

}



/***/ }),

/***/ "./node_modules/core-js/es6/array.js":
/*!*******************************************!*\
  !*** ./node_modules/core-js/es6/array.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/es6.array.is-array */ "./node_modules/core-js/modules/es6.array.is-array.js");
__webpack_require__(/*! ../modules/es6.array.from */ "./node_modules/core-js/modules/es6.array.from.js");
__webpack_require__(/*! ../modules/es6.array.of */ "./node_modules/core-js/modules/es6.array.of.js");
__webpack_require__(/*! ../modules/es6.array.join */ "./node_modules/core-js/modules/es6.array.join.js");
__webpack_require__(/*! ../modules/es6.array.slice */ "./node_modules/core-js/modules/es6.array.slice.js");
__webpack_require__(/*! ../modules/es6.array.sort */ "./node_modules/core-js/modules/es6.array.sort.js");
__webpack_require__(/*! ../modules/es6.array.for-each */ "./node_modules/core-js/modules/es6.array.for-each.js");
__webpack_require__(/*! ../modules/es6.array.map */ "./node_modules/core-js/modules/es6.array.map.js");
__webpack_require__(/*! ../modules/es6.array.filter */ "./node_modules/core-js/modules/es6.array.filter.js");
__webpack_require__(/*! ../modules/es6.array.some */ "./node_modules/core-js/modules/es6.array.some.js");
__webpack_require__(/*! ../modules/es6.array.every */ "./node_modules/core-js/modules/es6.array.every.js");
__webpack_require__(/*! ../modules/es6.array.reduce */ "./node_modules/core-js/modules/es6.array.reduce.js");
__webpack_require__(/*! ../modules/es6.array.reduce-right */ "./node_modules/core-js/modules/es6.array.reduce-right.js");
__webpack_require__(/*! ../modules/es6.array.index-of */ "./node_modules/core-js/modules/es6.array.index-of.js");
__webpack_require__(/*! ../modules/es6.array.last-index-of */ "./node_modules/core-js/modules/es6.array.last-index-of.js");
__webpack_require__(/*! ../modules/es6.array.copy-within */ "./node_modules/core-js/modules/es6.array.copy-within.js");
__webpack_require__(/*! ../modules/es6.array.fill */ "./node_modules/core-js/modules/es6.array.fill.js");
__webpack_require__(/*! ../modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
__webpack_require__(/*! ../modules/es6.array.find-index */ "./node_modules/core-js/modules/es6.array.find-index.js");
__webpack_require__(/*! ../modules/es6.array.species */ "./node_modules/core-js/modules/es6.array.species.js");
__webpack_require__(/*! ../modules/es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Array;


/***/ }),

/***/ "./node_modules/core-js/es6/date.js":
/*!******************************************!*\
  !*** ./node_modules/core-js/es6/date.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.date.now */ "./node_modules/core-js/modules/es6.date.now.js");
__webpack_require__(/*! ../modules/es6.date.to-json */ "./node_modules/core-js/modules/es6.date.to-json.js");
__webpack_require__(/*! ../modules/es6.date.to-iso-string */ "./node_modules/core-js/modules/es6.date.to-iso-string.js");
__webpack_require__(/*! ../modules/es6.date.to-string */ "./node_modules/core-js/modules/es6.date.to-string.js");
__webpack_require__(/*! ../modules/es6.date.to-primitive */ "./node_modules/core-js/modules/es6.date.to-primitive.js");
module.exports = Date;


/***/ }),

/***/ "./node_modules/core-js/es6/function.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/es6/function.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.function.bind */ "./node_modules/core-js/modules/es6.function.bind.js");
__webpack_require__(/*! ../modules/es6.function.name */ "./node_modules/core-js/modules/es6.function.name.js");
__webpack_require__(/*! ../modules/es6.function.has-instance */ "./node_modules/core-js/modules/es6.function.has-instance.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Function;


/***/ }),

/***/ "./node_modules/core-js/es6/map.js":
/*!*****************************************!*\
  !*** ./node_modules/core-js/es6/map.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.map */ "./node_modules/core-js/modules/es6.map.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Map;


/***/ }),

/***/ "./node_modules/core-js/es6/math.js":
/*!******************************************!*\
  !*** ./node_modules/core-js/es6/math.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.math.acosh */ "./node_modules/core-js/modules/es6.math.acosh.js");
__webpack_require__(/*! ../modules/es6.math.asinh */ "./node_modules/core-js/modules/es6.math.asinh.js");
__webpack_require__(/*! ../modules/es6.math.atanh */ "./node_modules/core-js/modules/es6.math.atanh.js");
__webpack_require__(/*! ../modules/es6.math.cbrt */ "./node_modules/core-js/modules/es6.math.cbrt.js");
__webpack_require__(/*! ../modules/es6.math.clz32 */ "./node_modules/core-js/modules/es6.math.clz32.js");
__webpack_require__(/*! ../modules/es6.math.cosh */ "./node_modules/core-js/modules/es6.math.cosh.js");
__webpack_require__(/*! ../modules/es6.math.expm1 */ "./node_modules/core-js/modules/es6.math.expm1.js");
__webpack_require__(/*! ../modules/es6.math.fround */ "./node_modules/core-js/modules/es6.math.fround.js");
__webpack_require__(/*! ../modules/es6.math.hypot */ "./node_modules/core-js/modules/es6.math.hypot.js");
__webpack_require__(/*! ../modules/es6.math.imul */ "./node_modules/core-js/modules/es6.math.imul.js");
__webpack_require__(/*! ../modules/es6.math.log10 */ "./node_modules/core-js/modules/es6.math.log10.js");
__webpack_require__(/*! ../modules/es6.math.log1p */ "./node_modules/core-js/modules/es6.math.log1p.js");
__webpack_require__(/*! ../modules/es6.math.log2 */ "./node_modules/core-js/modules/es6.math.log2.js");
__webpack_require__(/*! ../modules/es6.math.sign */ "./node_modules/core-js/modules/es6.math.sign.js");
__webpack_require__(/*! ../modules/es6.math.sinh */ "./node_modules/core-js/modules/es6.math.sinh.js");
__webpack_require__(/*! ../modules/es6.math.tanh */ "./node_modules/core-js/modules/es6.math.tanh.js");
__webpack_require__(/*! ../modules/es6.math.trunc */ "./node_modules/core-js/modules/es6.math.trunc.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Math;


/***/ }),

/***/ "./node_modules/core-js/es6/number.js":
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/number.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.number.constructor */ "./node_modules/core-js/modules/es6.number.constructor.js");
__webpack_require__(/*! ../modules/es6.number.to-fixed */ "./node_modules/core-js/modules/es6.number.to-fixed.js");
__webpack_require__(/*! ../modules/es6.number.to-precision */ "./node_modules/core-js/modules/es6.number.to-precision.js");
__webpack_require__(/*! ../modules/es6.number.epsilon */ "./node_modules/core-js/modules/es6.number.epsilon.js");
__webpack_require__(/*! ../modules/es6.number.is-finite */ "./node_modules/core-js/modules/es6.number.is-finite.js");
__webpack_require__(/*! ../modules/es6.number.is-integer */ "./node_modules/core-js/modules/es6.number.is-integer.js");
__webpack_require__(/*! ../modules/es6.number.is-nan */ "./node_modules/core-js/modules/es6.number.is-nan.js");
__webpack_require__(/*! ../modules/es6.number.is-safe-integer */ "./node_modules/core-js/modules/es6.number.is-safe-integer.js");
__webpack_require__(/*! ../modules/es6.number.max-safe-integer */ "./node_modules/core-js/modules/es6.number.max-safe-integer.js");
__webpack_require__(/*! ../modules/es6.number.min-safe-integer */ "./node_modules/core-js/modules/es6.number.min-safe-integer.js");
__webpack_require__(/*! ../modules/es6.number.parse-float */ "./node_modules/core-js/modules/es6.number.parse-float.js");
__webpack_require__(/*! ../modules/es6.number.parse-int */ "./node_modules/core-js/modules/es6.number.parse-int.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Number;


/***/ }),

/***/ "./node_modules/core-js/es6/object.js":
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/object.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
__webpack_require__(/*! ../modules/es6.object.create */ "./node_modules/core-js/modules/es6.object.create.js");
__webpack_require__(/*! ../modules/es6.object.define-property */ "./node_modules/core-js/modules/es6.object.define-property.js");
__webpack_require__(/*! ../modules/es6.object.define-properties */ "./node_modules/core-js/modules/es6.object.define-properties.js");
__webpack_require__(/*! ../modules/es6.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js");
__webpack_require__(/*! ../modules/es6.object.get-prototype-of */ "./node_modules/core-js/modules/es6.object.get-prototype-of.js");
__webpack_require__(/*! ../modules/es6.object.keys */ "./node_modules/core-js/modules/es6.object.keys.js");
__webpack_require__(/*! ../modules/es6.object.get-own-property-names */ "./node_modules/core-js/modules/es6.object.get-own-property-names.js");
__webpack_require__(/*! ../modules/es6.object.freeze */ "./node_modules/core-js/modules/es6.object.freeze.js");
__webpack_require__(/*! ../modules/es6.object.seal */ "./node_modules/core-js/modules/es6.object.seal.js");
__webpack_require__(/*! ../modules/es6.object.prevent-extensions */ "./node_modules/core-js/modules/es6.object.prevent-extensions.js");
__webpack_require__(/*! ../modules/es6.object.is-frozen */ "./node_modules/core-js/modules/es6.object.is-frozen.js");
__webpack_require__(/*! ../modules/es6.object.is-sealed */ "./node_modules/core-js/modules/es6.object.is-sealed.js");
__webpack_require__(/*! ../modules/es6.object.is-extensible */ "./node_modules/core-js/modules/es6.object.is-extensible.js");
__webpack_require__(/*! ../modules/es6.object.assign */ "./node_modules/core-js/modules/es6.object.assign.js");
__webpack_require__(/*! ../modules/es6.object.is */ "./node_modules/core-js/modules/es6.object.is.js");
__webpack_require__(/*! ../modules/es6.object.set-prototype-of */ "./node_modules/core-js/modules/es6.object.set-prototype-of.js");
__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");

module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Object;


/***/ }),

/***/ "./node_modules/core-js/es6/parse-float.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/es6/parse-float.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.parse-float */ "./node_modules/core-js/modules/es6.parse-float.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").parseFloat;


/***/ }),

/***/ "./node_modules/core-js/es6/parse-int.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/es6/parse-int.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.parse-int */ "./node_modules/core-js/modules/es6.parse-int.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").parseInt;


/***/ }),

/***/ "./node_modules/core-js/es6/reflect.js":
/*!*********************************************!*\
  !*** ./node_modules/core-js/es6/reflect.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.reflect.apply */ "./node_modules/core-js/modules/es6.reflect.apply.js");
__webpack_require__(/*! ../modules/es6.reflect.construct */ "./node_modules/core-js/modules/es6.reflect.construct.js");
__webpack_require__(/*! ../modules/es6.reflect.define-property */ "./node_modules/core-js/modules/es6.reflect.define-property.js");
__webpack_require__(/*! ../modules/es6.reflect.delete-property */ "./node_modules/core-js/modules/es6.reflect.delete-property.js");
__webpack_require__(/*! ../modules/es6.reflect.enumerate */ "./node_modules/core-js/modules/es6.reflect.enumerate.js");
__webpack_require__(/*! ../modules/es6.reflect.get */ "./node_modules/core-js/modules/es6.reflect.get.js");
__webpack_require__(/*! ../modules/es6.reflect.get-own-property-descriptor */ "./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js");
__webpack_require__(/*! ../modules/es6.reflect.get-prototype-of */ "./node_modules/core-js/modules/es6.reflect.get-prototype-of.js");
__webpack_require__(/*! ../modules/es6.reflect.has */ "./node_modules/core-js/modules/es6.reflect.has.js");
__webpack_require__(/*! ../modules/es6.reflect.is-extensible */ "./node_modules/core-js/modules/es6.reflect.is-extensible.js");
__webpack_require__(/*! ../modules/es6.reflect.own-keys */ "./node_modules/core-js/modules/es6.reflect.own-keys.js");
__webpack_require__(/*! ../modules/es6.reflect.prevent-extensions */ "./node_modules/core-js/modules/es6.reflect.prevent-extensions.js");
__webpack_require__(/*! ../modules/es6.reflect.set */ "./node_modules/core-js/modules/es6.reflect.set.js");
__webpack_require__(/*! ../modules/es6.reflect.set-prototype-of */ "./node_modules/core-js/modules/es6.reflect.set-prototype-of.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Reflect;


/***/ }),

/***/ "./node_modules/core-js/es6/regexp.js":
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/regexp.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
__webpack_require__(/*! ../modules/es6.regexp.to-string */ "./node_modules/core-js/modules/es6.regexp.to-string.js");
__webpack_require__(/*! ../modules/es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
__webpack_require__(/*! ../modules/es6.regexp.match */ "./node_modules/core-js/modules/es6.regexp.match.js");
__webpack_require__(/*! ../modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
__webpack_require__(/*! ../modules/es6.regexp.search */ "./node_modules/core-js/modules/es6.regexp.search.js");
__webpack_require__(/*! ../modules/es6.regexp.split */ "./node_modules/core-js/modules/es6.regexp.split.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").RegExp;


/***/ }),

/***/ "./node_modules/core-js/es6/set.js":
/*!*****************************************!*\
  !*** ./node_modules/core-js/es6/set.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.set */ "./node_modules/core-js/modules/es6.set.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Set;


/***/ }),

/***/ "./node_modules/core-js/es6/string.js":
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/string.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.string.from-code-point */ "./node_modules/core-js/modules/es6.string.from-code-point.js");
__webpack_require__(/*! ../modules/es6.string.raw */ "./node_modules/core-js/modules/es6.string.raw.js");
__webpack_require__(/*! ../modules/es6.string.trim */ "./node_modules/core-js/modules/es6.string.trim.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/es6.string.code-point-at */ "./node_modules/core-js/modules/es6.string.code-point-at.js");
__webpack_require__(/*! ../modules/es6.string.ends-with */ "./node_modules/core-js/modules/es6.string.ends-with.js");
__webpack_require__(/*! ../modules/es6.string.includes */ "./node_modules/core-js/modules/es6.string.includes.js");
__webpack_require__(/*! ../modules/es6.string.repeat */ "./node_modules/core-js/modules/es6.string.repeat.js");
__webpack_require__(/*! ../modules/es6.string.starts-with */ "./node_modules/core-js/modules/es6.string.starts-with.js");
__webpack_require__(/*! ../modules/es6.string.anchor */ "./node_modules/core-js/modules/es6.string.anchor.js");
__webpack_require__(/*! ../modules/es6.string.big */ "./node_modules/core-js/modules/es6.string.big.js");
__webpack_require__(/*! ../modules/es6.string.blink */ "./node_modules/core-js/modules/es6.string.blink.js");
__webpack_require__(/*! ../modules/es6.string.bold */ "./node_modules/core-js/modules/es6.string.bold.js");
__webpack_require__(/*! ../modules/es6.string.fixed */ "./node_modules/core-js/modules/es6.string.fixed.js");
__webpack_require__(/*! ../modules/es6.string.fontcolor */ "./node_modules/core-js/modules/es6.string.fontcolor.js");
__webpack_require__(/*! ../modules/es6.string.fontsize */ "./node_modules/core-js/modules/es6.string.fontsize.js");
__webpack_require__(/*! ../modules/es6.string.italics */ "./node_modules/core-js/modules/es6.string.italics.js");
__webpack_require__(/*! ../modules/es6.string.link */ "./node_modules/core-js/modules/es6.string.link.js");
__webpack_require__(/*! ../modules/es6.string.small */ "./node_modules/core-js/modules/es6.string.small.js");
__webpack_require__(/*! ../modules/es6.string.strike */ "./node_modules/core-js/modules/es6.string.strike.js");
__webpack_require__(/*! ../modules/es6.string.sub */ "./node_modules/core-js/modules/es6.string.sub.js");
__webpack_require__(/*! ../modules/es6.string.sup */ "./node_modules/core-js/modules/es6.string.sup.js");
__webpack_require__(/*! ../modules/es6.regexp.match */ "./node_modules/core-js/modules/es6.regexp.match.js");
__webpack_require__(/*! ../modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
__webpack_require__(/*! ../modules/es6.regexp.search */ "./node_modules/core-js/modules/es6.regexp.search.js");
__webpack_require__(/*! ../modules/es6.regexp.split */ "./node_modules/core-js/modules/es6.regexp.split.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").String;


/***/ }),

/***/ "./node_modules/core-js/es6/symbol.js":
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/symbol.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/core-js/es6/weak-map.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/es6/weak-map.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
__webpack_require__(/*! ../modules/es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").WeakMap;


/***/ }),

/***/ "./node_modules/core-js/es7/object.js":
/*!********************************************!*\
  !*** ./node_modules/core-js/es7/object.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es7.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js");
__webpack_require__(/*! ../modules/es7.object.values */ "./node_modules/core-js/modules/es7.object.values.js");
__webpack_require__(/*! ../modules/es7.object.entries */ "./node_modules/core-js/modules/es7.object.entries.js");
__webpack_require__(/*! ../modules/es7.object.define-getter */ "./node_modules/core-js/modules/es7.object.define-getter.js");
__webpack_require__(/*! ../modules/es7.object.define-setter */ "./node_modules/core-js/modules/es7.object.define-setter.js");
__webpack_require__(/*! ../modules/es7.object.lookup-getter */ "./node_modules/core-js/modules/es7.object.lookup-getter.js");
__webpack_require__(/*! ../modules/es7.object.lookup-setter */ "./node_modules/core-js/modules/es7.object.lookup-setter.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Object;


/***/ }),

/***/ "./node_modules/core-js/es7/reflect.js":
/*!*********************************************!*\
  !*** ./node_modules/core-js/es7/reflect.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es7.reflect.define-metadata */ "./node_modules/core-js/modules/es7.reflect.define-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.delete-metadata */ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-metadata */ "./node_modules/core-js/modules/es7.reflect.get-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js");
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js");
__webpack_require__(/*! ../modules/es7.reflect.has-metadata */ "./node_modules/core-js/modules/es7.reflect.has-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.has-own-metadata */ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.metadata */ "./node_modules/core-js/modules/es7.reflect.metadata.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Reflect;


/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_a-number-value.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-instance.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-copy-within.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-fill.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-from-iterable.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-reduce.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_bind.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/modules/_invoke.js");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-strong.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var fastKey = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-weak.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var getWeak = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js");
var $has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_create-property.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_date-to-iso-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),

/***/ "./node_modules/core-js/modules/_date-to-primitive.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fix-re-wks.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_flags.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_for-of.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_invoke.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array-iter.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-call.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-detect.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_math-expm1.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),

/***/ "./node_modules/core-js/modules/_math-fround.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js");
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-log1p.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_math-sign.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_metadata.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ "./node_modules/core-js/modules/es6.map.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js"))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-forced-pam.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") || !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js")[K];
});


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-sap.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-to-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_own-keys.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var Reflect = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_parse-float.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js") + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ "./node_modules/core-js/modules/_parse-int.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;
var ws = __webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js");
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine-all.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_same-value.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_strict-method.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-html.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-repeat.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-trim.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var spaces = __webpack_require__(/*! ./_string-ws */ "./node_modules/core-js/modules/_string-ws.js");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "./node_modules/core-js/modules/_string-ws.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_validate-collection.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/core.get-iterator-method.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.copy-within.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ "./node_modules/core-js/modules/_array-copy-within.js") });

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('copyWithin');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.every.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $every = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.fill.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ "./node_modules/core-js/modules/_array-fill.js") });

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('fill');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.filter.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $filter = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find-index.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.for-each.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $forEach = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.from.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.index-of.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $indexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.is-array.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.join.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js") != Object || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.last-index-of.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.map.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $map = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.of.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.reduce-right.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $reduce = __webpack_require__(/*! ./_array-reduce */ "./node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.reduce.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $reduce = __webpack_require__(/*! ./_array-reduce */ "./node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.slice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.some.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $some = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.sort.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ "./node_modules/core-js/modules/_strict-method.js")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.species.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('Array');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.now.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-iso-string.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ "./node_modules/core-js/modules/_date-to-iso-string.js");

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-json.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ "./node_modules/core-js/modules/_date-to-primitive.js"));


/***/ }),

/***/ "./node_modules/core-js/modules/es6.date.to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.bind.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ "./node_modules/core-js/modules/_bind.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.has-instance.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.name.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.map.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.acosh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var log1p = __webpack_require__(/*! ./_math-log1p */ "./node_modules/core-js/modules/_math-log1p.js");
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.asinh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.atanh.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.cbrt.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var sign = __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js");

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.clz32.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.cosh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.expm1.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.fround.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ "./node_modules/core-js/modules/_math-fround.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.hypot.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.imul.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log10.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log1p.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ "./node_modules/core-js/modules/_math-log1p.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.log2.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.sign.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ "./node_modules/core-js/modules/_math-sign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.sinh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.tanh.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var expm1 = __webpack_require__(/*! ./_math-expm1 */ "./node_modules/core-js/modules/_math-expm1.js");
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.trunc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, NUMBER, $Number);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.epsilon.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-finite.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var _isFinite = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-integer.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ "./node_modules/core-js/modules/_is-integer.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-nan.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.is-safe-integer.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isInteger = __webpack_require__(/*! ./_is-integer */ "./node_modules/core-js/modules/_is-integer.js");
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.max-safe-integer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.min-safe-integer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.parse-float.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseFloat = __webpack_require__(/*! ./_parse-float */ "./node_modules/core-js/modules/_parse-float.js");
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.parse-int.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/core-js/modules/_parse-int.js");
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.to-fixed.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "./node_modules/core-js/modules/_a-number-value.js");
var repeat = __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js");
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.number.to-precision.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "./node_modules/core-js/modules/_a-number-value.js");
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.create.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-properties.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.freeze.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-names.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js").f;
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-extensible.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-frozen.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-sealed.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ "./node_modules/core-js/modules/_same-value.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.prevent-extensions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.seal.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.set-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.parse-float.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseFloat = __webpack_require__(/*! ./_parse-float */ "./node_modules/core-js/modules/_parse-float.js");
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.parse-int.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/core-js/modules/_parse-int.js");
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.apply.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var rApply = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.construct.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var bind = __webpack_require__(/*! ./_bind */ "./node_modules/core-js/modules/_bind.js");
var rConstruct = (__webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.define-property.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.delete-property.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.enumerate.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js")(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get-prototype-of.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var getProto = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.get.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.has.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.is-extensible.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.own-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ "./node_modules/core-js/modules/_own-keys.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.prevent-extensions.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.set-prototype-of.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var setProto = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js");

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.reflect.set.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  re2[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('RegExp');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.flags.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.match.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.replace.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.search.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.split.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.set.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.anchor.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.big.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.blink.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.bold.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.code-point-at.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.ends-with.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fixed.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fontcolor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.fontsize.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.from-code-point.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.includes.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.italics.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.link.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.raw.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.repeat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.small.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.strike.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.sub.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.sup.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ "./node_modules/core-js/modules/_string-html.js")('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.trim.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ "./node_modules/core-js/modules/_string-trim.js")('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.weak-map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var assign = __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js");
var weak = __webpack_require__(/*! ./_collection-weak */ "./node_modules/core-js/modules/_collection-weak.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.define-getter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.define-setter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.entries.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $entries = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var ownKeys = __webpack_require__(/*! ./_own-keys */ "./node_modules/core-js/modules/_own-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.lookup-getter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.lookup-setter.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ "./node_modules/core-js/modules/_object-forced-pam.js"), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.values.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $values = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/modules/_object-to-array.js")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.define-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ "./node_modules/core-js/modules/es6.set.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.metadata.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})(window, document, 'Hammer');


/***/ }),

/***/ "./node_modules/web-animations-js/web-animations.min.js":
/*!**************************************************************!*\
  !*** ./node_modules/web-animations-js/web-animations.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

!function(a,b){var c={},d={};!function(a,b){function c(a){if("number"==typeof a)return a;var b={};for(var c in a)b[c]=a[c];return b}function d(){this._delay=0,this._endDelay=0,this._fill="none",this._iterationStart=0,this._iterations=1,this._duration=0,this._playbackRate=1,this._direction="normal",this._easing="linear",this._easingFunction=x}function e(){return a.isDeprecated("Invalid timing inputs","2016-03-02","TypeError exceptions will be thrown instead.",!0)}function f(b,c,e){var f=new d;return c&&(f.fill="both",f.duration="auto"),"number"!=typeof b||isNaN(b)?void 0!==b&&Object.getOwnPropertyNames(b).forEach(function(c){if("auto"!=b[c]){if(("number"==typeof f[c]||"duration"==c)&&("number"!=typeof b[c]||isNaN(b[c])))return;if("fill"==c&&-1==v.indexOf(b[c]))return;if("direction"==c&&-1==w.indexOf(b[c]))return;if("playbackRate"==c&&1!==b[c]&&a.isDeprecated("AnimationEffectTiming.playbackRate","2014-11-28","Use Animation.playbackRate instead."))return;f[c]=b[c]}}):f.duration=b,f}function g(a){return"number"==typeof a&&(a=isNaN(a)?{duration:0}:{duration:a}),a}function h(b,c){return b=a.numericTimingToObject(b),f(b,c)}function i(a,b,c,d){return a<0||a>1||c<0||c>1?x:function(e){function f(a,b,c){return 3*a*(1-c)*(1-c)*c+3*b*(1-c)*c*c+c*c*c}if(e<=0){var g=0;return a>0?g=b/a:!b&&c>0&&(g=d/c),g*e}if(e>=1){var h=0;return c<1?h=(d-1)/(c-1):1==c&&a<1&&(h=(b-1)/(a-1)),1+h*(e-1)}for(var i=0,j=1;i<j;){var k=(i+j)/2,l=f(a,c,k);if(Math.abs(e-l)<1e-5)return f(b,d,k);l<e?i=k:j=k}return f(b,d,k)}}function j(a,b){return function(c){if(c>=1)return 1;var d=1/a;return(c+=b*d)-c%d}}function k(a){C||(C=document.createElement("div").style),C.animationTimingFunction="",C.animationTimingFunction=a;var b=C.animationTimingFunction;if(""==b&&e())throw new TypeError(a+" is not a valid value for easing");return b}function l(a){if("linear"==a)return x;var b=E.exec(a);if(b)return i.apply(this,b.slice(1).map(Number));var c=F.exec(a);return c?j(Number(c[1]),{start:y,middle:z,end:A}[c[2]]):B[a]||x}function m(a){return Math.abs(n(a)/a.playbackRate)}function n(a){return 0===a.duration||0===a.iterations?0:a.duration*a.iterations}function o(a,b,c){if(null==b)return G;var d=c.delay+a+c.endDelay;return b<Math.min(c.delay,d)?H:b>=Math.min(c.delay+a,d)?I:J}function p(a,b,c,d,e){switch(d){case H:return"backwards"==b||"both"==b?0:null;case J:return c-e;case I:return"forwards"==b||"both"==b?a:null;case G:return null}}function q(a,b,c,d,e){var f=e;return 0===a?b!==H&&(f+=c):f+=d/a,f}function r(a,b,c,d,e,f){var g=a===1/0?b%1:a%1;return 0!==g||c!==I||0===d||0===e&&0!==f||(g=1),g}function s(a,b,c,d){return a===I&&b===1/0?1/0:1===c?Math.floor(d)-1:Math.floor(d)}function t(a,b,c){var d=a;if("normal"!==a&&"reverse"!==a){var e=b;"alternate-reverse"===a&&(e+=1),d="normal",e!==1/0&&e%2!=0&&(d="reverse")}return"normal"===d?c:1-c}function u(a,b,c){var d=o(a,b,c),e=p(a,c.fill,b,d,c.delay);if(null===e)return null;var f=q(c.duration,d,c.iterations,e,c.iterationStart),g=r(f,c.iterationStart,d,c.iterations,e,c.duration),h=s(d,c.iterations,g,f),i=t(c.direction,h,g);return c._easingFunction(i)}var v="backwards|forwards|both|none".split("|"),w="reverse|alternate|alternate-reverse".split("|"),x=function(a){return a};d.prototype={_setMember:function(b,c){this["_"+b]=c,this._effect&&(this._effect._timingInput[b]=c,this._effect._timing=a.normalizeTimingInput(this._effect._timingInput),this._effect.activeDuration=a.calculateActiveDuration(this._effect._timing),this._effect._animation&&this._effect._animation._rebuildUnderlyingAnimation())},get playbackRate(){return this._playbackRate},set delay(a){this._setMember("delay",a)},get delay(){return this._delay},set endDelay(a){this._setMember("endDelay",a)},get endDelay(){return this._endDelay},set fill(a){this._setMember("fill",a)},get fill(){return this._fill},set iterationStart(a){if((isNaN(a)||a<0)&&e())throw new TypeError("iterationStart must be a non-negative number, received: "+timing.iterationStart);this._setMember("iterationStart",a)},get iterationStart(){return this._iterationStart},set duration(a){if("auto"!=a&&(isNaN(a)||a<0)&&e())throw new TypeError("duration must be non-negative or auto, received: "+a);this._setMember("duration",a)},get duration(){return this._duration},set direction(a){this._setMember("direction",a)},get direction(){return this._direction},set easing(a){this._easingFunction=l(k(a)),this._setMember("easing",a)},get easing(){return this._easing},set iterations(a){if((isNaN(a)||a<0)&&e())throw new TypeError("iterations must be non-negative, received: "+a);this._setMember("iterations",a)},get iterations(){return this._iterations}};var y=1,z=.5,A=0,B={ease:i(.25,.1,.25,1),"ease-in":i(.42,0,1,1),"ease-out":i(0,0,.58,1),"ease-in-out":i(.42,0,.58,1),"step-start":j(1,y),"step-middle":j(1,z),"step-end":j(1,A)},C=null,D="\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*",E=new RegExp("cubic-bezier\\("+D+","+D+","+D+","+D+"\\)"),F=/steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/,G=0,H=1,I=2,J=3;a.cloneTimingInput=c,a.makeTiming=f,a.numericTimingToObject=g,a.normalizeTimingInput=h,a.calculateActiveDuration=m,a.calculateIterationProgress=u,a.calculatePhase=o,a.normalizeEasing=k,a.parseEasingFunction=l}(c),function(a,b){function c(a,b){return a in k?k[a][b]||b:b}function d(a){return"display"===a||0===a.lastIndexOf("animation",0)||0===a.lastIndexOf("transition",0)}function e(a,b,e){if(!d(a)){var f=h[a];if(f){i.style[a]=b;for(var g in f){var j=f[g],k=i.style[j];e[j]=c(j,k)}}else e[a]=c(a,b)}}function f(a){var b=[];for(var c in a)if(!(c in["easing","offset","composite"])){var d=a[c];Array.isArray(d)||(d=[d]);for(var e,f=d.length,g=0;g<f;g++)e={},e.offset="offset"in a?a.offset:1==f?1:g/(f-1),"easing"in a&&(e.easing=a.easing),"composite"in a&&(e.composite=a.composite),e[c]=d[g],b.push(e)}return b.sort(function(a,b){return a.offset-b.offset}),b}function g(b){function c(){var a=d.length;null==d[a-1].offset&&(d[a-1].offset=1),a>1&&null==d[0].offset&&(d[0].offset=0);for(var b=0,c=d[0].offset,e=1;e<a;e++){var f=d[e].offset;if(null!=f){for(var g=1;g<e-b;g++)d[b+g].offset=c+(f-c)*g/(e-b);b=e,c=f}}}if(null==b)return[];window.Symbol&&Symbol.iterator&&Array.prototype.from&&b[Symbol.iterator]&&(b=Array.from(b)),Array.isArray(b)||(b=f(b));for(var d=b.map(function(b){var c={};for(var d in b){var f=b[d];if("offset"==d){if(null!=f){if(f=Number(f),!isFinite(f))throw new TypeError("Keyframe offsets must be numbers.");if(f<0||f>1)throw new TypeError("Keyframe offsets must be between 0 and 1.")}}else if("composite"==d){if("add"==f||"accumulate"==f)throw{type:DOMException.NOT_SUPPORTED_ERR,name:"NotSupportedError",message:"add compositing is not supported"};if("replace"!=f)throw new TypeError("Invalid composite mode "+f+".")}else f="easing"==d?a.normalizeEasing(f):""+f;e(d,f,c)}return void 0==c.offset&&(c.offset=null),void 0==c.easing&&(c.easing="linear"),c}),g=!0,h=-1/0,i=0;i<d.length;i++){var j=d[i].offset;if(null!=j){if(j<h)throw new TypeError("Keyframes are not loosely sorted by offset. Sort or specify offsets.");h=j}else g=!1}return d=d.filter(function(a){return a.offset>=0&&a.offset<=1}),g||c(),d}var h={background:["backgroundImage","backgroundPosition","backgroundSize","backgroundRepeat","backgroundAttachment","backgroundOrigin","backgroundClip","backgroundColor"],border:["borderTopColor","borderTopStyle","borderTopWidth","borderRightColor","borderRightStyle","borderRightWidth","borderBottomColor","borderBottomStyle","borderBottomWidth","borderLeftColor","borderLeftStyle","borderLeftWidth"],borderBottom:["borderBottomWidth","borderBottomStyle","borderBottomColor"],borderColor:["borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],borderLeft:["borderLeftWidth","borderLeftStyle","borderLeftColor"],borderRadius:["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],borderRight:["borderRightWidth","borderRightStyle","borderRightColor"],borderTop:["borderTopWidth","borderTopStyle","borderTopColor"],borderWidth:["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"],flex:["flexGrow","flexShrink","flexBasis"],font:["fontFamily","fontSize","fontStyle","fontVariant","fontWeight","lineHeight"],margin:["marginTop","marginRight","marginBottom","marginLeft"],outline:["outlineColor","outlineStyle","outlineWidth"],padding:["paddingTop","paddingRight","paddingBottom","paddingLeft"]},i=document.createElementNS("http://www.w3.org/1999/xhtml","div"),j={thin:"1px",medium:"3px",thick:"5px"},k={borderBottomWidth:j,borderLeftWidth:j,borderRightWidth:j,borderTopWidth:j,fontSize:{"xx-small":"60%","x-small":"75%",small:"89%",medium:"100%",large:"120%","x-large":"150%","xx-large":"200%"},fontWeight:{normal:"400",bold:"700"},outlineWidth:j,textShadow:{none:"0px 0px 0px transparent"},boxShadow:{none:"0px 0px 0px 0px transparent"}};a.convertToArrayForm=f,a.normalizeKeyframes=g}(c),function(a){var b={};a.isDeprecated=function(a,c,d,e){var f=e?"are":"is",g=new Date,h=new Date(c);return h.setMonth(h.getMonth()+3),!(g<h&&(a in b||console.warn("Web Animations: "+a+" "+f+" deprecated and will stop working on "+h.toDateString()+". "+d),b[a]=!0,1))},a.deprecated=function(b,c,d,e){var f=e?"are":"is";if(a.isDeprecated(b,c,d,e))throw new Error(b+" "+f+" no longer supported. "+d)}}(c),function(){if(document.documentElement.animate){var a=document.documentElement.animate([],0),b=!0;if(a&&(b=!1,"play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function(c){void 0===a[c]&&(b=!0)})),!b)return}!function(a,b,c){function d(a){for(var b={},c=0;c<a.length;c++)for(var d in a[c])if("offset"!=d&&"easing"!=d&&"composite"!=d){var e={offset:a[c].offset,easing:a[c].easing,value:a[c][d]};b[d]=b[d]||[],b[d].push(e)}for(var f in b){var g=b[f];if(0!=g[0].offset||1!=g[g.length-1].offset)throw{type:DOMException.NOT_SUPPORTED_ERR,name:"NotSupportedError",message:"Partial keyframes are not supported"}}return b}function e(c){var d=[];for(var e in c)for(var f=c[e],g=0;g<f.length-1;g++){var h=g,i=g+1,j=f[h].offset,k=f[i].offset,l=j,m=k;0==g&&(l=-1/0,0==k&&(i=h)),g==f.length-2&&(m=1/0,1==j&&(h=i)),d.push({applyFrom:l,applyTo:m,startOffset:f[h].offset,endOffset:f[i].offset,easingFunction:a.parseEasingFunction(f[h].easing),property:e,interpolation:b.propertyInterpolation(e,f[h].value,f[i].value)})}return d.sort(function(a,b){return a.startOffset-b.startOffset}),d}b.convertEffectInput=function(c){var f=a.normalizeKeyframes(c),g=d(f),h=e(g);return function(a,c){if(null!=c)h.filter(function(a){return c>=a.applyFrom&&c<a.applyTo}).forEach(function(d){var e=c-d.startOffset,f=d.endOffset-d.startOffset,g=0==f?0:d.easingFunction(e/f);b.apply(a,d.property,d.interpolation(g))});else for(var d in g)"offset"!=d&&"easing"!=d&&"composite"!=d&&b.clear(a,d)}}}(c,d),function(a,b,c){function d(a){return a.replace(/-(.)/g,function(a,b){return b.toUpperCase()})}function e(a,b,c){h[c]=h[c]||[],h[c].push([a,b])}function f(a,b,c){for(var f=0;f<c.length;f++){e(a,b,d(c[f]))}}function g(c,e,f){var g=c;/-/.test(c)&&!a.isDeprecated("Hyphenated property names","2016-03-22","Use camelCase instead.",!0)&&(g=d(c)),"initial"!=e&&"initial"!=f||("initial"==e&&(e=i[g]),"initial"==f&&(f=i[g]));for(var j=e==f?[]:h[g],k=0;j&&k<j.length;k++){var l=j[k][0](e),m=j[k][0](f);if(void 0!==l&&void 0!==m){var n=j[k][1](l,m);if(n){var o=b.Interpolation.apply(null,n);return function(a){return 0==a?e:1==a?f:o(a)}}}}return b.Interpolation(!1,!0,function(a){return a?f:e})}var h={};b.addPropertiesHandler=f;var i={backgroundColor:"transparent",backgroundPosition:"0% 0%",borderBottomColor:"currentColor",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px",borderBottomWidth:"3px",borderLeftColor:"currentColor",borderLeftWidth:"3px",borderRightColor:"currentColor",borderRightWidth:"3px",borderSpacing:"2px",borderTopColor:"currentColor",borderTopLeftRadius:"0px",borderTopRightRadius:"0px",borderTopWidth:"3px",bottom:"auto",clip:"rect(0px, 0px, 0px, 0px)",color:"black",fontSize:"100%",fontWeight:"400",height:"auto",left:"auto",letterSpacing:"normal",lineHeight:"120%",marginBottom:"0px",marginLeft:"0px",marginRight:"0px",marginTop:"0px",maxHeight:"none",maxWidth:"none",minHeight:"0px",minWidth:"0px",opacity:"1.0",outlineColor:"invert",outlineOffset:"0px",outlineWidth:"3px",paddingBottom:"0px",paddingLeft:"0px",paddingRight:"0px",paddingTop:"0px",right:"auto",strokeDasharray:"none",strokeDashoffset:"0px",textIndent:"0px",textShadow:"0px 0px 0px transparent",top:"auto",transform:"",verticalAlign:"0px",visibility:"visible",width:"auto",wordSpacing:"normal",zIndex:"auto"};b.propertyInterpolation=g}(c,d),function(a,b,c){function d(b){var c=a.calculateActiveDuration(b),d=function(d){return a.calculateIterationProgress(c,d,b)};return d._totalDuration=b.delay+c+b.endDelay,d}b.KeyframeEffect=function(c,e,f,g){var h,i=d(a.normalizeTimingInput(f)),j=b.convertEffectInput(e),k=function(){j(c,h)};return k._update=function(a){return null!==(h=i(a))},k._clear=function(){j(c,null)},k._hasSameTarget=function(a){return c===a},k._target=c,k._totalDuration=i._totalDuration,k._id=g,k}}(c,d),function(a,b){function c(a,b){return!(!b.namespaceURI||-1==b.namespaceURI.indexOf("/svg"))&&(g in a||(a[g]=/Trident|MSIE|IEMobile|Edge|Android 4/i.test(a.navigator.userAgent)),a[g])}function d(a,b,c){c.enumerable=!0,c.configurable=!0,Object.defineProperty(a,b,c)}function e(a){this._element=a,this._surrogateStyle=document.createElementNS("http://www.w3.org/1999/xhtml","div").style,this._style=a.style,this._length=0,this._isAnimatedProperty={},this._updateSvgTransformAttr=c(window,a),this._savedTransformAttr=null;for(var b=0;b<this._style.length;b++){var d=this._style[b];this._surrogateStyle[d]=this._style[d]}this._updateIndices()}function f(a){if(!a._webAnimationsPatchedStyle){var b=new e(a);try{d(a,"style",{get:function(){return b}})}catch(b){a.style._set=function(b,c){a.style[b]=c},a.style._clear=function(b){a.style[b]=""}}a._webAnimationsPatchedStyle=a.style}}var g="_webAnimationsUpdateSvgTransformAttr",h={cssText:1,length:1,parentRule:1},i={getPropertyCSSValue:1,getPropertyPriority:1,getPropertyValue:1,item:1,removeProperty:1,setProperty:1},j={removeProperty:1,setProperty:1};e.prototype={get cssText(){return this._surrogateStyle.cssText},set cssText(a){for(var b={},c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;this._surrogateStyle.cssText=a,this._updateIndices();for(var c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;for(var d in b)this._isAnimatedProperty[d]||this._style.setProperty(d,this._surrogateStyle.getPropertyValue(d))},get length(){return this._surrogateStyle.length},get parentRule(){return this._style.parentRule},_updateIndices:function(){for(;this._length<this._surrogateStyle.length;)Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,get:function(a){return function(){return this._surrogateStyle[a]}}(this._length)}),this._length++;for(;this._length>this._surrogateStyle.length;)this._length--,Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,value:void 0})},_set:function(b,c){this._style[b]=c,this._isAnimatedProperty[b]=!0,this._updateSvgTransformAttr&&"transform"==a.unprefixedPropertyName(b)&&(null==this._savedTransformAttr&&(this._savedTransformAttr=this._element.getAttribute("transform")),this._element.setAttribute("transform",a.transformToSvgMatrix(c)))},_clear:function(b){this._style[b]=this._surrogateStyle[b],this._updateSvgTransformAttr&&"transform"==a.unprefixedPropertyName(b)&&(this._savedTransformAttr?this._element.setAttribute("transform",this._savedTransformAttr):this._element.removeAttribute("transform"),this._savedTransformAttr=null),delete this._isAnimatedProperty[b]}};for(var k in i)e.prototype[k]=function(a,b){return function(){var c=this._surrogateStyle[a].apply(this._surrogateStyle,arguments);return b&&(this._isAnimatedProperty[arguments[0]]||this._style[a].apply(this._style,arguments),this._updateIndices()),c}}(k,k in j);for(var l in document.documentElement.style)l in h||l in i||function(a){d(e.prototype,a,{get:function(){return this._surrogateStyle[a]},set:function(b){this._surrogateStyle[a]=b,this._updateIndices(),this._isAnimatedProperty[a]||(this._style[a]=b)}})}(l);a.apply=function(b,c,d){f(b),b.style._set(a.propertyName(c),d)},a.clear=function(b,c){b._webAnimationsPatchedStyle&&b.style._clear(a.propertyName(c))}}(d),function(a){window.Element.prototype.animate=function(b,c){var d="";return c&&c.id&&(d=c.id),a.timeline._play(a.KeyframeEffect(this,b,c,d))}}(d),function(a,b){function c(a,b,d){if("number"==typeof a&&"number"==typeof b)return a*(1-d)+b*d;if("boolean"==typeof a&&"boolean"==typeof b)return d<.5?a:b;if(a.length==b.length){for(var e=[],f=0;f<a.length;f++)e.push(c(a[f],b[f],d));return e}throw"Mismatched interpolation arguments "+a+":"+b}a.Interpolation=function(a,b,d){return function(e){return d(c(a,b,e))}}}(d),function(a,b){function c(a,b,c){return Math.max(Math.min(a,c),b)}function d(b,d,e){var f=a.dot(b,d);f=c(f,-1,1);var g=[];if(1===f)g=b;else for(var h=Math.acos(f),i=1*Math.sin(e*h)/Math.sqrt(1-f*f),j=0;j<4;j++)g.push(b[j]*(Math.cos(e*h)-f*i)+d[j]*i);return g}var e=function(){function a(a,b){for(var c=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],d=0;d<4;d++)for(var e=0;e<4;e++)for(var f=0;f<4;f++)c[d][e]+=b[d][f]*a[f][e];return c}function b(a){return 0==a[0][2]&&0==a[0][3]&&0==a[1][2]&&0==a[1][3]&&0==a[2][0]&&0==a[2][1]&&1==a[2][2]&&0==a[2][3]&&0==a[3][2]&&1==a[3][3]}function c(c,d,e,f,g){for(var h=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],i=0;i<4;i++)h[i][3]=g[i];for(var i=0;i<3;i++)for(var j=0;j<3;j++)h[3][i]+=c[j]*h[j][i];var k=f[0],l=f[1],m=f[2],n=f[3],o=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];o[0][0]=1-2*(l*l+m*m),o[0][1]=2*(k*l-m*n),o[0][2]=2*(k*m+l*n),o[1][0]=2*(k*l+m*n),o[1][1]=1-2*(k*k+m*m),o[1][2]=2*(l*m-k*n),o[2][0]=2*(k*m-l*n),o[2][1]=2*(l*m+k*n),o[2][2]=1-2*(k*k+l*l),h=a(h,o);var p=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];e[2]&&(p[2][1]=e[2],h=a(h,p)),e[1]&&(p[2][1]=0,p[2][0]=e[0],h=a(h,p)),e[0]&&(p[2][0]=0,p[1][0]=e[0],h=a(h,p));for(var i=0;i<3;i++)for(var j=0;j<3;j++)h[i][j]*=d[i];return b(h)?[h[0][0],h[0][1],h[1][0],h[1][1],h[3][0],h[3][1]]:h[0].concat(h[1],h[2],h[3])}return c}();a.composeMatrix=e,a.quat=d}(d),function(a,b,c){a.sequenceNumber=0;var d=function(a,b,c){this.target=a,this.currentTime=b,this.timelineTime=c,this.type="finish",this.bubbles=!1,this.cancelable=!1,this.currentTarget=a,this.defaultPrevented=!1,this.eventPhase=Event.AT_TARGET,this.timeStamp=Date.now()};b.Animation=function(b){this.id="",b&&b._id&&(this.id=b._id),this._sequenceNumber=a.sequenceNumber++,this._currentTime=0,this._startTime=null,this._paused=!1,this._playbackRate=1,this._inTimeline=!0,this._finishedFlag=!0,this.onfinish=null,this._finishHandlers=[],this._effect=b,this._inEffect=this._effect._update(0),this._idle=!0,this._currentTimePending=!1},b.Animation.prototype={_ensureAlive:function(){this.playbackRate<0&&0===this.currentTime?this._inEffect=this._effect._update(-1):this._inEffect=this._effect._update(this.currentTime),this._inTimeline||!this._inEffect&&this._finishedFlag||(this._inTimeline=!0,b.timeline._animations.push(this))},_tickCurrentTime:function(a,b){a!=this._currentTime&&(this._currentTime=a,this._isFinished&&!b&&(this._currentTime=this._playbackRate>0?this._totalDuration:0),this._ensureAlive())},get currentTime(){return this._idle||this._currentTimePending?null:this._currentTime},set currentTime(a){a=+a,isNaN(a)||(b.restart(),this._paused||null==this._startTime||(this._startTime=this._timeline.currentTime-a/this._playbackRate),this._currentTimePending=!1,this._currentTime!=a&&(this._idle&&(this._idle=!1,this._paused=!0),this._tickCurrentTime(a,!0),b.applyDirtiedAnimation(this)))},get startTime(){return this._startTime},set startTime(a){a=+a,isNaN(a)||this._paused||this._idle||(this._startTime=a,this._tickCurrentTime((this._timeline.currentTime-this._startTime)*this.playbackRate),b.applyDirtiedAnimation(this))},get playbackRate(){return this._playbackRate},set playbackRate(a){if(a!=this._playbackRate){var c=this.currentTime;this._playbackRate=a,this._startTime=null,"paused"!=this.playState&&"idle"!=this.playState&&(this._finishedFlag=!1,this._idle=!1,this._ensureAlive(),b.applyDirtiedAnimation(this)),null!=c&&(this.currentTime=c)}},get _isFinished(){return!this._idle&&(this._playbackRate>0&&this._currentTime>=this._totalDuration||this._playbackRate<0&&this._currentTime<=0)},get _totalDuration(){return this._effect._totalDuration},get playState(){return this._idle?"idle":null==this._startTime&&!this._paused&&0!=this.playbackRate||this._currentTimePending?"pending":this._paused?"paused":this._isFinished?"finished":"running"},_rewind:function(){if(this._playbackRate>=0)this._currentTime=0;else{if(!(this._totalDuration<1/0))throw new DOMException("Unable to rewind negative playback rate animation with infinite duration","InvalidStateError");this._currentTime=this._totalDuration}},play:function(){this._paused=!1,(this._isFinished||this._idle)&&(this._rewind(),this._startTime=null),this._finishedFlag=!1,this._idle=!1,this._ensureAlive(),b.applyDirtiedAnimation(this)},pause:function(){this._isFinished||this._paused||this._idle?this._idle&&(this._rewind(),this._idle=!1):this._currentTimePending=!0,this._startTime=null,this._paused=!0},finish:function(){this._idle||(this.currentTime=this._playbackRate>0?this._totalDuration:0,this._startTime=this._totalDuration-this.currentTime,this._currentTimePending=!1,b.applyDirtiedAnimation(this))},cancel:function(){this._inEffect&&(this._inEffect=!1,this._idle=!0,this._paused=!1,this._isFinished=!0,this._finishedFlag=!0,this._currentTime=0,this._startTime=null,this._effect._update(null),b.applyDirtiedAnimation(this))},reverse:function(){this.playbackRate*=-1,this.play()},addEventListener:function(a,b){"function"==typeof b&&"finish"==a&&this._finishHandlers.push(b)},removeEventListener:function(a,b){if("finish"==a){var c=this._finishHandlers.indexOf(b);c>=0&&this._finishHandlers.splice(c,1)}},_fireEvents:function(a){if(this._isFinished){if(!this._finishedFlag){var b=new d(this,this._currentTime,a),c=this._finishHandlers.concat(this.onfinish?[this.onfinish]:[]);setTimeout(function(){c.forEach(function(a){a.call(b.target,b)})},0),this._finishedFlag=!0}}else this._finishedFlag=!1},_tick:function(a,b){this._idle||this._paused||(null==this._startTime?b&&(this.startTime=a-this._currentTime/this.playbackRate):this._isFinished||this._tickCurrentTime((a-this._startTime)*this.playbackRate)),b&&(this._currentTimePending=!1,this._fireEvents(a))},get _needsTick(){return this.playState in{pending:1,running:1}||!this._finishedFlag},_targetAnimations:function(){var a=this._effect._target;return a._activeAnimations||(a._activeAnimations=[]),a._activeAnimations},_markTarget:function(){var a=this._targetAnimations();-1===a.indexOf(this)&&a.push(this)},_unmarkTarget:function(){var a=this._targetAnimations(),b=a.indexOf(this);-1!==b&&a.splice(b,1)}}}(c,d),function(a,b,c){function d(a){var b=j;j=[],a<q.currentTime&&(a=q.currentTime),q._animations.sort(e),q._animations=h(a,!0,q._animations)[0],b.forEach(function(b){b[1](a)}),g(),l=void 0}function e(a,b){return a._sequenceNumber-b._sequenceNumber}function f(){this._animations=[],this.currentTime=window.performance&&performance.now?performance.now():0}function g(){o.forEach(function(a){a()}),o.length=0}function h(a,c,d){p=!0,n=!1,b.timeline.currentTime=a,m=!1;var e=[],f=[],g=[],h=[];return d.forEach(function(b){b._tick(a,c),b._inEffect?(f.push(b._effect),b._markTarget()):(e.push(b._effect),b._unmarkTarget()),b._needsTick&&(m=!0);var d=b._inEffect||b._needsTick;b._inTimeline=d,d?g.push(b):h.push(b)}),o.push.apply(o,e),o.push.apply(o,f),m&&requestAnimationFrame(function(){}),p=!1,[g,h]}var i=window.requestAnimationFrame,j=[],k=0;window.requestAnimationFrame=function(a){var b=k++;return 0==j.length&&i(d),j.push([b,a]),b},window.cancelAnimationFrame=function(a){j.forEach(function(b){b[0]==a&&(b[1]=function(){})})},f.prototype={_play:function(c){c._timing=a.normalizeTimingInput(c.timing);var d=new b.Animation(c);return d._idle=!1,d._timeline=this,this._animations.push(d),b.restart(),b.applyDirtiedAnimation(d),d}};var l=void 0,m=!1,n=!1;b.restart=function(){return m||(m=!0,requestAnimationFrame(function(){}),n=!0),n},b.applyDirtiedAnimation=function(a){if(!p){a._markTarget();var c=a._targetAnimations();c.sort(e),h(b.timeline.currentTime,!1,c.slice())[1].forEach(function(a){var b=q._animations.indexOf(a);-1!==b&&q._animations.splice(b,1)}),g()}};var o=[],p=!1,q=new f;b.timeline=q}(c,d),function(a,b){function c(a,b){for(var c=0,d=0;d<a.length;d++)c+=a[d]*b[d];return c}function d(a,b){return[a[0]*b[0]+a[4]*b[1]+a[8]*b[2]+a[12]*b[3],a[1]*b[0]+a[5]*b[1]+a[9]*b[2]+a[13]*b[3],a[2]*b[0]+a[6]*b[1]+a[10]*b[2]+a[14]*b[3],a[3]*b[0]+a[7]*b[1]+a[11]*b[2]+a[15]*b[3],a[0]*b[4]+a[4]*b[5]+a[8]*b[6]+a[12]*b[7],a[1]*b[4]+a[5]*b[5]+a[9]*b[6]+a[13]*b[7],a[2]*b[4]+a[6]*b[5]+a[10]*b[6]+a[14]*b[7],a[3]*b[4]+a[7]*b[5]+a[11]*b[6]+a[15]*b[7],a[0]*b[8]+a[4]*b[9]+a[8]*b[10]+a[12]*b[11],a[1]*b[8]+a[5]*b[9]+a[9]*b[10]+a[13]*b[11],a[2]*b[8]+a[6]*b[9]+a[10]*b[10]+a[14]*b[11],a[3]*b[8]+a[7]*b[9]+a[11]*b[10]+a[15]*b[11],a[0]*b[12]+a[4]*b[13]+a[8]*b[14]+a[12]*b[15],a[1]*b[12]+a[5]*b[13]+a[9]*b[14]+a[13]*b[15],a[2]*b[12]+a[6]*b[13]+a[10]*b[14]+a[14]*b[15],a[3]*b[12]+a[7]*b[13]+a[11]*b[14]+a[15]*b[15]]}function e(a){var b=a.rad||0;return((a.deg||0)/360+(a.grad||0)/400+(a.turn||0))*(2*Math.PI)+b}function f(a){switch(a.t){case"rotatex":var b=e(a.d[0]);return[1,0,0,0,0,Math.cos(b),Math.sin(b),0,0,-Math.sin(b),Math.cos(b),0,0,0,0,1];case"rotatey":var b=e(a.d[0]);return[Math.cos(b),0,-Math.sin(b),0,0,1,0,0,Math.sin(b),0,Math.cos(b),0,0,0,0,1];case"rotate":case"rotatez":var b=e(a.d[0]);return[Math.cos(b),Math.sin(b),0,0,-Math.sin(b),Math.cos(b),0,0,0,0,1,0,0,0,0,1];case"rotate3d":var c=a.d[0],d=a.d[1],f=a.d[2],b=e(a.d[3]),g=c*c+d*d+f*f;if(0===g)c=1,d=0,f=0;else if(1!==g){var h=Math.sqrt(g);c/=h,d/=h,f/=h}var i=Math.sin(b/2),j=i*Math.cos(b/2),k=i*i;return[1-2*(d*d+f*f)*k,2*(c*d*k+f*j),2*(c*f*k-d*j),0,2*(c*d*k-f*j),1-2*(c*c+f*f)*k,2*(d*f*k+c*j),0,2*(c*f*k+d*j),2*(d*f*k-c*j),1-2*(c*c+d*d)*k,0,0,0,0,1];case"scale":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,1,0,0,0,0,1];case"scalex":return[a.d[0],0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];case"scaley":return[1,0,0,0,0,a.d[0],0,0,0,0,1,0,0,0,0,1];case"scalez":return[1,0,0,0,0,1,0,0,0,0,a.d[0],0,0,0,0,1];case"scale3d":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,a.d[2],0,0,0,0,1];case"skew":var l=e(a.d[0]),m=e(a.d[1]);return[1,Math.tan(m),0,0,Math.tan(l),1,0,0,0,0,1,0,0,0,0,1];case"skewx":var b=e(a.d[0]);return[1,0,0,0,Math.tan(b),1,0,0,0,0,1,0,0,0,0,1];case"skewy":var b=e(a.d[0]);return[1,Math.tan(b),0,0,0,1,0,0,0,0,1,0,0,0,0,1];case"translate":var c=a.d[0].px||0,d=a.d[1].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,d,0,1];case"translatex":var c=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,0,0,1];case"translatey":var d=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,d,0,1];case"translatez":var f=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,f,1];case"translate3d":var c=a.d[0].px||0,d=a.d[1].px||0,f=a.d[2].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,d,f,1];case"perspective":return[1,0,0,0,0,1,0,0,0,0,1,a.d[0].px?-1/a.d[0].px:0,0,0,0,1];case"matrix":return[a.d[0],a.d[1],0,0,a.d[2],a.d[3],0,0,0,0,1,0,a.d[4],a.d[5],0,1];case"matrix3d":return a.d}}function g(a){return 0===a.length?[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]:a.map(f).reduce(d)}function h(a){return[i(g(a))]}var i=function(){function a(a){return a[0][0]*a[1][1]*a[2][2]+a[1][0]*a[2][1]*a[0][2]+a[2][0]*a[0][1]*a[1][2]-a[0][2]*a[1][1]*a[2][0]-a[1][2]*a[2][1]*a[0][0]-a[2][2]*a[0][1]*a[1][0]}function b(b){for(var c=1/a(b),d=b[0][0],e=b[0][1],f=b[0][2],g=b[1][0],h=b[1][1],i=b[1][2],j=b[2][0],k=b[2][1],l=b[2][2],m=[[(h*l-i*k)*c,(f*k-e*l)*c,(e*i-f*h)*c,0],[(i*j-g*l)*c,(d*l-f*j)*c,(f*g-d*i)*c,0],[(g*k-h*j)*c,(j*e-d*k)*c,(d*h-e*g)*c,0]],n=[],o=0;o<3;o++){for(var p=0,q=0;q<3;q++)p+=b[3][q]*m[q][o];n.push(p)}return n.push(1),m.push(n),m}function d(a){return[[a[0][0],a[1][0],a[2][0],a[3][0]],[a[0][1],a[1][1],a[2][1],a[3][1]],[a[0][2],a[1][2],a[2][2],a[3][2]],[a[0][3],a[1][3],a[2][3],a[3][3]]]}function e(a,b){for(var c=[],d=0;d<4;d++){for(var e=0,f=0;f<4;f++)e+=a[f]*b[f][d];c.push(e)}return c}function f(a){var b=g(a);return[a[0]/b,a[1]/b,a[2]/b]}function g(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])}function h(a,b,c,d){return[c*a[0]+d*b[0],c*a[1]+d*b[1],c*a[2]+d*b[2]]}function i(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function j(j){var k=[j.slice(0,4),j.slice(4,8),j.slice(8,12),j.slice(12,16)];if(1!==k[3][3])return null;for(var l=[],m=0;m<4;m++)l.push(k[m].slice());for(var m=0;m<3;m++)l[m][3]=0;if(0===a(l))return null;var n,o=[];k[0][3]||k[1][3]||k[2][3]?(o.push(k[0][3]),o.push(k[1][3]),o.push(k[2][3]),o.push(k[3][3]),n=e(o,d(b(l)))):n=[0,0,0,1];var p=k[3].slice(0,3),q=[];q.push(k[0].slice(0,3));var r=[];r.push(g(q[0])),q[0]=f(q[0]);var s=[];q.push(k[1].slice(0,3)),s.push(c(q[0],q[1])),q[1]=h(q[1],q[0],1,-s[0]),r.push(g(q[1])),q[1]=f(q[1]),s[0]/=r[1],q.push(k[2].slice(0,3)),s.push(c(q[0],q[2])),q[2]=h(q[2],q[0],1,-s[1]),s.push(c(q[1],q[2])),q[2]=h(q[2],q[1],1,-s[2]),r.push(g(q[2])),q[2]=f(q[2]),s[1]/=r[2],s[2]/=r[2];var t=i(q[1],q[2]);if(c(q[0],t)<0)for(var m=0;m<3;m++)r[m]*=-1,q[m][0]*=-1,q[m][1]*=-1,q[m][2]*=-1;var u,v,w=q[0][0]+q[1][1]+q[2][2]+1;return w>1e-4?(u=.5/Math.sqrt(w),v=[(q[2][1]-q[1][2])*u,(q[0][2]-q[2][0])*u,(q[1][0]-q[0][1])*u,.25/u]):q[0][0]>q[1][1]&&q[0][0]>q[2][2]?(u=2*Math.sqrt(1+q[0][0]-q[1][1]-q[2][2]),v=[.25*u,(q[0][1]+q[1][0])/u,(q[0][2]+q[2][0])/u,(q[2][1]-q[1][2])/u]):q[1][1]>q[2][2]?(u=2*Math.sqrt(1+q[1][1]-q[0][0]-q[2][2]),v=[(q[0][1]+q[1][0])/u,.25*u,(q[1][2]+q[2][1])/u,(q[0][2]-q[2][0])/u]):(u=2*Math.sqrt(1+q[2][2]-q[0][0]-q[1][1]),v=[(q[0][2]+q[2][0])/u,(q[1][2]+q[2][1])/u,.25*u,(q[1][0]-q[0][1])/u]),[p,r,s,v,n]}return j}();a.dot=c,a.makeMatrixDecomposition=h,a.transformListToMatrix=g}(d),function(a){function b(a,b){var c=a.exec(b);if(c)return c=a.ignoreCase?c[0].toLowerCase():c[0],[c,b.substr(c.length)]}function c(a,b){b=b.replace(/^\s*/,"");var c=a(b);if(c)return[c[0],c[1].replace(/^\s*/,"")]}function d(a,d,e){a=c.bind(null,a);for(var f=[];;){var g=a(e);if(!g)return[f,e];if(f.push(g[0]),e=g[1],!(g=b(d,e))||""==g[1])return[f,e];e=g[1]}}function e(a,b){for(var c=0,d=0;d<b.length&&(!/\s|,/.test(b[d])||0!=c);d++)if("("==b[d])c++;else if(")"==b[d]&&(c--,0==c&&d++,c<=0))break;var e=a(b.substr(0,d));return void 0==e?void 0:[e,b.substr(d)]}function f(a,b){for(var c=a,d=b;c&&d;)c>d?c%=d:d%=c;return c=a*b/(c+d)}function g(a){return function(b){var c=a(b);return c&&(c[0]=void 0),c}}function h(a,b){return function(c){return a(c)||[b,c]}}function i(b,c){for(var d=[],e=0;e<b.length;e++){var f=a.consumeTrimmed(b[e],c);if(!f||""==f[0])return;void 0!==f[0]&&d.push(f[0]),c=f[1]}if(""==c)return d}function j(a,b,c,d,e){for(var g=[],h=[],i=[],j=f(d.length,e.length),k=0;k<j;k++){var l=b(d[k%d.length],e[k%e.length]);if(!l)return;g.push(l[0]),h.push(l[1]),i.push(l[2])}return[g,h,function(b){var d=b.map(function(a,b){return i[b](a)}).join(c);return a?a(d):d}]}function k(a,b,c){for(var d=[],e=[],f=[],g=0,h=0;h<c.length;h++)if("function"==typeof c[h]){var i=c[h](a[g],b[g++]);d.push(i[0]),e.push(i[1]),f.push(i[2])}else!function(a){d.push(!1),e.push(!1),f.push(function(){return c[a]})}(h);return[d,e,function(a){for(var b="",c=0;c<a.length;c++)b+=f[c](a[c]);return b}]}a.consumeToken=b,a.consumeTrimmed=c,a.consumeRepeated=d,a.consumeParenthesised=e,a.ignore=g,a.optional=h,a.consumeList=i,a.mergeNestedRepeated=j.bind(null,null),a.mergeWrappedNestedRepeated=j,a.mergeList=k}(d),function(a){function b(b){function c(b){var c=a.consumeToken(/^inset/i,b);if(c)return d.inset=!0,c;var c=a.consumeLengthOrPercent(b);if(c)return d.lengths.push(c[0]),c;var c=a.consumeColor(b);return c?(d.color=c[0],c):void 0}var d={inset:!1,lengths:[],color:null},e=a.consumeRepeated(c,/^/,b);if(e&&e[0].length)return[d,e[1]]}function c(c){var d=a.consumeRepeated(b,/^,/,c);if(d&&""==d[1])return d[0]}function d(b,c){for(;b.lengths.length<Math.max(b.lengths.length,c.lengths.length);)b.lengths.push({px:0});for(;c.lengths.length<Math.max(b.lengths.length,c.lengths.length);)c.lengths.push({px:0});if(b.inset==c.inset&&!!b.color==!!c.color){for(var d,e=[],f=[[],0],g=[[],0],h=0;h<b.lengths.length;h++){var i=a.mergeDimensions(b.lengths[h],c.lengths[h],2==h);f[0].push(i[0]),g[0].push(i[1]),e.push(i[2])}if(b.color&&c.color){var j=a.mergeColors(b.color,c.color);f[1]=j[0],g[1]=j[1],d=j[2]}return[f,g,function(a){for(var c=b.inset?"inset ":" ",f=0;f<e.length;f++)c+=e[f](a[0][f])+" ";return d&&(c+=d(a[1])),c}]}}function e(b,c,d,e){function f(a){return{inset:a,color:[0,0,0,0],lengths:[{px:0},{px:0},{px:0},{px:0}]}}for(var g=[],h=[],i=0;i<d.length||i<e.length;i++){var j=d[i]||f(e[i].inset),k=e[i]||f(d[i].inset);g.push(j),h.push(k)}return a.mergeNestedRepeated(b,c,g,h)}var f=e.bind(null,d,", ");a.addPropertiesHandler(c,f,["box-shadow","text-shadow"])}(d),function(a,b){function c(a){return a.toFixed(3).replace(/0+$/,"").replace(/\.$/,"")}function d(a,b,c){return Math.min(b,Math.max(a,c))}function e(a){if(/^\s*[-+]?(\d*\.)?\d+\s*$/.test(a))return Number(a)}function f(a,b){return[a,b,c]}function g(a,b){if(0!=a)return i(0,1/0)(a,b)}function h(a,b){return[a,b,function(a){return Math.round(d(1,1/0,a))}]}function i(a,b){return function(e,f){return[e,f,function(e){return c(d(a,b,e))}]}}function j(a){var b=a.trim().split(/\s*[\s,]\s*/);if(0!==b.length){for(var c=[],d=0;d<b.length;d++){var f=e(b[d]);if(void 0===f)return;c.push(f)}return c}}function k(a,b){if(a.length==b.length)return[a,b,function(a){return a.map(c).join(" ")}]}function l(a,b){return[a,b,Math.round]}a.clamp=d,a.addPropertiesHandler(j,k,["stroke-dasharray"]),a.addPropertiesHandler(e,i(0,1/0),["border-image-width","line-height"]),a.addPropertiesHandler(e,i(0,1),["opacity","shape-image-threshold"]),a.addPropertiesHandler(e,g,["flex-grow","flex-shrink"]),a.addPropertiesHandler(e,h,["orphans","widows"]),a.addPropertiesHandler(e,l,["z-index"]),a.parseNumber=e,a.parseNumberList=j,a.mergeNumbers=f,a.numberToString=c}(d),function(a,b){function c(a,b){if("visible"==a||"visible"==b)return[0,1,function(c){return c<=0?a:c>=1?b:"visible"}]}a.addPropertiesHandler(String,c,["visibility"])}(d),function(a,b){function c(a){a=a.trim(),f.fillStyle="#000",f.fillStyle=a;var b=f.fillStyle;if(f.fillStyle="#fff",f.fillStyle=a,b==f.fillStyle){f.fillRect(0,0,1,1);var c=f.getImageData(0,0,1,1).data;f.clearRect(0,0,1,1);var d=c[3]/255;return[c[0]*d,c[1]*d,c[2]*d,d]}}function d(b,c){return[b,c,function(b){function c(a){return Math.max(0,Math.min(255,a))}if(b[3])for(var d=0;d<3;d++)b[d]=Math.round(c(b[d]/b[3]));return b[3]=a.numberToString(a.clamp(0,1,b[3])),"rgba("+b.join(",")+")"}]}var e=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");e.width=e.height=1;var f=e.getContext("2d");a.addPropertiesHandler(c,d,["background-color","border-bottom-color","border-left-color","border-right-color","border-top-color","color","fill","flood-color","lighting-color","outline-color","stop-color","stroke","text-decoration-color"]),a.consumeColor=a.consumeParenthesised.bind(null,c),a.mergeColors=d}(d),function(a,b){function c(a){function b(){var b=h.exec(a);g=b?b[0]:void 0}function c(){var a=Number(g);return b(),a}function d(){if("("!==g)return c();b();var a=f();return")"!==g?NaN:(b(),a)}function e(){for(var a=d();"*"===g||"/"===g;){var c=g;b();var e=d();"*"===c?a*=e:a/=e}return a}function f(){for(var a=e();"+"===g||"-"===g;){var c=g;b();var d=e();"+"===c?a+=d:a-=d}return a}var g,h=/([\+\-\w\.]+|[\(\)\*\/])/g;return b(),f()}function d(a,b){if("0"==(b=b.trim().toLowerCase())&&"px".search(a)>=0)return{px:0};if(/^[^(]*$|^calc/.test(b)){b=b.replace(/calc\(/g,"(");var d={};b=b.replace(a,function(a){return d[a]=null,"U"+a});for(var e="U("+a.source+")",f=b.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g,"N").replace(new RegExp("N"+e,"g"),"D").replace(/\s[+-]\s/g,"O").replace(/\s/g,""),g=[/N\*(D)/g,/(N|D)[*\/]N/g,/(N|D)O\1/g,/\((N|D)\)/g],h=0;h<g.length;)g[h].test(f)?(f=f.replace(g[h],"$1"),h=0):h++;if("D"==f){for(var i in d){var j=c(b.replace(new RegExp("U"+i,"g"),"").replace(new RegExp(e,"g"),"*0"));if(!isFinite(j))return;d[i]=j}return d}}}function e(a,b){return f(a,b,!0)}function f(b,c,d){var e,f=[];for(e in b)f.push(e);for(e in c)f.indexOf(e)<0&&f.push(e);return b=f.map(function(a){return b[a]||0}),c=f.map(function(a){return c[a]||0}),[b,c,function(b){var c=b.map(function(c,e){return 1==b.length&&d&&(c=Math.max(c,0)),a.numberToString(c)+f[e]}).join(" + ");return b.length>1?"calc("+c+")":c}]}var g="px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc",h=d.bind(null,new RegExp(g,"g")),i=d.bind(null,new RegExp(g+"|%","g")),j=d.bind(null,/deg|rad|grad|turn/g);a.parseLength=h,a.parseLengthOrPercent=i,a.consumeLengthOrPercent=a.consumeParenthesised.bind(null,i),a.parseAngle=j,a.mergeDimensions=f;var k=a.consumeParenthesised.bind(null,h),l=a.consumeRepeated.bind(void 0,k,/^/),m=a.consumeRepeated.bind(void 0,l,/^,/);a.consumeSizePairList=m;var n=function(a){var b=m(a);if(b&&""==b[1])return b[0]},o=a.mergeNestedRepeated.bind(void 0,e," "),p=a.mergeNestedRepeated.bind(void 0,o,",");a.mergeNonNegativeSizePair=o,a.addPropertiesHandler(n,p,["background-size"]),a.addPropertiesHandler(i,e,["border-bottom-width","border-image-width","border-left-width","border-right-width","border-top-width","flex-basis","font-size","height","line-height","max-height","max-width","outline-width","width"]),a.addPropertiesHandler(i,f,["border-bottom-left-radius","border-bottom-right-radius","border-top-left-radius","border-top-right-radius","bottom","left","letter-spacing","margin-bottom","margin-left","margin-right","margin-top","min-height","min-width","outline-offset","padding-bottom","padding-left","padding-right","padding-top","perspective","right","shape-margin","stroke-dashoffset","text-indent","top","vertical-align","word-spacing"])}(d),function(a,b){function c(b){return a.consumeLengthOrPercent(b)||a.consumeToken(/^auto/,b)}function d(b){var d=a.consumeList([a.ignore(a.consumeToken.bind(null,/^rect/)),a.ignore(a.consumeToken.bind(null,/^\(/)),a.consumeRepeated.bind(null,c,/^,/),a.ignore(a.consumeToken.bind(null,/^\)/))],b);if(d&&4==d[0].length)return d[0]}function e(b,c){return"auto"==b||"auto"==c?[!0,!1,function(d){var e=d?b:c;if("auto"==e)return"auto";var f=a.mergeDimensions(e,e);return f[2](f[0])}]:a.mergeDimensions(b,c)}function f(a){return"rect("+a+")"}var g=a.mergeWrappedNestedRepeated.bind(null,f,e,", ");a.parseBox=d,a.mergeBoxes=g,a.addPropertiesHandler(d,g,["clip"])}(d),function(a,b){function c(a){return function(b){var c=0;return a.map(function(a){return a===k?b[c++]:a})}}function d(a){return a}function e(b){if("none"==(b=b.toLowerCase().trim()))return[];for(var c,d=/\s*(\w+)\(([^)]*)\)/g,e=[],f=0;c=d.exec(b);){if(c.index!=f)return;f=c.index+c[0].length;var g=c[1],h=n[g];if(!h)return;var i=c[2].split(","),j=h[0];if(j.length<i.length)return;for(var k=[],o=0;o<j.length;o++){var p,q=i[o],r=j[o];if(void 0===(p=q?{A:function(b){return"0"==b.trim()?m:a.parseAngle(b)},N:a.parseNumber,T:a.parseLengthOrPercent,L:a.parseLength}[r.toUpperCase()](q):{a:m,n:k[0],t:l}[r]))return;k.push(p)}if(e.push({t:g,d:k}),d.lastIndex==b.length)return e}}function f(a){return a.toFixed(6).replace(".000000","")}function g(b,c){if(b.decompositionPair!==c){b.decompositionPair=c;var d=a.makeMatrixDecomposition(b)}if(c.decompositionPair!==b){c.decompositionPair=b;var e=a.makeMatrixDecomposition(c)}return null==d[0]||null==e[0]?[[!1],[!0],function(a){return a?c[0].d:b[0].d}]:(d[0].push(0),e[0].push(1),[d,e,function(b){var c=a.quat(d[0][3],e[0][3],b[5]);return a.composeMatrix(b[0],b[1],b[2],c,b[4]).map(f).join(",")}])}function h(a){return a.replace(/[xy]/,"")}function i(a){return a.replace(/(x|y|z|3d)?$/,"3d")}function j(b,c){var d=a.makeMatrixDecomposition&&!0,e=!1;if(!b.length||!c.length){b.length||(e=!0,b=c,c=[]);for(var f=0;f<b.length;f++){var j=b[f].t,k=b[f].d,l="scale"==j.substr(0,5)?1:0;c.push({t:j,d:k.map(function(a){if("number"==typeof a)return l;var b={};for(var c in a)b[c]=l;return b})})}}var m=function(a,b){return"perspective"==a&&"perspective"==b||("matrix"==a||"matrix3d"==a)&&("matrix"==b||"matrix3d"==b)},o=[],p=[],q=[];if(b.length!=c.length){if(!d)return;var r=g(b,c);o=[r[0]],p=[r[1]],q=[["matrix",[r[2]]]]}else for(var f=0;f<b.length;f++){var j,s=b[f].t,t=c[f].t,u=b[f].d,v=c[f].d,w=n[s],x=n[t];if(m(s,t)){if(!d)return;var r=g([b[f]],[c[f]]);o.push(r[0]),p.push(r[1]),q.push(["matrix",[r[2]]])}else{if(s==t)j=s;else if(w[2]&&x[2]&&h(s)==h(t))j=h(s),u=w[2](u),v=x[2](v);else{if(!w[1]||!x[1]||i(s)!=i(t)){if(!d)return;var r=g(b,c);o=[r[0]],p=[r[1]],q=[["matrix",[r[2]]]];break}j=i(s),u=w[1](u),v=x[1](v)}for(var y=[],z=[],A=[],B=0;B<u.length;B++){var C="number"==typeof u[B]?a.mergeNumbers:a.mergeDimensions,r=C(u[B],v[B]);y[B]=r[0],z[B]=r[1],A.push(r[2])}o.push(y),p.push(z),q.push([j,A])}}if(e){var D=o;o=p,p=D}return[o,p,function(a){return a.map(function(a,b){var c=a.map(function(a,c){return q[b][1][c](a)}).join(",");return"matrix"==q[b][0]&&16==c.split(",").length&&(q[b][0]="matrix3d"),q[b][0]+"("+c+")"}).join(" ")}]}var k=null,l={px:0},m={deg:0},n={matrix:["NNNNNN",[k,k,0,0,k,k,0,0,0,0,1,0,k,k,0,1],d],matrix3d:["NNNNNNNNNNNNNNNN",d],rotate:["A"],rotatex:["A"],rotatey:["A"],rotatez:["A"],rotate3d:["NNNA"],perspective:["L"],scale:["Nn",c([k,k,1]),d],scalex:["N",c([k,1,1]),c([k,1])],scaley:["N",c([1,k,1]),c([1,k])],scalez:["N",c([1,1,k])],scale3d:["NNN",d],skew:["Aa",null,d],skewx:["A",null,c([k,m])],skewy:["A",null,c([m,k])],translate:["Tt",c([k,k,l]),d],translatex:["T",c([k,l,l]),c([k,l])],translatey:["T",c([l,k,l]),c([l,k])],translatez:["L",c([l,l,k])],translate3d:["TTL",d]};a.addPropertiesHandler(e,j,["transform"]),a.transformToSvgMatrix=function(b){var c=a.transformListToMatrix(e(b));return"matrix("+f(c[0])+" "+f(c[1])+" "+f(c[4])+" "+f(c[5])+" "+f(c[12])+" "+f(c[13])+")"}}(d),function(a){function b(a){var b=Number(a);if(!(isNaN(b)||b<100||b>900||b%100!=0))return b}function c(b){return b=100*Math.round(b/100),b=a.clamp(100,900,b),400===b?"normal":700===b?"bold":String(b)}function d(a,b){return[a,b,c]}a.addPropertiesHandler(b,d,["font-weight"])}(d),function(a){function b(a){var b={};for(var c in a)b[c]=-a[c];return b}function c(b){return a.consumeToken(/^(left|center|right|top|bottom)\b/i,b)||a.consumeLengthOrPercent(b)}function d(b,d){var e=a.consumeRepeated(c,/^/,d);if(e&&""==e[1]){var f=e[0];if(f[0]=f[0]||"center",f[1]=f[1]||"center",3==b&&(f[2]=f[2]||{px:0}),f.length==b){if(/top|bottom/.test(f[0])||/left|right/.test(f[1])){var h=f[0];f[0]=f[1],f[1]=h}if(/left|right|center|Object/.test(f[0])&&/top|bottom|center|Object/.test(f[1]))return f.map(function(a){return"object"==typeof a?a:g[a]})}}}function e(d){var e=a.consumeRepeated(c,/^/,d);if(e){for(var f=e[0],h=[{"%":50},{"%":50}],i=0,j=!1,k=0;k<f.length;k++){var l=f[k];"string"==typeof l?(j=/bottom|right/.test(l),i={left:0,right:0,center:i,top:1,bottom:1}[l],h[i]=g[l],"center"==l&&i++):(j&&(l=b(l),l["%"]=(l["%"]||0)+100),h[i]=l,i++,j=!1)}return[h,e[1]]}}function f(b){var c=a.consumeRepeated(e,/^,/,b);if(c&&""==c[1])return c[0]}var g={left:{"%":0},center:{"%":50},right:{"%":100},top:{"%":0},bottom:{"%":100}},h=a.mergeNestedRepeated.bind(null,a.mergeDimensions," ");a.addPropertiesHandler(d.bind(null,3),h,["transform-origin"]),a.addPropertiesHandler(d.bind(null,2),h,["perspective-origin"]),a.consumePosition=e,a.mergeOffsetList=h;var i=a.mergeNestedRepeated.bind(null,h,", ");a.addPropertiesHandler(f,i,["background-position","object-position"])}(d),function(a){function b(b){var c=a.consumeToken(/^circle/,b);if(c&&c[0])return["circle"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),d,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\)/))],c[1]));var f=a.consumeToken(/^ellipse/,b);if(f&&f[0])return["ellipse"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),e,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\)/))],f[1]));var g=a.consumeToken(/^polygon/,b);return g&&g[0]?["polygon"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),a.optional(a.consumeToken.bind(void 0,/^nonzero\s*,|^evenodd\s*,/),"nonzero,"),a.consumeSizePairList,a.ignore(a.consumeToken.bind(void 0,/^\)/))],g[1])):void 0}function c(b,c){if(b[0]===c[0])return"circle"==b[0]?a.mergeList(b.slice(1),c.slice(1),["circle(",a.mergeDimensions," at ",a.mergeOffsetList,")"]):"ellipse"==b[0]?a.mergeList(b.slice(1),c.slice(1),["ellipse(",a.mergeNonNegativeSizePair," at ",a.mergeOffsetList,")"]):"polygon"==b[0]&&b[1]==c[1]?a.mergeList(b.slice(2),c.slice(2),["polygon(",b[1],g,")"]):void 0}var d=a.consumeParenthesised.bind(null,a.parseLengthOrPercent),e=a.consumeRepeated.bind(void 0,d,/^/),f=a.mergeNestedRepeated.bind(void 0,a.mergeDimensions," "),g=a.mergeNestedRepeated.bind(void 0,f,",");a.addPropertiesHandler(b,c,["shape-outside"])}(d),function(a,b){function c(a,b){b.concat([a]).forEach(function(b){b in document.documentElement.style&&(d[a]=b),e[b]=a})}var d={},e={};c("transform",["webkitTransform","msTransform"]),c("transformOrigin",["webkitTransformOrigin"]),c("perspective",["webkitPerspective"]),c("perspectiveOrigin",["webkitPerspectiveOrigin"]),a.propertyName=function(a){return d[a]||a},a.unprefixedPropertyName=function(a){return e[a]||a}}(d)}(),function(){if(void 0===document.createElement("div").animate([]).oncancel){var a;if(window.performance&&performance.now)var a=function(){return performance.now()};else var a=function(){return Date.now()};var b=function(a,b,c){this.target=a,this.currentTime=b,this.timelineTime=c,this.type="cancel",this.bubbles=!1,this.cancelable=!1,this.currentTarget=a,this.defaultPrevented=!1,this.eventPhase=Event.AT_TARGET,this.timeStamp=Date.now()},c=window.Element.prototype.animate;window.Element.prototype.animate=function(d,e){var f=c.call(this,d,e);f._cancelHandlers=[],f.oncancel=null;var g=f.cancel;f.cancel=function(){g.call(this);var c=new b(this,null,a()),d=this._cancelHandlers.concat(this.oncancel?[this.oncancel]:[]);setTimeout(function(){d.forEach(function(a){a.call(c.target,c)})},0)};var h=f.addEventListener;f.addEventListener=function(a,b){"function"==typeof b&&"cancel"==a?this._cancelHandlers.push(b):h.call(this,a,b)};var i=f.removeEventListener;return f.removeEventListener=function(a,b){if("cancel"==a){var c=this._cancelHandlers.indexOf(b);c>=0&&this._cancelHandlers.splice(c,1)}else i.call(this,a,b)},f}}}(),function(a){var b=document.documentElement,c=null,d=!1;try{var e=getComputedStyle(b).getPropertyValue("opacity"),f="0"==e?"1":"0";c=b.animate({opacity:[f,f]},{duration:1}),c.currentTime=0,d=getComputedStyle(b).getPropertyValue("opacity")==f}catch(a){}finally{c&&c.cancel()}if(!d){var g=window.Element.prototype.animate;window.Element.prototype.animate=function(b,c){return window.Symbol&&Symbol.iterator&&Array.prototype.from&&b[Symbol.iterator]&&(b=Array.from(b)),Array.isArray(b)||null===b||(b=a.convertToArrayForm(b)),g.call(this,b,c)}}}(c),b.true=a}({},function(){return this}());
//# sourceMappingURL=web-animations.min.js.map

/***/ }),

/***/ "./node_modules/zone.js/dist/zone.js":
/*!*******************************************!*\
  !*** ./node_modules/zone.js/dist/zone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    var FUNCTION = 'function';
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var Zone = /** @class */ (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                throw Error('Already loaded patch: ' + name);
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== FUNCTION) {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            // we have to define an variable here, if not
            // typescript compiler will complain below
            var isNotScheduled = task.state === notScheduled;
            if (isNotScheduled && task.type === eventTask) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this
                            .name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) { return delegate.invokeTask(target, task, applyThis, applyArgs); },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = /** @class */ (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                return this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = /** @class */ (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                nativeMicroTaskQueuePromise[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
        bindArguments: function () { return null; },
        setNativePromise: function (NativePromise) {
            // sometimes NativePromise.resolve static function
            // is not ready yet, (such as core-js/es6.promise)
            // so we need to check here.
            if (NativePromise && typeof NativePromise.resolve === FUNCTION) {
                nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
        },
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var creationTrace = '__creationTrace__';
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var symbolFinally = __symbol__('finally');
    var symbolParentPromiseValue = __symbol__('parentPromiseValue');
    var symbolParentPromiseState = __symbol__('parentPromiseState');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    var TYPE_ERROR = 'Promise resolved with itself';
    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                if (promise[symbolFinally] === symbolFinally) {
                    // the promise is generated by Promise.prototype.finally          
                    if (state === RESOLVED) {
                        // the state is resolved, should ignore the value
                        // and use parent promise value
                        promise[symbolState] = promise[symbolParentPromiseState];
                        promise[symbolValue] = promise[symbolParentPromiseValue];
                    }
                }
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    var trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        // try to print more readable error log
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var promiseState = promise[symbolState];
        var delegate = promiseState ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                var parentPromiseValue = promise[symbolValue];
                var isFinallyPromise = chainPromise && symbolFinally === chainPromise[symbolFinally];
                if (isFinallyPromise) {
                    // if the promise is generated from finally call, keep parent promise's state and value
                    chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                    chainPromise[symbolParentPromiseState] = promiseState;
                }
                // should not pass value to finally callback
                var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
                resolvePromise(chainPromise, true, value);
            }
            catch (error) {
                // if error occurs, should always return this error
                resolvePromise(chainPromise, false, error);
            }
        }, chainPromise);
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    var ZoneAwarePromise = /** @class */ (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return ZONE_AWARE_PROMISE_TO_STRING;
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        ZoneAwarePromise.prototype.finally = function (onFinally) {
            var chainPromise = new this.constructor(null);
            chainPromise[symbolFinally] = symbolFinally;
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
            }
            return chainPromise;
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
    if (!desc || desc.configurable) {
        desc && delete desc.writable;
        desc && delete desc.value;
        if (!desc) {
            desc = { configurable: true, enumerable: true };
        }
        desc.get = function () {
            // if we already set ZoneAwarePromise, use patched one
            // otherwise return native one.
            return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
        };
        desc.set = function (NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
                // if the NewNativePromise is ZoneAwarePromise
                // save to global
                global[ZONE_AWARE_PROMISE] = NewNativePromise;
            }
            else {
                // if the NewNativePromise is not ZoneAwarePromise
                // for example: after load zone.js, some library just
                // set es6-promise to global, if we set it to global
                // directly, assertZonePatched will fail and angular
                // will not loaded, so we just set the NewNativePromise
                // to global[symbolPromise], so the result is just like
                // we load ES6 Promise before zone.js
                global[symbolPromise] = NewNativePromise;
                if (!NewNativePromise.prototype[symbolThen]) {
                    patchThen(NewNativePromise);
                }
                api.setNativePromise(NewNativePromise);
            }
        };
        ObjectDefineProperty(global, 'Promise', desc);
    }
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
        if (prop && (prop.writable === false || !prop.configurable)) {
            // check Ctor.prototype.then propertyDescriptor is writable or not
            // in meteor env, writable is false, we should ignore such case
            return;
        }
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch_1 = global['fetch'];
        if (typeof fetch_1 == 'function') {
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
var ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
var ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
var ObjectCreate = Object.create;
/** Array.prototype.slice */
var ArraySlice = Array.prototype.slice;
/** addEventListener string const */
var ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
var TRUE_STR = 'true';
/** false string const */
var FALSE_STR = 'false';
/** __zone_symbol__ string const */
var ZONE_SYMBOL_PREFIX = '__zone_symbol__';
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== 'undefined';
var internalWindow = isWindowExists ? window : undefined;
var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
var REMOVE_ATTRIBUTE = 'removeAttribute';
var NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result = listener && listener.apply(this, arguments);
    if (result != undefined && !result) {
        event.preventDefault();
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        var listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask, null);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}

function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
        return ieOrEdge;
    }
    catch (error) {
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');
    var newFunctionToString = function toString() {
        if (typeof this === 'function') {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[ORIGINAL_DELEGATE_SYMBOL], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.apply(this, arguments);
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
// an identifier to tell ZoneTask do not create a new invoke closure
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
var zoneSymbolEventNames$1 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
var IMMEDIATE_PROPAGATION_SYMBOL = ('__zone_symbol__propagationStopped');
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        var validateHandler = patchOptions && patchOptions.vh;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        var customScheduleGlobal = function () {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        var customScheduleNonGlobal = function (task) {
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        var blackListedEvents = Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')];
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var eventName = arguments[0];
                var options = arguments[2];
                if (blackListedEvents) {
                    // check black list
                    for (var i = 0; i < blackListedEvents.length; i++) {
                        if (eventName === blackListedEvents[i]) {
                            return nativeListener.apply(this, arguments);
                        }
                    }
                }
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = eventName + FALSE_STR;
                    var trueEventName = eventName + TRUE_STR;
                    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                    zoneSymbolEventNames$1[eventName] = {};
                    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor['name'];
                var targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource + eventName;
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : null;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                task.options = options;
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
function patchEventPrototype(global, api) {
    var Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        }; });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                // issue-934, task will be cancelled
                // even it is a periodic task such as
                // setInterval
                if (!(task.data && task.data.isPeriodic)) {
                    if (typeof data.handleId === 'number') {
                        // in non-nodejs env, we remove timerId
                        // from local cache
                        delete tasksByHandleId[data.handleId];
                    }
                    else if (data.handleId) {
                        // Node returns complex objects as handleIds
                        // we remove task reference from timer object
                        data.handleId[taskSymbol] = null;
                    }
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var id = args[0];
            var task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = ArraySlice.call(arguments);
                    if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global.__Zone_ignore_on_properties;
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            var internalWindow = window;
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(api, _global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = zoneSymbol('fake');
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
        .split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    //  predefine all task.source string
    for (var i = 0; i < WTF_ISSUE_555.length; i++) {
        var target = WTF_ISSUE_555_ARRAY[i];
        var targets = globalSources[target] = {};
        for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
        }
    }
    var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
        if (!isDisableIECheck && ieOrEdge) {
            if (isEnableCrossContextCheck) {
                try {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            else {
                var testString = delegate.toString();
                if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
        }
        else if (isEnableCrossContextCheck) {
            try {
                delegate.toString();
            }
            catch (error) {
                nativeDelegate.apply(target, args);
                return false;
            }
        }
        return true;
    };
    var apiTypes = [];
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        apiTypes.push(type && type.prototype);
    }
    // vh is validateHandler to check event handler
    // is valid or not(for security check)
    patchEventTarget(_global, apiTypes, { vh: checkIEAndCrossContext });
    api.patchEventTarget = patchEventTarget;
    return true;
}
function patchEvent(global, api) {
    patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = wrapWithCurrentZone(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return _registerElement.call(document, name, opts);
    };
    attachOriginToPatched(document.registerElement, _registerElement);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
});
Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    // load blackListEvents from global
    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    patchEvent(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
    propertyPatch();
    registerElementPatch(global);
});
Zone.__load_patch('canvas', function (global) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    function patchXHR(window) {
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget) {
                var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            XMLHttpRequest[XHR_SCHEDULED] = false;
            var data = task.data;
            var target = data.target;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        task.invoke();
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            XMLHttpRequest[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = {
                    target: self,
                    url: self[XHR_URL],
                    isPeriodic: false,
                    delay: null,
                    args: args,
                    aborted: false
                };
                return scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
            }
        }; });
        var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-grid></app-grid>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = "Samples";
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var igniteui_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! igniteui-angular */ "./node_modules/igniteui-angular/fesm5/igniteui-angular.js");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./grid/grid.component */ "./src/app/grid/grid.component.ts");
/* harmony import */ var _grid_services_data_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./grid/services/data.service */ "./src/app/grid/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__["GridComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxAvatarModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxBadgeModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxButtonModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxGridModule"].forRoot(),
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxIconModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxInputGroupModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxProgressBarModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxRippleModule"],
                igniteui_angular__WEBPACK_IMPORTED_MODULE_6__["IgxSwitchModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
            ],
            providers: [_grid_services_data_service__WEBPACK_IMPORTED_MODULE_8__["DataService"]],
            entryComponents: []
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/grid/grid.component.html":
/*!******************************************!*\
  !*** ./src/app/grid/grid.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"grid__wrapper\">\r\n\r\n    <div class=\"sample__header\">\r\n        <div class=\"switch-sample\">\r\n            <h3 class=\"switch-sample__title\">Realtime Angular Application</h3>\r\n            <igx-switch [(ngModel)]=\"live\" [disabled]=\"isFinished\" title=\"Start/Stop the realtime updates\"> <span class=\"switch-sample__label\">Live</span>\r\n            </igx-switch>\r\n        </div>\r\n        <igx-input-group>\r\n            <input class=\"gridSample__filter\" igxInput type=\"text\" placeholder=\"Filter by name\" (input)=\"filter($event.target.value)\">\r\n        </igx-input-group>\r\n    </div>\r\n\r\n    <igx-grid #grid1 [data]=\"localData\" [paging]=\"true\" [perPage]=\"100\" [height]=\"null\" (onSelection)=\"cellSelection($event)\"\r\n        [paginationTemplate]=\"pager\">\r\n\r\n        <igx-column header=\"Row ID\" headerClasses=\"myClass\" width=\"100px\" field=\"Id\" sortable=\"true\">\r\n            <ng-template igxCell let-cell=\"cell\">\r\n                <div class=\"cell__inner\">\r\n                    <div>{{ cell.value }}</div>\r\n                </div>\r\n            </ng-template>\r\n        </igx-column>\r\n\r\n        <igx-column field=\"Name\" header=\"Name\" width=\"380\">\r\n            <ng-template igxCell let-cell=\"cell\">\r\n                <div class=\"cell__inner\">\r\n                    <span class=\"name\">{{ cell.value }}</span>\r\n                    <igx-badge *ngIf=\"live\" [type]=\"getBadgeType(cell)\" [icon]=\"getIconType(cell)\"></igx-badge>\r\n                </div>\r\n\r\n            </ng-template>\r\n        </igx-column>\r\n\r\n        <igx-column field=\"Number\" header=\"Number\" width=\"100px\" [hidden]=\"hideNumber\" dataType=\"number\">\r\n            <ng-template igxCell let-val>\r\n                <div class=\"cell__inner\">\r\n                    {{ val }}\r\n                </div>\r\n            </ng-template>\r\n        </igx-column>\r\n    </igx-grid>\r\n\r\n    <ng-template #pager let-grid>\r\n        <div *ngIf=\"grid.paging && grid.totalPages > 0\" class=\"igx-paginator\">\r\n            <button [disabled]=\"grid.isFirstPage\" (click)=\"grid.paginate(0)\" igxButton=\"icon\" igxRipple\r\n                igxRippleCentered=\"true\">\r\n                <igx-icon>first_page</igx-icon>\r\n            </button>\r\n            <button [disabled]=\"grid.isFirstPage\" (click)=\"grid.previousPage()\" igxButton=\"icon\" igxRipple\r\n                igxRippleCentered=\"true\">\r\n                <igx-icon>chevron_left</igx-icon>\r\n            </button>\r\n            <span>{{ grid.page + 1 }} of {{ grid.totalPages }}</span>\r\n            <button [disabled]=\"grid.isLastPage\" (click)=\"grid.nextPage()\" igxRipple igxRippleCentered=\"true\" igxButton=\"icon\">\r\n                <igx-icon>chevron_right</igx-icon>\r\n            </button>\r\n            <button [disabled]=\"grid.isLastPage\" (click)=\"grid.paginate(grid.totalPages - 1)\" igxButton=\"icon\"\r\n                igxRipple igxRippleCentered=\"true\">\r\n                <igx-icon>last_page</igx-icon>\r\n            </button>\r\n        </div>\r\n    </ng-template>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/grid/grid.component.scss":
/*!******************************************!*\
  !*** ./src/app/grid/grid.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "[hidden] {\n  display: none !important; }\n\n.igx-display-container {\n  display: inherit;\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.igx-display-container--inactive {\n  width: 100%; }\n\n.igx-vhelper--vertical, .igx-vhelper--horizontal {\n  display: block;\n  overflow: auto;\n  z-index: 10001; }\n\n.igx-vhelper--vertical {\n  position: absolute;\n  width: 18px;\n  top: 0;\n  right: 0; }\n\n.igx-vhelper--horizontal {\n  width: 100%; }\n\n.igx-vhelper--vertical .igx-vhelper__placeholder-content {\n  width: 1px; }\n\n.igx-vhelper--horizontal .igx-vhelper__placeholder-content {\n  height: 1px; }\n\n.igx-toggle--hidden {\n  display: none !important; }\n\nigx-carousel {\n  outline-style: none; }\n\n.igx-overlay {\n  width: 0;\n  height: 0; }\n\n.igx-svg-container {\n  visibility: hidden;\n  width: 0;\n  height: 0;\n  font-size: 0;\n  overflow: hidden; }\n\n.grid__wrapper {\n  /* We set those with position relative\n    so that the drop indicators be scoped\n    to their respective group. The item\n    being the topmost element, while the\n    subgroup encapsulates children of each\n    thead item and group.\n    */\n  width: 1000px;\n  margin: 0 auto; }\n\n.grid__wrapper :root {\n    --igx-grid-header-background: #f4f4f4;\n    --igx-grid-header-text-color: rgba(0, 0, 0, 0.54);\n    --igx-grid-header-border-width: 1px;\n    --igx-grid-header-border-style: solid;\n    --igx-grid-header-border-color: rgba(0, 0, 0, 0.08);\n    --igx-grid-content-background: #fff;\n    --igx-grid-content-text-color: rgba(0, 0, 0, 0.74);\n    --igx-grid-ghost-header-text-color: rgba(0, 0, 0, 0.54);\n    --igx-grid-ghost-header-icon-color: rgba(0, 0, 0, 0.38);\n    --igx-grid-ghost-header-background: #fff;\n    --igx-grid-row-odd-background: #fff;\n    --igx-grid-row-even-background: #fff;\n    --igx-grid-row-odd-text-color: inherit;\n    --igx-grid-row-even-text-color: inherit;\n    --igx-grid-row-selected-background: #333;\n    --igx-grid-row-selected-text-color: #ddd;\n    --igx-grid-row-hover-background: #f8f8f8;\n    --igx-grid-row-hover-text-color: black;\n    --igx-grid-row-border-color: #f8f8f8;\n    --igx-grid-pinned-border-width: 2px;\n    --igx-grid-pinned-border-style: solid;\n    --igx-grid-pinned-border-color: rgba(0, 0, 0, 0.26);\n    --igx-grid-cell-selected-background: rgba(0, 0, 0, 0.74);\n    --igx-grid-cell-selected-text-color: #fff;\n    --igx-grid-cell-editing-background: #fff;\n    --igx-grid-edit-mode-color: #e41c77;\n    --igx-grid-edited-row-indicator: rgba(0, 0, 0, 0.26);\n    --igx-grid-cell-edited-value-color: rgba(0, 0, 0, 0.54);\n    --igx-grid-resize-line-color: #e41c77;\n    --igx-grid-drop-indicator-color: #e41c77;\n    --igx-grid-grouparea-background: #f4f4f4;\n    --igx-grid-group-label-column-name-text: #09f;\n    --igx-grid-group-label-icon: #09f;\n    --igx-grid-group-label-text: rgba(0, 0, 0, 0.74);\n    --igx-grid-expand-all-icon-color: rgba(0, 0, 0, 0.54);\n    --igx-grid-expand-all-icon-hover-color: rgba(0, 0, 0, 0.74);\n    --igx-grid-expand-icon-color: rgba(0, 0, 0, 0.54);\n    --igx-grid-expand-icon-hover-color: #09f;\n    --igx-grid-active-expand-icon-color: rgba(0, 0, 0, 0.38);\n    --igx-grid-active-expand-icon-hover-color: #09f;\n    --igx-grid-group-count-background: rgba(0, 0, 0, 0.08);\n    --igx-grid-group-count-text-color: rgba(0, 0, 0, 0.54);\n    --igx-grid-drop-area-text-color: rgba(0, 0, 0, 0.54);\n    --igx-grid-drop-area-icon-color: rgba(0, 0, 0, 0.38);\n    --igx-grid-drop-area-background: rgba(0, 0, 0, 0.04);\n    --igx-grid-drop-area-on-drop-background: rgba(0, 0, 0, 0.08);\n    --igx-grid-group-row-background: #f4f4f4;\n    --igx-grid-group-row-selected-background: #eaeaea;\n    --igx-grid-filtering-header-background: #fff;\n    --igx-grid-filtering-header-text-color: rgba(0, 0, 0, 0.74);\n    --igx-grid-filtering-row-background: #fff;\n    --igx-grid-filtering-row-text-color: rgba(0, 0, 0, 0.74);\n    --igx-grid-tree-filtered-text-color: rgba(0, 0, 0, 0.38);\n    --igx-grid-edit-mode-row-border-color: ;\n    --igx-grid-tree-selected-filtered-row-text-color: rgba(255, 255, 255, 0.5);\n    --igx-grid-tree-selected-filtered-cell-text-color: rgba(0, 0, 0, 0.5); }\n\n.grid__wrapper .igx-grid, .grid__wrapper .igx-grid--cosy, .grid__wrapper .igx-grid--compact {\n    position: relative;\n    display: grid;\n    grid-template-rows: auto auto auto 1fr auto auto;\n    grid-template-columns: 1fr;\n    border-radius: 2px;\n    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.26), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.08);\n    outline-style: none;\n    overflow: hidden;\n    z-index: 0; }\n\n.grid__wrapper .igx-grid .igx-checkbox, .grid__wrapper .igx-grid--cosy .igx-checkbox, .grid__wrapper .igx-grid--compact .igx-checkbox {\n      min-width: 1.25rem; }\n\n.grid__wrapper .igx-grid__caption {\n    display: flex;\n    align-items: center;\n    font-size: 1.25rem;\n    line-height: 2rem;\n    padding: 1rem 1.5rem;\n    grid-row: 1; }\n\n.grid__wrapper .igx-grid__thead,\n  .grid__wrapper .igx-grid__tfoot {\n    position: relative;\n    display: block;\n    background: #f4f4f4;\n    color: rgba(0, 0, 0, 0.54); }\n\n.grid__wrapper .igx-grid__thead .igx-grid__tr,\n    .grid__wrapper .igx-grid__tfoot .igx-grid__tr {\n      position: relative;\n      background: inherit;\n      color: inherit;\n      z-index: 2; }\n\n.grid__wrapper .igx-grid__thead .igx-grid__tr:hover,\n      .grid__wrapper .igx-grid__tfoot .igx-grid__tr:hover {\n        background: inherit;\n        color: inherit; }\n\n.grid__wrapper .igx-grid__thead {\n    grid-row: 3;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n    z-index: 2; }\n\n.grid__wrapper .igx-grid__thead .igx-grid__cbx-selection {\n      align-items: flex-start;\n      padding-top: 0.9375rem; }\n\n.grid__wrapper .igx-grid__thead .igx-grid__tr:last-of-type {\n      border-bottom: none; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__thead .igx-grid__cbx-selection, .igx-grid--cosy .grid__wrapper .igx-grid__thead .igx-grid__cbx-selection {\n    align-items: flex-start;\n    padding-top: 0.625rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__thead .igx-grid__cbx-selection, .igx-grid--compact .grid__wrapper .igx-grid__thead .igx-grid__cbx-selection {\n    align-items: flex-start;\n    padding-top: 0.375rem; }\n\n.grid__wrapper .igx-grid__thead-title {\n    flex-basis: auto !important;\n    align-items: center !important;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n    height: 3.125rem; }\n\n.grid__wrapper .igx-grid__thead-title--pinned-last {\n    border-right: 2px solid rgba(0, 0, 0, 0.26) !important; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__thead-title, .igx-grid--cosy .grid__wrapper .igx-grid__thead-title {\n    height: 2.5rem;\n    padding: 0 1rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__thead-title, .igx-grid--compact .grid__wrapper .igx-grid__thead-title {\n    height: 2rem;\n    padding: 0 0.75rem; }\n\n.grid__wrapper .igx-grid__thead-group {\n    display: flex;\n    flex-flow: row nowrap; }\n\n.grid__wrapper .igx-grid__thead-item,\n  .grid__wrapper .igx-grid__thead-subgroup {\n    position: relative; }\n\n.grid__wrapper .igx-grid__tfoot {\n    grid-row: 5;\n    border-top: 1px solid rgba(0, 0, 0, 0.08);\n    z-index: 10001; }\n\n.grid__wrapper .igx-grid__thead igx-display-container, .igx-grid__thead .grid__wrapper igx-display-container {\n    width: 100%;\n    overflow: visible; }\n\n.grid__wrapper .igx-grid__tr igx-display-container, .igx-grid__tr .grid__wrapper igx-display-container, .grid__wrapper .igx-grid__summaries igx-display-container, .igx-grid__summaries .grid__wrapper igx-display-container {\n    width: 100%;\n    overflow: visible; }\n\n.grid__wrapper .igx-grid__tbody {\n    position: relative;\n    grid-row: 4;\n    background: #fff;\n    color: rgba(0, 0, 0, 0.74);\n    overflow: hidden;\n    z-index: 1; }\n\n.grid__wrapper .igx-grid__tbody-message {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n    color: rgba(0, 0, 0, 0.74); }\n\n.grid__wrapper .igx-grid__scroll {\n    grid-row: 6;\n    display: flex;\n    flex-flow: row nowrap;\n    width: 100%;\n    background: #f4f4f4;\n    z-index: 10001; }\n\n.grid__wrapper .igx-grid__scroll-start {\n    background: rgba(0, 0, 0, 0.08); }\n\n.grid__wrapper .igx-grid__scroll-main igx-display-container {\n    height: 0; }\n\n.grid__wrapper .igx-grid__scroll-main igx-horizontal-virtual-helper {\n    height: 100%; }\n\n.grid__wrapper .igx-grid__tr {\n    display: flex;\n    background-color: #fff;\n    border-bottom: 1px solid #f8f8f8;\n    outline-style: none;\n    position: relative; }\n\n.grid__wrapper .igx-grid__tr:hover {\n      background-color: #f8f8f8;\n      color: black; }\n\n.grid__wrapper .igx-grid__tr--odd {\n    background: #fff;\n    color: inherit; }\n\n.grid__wrapper .igx-grid__tr--even {\n    background: #fff;\n    color: inherit; }\n\n.grid__wrapper .igx-grid__tr--selected {\n    color: #ddd;\n    background-color: #333; }\n\n.grid__wrapper .igx-grid__tr--selected:hover {\n      background-color: #333;\n      color: #ddd; }\n\n.grid__wrapper .igx-grid__tr--selected .igx-grid__tree-grouping-indicator {\n      color: #ddd; }\n\n.grid__wrapper .igx-grid__tr--selected .igx-grid__tree-grouping-indicator:hover {\n        color: #ddd; }\n\n.grid__wrapper .igx-grid__tr--edit {\n    border-bottom: 1px solid #e41c77;\n    position: relative; }\n\n.grid__wrapper .igx-grid__tr--edit::after {\n      content: '';\n      position: absolute;\n      height: 0.0625rem;\n      width: 100%;\n      top: -0.0625rem;\n      left: 0;\n      background: #e41c77; }\n\n.grid__wrapper .igx-grid__tr--edit .igx-grid__td--editing {\n      border: none; }\n\n.grid__wrapper .igx-grid__tr--edit .igx-grid__td--editing .igx-input-group--focused .igx-input-group__bundle, .igx-input-group--focused .grid__wrapper .igx-grid__tr--edit .igx-grid__td--editing .igx-input-group__bundle {\n        caret-color: #e41c77 !important; }\n\n.grid__wrapper .igx-grid__tr--edit .igx-grid__td--editing .igx-input-group__border {\n        background: #e41c77 !important; }\n\n.grid__wrapper .igx-grid__tr--edited::before {\n    content: '';\n    position: absolute;\n    width: 0.125rem;\n    height: 100%;\n    z-index: 2;\n    background: rgba(0, 0, 0, 0.26); }\n\n.grid__wrapper .igx-grid__tr--group {\n    position: relative;\n    background: #f4f4f4 !important; }\n\n.grid__wrapper .igx-grid__tr--filtered .igx-grid__td-text {\n    color: rgba(0, 0, 0, 0.38); }\n\n.grid__wrapper .igx-grid__tr--filtered .igx-grid__tree-grouping-indicator {\n    color: rgba(0, 0, 0, 0.38); }\n\n.grid__wrapper .igx-grid__tr--filtered .igx-grid__tree-grouping-indicator:hover {\n      color: rgba(0, 0, 0, 0.38); }\n\n.grid__wrapper .igx-grid__tr--filtered .igx-grid__td--selected .igx-grid__td-text {\n    color: rgba(0, 0, 0, 0.5); }\n\n.grid__wrapper .igx-grid__tr--filtered .igx-grid__td--selected .igx-grid__tree-grouping-indicator {\n    color: rgba(0, 0, 0, 0.5); }\n\n.grid__wrapper .igx-grid__tr--filtered .igx-grid__td--selected .igx-grid__tree-grouping-indicator:hover {\n      color: rgba(0, 0, 0, 0.5); }\n\n.grid__wrapper .igx-grid__tr--selected.igx-grid__tr--filtered .igx-grid__td-text {\n    color: rgba(255, 255, 255, 0.5); }\n\n.grid__wrapper .igx-grid__tr--selected.igx-grid__tr--filtered .igx-grid__tree-grouping-indicator {\n    color: rgba(255, 255, 255, 0.5); }\n\n.grid__wrapper .igx-grid__tr--selected.igx-grid__tr--filtered .igx-grid__tree-grouping-indicator:hover {\n      color: rgba(255, 255, 255, 0.5); }\n\n.grid__wrapper .igx-grid__tr--selected.igx-grid__tr--filtered .igx-grid__td--selected .igx-grid__td-text {\n    color: rgba(0, 0, 0, 0.5); }\n\n.grid__wrapper .igx-grid__tr--selected.igx-grid__tr--filtered .igx-grid__td--selected .igx-grid__tree-grouping-indicator {\n    color: rgba(0, 0, 0, 0.5); }\n\n.grid__wrapper .igx-grid__tr--selected.igx-grid__tr--filtered .igx-grid__td--selected .igx-grid__tree-grouping-indicator:hover {\n      color: rgba(0, 0, 0, 0.5); }\n\n.grid__wrapper .igx-grid__tree-grouping-indicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    outline-style: none;\n    margin-right: 0.5rem;\n    cursor: pointer;\n    color: rgba(0, 0, 0, 0.54); }\n\n.grid__wrapper .igx-grid__tree-grouping-indicator:hover {\n      color: #09f; }\n\n.grid__wrapper .igx-grid__thead-title, .grid__wrapper .igx-grid__th, .grid__wrapper .igx-grid__td {\n    position: relative;\n    display: flex;\n    flex: 1 1 0%;\n    align-items: center;\n    outline-style: none;\n    padding: 0 1.5rem;\n    font-size: 0.8125rem;\n    line-height: 1rem;\n    color: inherit;\n    text-align: left; }\n\n.grid__wrapper .igx-grid__td--tree-cell {\n    overflow: hidden; }\n\n.grid__wrapper .igx-grid__td-text {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__td, .igx-grid--cosy .grid__wrapper .igx-grid__td {\n    padding: 0 1rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__td, .igx-grid--compact .grid__wrapper .igx-grid__td {\n    padding: 0 0.75rem; }\n\n.grid__wrapper .igx-grid__th--fw, .grid__wrapper .igx-grid__td--fw {\n    flex-grow: 0;\n    outline-style: none; }\n\n.grid__wrapper .igx-grid__td--selected {\n    color: #fff;\n    background-color: rgba(0, 0, 0, 0.74) !important;\n    border-bottom: 0; }\n\n.grid__wrapper .igx-grid__td--selected .igx-grid__tree-grouping-indicator {\n      color: #fff; }\n\n.grid__wrapper .igx-grid__td--selected .igx-grid__tree-grouping-indicator:hover {\n        color: #fff; }\n\n.grid__wrapper .igx-grid__td--edited .igx-grid__td-text {\n    font-style: italic;\n    color: rgba(0, 0, 0, 0.54); }\n\n.grid__wrapper .igx-grid__tr--deleted .igx-grid__td-text {\n    font-style: italic;\n    color: #ff134a;\n    -webkit-text-decoration-line: line-through;\n            text-decoration-line: line-through; }\n\n.grid__wrapper .igx-grid__td--editing {\n    background-color: #fff !important;\n    border: 0.125rem solid rgba(0, 0, 0, 0.74); }\n\n.grid__wrapper .igx-grid__td--editing igx-input-group {\n      width: 100%;\n      margin-top: -16px; }\n\n.grid__wrapper .igx-grid__td--editing .igx-input-group__input, .grid__wrapper .igx-grid__td--editing .igx-input-group__textarea {\n      font-size: 0.8125rem !important;\n      line-height: 1rem !important; }\n\n.grid__wrapper .igx-grid__th--pinned, .grid__wrapper .igx-grid__td--pinned, .grid__wrapper .igx-grid__td--pinned-last {\n    position: relative;\n    background-color: inherit;\n    z-index: 9999; }\n\n.grid__wrapper .igx-grid__th--pinned-last, .grid__wrapper .igx-grid__td--pinned-last {\n    border-right: 2px solid rgba(0, 0, 0, 0.26) !important; }\n\n.grid__wrapper .igx-grid__thead-title, .grid__wrapper .igx-grid__th {\n    flex-flow: row nowrap;\n    justify-content: space-between;\n    align-items: flex-end;\n    font-size: 0.75rem;\n    font-weight: 600;\n    min-width: 0;\n    padding: 0 1.5rem;\n    border-right: 1px solid rgba(0, 0, 0, 0.08);\n    outline-style: none; }\n\n.grid__wrapper .igx-grid__th--filtering {\n    background: #fff;\n    color: rgba(0, 0, 0, 0.74);\n    z-index: 3; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__th, .igx-grid--cosy .grid__wrapper .igx-grid__th {\n    padding: 0 1rem;\n    min-height: 2.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__th, .igx-grid--compact .grid__wrapper .igx-grid__th {\n    padding: 0 0.75rem;\n    min-height: 2rem; }\n\n.grid__wrapper .igx-grid__th-title {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    min-width: 3ch;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    cursor: initial;\n    flex-grow: 1;\n    /* hey IE, the text should take most of the space */\n    align-self: flex-end;\n    line-height: 4.16666667; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__th-title, .igx-grid--cosy .grid__wrapper .igx-grid__th-title {\n    line-height: 3.33333333; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__th-title, .igx-grid--compact .grid__wrapper .igx-grid__th-title {\n    line-height: 2.66666667; }\n\n.grid__wrapper .igx-grid__th-icons {\n    display: inline-flex;\n    align-items: center;\n    justify-content: flex-end;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    min-width: 15px;\n    /* sort-icon width */\n    height: 3.125rem;\n    align-self: flex-end; }\n\n.grid__wrapper .igx-grid__th-icons:empty {\n      min-width: 0; }\n\n.grid__wrapper .igx-grid__th-icons .sort-icon {\n      width: 0.9375rem;\n      height: 0.9375rem;\n      min-width: 0.9375rem;\n      /* yeah IE, it really needs to be 15px wide... */\n      font-size: 0.9375rem;\n      color: #e41c77; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__th-icons, .igx-grid--cosy .grid__wrapper .igx-grid__th-icons {\n    height: 2.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__th-icons, .igx-grid--compact .grid__wrapper .igx-grid__th-icons {\n    height: 2rem; }\n\n.grid__wrapper .igx-grid__th--number, .grid__wrapper .igx-grid__td--number {\n    text-align: right;\n    justify-content: flex-end; }\n\n.grid__wrapper .igx-grid__th--number .igx-grid__th-icons, .grid__wrapper .igx-grid__td--number .igx-grid__th-icons {\n      justify-content: flex-start;\n      order: -1; }\n\n.grid__wrapper .igx-grid__th--number .igx-grid__th-icons .sort-icon, .grid__wrapper .igx-grid__td--number .igx-grid__th-icons .sort-icon {\n        order: 1; }\n\n.grid__wrapper .igx-grid__cbx-selection {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0 1.5rem;\n    border-right: 1px solid rgba(0, 0, 0, 0.08);\n    background: inherit;\n    z-index: 1; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__cbx-selection, .igx-grid--cosy .grid__wrapper .igx-grid__cbx-selection {\n    padding: 0 1rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__cbx-selection, .igx-grid--compact .grid__wrapper .igx-grid__cbx-selection {\n    padding: 0 0.75rem; }\n\n.grid__wrapper .igx-grid__th-resize-handle {\n    position: absolute;\n    width: 4px;\n    top: 0;\n    right: -2px;\n    height: 100%;\n    z-index: 2; }\n\n.grid__wrapper .igx-grid__th-resize-line {\n    position: absolute;\n    cursor: col-resize;\n    width: 4px;\n    background-color: #e41c77;\n    z-index: 2; }\n\n.grid__wrapper .igx-grid__th-resize-line::before, .grid__wrapper .igx-grid__th-resize-line::after {\n      position: absolute;\n      content: '';\n      height: 100%;\n      width: 96px; }\n\n.grid__wrapper .igx-grid__th-resize-line::before {\n      right: 100%; }\n\n.grid__wrapper .igx-grid__th-resize-line::after {\n      left: 100%; }\n\n.grid__wrapper .igx-grid__summaries {\n    display: flex;\n    background: inherit; }\n\n.grid__wrapper .igx-grid__summaries-patch {\n    background: inherit;\n    position: relative;\n    z-index: 1; }\n\n.grid__wrapper .igx-grid__th-drop-indicator-left,\n  .grid__wrapper .igx-grid__th-drop-indicator-right {\n    position: absolute;\n    width: 1px;\n    height: 100%;\n    top: 0;\n    z-index: 1; }\n\n.grid__wrapper .igx-grid__th-drop-indicator-left {\n    left: -1px; }\n\n.grid__wrapper .igx-grid__th-drop-indicator-right {\n    right: -1px; }\n\n.grid__wrapper .igx-grid__th-drop-indicator-left.igx-grid__th-drop-indicator--active, .grid__wrapper .igx-grid__th-drop-indicator-right.igx-grid__th-drop-indicator--active {\n    border-right: 1px solid #e41c77; }\n\n.grid__wrapper .igx-grid__th-drop-indicator--active::after, .grid__wrapper .igx-grid__th-drop-indicator--active::before {\n    position: absolute;\n    content: '';\n    width: 0;\n    height: 0;\n    border-style: solid;\n    left: -3px; }\n\n.grid__wrapper .igx-grid__th-drop-indicator--active::before {\n    bottom: 0;\n    border-width: 0 4px 4px;\n    border-color: transparent transparent #e41c77; }\n\n.grid__wrapper .igx-grid__th-drop-indicator--active::after {\n    top: 0;\n    border-width: 4px 4px 0;\n    border-color: #e41c77 transparent transparent; }\n\n.grid__wrapper .igx-grid__scroll-on-drag-left,\n  .grid__wrapper .igx-grid__scroll-on-drag-right {\n    position: absolute;\n    width: 15px;\n    top: 0;\n    height: 100%;\n    z-index: 25; }\n\n.grid__wrapper .igx-grid__scroll-on-drag-left {\n    left: 0; }\n\n.grid__wrapper .igx-grid__scroll-on-drag-right {\n    right: 0; }\n\n.grid__wrapper .igx-grid__scroll-on-drag-pinned {\n    position: absolute;\n    width: 15px;\n    height: 100%;\n    top: 0;\n    z-index: 25; }\n\n.grid__wrapper .igx-grid__drag-ghost-image {\n    position: absolute;\n    display: flex;\n    align-items: center;\n    background-color: #fff;\n    color: rgba(0, 0, 0, 0.54);\n    height: 3.125rem;\n    min-height: 3.125rem;\n    top: -99999px;\n    left: -99999px;\n    border: none;\n    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.26), 0 5px 8px 0 rgba(0, 0, 0, 0.12), 0 1px 14px 0 rgba(0, 0, 0, 0.08);\n    overflow: hidden;\n    z-index: 20; }\n\n.grid__wrapper .igx-grid__drag-ghost-image .igx-grid__th-title {\n      min-width: calc(100% - 24px); }\n\n.grid__wrapper .igx-grid__drag-ghost-image .igx-grid__th-icons {\n      display: none; }\n\n.grid__wrapper .igx-grid__drag-ghost-image .igx-grid__thead-title {\n      border: none; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__drag-ghost-image, .igx-grid--cosy .grid__wrapper .igx-grid__drag-ghost-image {\n    height: 2.5rem;\n    min-height: 2.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__drag-ghost-image, .igx-grid--compact .grid__wrapper .igx-grid__drag-ghost-image {\n    height: 2rem;\n    min-height: 2rem; }\n\n.grid__wrapper .igx-grid__drag-ghost-image-icon {\n    color: rgba(0, 0, 0, 0.38);\n    margin-right: 0.75rem; }\n\n.grid__wrapper .igx-grid__drag-ghost-image-icon-group {\n    color: rgba(0, 0, 0, 0.38);\n    padding: 0 1.5rem;\n    padding-right: 0;\n    margin-right: 0.5rem; }\n\n.grid__wrapper .igx-grid__drag-col-header {\n    background-color: #f4f4f4; }\n\n.grid__wrapper .igx-grid__drag-col-header .igx-grid__th-title,\n    .grid__wrapper .igx-grid__drag-col-header .igx-grid__th-icons {\n      opacity: .4; }\n\n.grid__wrapper .igx-grid__group-row {\n    background-color: #f4f4f4;\n    display: flex;\n    outline-style: none;\n    border-bottom: 1px solid #f8f8f8;\n    min-height: 3.125rem; }\n\n.grid__wrapper .igx-grid__group-row--active {\n    background: #eaeaea; }\n\n.grid__wrapper .igx-grid__group-row--active .igx-grid__grouping-indicator {\n      color: rgba(0, 0, 0, 0.54); }\n\n.grid__wrapper .igx-grid__group-row--active:hover {\n      background: #eaeaea; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__group-row, .igx-grid--cosy .grid__wrapper .igx-grid__group-row {\n    min-height: 2.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row, .igx-grid--compact .grid__wrapper .igx-grid__group-row {\n    min-height: 2rem; }\n\n.grid__wrapper .igx-group-label {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    line-height: 1rem; }\n\n.grid__wrapper .igx-group-label > * {\n      margin-right: 0.25rem; }\n\n.grid__wrapper .igx-group-label > *:last-child {\n        margin-right: 0; }\n\n.grid__wrapper .igx-group-label__icon {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none; }\n\n.grid__wrapper .igx-group-label__icon.igx-icon, .grid__wrapper .igx-group-label__icon.igx-icon--inactive {\n      color: #09f;\n      width: 1rem;\n      height: 1rem;\n      font-size: 1rem; }\n\n.grid__wrapper .igx-group-label__column-name {\n    color: #09f;\n    font-weight: 600;\n    font-size: 12px; }\n\n.grid__wrapper .igx-group-label__count-badge > div {\n    background-color: rgba(0, 0, 0, 0.08);\n    color: rgba(0, 0, 0, 0.54);\n    font-size: 0.75rem; }\n\n.grid__wrapper .igx-group-label__text {\n    font-size: 0.8125rem;\n    color: rgba(0, 0, 0, 0.74); }\n\n.grid__wrapper [dir='rtl'] .igx-grid__group-content {\n    padding-left: 1.5rem; }\n\n.grid__wrapper [dir='rtl'] .igx-grid--cosy .igx-grid__group-content, .igx-grid--cosy .grid__wrapper [dir='rtl'] .igx-grid__group-content {\n    padding-left: 1rem; }\n\n.grid__wrapper [dir='rtl'] .igx-grid--compact .igx-grid__group-content, .igx-grid--compact .grid__wrapper [dir='rtl'] .igx-grid__group-content {\n    padding-left: 0.75rem; }\n\n.grid__wrapper [dir='rtl'] .igx-group-label > * {\n    margin-left: 0.25rem; }\n\n.grid__wrapper [dir='rtl'] .igx-group-label > *:last-child {\n      margin-left: 0; }\n\n.grid__wrapper .igx-grid__group-content {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    flex: 1 1 auto;\n    padding-left: 1.5rem;\n    min-height: 3.125rem; }\n\n.grid__wrapper .igx-grid__group-content:focus {\n      outline: transparent; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__group-content, .igx-grid--cosy .grid__wrapper .igx-grid__group-content {\n    padding-left: 1rem;\n    min-height: 2.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-content, .igx-grid--compact .grid__wrapper .igx-grid__group-content {\n    padding-left: 0.75rem;\n    min-height: 2rem; }\n\n.grid__wrapper .igx-grid__row-indentation {\n    background: transparent;\n    z-index: 9999;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    padding-left: 1.5rem;\n    padding-right: 0.75rem; }\n\n.grid__wrapper .igx-grid__row-indentation::after {\n      content: '';\n      position: absolute;\n      width: 100%;\n      height: 0.0625rem;\n      bottom: -1px;\n      left: 0;\n      background: transparent; }\n\n.grid__wrapper .igx-grid__row-indentation .igx-button--icon {\n      width: 1.75rem;\n      height: 1.75rem;\n      color: rgba(0, 0, 0, 0.54); }\n\n.grid__wrapper .igx-grid__row-indentation:focus .igx-button--icon, .grid__wrapper .igx-grid__row-indentation:hover .igx-button--icon {\n      color: rgba(0, 0, 0, 0.74); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation {\n    padding-left: 1rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation {\n    padding-left: 0.75rem; }\n\n.grid__wrapper .igx-grid__grouparea {\n    grid-row: 2;\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n    background: #f4f4f4;\n    min-height: 3.5625rem;\n    padding: 0.5rem 1.5rem;\n    z-index: 2;\n    height: 100%; }\n\n.grid__wrapper .igx-grid__grouparea:focus {\n      outline-style: none; }\n\n.grid__wrapper .igx-grid__grouparea-connector {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    margin: 0 0.25rem; }\n\n.grid__wrapper .igx-grid__grouparea-connector igx-icon {\n      width: 16px;\n      height: 16px;\n      font-size: 16px; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__grouparea, .igx-grid--cosy .grid__wrapper .igx-grid__grouparea {\n    min-height: 3.0625rem;\n    padding: 0.5rem 1rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__grouparea, .igx-grid--compact .grid__wrapper .igx-grid__grouparea {\n    min-height: 2.5625rem;\n    padding: 0.25rem 0.75rem; }\n\n.grid__wrapper .igx-drop-area, .grid__wrapper .igx-drop-area--compact, .grid__wrapper .igx-drop-area--cosy {\n    min-width: 5rem;\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    height: 2rem;\n    border-radius: 1rem;\n    padding: 0 1rem;\n    margin: 0.25rem;\n    flex: 1 0 0%;\n    background: rgba(0, 0, 0, 0.04); }\n\n.grid__wrapper .igx-drop-area .igx-drop-area__icon, .grid__wrapper .igx-drop-area--compact .igx-drop-area__icon, .grid__wrapper .igx-drop-area--cosy .igx-drop-area__icon {\n      color: rgba(0, 0, 0, 0.38);\n      width: 1rem;\n      height: 1rem;\n      font-size: 1rem;\n      margin-right: 0.5rem; }\n\n.grid__wrapper .igx-drop-area--hover {\n    background: rgba(0, 0, 0, 0.08); }\n\n.grid__wrapper .igx-drop-area--compact {\n    height: 1.5rem;\n    border-radius: 0.75rem;\n    padding: 0 0.5rem; }\n\n.grid__wrapper .igx-drop-area--cosy {\n    height: 1.5rem;\n    border-radius: 0.75rem;\n    padding: 0 0.375rem; }\n\n.grid__wrapper .igx-drop-area__text {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    color: rgba(0, 0, 0, 0.54);\n    font-size: 0.8125rem; }\n\n.grid__wrapper .igx-grid__grouping-indicator {\n    position: relative;\n    display: flex;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    padding-left: 1.5rem;\n    padding-right: 0.75rem;\n    min-height: 3.125rem; }\n\n.grid__wrapper .igx-grid__grouping-indicator igx-icon {\n      color: rgba(0, 0, 0, 0.54);\n      width: 1.5rem; }\n\n.grid__wrapper .igx-grid__grouping-indicator:hover, .grid__wrapper .igx-grid__grouping-indicator:focus {\n      outline-style: none; }\n\n.grid__wrapper .igx-grid__grouping-indicator:hover igx-icon, .grid__wrapper .igx-grid__grouping-indicator:focus igx-icon {\n        color: #09f; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__grouping-indicator, .igx-grid--cosy .grid__wrapper .igx-grid__grouping-indicator {\n    padding-left: 1rem;\n    min-height: 2.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__grouping-indicator, .igx-grid--compact .grid__wrapper .igx-grid__grouping-indicator {\n    padding-left: 0.75rem;\n    min-height: 2rem; }\n\n.grid__wrapper .igx-grid__header-indentation {\n    position: relative;\n    padding-right: 0.75rem;\n    background: #f4f4f4;\n    z-index: 1; }\n\n.grid__wrapper .igx-grid__group-expand-btn {\n    position: absolute;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    top: 0.8125rem;\n    left: 1.5rem; }\n\n.grid__wrapper .igx-grid__group-expand-btn:hover {\n      color: #09f; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__group-expand-btn, .igx-grid--cosy .grid__wrapper .igx-grid__group-expand-btn {\n    top: 0.5rem;\n    left: 1rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-expand-btn, .igx-grid--compact .grid__wrapper .igx-grid__group-expand-btn {\n    top: 0.25rem;\n    left: 0.75rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-1 {\n    background: inherit;\n    padding-left: calc(1.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-1 {\n    padding-left: 1.5rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-1 {\n    padding-left: 1.5rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-1, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-1 {\n    padding-left: calc(1rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-1, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-1 {\n    padding-left: 1rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-1, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-1 {\n    padding-left: calc(0.75rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-1, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-1 {\n    padding-left: 0.75rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-1, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-1 {\n    padding-left: 0.75rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-2 {\n    background: inherit;\n    padding-left: calc(3rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-2 {\n    padding-left: 3rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-2 {\n    padding-left: 3rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-2, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-2 {\n    padding-left: calc(2rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-2, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-2 {\n    padding-left: 2rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-2, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-2 {\n    padding-left: calc(1.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-2, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-2 {\n    padding-left: 1.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-2, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-2 {\n    padding-left: 1.5rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-3 {\n    background: inherit;\n    padding-left: calc(4.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-3 {\n    padding-left: 4.5rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-3 {\n    padding-left: 4.5rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-3, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-3 {\n    padding-left: calc(3rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-3, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-3 {\n    padding-left: 3rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-3, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-3 {\n    padding-left: calc(2.25rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-3, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-3 {\n    padding-left: 2.25rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-3, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-3 {\n    padding-left: 2.25rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-4 {\n    background: inherit;\n    padding-left: calc(6rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-4 {\n    padding-left: 6rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-4 {\n    padding-left: 6rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-4, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-4 {\n    padding-left: calc(4rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-4, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-4 {\n    padding-left: 4rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-4, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-4 {\n    padding-left: calc(3rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-4, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-4 {\n    padding-left: 3rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-4, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-4 {\n    padding-left: 3rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-5 {\n    background: inherit;\n    padding-left: calc(7.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-5 {\n    padding-left: 7.5rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-5 {\n    padding-left: 7.5rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-5, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-5 {\n    padding-left: calc(5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-5, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-5 {\n    padding-left: 5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-5, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-5 {\n    padding-left: calc(3.75rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-5, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-5 {\n    padding-left: 3.75rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-5, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-5 {\n    padding-left: 3.75rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-6 {\n    background: inherit;\n    padding-left: calc(9rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-6 {\n    padding-left: 9rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-6 {\n    padding-left: 9rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-6, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-6 {\n    padding-left: calc(6rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-6, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-6 {\n    padding-left: 6rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-6, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-6 {\n    padding-left: calc(4.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-6, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-6 {\n    padding-left: 4.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-6, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-6 {\n    padding-left: 4.5rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-7 {\n    background: inherit;\n    padding-left: calc(10.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-7 {\n    padding-left: 10.5rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-7 {\n    padding-left: 10.5rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-7, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-7 {\n    padding-left: calc(7rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-7, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-7 {\n    padding-left: 7rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-7, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-7 {\n    padding-left: calc(5.25rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-7, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-7 {\n    padding-left: 5.25rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-7, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-7 {\n    padding-left: 5.25rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-8 {\n    background: inherit;\n    padding-left: calc(12rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-8 {\n    padding-left: 12rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-8 {\n    padding-left: 12rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-8, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-8 {\n    padding-left: calc(8rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-8, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-8 {\n    padding-left: 8rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-8, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-8 {\n    padding-left: calc(6rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-8, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-8 {\n    padding-left: 6rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-8, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-8 {\n    padding-left: 6rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-9 {\n    background: inherit;\n    padding-left: calc(13.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-9 {\n    padding-left: 13.5rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-9 {\n    padding-left: 13.5rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-9, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-9 {\n    padding-left: calc(9rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-9, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-9 {\n    padding-left: 9rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-9, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-9 {\n    padding-left: calc(6.75rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-9, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-9 {\n    padding-left: 6.75rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-9, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-9 {\n    padding-left: 6.75rem; }\n\n.grid__wrapper .igx-grid__row-indentation--level-10 {\n    background: inherit;\n    padding-left: calc(15rem + 1.5rem); }\n\n.grid__wrapper .igx-grid__group-row--padding-level-10 {\n    padding-left: 15rem; }\n\n.grid__wrapper .igx-grid__tree-cell--padding-level-10 {\n    padding-left: 15rem; }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__row-indentation--level-10, .igx-grid--cosy .grid__wrapper .igx-grid__row-indentation--level-10 {\n    padding-left: calc(10rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--cosy .igx-grid__tree-cell--padding-level-10, .igx-grid--cosy .grid__wrapper .igx-grid__tree-cell--padding-level-10 {\n    padding-left: 10rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__row-indentation--level-10, .igx-grid--compact .grid__wrapper .igx-grid__row-indentation--level-10 {\n    padding-left: calc(7.5rem + 1.5rem); }\n\n.grid__wrapper .igx-grid--compact .igx-grid__group-row--padding-level-10, .igx-grid--compact .grid__wrapper .igx-grid__group-row--padding-level-10 {\n    padding-left: 7.5rem; }\n\n.grid__wrapper .igx-grid--compact .igx-grid__tree-cell--padding-level-10, .igx-grid--compact .grid__wrapper .igx-grid__tree-cell--padding-level-10 {\n    padding-left: 7.5rem; }\n\n.grid__wrapper .igx-grid__outlet {\n    z-index: 2;\n    position: fixed; }\n\n.grid__wrapper .igx-grid__row-editing-outlet {\n    z-index: 10000;\n    position: absolute; }\n\n.grid__wrapper .igx-grid__filtering-cell {\n    display: flex;\n    align-items: center;\n    border-right: 1px solid rgba(0, 0, 0, 0.08);\n    border-top: 1px solid rgba(0, 0, 0, 0.08);\n    height: 3.125rem;\n    padding: 0 1.5rem;\n    overflow: hidden; }\n\n.grid__wrapper .igx-grid__filtering-cell igx-chips-area {\n      transition: -webkit-transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), -webkit-transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      flex-wrap: nowrap; }\n\n.grid__wrapper .igx-grid__filtering-cell igx-chips-area .igx-filtering-chips__connector {\n        font-size: 0.75rem;\n        text-transform: uppercase;\n        font-weight: 600;\n        margin: 0 0.5rem; }\n\n.grid__wrapper .igx-grid__filtering-cell-indicator, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden {\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding-right: 8px;\n    margin-left: 8px;\n    cursor: pointer;\n    visibility: visible; }\n\n.grid__wrapper .igx-grid__filtering-cell-indicator igx-icon, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden igx-icon {\n      width: 18px;\n      height: 18px;\n      font-size: 18px; }\n\n.grid__wrapper .igx-grid__filtering-cell-indicator .igx-badge, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden .igx-badge, .grid__wrapper .igx-grid__filtering-cell-indicator .igx-badge__circle, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden .igx-badge__circle, .grid__wrapper .igx-grid__filtering-cell-indicator .igx-badge__circle--info, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden .igx-badge__circle--info, .grid__wrapper .igx-grid__filtering-cell-indicator .igx-badge__circle--success, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden .igx-badge__circle--success, .grid__wrapper .igx-grid__filtering-cell-indicator .igx-badge__circle--warning, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden .igx-badge__circle--warning, .grid__wrapper .igx-grid__filtering-cell-indicator .igx-badge__circle--error, .grid__wrapper .igx-grid__filtering-cell-indicator--hidden .igx-badge__circle--error {\n      /* start of IE vertical alignment fix */\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n      /* end of IE vertical alignment fix */\n      position: absolute;\n      width: 14px;\n      height: 14px;\n      min-width: 14px;\n      font-size: 12px;\n      text-align: center;\n      right: 0; }\n\n.grid__wrapper .igx-grid__filtering-cell-indicator--hidden {\n    visibility: hidden; }\n\n.grid__wrapper .igx-grid__filtering-row {\n    position: absolute;\n    display: flex;\n    width: 100%;\n    height: 50px;\n    padding: 0 1rem;\n    align-items: center;\n    justify-content: space-between;\n    background: #fff;\n    color: rgba(0, 0, 0, 0.74);\n    bottom: 0;\n    z-index: 3; }\n\n.grid__wrapper .igx-grid__filtering-row::after {\n      display: block;\n      position: absolute;\n      content: '';\n      background: inherit;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      box-shadow: 0 1px 0 #fff, 0 4px 10px rgba(0, 0, 0, 0.12);\n      z-index: -1; }\n\n.grid__wrapper .igx-grid__filtering-row igx-input-group {\n      flex: 0 0 200px; }\n\n.grid__wrapper .igx-grid__filtering-row igx-prefix:focus {\n      color: #e41c77; }\n\n.grid__wrapper .igx-grid__filtering-row-main {\n    display: flex;\n    flex: 1;\n    overflow: hidden;\n    max-width: calc(100% - 176px); }\n\n.grid__wrapper .igx-grid__filtering-row-main igx-chips-area {\n      transition: -webkit-transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), -webkit-transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      flex-wrap: nowrap;\n      margin: 0 0.5rem; }\n\n.grid__wrapper .igx-grid__filtering-row-main igx-chip {\n      margin: 0 0.25rem; }\n\n.grid__wrapper .igx-grid__filtering-row-main [igxButton] igx-icon {\n      position: absolute;\n      left: 0.75rem;\n      /* IE fix for vertical alignment*/\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%); }\n\n.grid__wrapper .igx-grid__filtering-row-main [igxButton] span {\n      margin-left: 1rem; }\n\n.grid__wrapper .igx-grid__filtering-row-scroll-start {\n    width: 24px;\n    height: 24px;\n    position: relative;\n    overflow: visible;\n    margin: 0 8px;\n    z-index: 1; }\n\n.grid__wrapper .igx-grid__filtering-row-scroll-start::after {\n      position: absolute;\n      content: '';\n      left: calc(100% + 8px);\n      width: 10px;\n      height: 100%;\n      background: linear-gradient(to right, white, transparent); }\n\n.grid__wrapper .igx-grid__filtering-row-scroll-end {\n    width: 24px;\n    height: 24px;\n    position: relative;\n    overflow: visible;\n    margin: 0 8px;\n    z-index: 1; }\n\n.grid__wrapper .igx-grid__filtering-row-scroll-end::before {\n      position: absolute;\n      content: '';\n      right: calc(100% + 8px);\n      width: 10px;\n      height: 100%;\n      background: linear-gradient(to left, white, transparent); }\n\n.grid__wrapper :root {\n    --igx-progress-linear-track-color: rgba(181, 181, 181, 0.5);\n    --igx-progress-linear-fill-color-default: orange;\n    --igx-progress-linear-fill-color-danger: #ff134a;\n    --igx-progress-linear-fill-color-warning: #fbb13c;\n    --igx-progress-linear-fill-color-info: #1377d5;\n    --igx-progress-linear-fill-color-success: #4eb862;\n    --igx-progress-linear-stripes-color: rgba(255, 255, 255, 0.7);\n    --igx-progress-linear-text-color: rgba(0, 0, 0, 0.62); }\n\n.grid__wrapper .progress-linear {\n    position: relative;\n    display: flex;\n    align-items: center;\n    flex-flow: column nowrap;\n    width: 100%; }\n\n.grid__wrapper .progress-linear__bar {\n    width: inherit;\n    height: 4px;\n    overflow: hidden; }\n\n.grid__wrapper .progress-linear__bar-base {\n    position: absolute;\n    width: inherit;\n    height: inherit;\n    background: rgba(181, 181, 181, 0.5);\n    z-index: 0; }\n\n.grid__wrapper .progress-linear__bar-progress, .grid__wrapper .progress-linear__bar-progress--default, .grid__wrapper .progress-linear__bar-progress--danger, .grid__wrapper .progress-linear__bar-progress--warning, .grid__wrapper .progress-linear__bar-progress--info, .grid__wrapper .progress-linear__bar-progress--success {\n    width: 100%;\n    position: relative;\n    height: inherit;\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden; }\n\n.grid__wrapper .progress-linear--striped .progress-linear__bar-progress, .progress-linear--striped .grid__wrapper .progress-linear__bar-progress, .grid__wrapper .progress-linear--striped .progress-linear__bar-progress--default, .progress-linear--striped .grid__wrapper .progress-linear__bar-progress--default, .grid__wrapper .progress-linear--striped .progress-linear__bar-progress--danger, .progress-linear--striped .grid__wrapper .progress-linear__bar-progress--danger, .grid__wrapper .progress-linear--striped .progress-linear__bar-progress--warning, .progress-linear--striped .grid__wrapper .progress-linear__bar-progress--warning, .grid__wrapper .progress-linear--striped .progress-linear__bar-progress--info, .progress-linear--striped .grid__wrapper .progress-linear__bar-progress--info, .grid__wrapper .progress-linear--striped .progress-linear__bar-progress--success, .progress-linear--striped .grid__wrapper .progress-linear__bar-progress--success {\n    background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.7) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.7) 75%, transparent 75%, transparent);\n    background-size: 40px 40px; }\n\n.grid__wrapper .progress-linear__bar-progress--default {\n    background: orange; }\n\n.grid__wrapper .progress-linear__bar-progress--danger {\n    background-color: #ff134a; }\n\n.grid__wrapper .progress-linear__bar-progress--warning {\n    background-color: #fbb13c; }\n\n.grid__wrapper .progress-linear__bar-progress--info {\n    background-color: #1377d5; }\n\n.grid__wrapper .progress-linear__bar-progress--success {\n    background-color: #4eb862; }\n\n.grid__wrapper .progress-linear__value, .grid__wrapper .progress-linear__value--start, .grid__wrapper .progress-linear__value--center, .grid__wrapper .progress-linear__value--end, .grid__wrapper .progress-linear__value--top, .grid__wrapper .progress-linear__value--hidden {\n    margin: 0;\n    color: rgba(0, 0, 0, 0.62);\n    font-size: 0.875em;\n    font-weight: 600; }\n\n.grid__wrapper .progress-linear__value, .grid__wrapper .progress-linear__value--start {\n    align-self: flex-start; }\n\n.grid__wrapper .progress-linear__value--center {\n    align-self: center; }\n\n.grid__wrapper .progress-linear__value--end {\n    align-self: flex-end; }\n\n.grid__wrapper .progress-linear__value--top {\n    order: -1; }\n\n.grid__wrapper .progress-linear__value--hidden {\n    display: none; }\n\n@media (max-width: 1000px) {\n  .grid__wrapper {\n    width: 98% !important;\n    margin: 0 auto;\n    padding-left: 1%;\n    padding-right: 1%; } }\n\n@media (max-width: 720px) {\n  .grid__wrapper {\n    width: 720px !important;\n    margin: 0 3px;\n    padding-right: 5px; } }\n\n.sample-column {\n  margin: 0 !important; }\n\n.switch-sample__title {\n  margin: 0 1.25rem 0 0; }\n\n.sample__header {\n  display: flex;\n  align-self: flex-start;\n  justify-content: space-between;\n  width: 100%;\n  margin-bottom: 1.25rem; }\n\n.switch-sample {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  width: 100%;\n  height: 3.125rem; }\n\n.switch-sample__label {\n  margin: 0 0.5rem 0 0; }\n\n.name {\n  width: 6.25rem;\n  margin: 0 1.875rem; }\n\n.name,\n.title {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden; }\n\n.badge_wrap,\n.cell__inner,\n.cell__inner_2 {\n  display: flex;\n  align-items: center;\n  height: 100%; }\n\n.cell__inner,\n.badge_wrap {\n  position: relative;\n  justify-content: space-between; }\n\n.gridSample__filter {\n  width: 12.5rem; }\n\n.flagParent {\n  display: flex;\n  padding-left: 1.4375rem; }\n\n.flag {\n  width: 1.5rem; }\n\n.cup {\n  padding-left: 20px; }\n\n.rowIndex {\n  margin-left: 3.5625rem; }\n\n@media (max-width: 60rem) {\n  .grid__wrapper {\n    width: 60rem; } }\n\n.igx-paginator > * {\n  margin: 0 0.3125rem;\n  display: flex;\n  align-items: center; }\n\n.linear-bar-container {\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JpZC9ncmlkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ncmlkL0M6XFxVc2Vyc1xcc3VzYW5cXGNvZGVcXHRlc3QyLWFuZ3VsYXIvbm9kZV9tb2R1bGVzXFxpZ25pdGV1aS1hbmd1bGFyXFxsaWJcXGNvcmVcXHN0eWxlc1xcYmFzZVxcdXRpbGl0aWVzXFxfcXVpcmtzLnNjc3MiLCJzcmMvYXBwL2dyaWQvQzpcXFVzZXJzXFxzdXNhblxcY29kZVxcdGVzdDItYW5ndWxhci9ub2RlX21vZHVsZXNcXGlnbml0ZXVpLWFuZ3VsYXJcXGxpYlxcY29yZVxcc3R5bGVzXFxiYXNlXFx1dGlsaXRpZXNcXF9iZW0uc2NzcyIsInNyYy9hcHAvZ3JpZC9DOlxcVXNlcnNcXHN1c2FuXFxjb2RlXFx0ZXN0Mi1hbmd1bGFyL25vZGVfbW9kdWxlc1xcaWduaXRldWktYW5ndWxhclxcbGliXFxjb3JlXFxzdHlsZXNcXGNvbXBvbmVudHNcXF9jb21tb25cXF9pZ3gtZGlzcGxheS1jb250YWluZXIuc2NzcyIsInNyYy9hcHAvZ3JpZC9DOlxcVXNlcnNcXHN1c2FuXFxjb2RlXFx0ZXN0Mi1hbmd1bGFyL25vZGVfbW9kdWxlc1xcaWduaXRldWktYW5ndWxhclxcbGliXFxjb3JlXFxzdHlsZXNcXGNvbXBvbmVudHNcXF9jb21tb25cXF9pZ3gtdmhlbHBlci5zY3NzIiwic3JjL2FwcC9ncmlkL0M6XFxVc2Vyc1xcc3VzYW5cXGNvZGVcXHRlc3QyLWFuZ3VsYXIvbm9kZV9tb2R1bGVzXFxpZ25pdGV1aS1hbmd1bGFyXFxsaWJcXGNvcmVcXHN0eWxlc1xcY29tcG9uZW50c1xcX2NvbW1vblxcX2lneC10b2dnbGUuc2NzcyIsInNyYy9hcHAvZ3JpZC9DOlxcVXNlcnNcXHN1c2FuXFxjb2RlXFx0ZXN0Mi1hbmd1bGFyL25vZGVfbW9kdWxlc1xcaWduaXRldWktYW5ndWxhclxcbGliXFxjb3JlXFxzdHlsZXNcXGNvbXBvbmVudHNcXGNhcm91c2VsXFxfY2Fyb3VzZWwtY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2dyaWQvQzpcXFVzZXJzXFxzdXNhblxcY29kZVxcdGVzdDItYW5ndWxhci9ub2RlX21vZHVsZXNcXGlnbml0ZXVpLWFuZ3VsYXJcXGxpYlxcY29yZVxcc3R5bGVzXFxjb21wb25lbnRzXFxvdmVybGF5XFxfb3ZlcmxheS1jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZ3JpZC9DOlxcVXNlcnNcXHN1c2FuXFxjb2RlXFx0ZXN0Mi1hbmd1bGFyL25vZGVfbW9kdWxlc1xcaWduaXRldWktYW5ndWxhclxcbGliXFxjb3JlXFxzdHlsZXNcXGNvbXBvbmVudHNcXGljb25cXF9pY29uLXRoZW1lLnNjc3MiLCJzcmMvYXBwL2dyaWQvQzpcXFVzZXJzXFxzdXNhblxcY29kZVxcdGVzdDItYW5ndWxhci9zcmNcXGFwcFxcZ3JpZFxcZ3JpZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZ3JpZC9DOlxcVXNlcnNcXHN1c2FuXFxjb2RlXFx0ZXN0Mi1hbmd1bGFyL25vZGVfbW9kdWxlc1xcaWduaXRldWktYW5ndWxhclxcbGliXFxjb3JlXFxzdHlsZXNcXGNvbXBvbmVudHNcXGdyaWRcXF9ncmlkLXRoZW1lLnNjc3MiLCJzcmMvYXBwL2dyaWQvQzpcXFVzZXJzXFxzdXNhblxcY29kZVxcdGVzdDItYW5ndWxhci9ub2RlX21vZHVsZXNcXGlnbml0ZXVpLWFuZ3VsYXJcXGxpYlxcY29yZVxcc3R5bGVzXFxiYXNlXFx1dGlsaXRpZXNcXF9taXhpbnMuc2NzcyIsInNyYy9hcHAvZ3JpZC9DOlxcVXNlcnNcXHN1c2FuXFxjb2RlXFx0ZXN0Mi1hbmd1bGFyL25vZGVfbW9kdWxlc1xcaWduaXRldWktYW5ndWxhclxcbGliXFxjb3JlXFxzdHlsZXNcXGJhc2VcXGVsZXZhdGlvbnNcXF9pbmRleC5zY3NzIiwic3JjL2FwcC9ncmlkL0M6XFxVc2Vyc1xcc3VzYW5cXGNvZGVcXHRlc3QyLWFuZ3VsYXIvbm9kZV9tb2R1bGVzXFxpZ25pdGV1aS1hbmd1bGFyXFxsaWJcXGNvcmVcXHN0eWxlc1xcYmFzZVxcdXRpbGl0aWVzXFxfZnVuY3Rpb25zLnNjc3MiLCJzcmMvYXBwL2dyaWQvQzpcXFVzZXJzXFxzdXNhblxcY29kZVxcdGVzdDItYW5ndWxhci9ub2RlX21vZHVsZXNcXGlnbml0ZXVpLWFuZ3VsYXJcXGxpYlxcY29yZVxcc3R5bGVzXFx0aGVtZXNcXF9wYWxldHRlcy5zY3NzIiwic3JjL2FwcC9ncmlkL0M6XFxVc2Vyc1xcc3VzYW5cXGNvZGVcXHRlc3QyLWFuZ3VsYXIvbm9kZV9tb2R1bGVzXFxpZ25pdGV1aS1hbmd1bGFyXFxsaWJcXGNvcmVcXHN0eWxlc1xcYmFzZVxcYW5pbWF0aW9uc1xcX2Vhc2luZ3Muc2NzcyIsInNyYy9hcHAvZ3JpZC9DOlxcVXNlcnNcXHN1c2FuXFxjb2RlXFx0ZXN0Mi1hbmd1bGFyL25vZGVfbW9kdWxlc1xcaWduaXRldWktYW5ndWxhclxcbGliXFxjb3JlXFxzdHlsZXNcXGNvbXBvbmVudHNcXHByb2dyZXNzXFxfcHJvZ3Jlc3MtdGhlbWUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQ0dJLHlCQUF3QixFQUMzQjs7QUMyTE87RUM5TEosaUJBQWdCO0VBQ2hCLG1CQUFrQjtFQUNsQixZQUFXO0VBQ1gsaUJBQWdCLEVBQ25COztBRHFSTztFQ2xSSixZQUFXLEVBQ2Q7O0FEaVJPO0VFelJKLGVBQWM7RUFDZCxlQUFjO0VBQ2QsZUFBYyxFQUNqQjs7QUZzUk87RUVuUkosbUJBQWtCO0VBQ2xCLFlBQVc7RUFDWCxPQUFNO0VBQ04sU0FBUSxFQUNYOztBRitRTztFRTVRSixZQUFXLEVBQ2Q7O0FGNE9lO0VFek9aLFdBQVUsRUFDYjs7QUZ3T2U7RUVyT1osWUFBVyxFQUNkOztBRm1RTztFR3pSSix5QkFBd0IsRUFDM0I7O0FDS0Q7RUFDSSxvQkFBbUIsRUFDdEI7O0FKc0xPO0VLdkxKLFNBQVE7RUFDUixVQUFTLEVMd0xKOztBQUZEO0VNakhKLG1CQUFrQjtFQUNsQixTQUFRO0VBQ1IsVUFBUztFQUNULGFBQVk7RUFDWixpQkFBZ0IsRUFDbkI7O0FDbkVEO0VDb21CSTs7Ozs7O01BTUU7RUR2bUJKLGNBQWE7RUFDYixlQUFjLEVBQ2Y7O0FBTEQ7SUV1TVksc0NBQXdCO0lBQXhCLGtEQUF3QjtJQUF4QixvQ0FBd0I7SUFBeEIsc0NBQXdCO0lBQXhCLG9EQUF3QjtJQUF4QixvQ0FBd0I7SUFBeEIsbURBQXdCO0lBQXhCLHdEQUF3QjtJQUF4Qix3REFBd0I7SUFBeEIseUNBQXdCO0lBQXhCLG9DQUF3QjtJQUF4QixxQ0FBd0I7SUFBeEIsdUNBQXdCO0lBQXhCLHdDQUF3QjtJQUF4Qix5Q0FBd0I7SUFBeEIseUNBQXdCO0lBQXhCLHlDQUF3QjtJQUF4Qix1Q0FBd0I7SUFBeEIscUNBQXdCO0lBQXhCLG9DQUF3QjtJQUF4QixzQ0FBd0I7SUFBeEIsb0RBQXdCO0lBQXhCLHlEQUF3QjtJQUF4QiwwQ0FBd0I7SUFBeEIseUNBQXdCO0lBQXhCLG9DQUF3QjtJQUF4QixxREFBd0I7SUFBeEIsd0RBQXdCO0lBQXhCLHNDQUF3QjtJQUF4Qix5Q0FBd0I7SUFBeEIseUNBQXdCO0lBQXhCLDhDQUF3QjtJQUF4QixrQ0FBd0I7SUFBeEIsaURBQXdCO0lBQXhCLHNEQUF3QjtJQUF4Qiw0REFBd0I7SUFBeEIsa0RBQXdCO0lBQXhCLHlDQUF3QjtJQUF4Qix5REFBd0I7SUFBeEIsZ0RBQXdCO0lBQXhCLHVEQUF3QjtJQUF4Qix1REFBd0I7SUFBeEIscURBQXdCO0lBQXhCLHFEQUF3QjtJQUF4QixxREFBd0I7SUFBeEIsNkRBQXdCO0lBQXhCLHlDQUF3QjtJQUF4QixrREFBd0I7SUFBeEIsNkNBQXdCO0lBQXhCLDREQUF3QjtJQUF4QiwwQ0FBd0I7SUFBeEIseURBQXdCO0lBQXhCLHlEQUF3QjtJQUF4Qix3Q0FBd0I7SUFBeEIsMkVBQXdCO0lBQXhCLHNFQUF3QixFQW9CM0I7O0FGM05UO0lDMmZRLG1CQUFrQjtJQUNsQixjQUFhO0lBQ2IsaURBQWdEO0lBQ2hELDJCQUEwQjtJQUMxQixtQkFqRlM7SUFrRlQsaUhFNVpIO0lGNlpHLG9CQUFtQjtJQUNuQixpQkFBZ0I7SUFDaEIsV0FBVSxFQUtiOztBRHhnQkw7TUNzZ0JZLG1CR3hmMkIsRUh5ZjlCOztBRHZnQlQ7SUMyZ0JRLGNBQWE7SUFDYixvQkFBbUI7SUFDbkIsbUJHL2YrQjtJSGdnQi9CLGtCR2hnQitCO0lIaWdCL0IscUJHamdCK0I7SUhrZ0IvQixZQUFXLEVBQ2Q7O0FEamhCTDs7SUNxaEJRLG1CQUFrQjtJQUNsQixlQUFjO0lBQ2Qsb0JHOVZ1QjtJSCtWdkIsMkJHbFAyQixFSCtQOUI7O0FEcmlCTDs7TUMyaEJZLG1CQUFrQjtNQUNsQixvQkFBbUI7TUFDbkIsZUFBYztNQUNkLFdBQVUsRUFNYjs7QURwaUJUOztRQ2lpQmdCLG9CQUFtQjtRQUNuQixlQUFjLEVBQ2pCOztBRG5pQmI7SUN3aUJRLFlBQVc7SUFDWCw2Q0d2UTJCO0lId1EzQixXQUFVLEVBZ0JiOztBRDFqQkw7TUNtakJZLHdCQUF1QjtNQUN2Qix1QkFBMEUsRUFDN0U7O0FEcmpCVDtNQ3dqQlksb0JBQW1CLEVBQ3RCOztBRHpqQlQ7SUM4akJZLHdCQUF1QjtJQUN2QixzQkFBbUUsRUFDdEU7O0FEaGtCVDtJQ3FrQlksd0JBQXVCO0lBQ3ZCLHNCQUFzRSxFQUN6RTs7QUR2a0JUO0lDMmtCUSw0QkFBMkI7SUFDM0IsK0JBQThCO0lBQzlCLDZDRzNTMkI7SUg0UzNCLGlCR2hrQitCLEVIaWtCbEM7O0FEL2tCTDtJQ2tsQlEsdURBQWdGLEVBQ25GOztBRG5sQkw7SUNzbEJRLGVHeGtCK0I7SUh5a0IvQixnQkd6a0IrQixFSDBrQmxDOztBRHhsQkw7SUMybEJRLGFHN2tCK0I7SUg4a0IvQixtQkc5a0IrQixFSCtrQmxDOztBRDdsQkw7SUNnbUJRLGNBQWE7SUFDYixzQkFBcUIsRUFDeEI7O0FEbG1CTDs7SUM2bUJRLG1CQUFrQixFQUNyQjs7QUQ5bUJMO0lDaW5CUSxZQUFXO0lBQ1gsMENHaFYyQjtJSGlWM0IsZUFBYyxFQUNqQjs7QURwbkJMO0lDdW5CUSxZQUFXO0lBQ1gsa0JBQWlCLEVBQ3BCOztBRHpuQkw7SUM0bkJRLFlBQVc7SUFDWCxrQkFBaUIsRUFDcEI7O0FEOW5CTDtJQ2lvQlEsbUJBQWtCO0lBQ2xCLFlBQVc7SUFDWCxpQkEvZndCO0lBZ2dCeEIsMkJHNVYyQjtJSDZWM0IsaUJBQWdCO0lBQ2hCLFdBQVUsRUFDYjs7QUR2b0JMO0lDMG9CUSxjQUFhO0lBQ2Isd0JBQXVCO0lBQ3ZCLG9CQUFtQjtJQUNuQixhQUFZO0lBQ1osMkJHdFcyQixFSHVXOUI7O0FEL29CTDtJQ2twQlEsWUFBVztJQUNYLGNBQWE7SUFDYixzQkFBcUI7SUFDckIsWUFBVztJQUNYLG9CRzdkdUI7SUg4ZHZCLGVBQWMsRUFDakI7O0FEeHBCTDtJQzJwQlEsZ0NHelgyQixFSDBYOUI7O0FENXBCTDtJQ2dxQlksVUFBUyxFQUNaOztBRGpxQlQ7SUNvcUJZLGFBQVksRUFDZjs7QURycUJUO0lDeXFCUSxjQUFhO0lBQ2IsdUJBdGlCd0I7SUF1aUJ4QixpQ0RyckJvQjtJQ3NyQnBCLG9CQUFtQjtJQUNuQixtQkFBa0IsRUFNckI7O0FEbnJCTDtNQ2dyQlksMEJEM3JCb0I7TUM0ckJwQixhRzVqQlMsRUg2akJaOztBRGxyQlQ7SUNzckJRLGlCQTNpQndCO0lBNGlCeEIsZUExaUIyQixFQTJpQjlCOztBRHhyQkw7SUMyckJRLGlCQS9pQnlCO0lBZ2pCekIsZUE5aUI0QixFQStpQi9COztBRDdyQkw7SUNnc0JRLFlENXNCd0I7SUM2c0J4Qix1QkQ5c0J3QixFQzR0QjNCOztBRC9zQkw7TUNvc0JZLHVCRGp0Qm9CO01Da3RCcEIsWURqdEJvQixFQ2t0QnZCOztBRHRzQlQ7TUN5c0JZLFlEcnRCb0IsRUMwdEJ2Qjs7QUQ5c0JUO1FDNHNCZ0IsWUR4dEJnQixFQ3l0Qm5COztBRDdzQmI7SUNrdEJRLGlDSW5yQnlEO0lKb3JCekQsbUJBQWtCLEVBdUJyQjs7QUQxdUJMO01Dc3RCWSxZQUFXO01BQ1gsbUJBQWtCO01BQ2xCLGtCRzFzQjJCO01IMnNCM0IsWUFBVztNQUNYLGdCRzVzQjJCO01INnNCM0IsUUFBTztNQUNQLG9CSTdyQnFELEVKOHJCeEQ7O0FEN3RCVDtNQ2d1QlksYUFBWSxFQVNmOztBRHp1QlQ7UUNtdUJnQixnQ0FBd0QsRUFDM0Q7O0FEcHVCYjtRQ3V1QmdCLCtCQUF1RCxFQUMxRDs7QUR4dUJiO0lDOHVCWSxZQUFXO0lBQ1gsbUJBQWtCO0lBQ2xCLGdCR2x1QjJCO0lIbXVCM0IsYUFBWTtJQUNaLFdBQVU7SUFDVixnQ0cvY3VCLEVIZ2QxQjs7QURwdkJUO0lDd3ZCUSxtQkFBa0I7SUFDbEIsK0JBQXlELEVBQzVEOztBRDF2Qkw7SUM4dkJZLDJCR3pkdUIsRUgwZDFCOztBRC92QlQ7SUNrd0JZLDJCRzdkdUIsRUhrZTFCOztBRHZ3QlQ7TUNxd0JnQiwyQkdoZW1CLEVIaWV0Qjs7QUR0d0JiO0lDMndCZ0IsMEJHdHBCSyxFSHVwQlI7O0FENXdCYjtJQyt3QmdCLDBCRzFwQkssRUgrcEJSOztBRHB4QmI7TUNreEJvQiwwQkc3cEJDLEVIOHBCSjs7QURueEJqQjtJQzB4QlksZ0NHdnFCUyxFSHdxQlo7O0FEM3hCVDtJQzh4QlksZ0NHM3FCUyxFSGdyQlo7O0FEbnlCVDtNQ2l5QmdCLGdDRzlxQkssRUgrcUJSOztBRGx5QmI7SUN1eUJnQiwwQkdsckJLLEVIbXJCUjs7QUR4eUJiO0lDMnlCZ0IsMEJHdHJCSyxFSDJyQlI7O0FEaHpCYjtNQzh5Qm9CLDBCR3pyQkMsRUgwckJKOztBRC95QmpCO0lDcXpCUSxjQUFhO0lBQ2Isb0JBQW1CO0lBQ25CLHdCQUF1QjtJQUN2QiwwQkFBaUI7T0FBakIsdUJBQWlCO1FBQWpCLHNCQUFpQjtZQUFqQixrQkFBaUI7SUFDakIsb0JBQW1CO0lBQ25CLHFCRzV5QitCO0lINnlCL0IsZ0JBQWU7SUFFZiwyQkd2aEIyQixFSDRoQjlCOztBRGwwQkw7TUNnMEJZLFlJanlCZ0MsRUpreUJuQzs7QURqMEJUO0lDcTBCUSxtQkFBa0I7SUFDbEIsY0FBYTtJQUNiLGFBQVk7SUFDWixvQkFBbUI7SUFDbkIsb0JBQW1CO0lBQ25CLGtCRzV6QitCO0lINnpCL0IscUJHN3pCK0I7SUg4ekIvQixrQkc5ekIrQjtJSCt6Qi9CLGVBQWM7SUFDZCxpQkFBZ0IsRUFDbkI7O0FELzBCTDtJQ2sxQlEsaUJBQWdCLEVBQ25COztBRG4xQkw7SUVrRkksb0JBQW1CO0lBQ25CLHdCQUF1QjtJQUN2QixpQkFBZ0IsRURtd0JmOztBRHYxQkw7SUMwMUJRLGdCRzUwQitCLEVINjBCbEM7O0FEMzFCTDtJQzgxQlEsbUJHaDFCK0IsRUhpMUJsQzs7QUQvMUJMO0lDbTJCUSxhQUFZO0lBQ1osb0JBQW1CLEVBQ3RCOztBRHIyQkw7SUN3MkJRLFlEaDNCeUI7SUNpM0J6QixpREFBc0U7SUFDdEUsaUJBQWdCLEVBU25COztBRG4zQkw7TUM2MkJZLFlEcjNCcUIsRUMwM0J4Qjs7QURsM0JUO1FDZzNCZ0IsWUR4M0JpQixFQ3kzQnBCOztBRGozQmI7SUN1M0JZLG1CQUFrQjtJQUNsQiwyQkdsbEJ1QixFSG1sQjFCOztBRHozQlQ7SUM4M0JZLG1CQUFrQjtJQUNsQixlR2huQk87SUhpbkJQLDJDQUFrQztZQUFsQyxtQ0FBa0MsRUFDckM7O0FEajRCVDtJQ3E0QlEsa0NBQXFFO0lBQ3JFLDJDRzlsQjJCLEVIMG1COUI7O0FEbDVCTDtNQ3k0QlksWUFBVztNQUNYLGtCQUFpQixFQUNwQjs7QUQzNEJUO01DKzRCWSxnQ0FBbUM7TUFDbkMsNkJBQXFDLEVBQ3hDOztBRGo1QlQ7SUNxNUJRLG1CQUFrQjtJQUNsQiwwQkFBeUI7SUFDekIsY0FBYSxFQUNoQjs7QUR4NUJMO0lDMjVCUSx1REFBZ0YsRUFLbkY7O0FEaDZCTDtJQ202QlEsc0JBQXFCO0lBQ3JCLCtCQUE4QjtJQUM5QixzQkFBcUI7SUFDckIsbUJHeDVCK0I7SUh5NUIvQixpQkFqZmM7SUFrZmQsYUFBWTtJQUNaLGtCRzM1QitCO0lINDVCL0IsNENHeG9CMkI7SUh5b0IzQixvQkFBbUIsRUFDdEI7O0FENTZCTDtJQys2QlEsaUJBbHZCaUM7SUFtdkJqQywyQkd4b0IyQjtJSHlvQjNCLFdBQVUsRUFDYjs7QURsN0JMO0lDcTdCUSxnQkd2NkIrQjtJSHc2Qi9CLG1CR3g2QitCLEVIeTZCbEM7O0FEdjdCTDtJQzA3QlEsbUJHNTZCK0I7SUg2NkIvQixpQkc3NkIrQixFSDg2QmxDOztBRDU3Qkw7SUVrRkksb0JBQW1CO0lBQ25CLHdCQUF1QjtJQUN2QixpQkFBZ0I7SUQ0MkJaLGVBQWM7SUFDZCwwQkFBaUI7T0FBakIsdUJBQWlCO1FBQWpCLHNCQUFpQjtZQUFqQixrQkFBaUI7SUFDakIsZ0JBQWU7SUFDZixhQUFZO0lBQUUsb0RBQW9EO0lBQ2xFLHFCQUFvQjtJQUNwQix3QkFBd0UsRUFDM0U7O0FEdDhCTDtJQ3k4QlEsd0JBQWlFLEVBQ3BFOztBRDE4Qkw7SUM2OEJRLHdCQUFvRSxFQUN2RTs7QUQ5OEJMO0lDaTlCUSxxQkFBb0I7SUFDcEIsb0JBQW1CO0lBQ25CLDBCQUF5QjtJQUN6QiwwQkFBaUI7T0FBakIsdUJBQWlCO1FBQWpCLHNCQUFpQjtZQUFqQixrQkFBaUI7SUFDakIsZ0JBQWU7SUFBRSxxQkFBcUI7SUFDdEMsaUJHeDhCK0I7SUh5OEIvQixxQkFBb0IsRUFhdkI7O0FEcCtCTDtNQzA5QlksYUFBWSxFQUNmOztBRDM5QlQ7TUM4OUJZLGlCR2g5QjJCO01IaTlCM0Isa0JHajlCMkI7TUhrOUIzQixxQkdsOUIyQjtNSGs5QkwsaURBQWlEO01BQ3ZFLHFCR245QjJCO01IbzlCM0IsZUluOEJxRCxFSm84QnhEOztBRG4rQlQ7SUN1K0JRLGVHejlCK0IsRUgwOUJsQzs7QUR4K0JMO0lDMitCUSxhRzc5QitCLEVIODlCbEM7O0FENStCTDtJQysrQlEsa0JBcmpCdUI7SUFzakJ2QiwwQkFBeUIsRUFVNUI7O0FEMS9CTDtNQ20vQlksNEJBQTJCO01BQzNCLFVBQVMsRUFLWjs7QUR6L0JUO1FDdS9CZ0IsU0FBUSxFQUNYOztBRHgvQmI7SUM2L0JRLGNBQWE7SUFDYix3QkFBdUI7SUFDdkIsb0JBQW1CO0lBQ25CLGtCR2wvQitCO0lIbS9CL0IsNENHL3RCMkI7SUhrdUIzQixvQkFBbUI7SUFDbkIsV0FBVSxFQUNiOztBRHRnQ0w7SUN5Z0NRLGdCRzMvQitCLEVINC9CbEM7O0FEMWdDTDtJQzZnQ1EsbUJHLy9CK0IsRUhnZ0NsQzs7QUQ5Z0NMO0lDaWhDUSxtQkFBa0I7SUFDbEIsV0FBVTtJQUNWLE9BQU07SUFDTixZQUFXO0lBQ1gsYUFBWTtJQUNaLFdBQVUsRUFDYjs7QUR2aENMO0lDMGhDUSxtQkFBa0I7SUFDbEIsbUJBQWtCO0lBQ2xCLFdBQVU7SUFDViwwQkk5L0J5RDtJSisvQnpELFdBQVUsRUFpQmI7O0FEL2lDTDtNQ2tpQ1ksbUJBQWtCO01BQ2xCLFlBQVc7TUFDWCxhQUFZO01BQ1osWUFBVyxFQUNkOztBRHRpQ1Q7TUN5aUNZLFlBQVcsRUFDZDs7QUQxaUNUO01DNmlDWSxXQUFVLEVBQ2I7O0FEOWlDVDtJQ2tqQ1EsY0FBYTtJQUNiLG9CQUFtQixFQUN0Qjs7QURwakNMO0lDdWpDUSxvQkFBbUI7SUFDbkIsbUJBQWtCO0lBQ2xCLFdBQVUsRUFDYjs7QUQxakNMOztJQytqQ1EsbUJBQWtCO0lBQ2xCLFdBQVU7SUFDVixhQUFZO0lBQ1osT0FBTTtJQUNOLFdBQVUsRUFDYjs7QURwa0NMO0lDdWtDUSxXQUFVLEVBQ2I7O0FEeGtDTDtJQzJrQ1EsWUFBVyxFQUNkOztBRDVrQ0w7SUNpbENZLGdDSWxqQ3FELEVKbWpDeEQ7O0FEbGxDVDtJQ3NsQ1ksbUJBQWtCO0lBQ2xCLFlBQVc7SUFDWCxTQUFRO0lBQ1IsVUFBUztJQUNULG9CQUFtQjtJQUNuQixXQUFVLEVBQ2I7O0FENWxDVDtJQytsQ1ksVUFBUztJQUNULHdCQUF1QjtJQUN2Qiw4Q0lsa0NxRCxFSm1rQ3hEOztBRGxtQ1Q7SUNxbUNZLE9BQU07SUFDTix3QkFBdUI7SUFDdkIsOENBQTJFLEVBQzlFOztBRHhtQ1Q7O0lDNm1DUSxtQkFBa0I7SUFDbEIsWUFBVztJQUNYLE9BQU07SUFDTixhQUFZO0lBQ1osWUFBVyxFQUNkOztBRGxuQ0w7SUNxbkNRLFFBQU8sRUFDVjs7QUR0bkNMO0lDeW5DUSxTQUFRLEVBQ1g7O0FEMW5DTDtJQzZuQ1EsbUJBQWtCO0lBQ2xCLFlBQVc7SUFDWCxhQUFZO0lBQ1osT0FBTTtJQUNOLFlBQVcsRUFDZDs7QURsb0NMO0lDcW9DUSxtQkFBa0I7SUFDbEIsY0FBYTtJQUNiLG9CQUFtQjtJQUNuQix1QkEvL0I2QjtJQWdnQzdCLDJCR24yQjJCO0lIbzJCM0IsaUJHNW5DK0I7SUg2bkMvQixxQkc3bkMrQjtJSDhuQy9CLGNBQWE7SUFDYixlQUFjO0lBQ2QsYUFBWTtJQUNaLGtIRTNpQ0g7SUY0aUNHLGlCQUFnQjtJQUNoQixZQUFXLEVBYWQ7O0FEOXBDTDtNQ29wQ1ksNkJBQTRCLEVBQy9COztBRHJwQ1Q7TUN3cENZLGNBQWEsRUFDaEI7O0FEenBDVDtNQzRwQ1ksYUFBWSxFQUNmOztBRDdwQ1Q7SUNpcUNRLGVHbnBDK0I7SUhvcEMvQixtQkdwcEMrQixFSHFwQ2xDOztBRG5xQ0w7SUNzcUNRLGFHeHBDK0I7SUh5cEMvQixpQkd6cEMrQixFSDBwQ2xDOztBRHhxQ0w7SUMycUNRLDJCR3Q0QjJCO0lIdTRCM0Isc0JHOXBDK0IsRUgrcENsQzs7QUQ3cUNMO0lDZ3JDUSwyQkczNEIyQjtJSDQ0QjNCLGtCR25xQytCO0lIb3FDL0IsaUJBQWdCO0lBQ2hCLHFCR3JxQytCLEVIc3FDbEM7O0FEcHJDTDtJQ3VyQ1EsMEJHOS9CdUIsRUhvZ0MxQjs7QUQ3ckNMOztNQzJyQ1ksWUFBVyxFQUNkOztBRDVyQ1Q7SUNpc0NRLDBCR3hnQ3VCO0lIeWdDdkIsY0FBYTtJQUNiLG9CQUFtQjtJQUNuQixpQ0Q5c0NvQjtJQytzQ3BCLHFCR3ZyQytCLEVId3JDbEM7O0FEdHNDTDtJQ3lzQ1Esb0JHaGhDdUIsRUh5aEMxQjs7QURsdENMO01DNHNDWSwyQkd0NkJ1QixFSHU2QjFCOztBRDdzQ1Q7TUNndENZLG9CR3ZoQ21CLEVId2hDdEI7O0FEanRDVDtJQ3F0Q1EsbUJHdnNDK0IsRUh3c0NsQzs7QUR0dENMO0lDeXRDUSxpQkczc0MrQixFSDRzQ2xDOztBRDF0Q0w7SUM2dENRLGNBQWE7SUFDYixvQkFBbUI7SUFDbkIsNEJBQTJCO0lBQzNCLGtCR2x0QytCLEVIMnRDbEM7O0FEenVDTDtNQ211Q1ksc0JHcnRDMkIsRUgwdEM5Qjs7QUR4dUNUO1FDc3VDZ0IsZ0JBQWUsRUFDbEI7O0FEdnVDYjtJQzR1Q1EsMEJBQWlCO09BQWpCLHVCQUFpQjtRQUFqQixzQkFBaUI7WUFBakIsa0JBQWlCLEVBUXBCOztBRHB2Q0w7TUMrdUNZLFlJaHRDZ0M7TUppdENoQyxZR2x1QzJCO01IbXVDM0IsYUdudUMyQjtNSG91QzNCLGdCR3B1QzJCLEVIcXVDOUI7O0FEbnZDVDtJQ3V2Q1EsWUl4dENvQztJSnl0Q3BDLGlCQUFnQjtJQUNoQixnQkFBZSxFQUNsQjs7QUQxdkNMO0lDOHZDWSxzQ0c1OUJ1QjtJSDY5QnZCLDJCR3o5QnVCO0lIMDlCdkIsbUJHbHZDMkIsRUhtdkM5Qjs7QURqd0NUO0lDcXdDUSxxQkd2dkMrQjtJSHd2Qy9CLDJCRzk5QjJCLEVIKzlCOUI7O0FEdndDTDtJQzJ3Q1kscUJHN3ZDMkIsRUg4dkM5Qjs7QUQ1d0NUO0lDK3dDWSxtQkdqd0MyQixFSGt3QzlCOztBRGh4Q1Q7SUNteENZLHNCR3J3QzJCLEVIc3dDOUI7O0FEcHhDVDtJQ3d4Q2dCLHFCRzF3Q3VCLEVIK3dDMUI7O0FEN3hDYjtNQzJ4Q29CLGVBQWMsRUFDakI7O0FENXhDakI7SUNreUNRLGNBQWE7SUFDYixvQkFBbUI7SUFDbkIsNEJBQTJCO0lBQzNCLGVBQWM7SUFDZCxxQkd4eEMrQjtJSHl4Qy9CLHFCR3p4QytCLEVIOHhDbEM7O0FENXlDTDtNQzB5Q1kscUJBQW9CLEVBQ3ZCOztBRDN5Q1Q7SUMreUNRLG1CR2p5QytCO0lIa3lDL0IsbUJHbHlDK0IsRUhteUNsQzs7QURqekNMO0lDb3pDUSxzQkd0eUMrQjtJSHV5Qy9CLGlCR3Z5QytCLEVId3lDbEM7O0FEdHpDTDtJQ3l6Q1Esd0JBQXVCO0lBQ3ZCLGNBQWE7SUFDYixjQUFhO0lBQ2Isd0JBQXVCO0lBQ3ZCLG9CQUFtQjtJQUNuQixtQkFBa0I7SUFDbEIscUJHanpDK0I7SUhrekMvQix1QkdsekMrQixFSDAwQ2xDOztBRHgxQ0w7TUNtMENZLFlBQVc7TUFDWCxtQkFBa0I7TUFDbEIsWUFBVztNQUNYLGtCR3h6QzJCO01IeXpDM0IsYUFBWTtNQUNaLFFBQU87TUFDUCx3QkFBdUIsRUFDMUI7O0FEMTBDVDtNQzYwQ1ksZUcvekMyQjtNSGcwQzNCLGdCR2gwQzJCO01IaTBDM0IsMkJHemlDdUIsRUgwaUMxQjs7QURoMUNUO01DcTFDZ0IsMkJHN2lDbUIsRUg4aUN0Qjs7QUR0MUNiO0lDMjFDUSxtQkc3MEMrQixFSDgwQ2xDOztBRDUxQ0w7SUMrMUNRLHNCR2oxQytCLEVIazFDbEM7O0FEaDJDTDtJQ20yQ1EsWUFBVztJQUNYLGNBQWE7SUFDYixvQkFBbUI7SUFDbkIsNEJBQTJCO0lBQzNCLGdCQUFlO0lBQ2YsNkNHdGtDMkI7SUh1a0MzQixvQkdockN1QjtJSGlyQ3ZCLHNCRzUxQytCO0lINjFDL0IsdUJHNzFDK0I7SUg4MUMvQixXQUFVO0lBQ1YsYUFBWSxFQUtmOztBRGwzQ0w7TUNnM0NZLG9CQUFtQixFQUN0Qjs7QURqM0NUO0lDcTNDUSxxQkFBb0I7SUFDcEIsd0JBQXVCO0lBQ3ZCLG9CQUFtQjtJQUNuQixrQkcxMkMrQixFSGkzQ2xDOztBRC8zQ0w7TUMyM0NZLFlBQVc7TUFDWCxhQUFZO01BQ1osZ0JBQWUsRUFDbEI7O0FEOTNDVDtJQ2s0Q1Esc0JHcDNDK0I7SUhxM0MvQixxQkdyM0MrQixFSHMzQ2xDOztBRHA0Q0w7SUN1NENRLHNCR3ozQytCO0lIMDNDL0IseUJHMTNDK0IsRUgyM0NsQzs7QUR6NENMO0lDNDRDUSxnQkc5M0MrQjtJSCszQy9CLGNBQWE7SUFDYixvQkFBbUI7SUFDbkIsNEJBQTJCO0lBQzNCLGFHbDRDK0I7SUhtNEMvQixvQkFBNEQ7SUFDNUQsZ0JHcDRDK0I7SUhxNEMvQixnQkdyNEMrQjtJSHM0Qy9CLGFBQVk7SUFDWixnQ0dwbkMyQixFSDZuQzlCOztBRDk1Q0w7TUN3NUNZLDJCR25uQ3VCO01Ib25DdkIsWUczNEMyQjtNSDQ0QzNCLGFHNTRDMkI7TUg2NEMzQixnQkc3NEMyQjtNSDg0QzNCLHFCRzk0QzJCLEVIKzRDOUI7O0FENzVDVDtJQ2k2Q1EsZ0NHL25DMkIsRUhnb0M5Qjs7QURsNkNMO0lDcTZDUSxlR3Y1QytCO0lIdzVDL0IsdUJBQXFEO0lBQ3JELGtCR3o1QytCLEVIMDVDbEM7O0FEeDZDTDtJQzI2Q1EsZUc3NUMrQjtJSDg1Qy9CLHVCQUF3RDtJQUN4RCxvQkcvNUMrQixFSGc2Q2xDOztBRDk2Q0w7SUVrRkksb0JBQW1CO0lBQ25CLHdCQUF1QjtJQUN2QixpQkFBZ0I7SUQrMUNaLDJCRzdvQzJCO0lIOG9DM0IscUJHdDZDK0IsRUh1NkNsQzs7QURyN0NMO0lDdzdDUSxtQkFBa0I7SUFDbEIsY0FBYTtJQUNiLDBCQUFpQjtPQUFqQix1QkFBaUI7UUFBakIsc0JBQWlCO1lBQWpCLGtCQUFpQjtJQUNqQix3QkFBdUI7SUFDdkIsb0JBQW1CO0lBQ25CLGdCQUFlO0lBQ2YscUJHaDdDK0I7SUhpN0MvQix1QkdqN0MrQjtJSGs3Qy9CLHFCR2w3QytCLEVIaThDbEM7O0FELzhDTDtNQ204Q1ksMkJHN3BDdUI7TUg4cEN2QixjR3Q3QzJCLEVIdTdDOUI7O0FEcjhDVDtNQ3k4Q1ksb0JBQW1CLEVBS3RCOztBRDk4Q1Q7UUM0OENnQixZSTc2QzRCLEVKODZDL0I7O0FENzhDYjtJQ2s5Q1EsbUJHcDhDK0I7SUhxOEMvQixtQkdyOEMrQixFSHM4Q2xDOztBRHA5Q0w7SUN1OUNRLHNCR3o4QytCO0lIMDhDL0IsaUJHMThDK0IsRUgyOENsQzs7QUR6OUNMO0lDNDlDUSxtQkFBa0I7SUFDbEIsdUJHLzhDK0I7SUhnOUMvQixvQkdyeUN1QjtJSHN5Q3ZCLFdBQVUsRUFDYjs7QURoK0NMO0lDbStDUSxtQkFBa0I7SUFDbEIsZ0JBQWU7SUFDZiwwQkFBaUI7T0FBakIsdUJBQWlCO1FBQWpCLHNCQUFpQjtZQUFqQixrQkFBaUI7SUFDakIsZUFBa0U7SUFDbEUsYUd6OUMrQixFSDg5Q2xDOztBRDUrQ0w7TUMwK0NZLFlJMzhDZ0MsRUo0OENuQzs7QUQzK0NUO0lDKytDUSxZQUEyRDtJQUMzRCxXR2wrQytCLEVIbStDbEM7O0FEai9DTDtJQ28vQ1EsYUFBOEQ7SUFDOUQsY0d2K0MrQixFSHcrQ2xDOztBRHQvQ0w7SUMyL0NZLG9CQUFtQjtJQUNuQixvQ0FBNkcsRUFDaEg7O0FENy9DVDtJQ2dnRFkscUJBQWMsRUFDakI7O0FEamdEVDtJQ29nRFkscUJBQWMsRUFDakI7O0FEcmdEVDtJQ3lnRFksa0NBQXNHLEVBQ3pHOztBRDFnRFQ7SUNpaERZLG1CQUFjLEVBQ2pCOztBRGxoRFQ7SUNzaERZLHFDQUF5RyxFQUM1Rzs7QUR2aERUO0lDMGhEWSxzQkFBYyxFQUNqQjs7QUQzaERUO0lDOGhEWSxzQkFBYyxFQUNqQjs7QUQvaERUO0lDMi9DWSxvQkFBbUI7SUFDbkIsa0NBQTZHLEVBQ2hIOztBRDcvQ1Q7SUNnZ0RZLG1CQUFjLEVBQ2pCOztBRGpnRFQ7SUNvZ0RZLG1CQUFjLEVBQ2pCOztBRHJnRFQ7SUN5Z0RZLGtDQUFzRyxFQUN6Rzs7QUQxZ0RUO0lDaWhEWSxtQkFBYyxFQUNqQjs7QURsaERUO0lDc2hEWSxvQ0FBeUcsRUFDNUc7O0FEdmhEVDtJQzBoRFkscUJBQWMsRUFDakI7O0FEM2hEVDtJQzhoRFkscUJBQWMsRUFDakI7O0FEL2hEVDtJQzIvQ1ksb0JBQW1CO0lBQ25CLG9DQUE2RyxFQUNoSDs7QUQ3L0NUO0lDZ2dEWSxxQkFBYyxFQUNqQjs7QURqZ0RUO0lDb2dEWSxxQkFBYyxFQUNqQjs7QURyZ0RUO0lDeWdEWSxrQ0FBc0csRUFDekc7O0FEMWdEVDtJQ2loRFksbUJBQWMsRUFDakI7O0FEbGhEVDtJQ3NoRFkscUNBQXlHLEVBQzVHOztBRHZoRFQ7SUMwaERZLHNCQUFjLEVBQ2pCOztBRDNoRFQ7SUM4aERZLHNCQUFjLEVBQ2pCOztBRC9oRFQ7SUMyL0NZLG9CQUFtQjtJQUNuQixrQ0FBNkcsRUFDaEg7O0FENy9DVDtJQ2dnRFksbUJBQWMsRUFDakI7O0FEamdEVDtJQ29nRFksbUJBQWMsRUFDakI7O0FEcmdEVDtJQ3lnRFksa0NBQXNHLEVBQ3pHOztBRDFnRFQ7SUNpaERZLG1CQUFjLEVBQ2pCOztBRGxoRFQ7SUNzaERZLGtDQUF5RyxFQUM1Rzs7QUR2aERUO0lDMGhEWSxtQkFBYyxFQUNqQjs7QUQzaERUO0lDOGhEWSxtQkFBYyxFQUNqQjs7QUQvaERUO0lDMi9DWSxvQkFBbUI7SUFDbkIsb0NBQTZHLEVBQ2hIOztBRDcvQ1Q7SUNnZ0RZLHFCQUFjLEVBQ2pCOztBRGpnRFQ7SUNvZ0RZLHFCQUFjLEVBQ2pCOztBRHJnRFQ7SUN5Z0RZLGtDQUFzRyxFQUN6Rzs7QUQxZ0RUO0lDaWhEWSxtQkFBYyxFQUNqQjs7QURsaERUO0lDc2hEWSxxQ0FBeUcsRUFDNUc7O0FEdmhEVDtJQzBoRFksc0JBQWMsRUFDakI7O0FEM2hEVDtJQzhoRFksc0JBQWMsRUFDakI7O0FEL2hEVDtJQzIvQ1ksb0JBQW1CO0lBQ25CLGtDQUE2RyxFQUNoSDs7QUQ3L0NUO0lDZ2dEWSxtQkFBYyxFQUNqQjs7QURqZ0RUO0lDb2dEWSxtQkFBYyxFQUNqQjs7QURyZ0RUO0lDeWdEWSxrQ0FBc0csRUFDekc7O0FEMWdEVDtJQ2loRFksbUJBQWMsRUFDakI7O0FEbGhEVDtJQ3NoRFksb0NBQXlHLEVBQzVHOztBRHZoRFQ7SUMwaERZLHFCQUFjLEVBQ2pCOztBRDNoRFQ7SUM4aERZLHFCQUFjLEVBQ2pCOztBRC9oRFQ7SUMyL0NZLG9CQUFtQjtJQUNuQixxQ0FBNkcsRUFDaEg7O0FENy9DVDtJQ2dnRFksc0JBQWMsRUFDakI7O0FEamdEVDtJQ29nRFksc0JBQWMsRUFDakI7O0FEcmdEVDtJQ3lnRFksa0NBQXNHLEVBQ3pHOztBRDFnRFQ7SUNpaERZLG1CQUFjLEVBQ2pCOztBRGxoRFQ7SUNzaERZLHFDQUF5RyxFQUM1Rzs7QUR2aERUO0lDMGhEWSxzQkFBYyxFQUNqQjs7QUQzaERUO0lDOGhEWSxzQkFBYyxFQUNqQjs7QUQvaERUO0lDMi9DWSxvQkFBbUI7SUFDbkIsbUNBQTZHLEVBQ2hIOztBRDcvQ1Q7SUNnZ0RZLG9CQUFjLEVBQ2pCOztBRGpnRFQ7SUNvZ0RZLG9CQUFjLEVBQ2pCOztBRHJnRFQ7SUN5Z0RZLGtDQUFzRyxFQUN6Rzs7QUQxZ0RUO0lDaWhEWSxtQkFBYyxFQUNqQjs7QURsaERUO0lDc2hEWSxrQ0FBeUcsRUFDNUc7O0FEdmhEVDtJQzBoRFksbUJBQWMsRUFDakI7O0FEM2hEVDtJQzhoRFksbUJBQWMsRUFDakI7O0FEL2hEVDtJQzIvQ1ksb0JBQW1CO0lBQ25CLHFDQUE2RyxFQUNoSDs7QUQ3L0NUO0lDZ2dEWSxzQkFBYyxFQUNqQjs7QURqZ0RUO0lDb2dEWSxzQkFBYyxFQUNqQjs7QURyZ0RUO0lDeWdEWSxrQ0FBc0csRUFDekc7O0FEMWdEVDtJQ2loRFksbUJBQWMsRUFDakI7O0FEbGhEVDtJQ3NoRFkscUNBQXlHLEVBQzVHOztBRHZoRFQ7SUMwaERZLHNCQUFjLEVBQ2pCOztBRDNoRFQ7SUM4aERZLHNCQUFjLEVBQ2pCOztBRC9oRFQ7SUMyL0NZLG9CQUFtQjtJQUNuQixtQ0FBNkcsRUFDaEg7O0FENy9DVDtJQ2dnRFksb0JBQWMsRUFDakI7O0FEamdEVDtJQ29nRFksb0JBQWMsRUFDakI7O0FEcmdEVDtJQ3lnRFksbUNBQXNHLEVBQ3pHOztBRDFnRFQ7SUNpaERZLG9CQUFjLEVBQ2pCOztBRGxoRFQ7SUNzaERZLG9DQUF5RyxFQUM1Rzs7QUR2aERUO0lDMGhEWSxxQkFBYyxFQUNqQjs7QUQzaERUO0lDOGhEWSxxQkFBYyxFQUNqQjs7QUQvaERUO0lDbWlEUSxXQUFVO0lBQ1YsZ0JBQWUsRUFDbEI7O0FEcmlETDtJQ3dpRFEsZUFBYztJQUNkLG1CQUFrQixFQUNyQjs7QUQxaURMO0lDNmlEUSxjQUFhO0lBQ2Isb0JBQW1CO0lBQ25CLDRDRzd3QzJCO0lIOHdDM0IsMENHOXdDMkI7SUgrd0MzQixpQkduaUQrQjtJSG9pRC9CLGtCR3BpRCtCO0lIcWlEL0IsaUJBQWdCLEVBYW5COztBRGhrREw7TUNzakRZLDRFS2ppRHdDO01MaWlEeEMsb0VLamlEd0M7TUxpaUR4QyxxSUtqaUR3QztNTGtpRHhDLGtCQUFpQixFQVFwQjs7QUQvakRUO1FDMGpEZ0IsbUJHNWlEdUI7UUg2aUR2QiwwQkFBeUI7UUFDekIsaUJBQWdCO1FBQ2hCLGlCRy9pRHVCLEVIZ2pEMUI7O0FEOWpEYjtJQ21rRFEsbUJBQWtCO0lBQ2xCLGNBQWE7SUFDYixvQkFBbUI7SUFDbkIsd0JBQXVCO0lBQ3ZCLG1CQUFrQjtJQUNsQixpQkFBZ0I7SUFDaEIsZ0JBQWU7SUFDZixvQkFBbUIsRUFxQnRCOztBRC9sREw7TUM2a0RZLFlBQVc7TUFDWCxhQUFZO01BQ1osZ0JBQWUsRUFDbEI7O0FEaGxEVDtNQ21sRFksd0NBQXdDO01BQ3hDLFNBQVE7TUFDUixvQ0FBMkI7Y0FBM0IsNEJBQTJCO01BQzNCLHNDQUFzQztNQUN0QyxtQkFBa0I7TUFDbEIsWUFBVztNQUNYLGFBQVk7TUFDWixnQkFBZTtNQUNmLGdCQUFlO01BQ2YsbUJBQWtCO01BQ2xCLFNBQVEsRUFDWDs7QUQ5bERUO0lDa21EUSxtQkFBa0IsRUFDckI7O0FEbm1ETDtJQ2duRFEsbUJBQWtCO0lBQ2xCLGNBQWE7SUFDYixZQUFXO0lBQ1gsYUFBWTtJQUNaLGdCR3RtRCtCO0lIdW1EL0Isb0JBQW1CO0lBQ25CLCtCQUE4QjtJQUM5QixpQkF4N0M4QjtJQXk3QzlCLDJCR2gxQzJCO0lIaTFDM0IsVUFBUztJQUNULFdBQVUsRUF1QmI7O0FEanBETDtNQzZuRFksZUFBYztNQUNkLG1CQUFrQjtNQUNsQixZQUFXO01BQ1gsb0JBQW1CO01BQ25CLFFBQU87TUFDUCxTQUFRO01BQ1IsT0FBTTtNQUNOLFVBQVM7TUFDVCx5REFDaUM7TUFDakMsWUFBVyxFQUNkOztBRHhvRFQ7TUMyb0RZLGdCQUFlLEVBQ2xCOztBRDVvRFQ7TUMrb0RZLGVJaG5EcUQsRUppbkR4RDs7QURocERUO0lDb3BEUSxjQUFhO0lBQ2IsUUFBTztJQUNQLGlCQUFnQjtJQUNoQiw4QkFBNkIsRUF5QmhDOztBRGhyREw7TUMwcERZLDRFS3JvRHdDO01McW9EeEMsb0VLcm9Ed0M7TUxxb0R4QyxxSUtyb0R3QztNTHNvRHhDLGtCQUFpQjtNQUNqQixpQkc5b0QyQixFSCtvRDlCOztBRDdwRFQ7TUNncURZLGtCR2xwRDJCLEVIbXBEOUI7O0FEanFEVDtNQ3FxRGdCLG1CQUFrQjtNQUNsQixjR3hwRHVCO01IeXBEdkIsa0NBQWtDO01BQ2xDLFNBQVE7TUFDUixvQ0FBMkI7Y0FBM0IsNEJBQTJCLEVBQzlCOztBRDFxRGI7TUM2cURnQixrQkcvcER1QixFSGdxRDFCOztBRDlxRGI7SUNtckRRLFlBQVc7SUFDWCxhQUFZO0lBQ1osbUJBQWtCO0lBQ2xCLGtCQUFpQjtJQUNqQixjQUFhO0lBQ2IsV0FBVSxFQVViOztBRGxzREw7TUMyckRZLG1CQUFrQjtNQUNsQixZQUFXO01BQ1gsdUJBQXNCO01BQ3RCLFlBQVc7TUFDWCxhQUFZO01BQ1osMERBQXlELEVBQzVEOztBRGpzRFQ7SUNxc0RRLFlBQVc7SUFDWCxhQUFZO0lBQ1osbUJBQWtCO0lBQ2xCLGtCQUFpQjtJQUNqQixjQUFhO0lBQ2IsV0FBVSxFQVViOztBRHB0REw7TUM2c0RZLG1CQUFrQjtNQUNsQixZQUFXO01BQ1gsd0JBQXVCO01BQ3ZCLFlBQVc7TUFDWCxhQUFZO01BQ1oseURBQXdELEVBQzNEOztBRG50RFQ7SUV1TVksNERBQXdCO0lBQXhCLGlEQUF3QjtJQUF4QixpREFBd0I7SUFBeEIsa0RBQXdCO0lBQXhCLCtDQUF3QjtJQUF4QixrREFBd0I7SUFBeEIsOERBQXdCO0lBQXhCLHNEQUF3QixFQW9CM0I7O0FGM05UO0lPb0VRLG1CQUFrQjtJQUNsQixjQUFhO0lBQ2Isb0JBQW1CO0lBQ25CLHlCQUF3QjtJQUN4QixZQUFXLEVBQ2Q7O0FQekVMO0lPNEVRLGVBQWM7SUFDZCxZQWhCWTtJQWlCWixpQkFBZ0IsRUFDbkI7O0FQL0VMO0lPa0ZRLG1CQUFrQjtJQUNsQixlQUFjO0lBQ2QsZ0JBQWU7SUFDZixxQ1B6RmdDO0lPMEZoQyxXQUFVLEVBQ2I7O0FQdkZMO0lPMEZRLFlBQVc7SUFDWCxtQkFBa0I7SUFDbEIsZ0JBQWU7SUFDZixvQ0FBMkI7WUFBM0IsNEJBQTJCLEVBQzlCOztBUDlGTDtJT2lHUSxvTUFTQztJQUNELDJCQUEwQixFQUM3Qjs7QVA1R0w7SU8rR1EsbUJQbEhxQixFT21IeEI7O0FQaEhMO0lPbUhRLDBCSDRKVyxFRzNKZDs7QVBwSEw7SU91SFEsMEJIdUpVLEVHdEpiOztBUHhITDtJTzJIUSwwQkhpSlUsRUdoSmI7O0FQNUhMO0lPK0hRLDBCSDhJYSxFRzdJaEI7O0FQaElMO0lPb0lRLFVBbkVZO0lBb0VaLDJCSGtLMkI7SUdqSzNCLG1CSHRJOEI7SUd1STlCLGlCQXZFVSxFQXdFYjs7QVB4SUw7SU8ySVEsdUJBQXNCLEVBQ3pCOztBUDVJTDtJTytJUSxtQkFBa0IsRUFDckI7O0FQaEpMO0lPbUpRLHFCQUFvQixFQUN2Qjs7QVBwSkw7SU91SlEsVUFBUyxFQUNaOztBUHhKTDtJTzJKUSxjQUFhLEVBQ2hCOztBUHJKTDtFQVBBO0lBU0ksc0JBQXFCO0lBQ3JCLGVBQWM7SUFDZCxpQkFBZ0I7SUFDaEIsa0JBQWlCLEVBQ2xCLEVBQUE7O0FBR0g7RUFoQkE7SUFrQkksd0JBQXVCO0lBQ3ZCLGNBQWE7SUFDYixtQkFBa0IsRUFDbkIsRUFBQTs7QUFHSDtFQUNFLHFCQUFvQixFQUNyQjs7QUFFRDtFQUNFLHNCQUF1QixFQUN4Qjs7QUFFRDtFQUNFLGNBQWE7RUFDYix1QkFBc0I7RUFDdEIsK0JBQThCO0VBQzlCLFlBQVc7RUFDWCx1Qkl2QnFDLEVKd0J0Qzs7QUFFRDtFQUNFLGNBQWE7RUFDYixzQkFBcUI7RUFDckIsb0JBQW1CO0VBQ25CLFlBQVc7RUFDWCxpQkkvQnFDLEVKZ0N0Qzs7QUFDRDtFQUNFLHFCQUFvQixFQUNyQjs7QUFFRDtFQUNFLGVJdENxQztFSnVDckMsbUJJdkNxQyxFSndDdEM7O0FBRUQ7O0VFMEJJLG9CQUFtQjtFQUNuQix3QkFBdUI7RUFDdkIsaUJBQWdCLEVGekJuQjs7QUFFRDs7O0VBR0UsY0FBYTtFQUNiLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2I7O0FBRUQ7O0VBRUUsbUJBQWtCO0VBQ2xCLCtCQUE4QixFQUMvQjs7QUFFRDtFQUNFLGVJOURxQyxFSitEdEM7O0FBRUQ7RUFDRSxjQUFhO0VBQ2Isd0JJbkVxQyxFSm9FdEM7O0FBRUQ7RUFDRSxjSXZFcUMsRUp3RXRDOztBQUVEO0VBQ0UsbUJBQWtCLEVBQ25COztBQUVEO0VBQ0UsdUJJL0VxQyxFSmdGdEM7O0FBRUQ7RUFoR0E7SUFrR0ksYUlwRm1DLEVKcUZwQyxFQUFBOztBQUdIO0VBQ0Usb0JBQW1CO0VBQ25CLGNBQWE7RUFDYixvQkFBbUIsRUFDcEI7O0FBRUQ7RUFDRSxZQUFXLEVBQ1oiLCJmaWxlIjoic3JjL2FwcC9ncmlkL2dyaWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJbaGlkZGVuXSB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuXG4uaWd4LWRpc3BsYXktY29udGFpbmVyIHtcbiAgZGlzcGxheTogaW5oZXJpdDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuXG4uaWd4LWRpc3BsYXktY29udGFpbmVyLS1pbmFjdGl2ZSB7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5pZ3gtdmhlbHBlci0tdmVydGljYWwsIC5pZ3gtdmhlbHBlci0taG9yaXpvbnRhbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvdmVyZmxvdzogYXV0bztcbiAgei1pbmRleDogMTAwMDE7IH1cblxuLmlneC12aGVscGVyLS12ZXJ0aWNhbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDE4cHg7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7IH1cblxuLmlneC12aGVscGVyLS1ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDEwMCU7IH1cblxuLmlneC12aGVscGVyLS12ZXJ0aWNhbCAuaWd4LXZoZWxwZXJfX3BsYWNlaG9sZGVyLWNvbnRlbnQge1xuICB3aWR0aDogMXB4OyB9XG5cbi5pZ3gtdmhlbHBlci0taG9yaXpvbnRhbCAuaWd4LXZoZWxwZXJfX3BsYWNlaG9sZGVyLWNvbnRlbnQge1xuICBoZWlnaHQ6IDFweDsgfVxuXG4uaWd4LXRvZ2dsZS0taGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG5cbmlneC1jYXJvdXNlbCB7XG4gIG91dGxpbmUtc3R5bGU6IG5vbmU7IH1cblxuLmlneC1vdmVybGF5IHtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDsgfVxuXG4uaWd4LXN2Zy1jb250YWluZXIge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG4gIGZvbnQtc2l6ZTogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuXG4uZ3JpZF9fd3JhcHBlciB7XG4gIC8qIFdlIHNldCB0aG9zZSB3aXRoIHBvc2l0aW9uIHJlbGF0aXZlXG4gICAgc28gdGhhdCB0aGUgZHJvcCBpbmRpY2F0b3JzIGJlIHNjb3BlZFxuICAgIHRvIHRoZWlyIHJlc3BlY3RpdmUgZ3JvdXAuIFRoZSBpdGVtXG4gICAgYmVpbmcgdGhlIHRvcG1vc3QgZWxlbWVudCwgd2hpbGUgdGhlXG4gICAgc3ViZ3JvdXAgZW5jYXBzdWxhdGVzIGNoaWxkcmVuIG9mIGVhY2hcbiAgICB0aGVhZCBpdGVtIGFuZCBncm91cC5cbiAgICAqL1xuICB3aWR0aDogMTAwMHB4O1xuICBtYXJnaW46IDAgYXV0bzsgfVxuICAuZ3JpZF9fd3JhcHBlciA6cm9vdCB7XG4gICAgLS1pZ3gtZ3JpZC1oZWFkZXItYmFja2dyb3VuZDogI2Y0ZjRmNDtcbiAgICAtLWlneC1ncmlkLWhlYWRlci10ZXh0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xuICAgIC0taWd4LWdyaWQtaGVhZGVyLWJvcmRlci13aWR0aDogMXB4O1xuICAgIC0taWd4LWdyaWQtaGVhZGVyLWJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgLS1pZ3gtZ3JpZC1oZWFkZXItYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICAgIC0taWd4LWdyaWQtY29udGVudC1iYWNrZ3JvdW5kOiAjZmZmO1xuICAgIC0taWd4LWdyaWQtY29udGVudC10ZXh0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzQpO1xuICAgIC0taWd4LWdyaWQtZ2hvc3QtaGVhZGVyLXRleHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7XG4gICAgLS1pZ3gtZ3JpZC1naG9zdC1oZWFkZXItaWNvbi1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4KTtcbiAgICAtLWlneC1ncmlkLWdob3N0LWhlYWRlci1iYWNrZ3JvdW5kOiAjZmZmO1xuICAgIC0taWd4LWdyaWQtcm93LW9kZC1iYWNrZ3JvdW5kOiAjZmZmO1xuICAgIC0taWd4LWdyaWQtcm93LWV2ZW4tYmFja2dyb3VuZDogI2ZmZjtcbiAgICAtLWlneC1ncmlkLXJvdy1vZGQtdGV4dC1jb2xvcjogaW5oZXJpdDtcbiAgICAtLWlneC1ncmlkLXJvdy1ldmVuLXRleHQtY29sb3I6IGluaGVyaXQ7XG4gICAgLS1pZ3gtZ3JpZC1yb3ctc2VsZWN0ZWQtYmFja2dyb3VuZDogIzMzMztcbiAgICAtLWlneC1ncmlkLXJvdy1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjZGRkO1xuICAgIC0taWd4LWdyaWQtcm93LWhvdmVyLWJhY2tncm91bmQ6ICNmOGY4Zjg7XG4gICAgLS1pZ3gtZ3JpZC1yb3ctaG92ZXItdGV4dC1jb2xvcjogYmxhY2s7XG4gICAgLS1pZ3gtZ3JpZC1yb3ctYm9yZGVyLWNvbG9yOiAjZjhmOGY4O1xuICAgIC0taWd4LWdyaWQtcGlubmVkLWJvcmRlci13aWR0aDogMnB4O1xuICAgIC0taWd4LWdyaWQtcGlubmVkLWJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgLS1pZ3gtZ3JpZC1waW5uZWQtYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjYpO1xuICAgIC0taWd4LWdyaWQtY2VsbC1zZWxlY3RlZC1iYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNzQpO1xuICAgIC0taWd4LWdyaWQtY2VsbC1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjZmZmO1xuICAgIC0taWd4LWdyaWQtY2VsbC1lZGl0aW5nLWJhY2tncm91bmQ6ICNmZmY7XG4gICAgLS1pZ3gtZ3JpZC1lZGl0LW1vZGUtY29sb3I6ICNlNDFjNzc7XG4gICAgLS1pZ3gtZ3JpZC1lZGl0ZWQtcm93LWluZGljYXRvcjogcmdiYSgwLCAwLCAwLCAwLjI2KTtcbiAgICAtLWlneC1ncmlkLWNlbGwtZWRpdGVkLXZhbHVlLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xuICAgIC0taWd4LWdyaWQtcmVzaXplLWxpbmUtY29sb3I6ICNlNDFjNzc7XG4gICAgLS1pZ3gtZ3JpZC1kcm9wLWluZGljYXRvci1jb2xvcjogI2U0MWM3NztcbiAgICAtLWlneC1ncmlkLWdyb3VwYXJlYS1iYWNrZ3JvdW5kOiAjZjRmNGY0O1xuICAgIC0taWd4LWdyaWQtZ3JvdXAtbGFiZWwtY29sdW1uLW5hbWUtdGV4dDogIzA5ZjtcbiAgICAtLWlneC1ncmlkLWdyb3VwLWxhYmVsLWljb246ICMwOWY7XG4gICAgLS1pZ3gtZ3JpZC1ncm91cC1sYWJlbC10ZXh0OiByZ2JhKDAsIDAsIDAsIDAuNzQpO1xuICAgIC0taWd4LWdyaWQtZXhwYW5kLWFsbC1pY29uLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xuICAgIC0taWd4LWdyaWQtZXhwYW5kLWFsbC1pY29uLWhvdmVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzQpO1xuICAgIC0taWd4LWdyaWQtZXhwYW5kLWljb24tY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7XG4gICAgLS1pZ3gtZ3JpZC1leHBhbmQtaWNvbi1ob3Zlci1jb2xvcjogIzA5ZjtcbiAgICAtLWlneC1ncmlkLWFjdGl2ZS1leHBhbmQtaWNvbi1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4KTtcbiAgICAtLWlneC1ncmlkLWFjdGl2ZS1leHBhbmQtaWNvbi1ob3Zlci1jb2xvcjogIzA5ZjtcbiAgICAtLWlneC1ncmlkLWdyb3VwLWNvdW50LWJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgLS1pZ3gtZ3JpZC1ncm91cC1jb3VudC10ZXh0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xuICAgIC0taWd4LWdyaWQtZHJvcC1hcmVhLXRleHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7XG4gICAgLS1pZ3gtZ3JpZC1kcm9wLWFyZWEtaWNvbi1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4KTtcbiAgICAtLWlneC1ncmlkLWRyb3AtYXJlYS1iYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDQpO1xuICAgIC0taWd4LWdyaWQtZHJvcC1hcmVhLW9uLWRyb3AtYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICAtLWlneC1ncmlkLWdyb3VwLXJvdy1iYWNrZ3JvdW5kOiAjZjRmNGY0O1xuICAgIC0taWd4LWdyaWQtZ3JvdXAtcm93LXNlbGVjdGVkLWJhY2tncm91bmQ6ICNlYWVhZWE7XG4gICAgLS1pZ3gtZ3JpZC1maWx0ZXJpbmctaGVhZGVyLWJhY2tncm91bmQ6ICNmZmY7XG4gICAgLS1pZ3gtZ3JpZC1maWx0ZXJpbmctaGVhZGVyLXRleHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NCk7XG4gICAgLS1pZ3gtZ3JpZC1maWx0ZXJpbmctcm93LWJhY2tncm91bmQ6ICNmZmY7XG4gICAgLS1pZ3gtZ3JpZC1maWx0ZXJpbmctcm93LXRleHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NCk7XG4gICAgLS1pZ3gtZ3JpZC10cmVlLWZpbHRlcmVkLXRleHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7XG4gICAgLS1pZ3gtZ3JpZC1lZGl0LW1vZGUtcm93LWJvcmRlci1jb2xvcjogO1xuICAgIC0taWd4LWdyaWQtdHJlZS1zZWxlY3RlZC1maWx0ZXJlZC1yb3ctdGV4dC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgIC0taWd4LWdyaWQtdHJlZS1zZWxlY3RlZC1maWx0ZXJlZC1jZWxsLXRleHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0byBhdXRvIDFmciBhdXRvIGF1dG87XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgMC4yNiksIDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgb3V0bGluZS1zdHlsZTogbm9uZTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHotaW5kZXg6IDA7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQgLmlneC1jaGVja2JveCwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtY2hlY2tib3gsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWNoZWNrYm94IHtcbiAgICAgIG1pbi13aWR0aDogMS4yNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2NhcHRpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgbGluZS1oZWlnaHQ6IDJyZW07XG4gICAgcGFkZGluZzogMXJlbSAxLjVyZW07XG4gICAgZ3JpZC1yb3c6IDE7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aGVhZCxcbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190Zm9vdCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGJhY2tncm91bmQ6ICNmNGY0ZjQ7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoZWFkIC5pZ3gtZ3JpZF9fdHIsXG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190Zm9vdCAuaWd4LWdyaWRfX3RyIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgIHotaW5kZXg6IDI7IH1cbiAgICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGhlYWQgLmlneC1ncmlkX190cjpob3ZlcixcbiAgICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGZvb3QgLmlneC1ncmlkX190cjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGhlYWQge1xuICAgIGdyaWQtcm93OiAzO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICAgIHotaW5kZXg6IDI7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoZWFkIC5pZ3gtZ3JpZF9fY2J4LXNlbGVjdGlvbiB7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIHBhZGRpbmctdG9wOiAwLjkzNzVyZW07IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoZWFkIC5pZ3gtZ3JpZF9fdHI6bGFzdC1vZi10eXBlIHtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fdGhlYWQgLmlneC1ncmlkX19jYngtc2VsZWN0aW9uLCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aGVhZCAuaWd4LWdyaWRfX2NieC1zZWxlY3Rpb24ge1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIHBhZGRpbmctdG9wOiAwLjYyNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX190aGVhZCAuaWd4LWdyaWRfX2NieC1zZWxlY3Rpb24sIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoZWFkIC5pZ3gtZ3JpZF9fY2J4LXNlbGVjdGlvbiB7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgcGFkZGluZy10b3A6IDAuMzc1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGhlYWQtdGl0bGUge1xuICAgIGZsZXgtYmFzaXM6IGF1dG8gIWltcG9ydGFudDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgaGVpZ2h0OiAzLjEyNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoZWFkLXRpdGxlLS1waW5uZWQtbGFzdCB7XG4gICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjI2KSAhaW1wb3J0YW50OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX3RoZWFkLXRpdGxlLCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aGVhZC10aXRsZSB7XG4gICAgaGVpZ2h0OiAyLjVyZW07XG4gICAgcGFkZGluZzogMCAxcmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3RoZWFkLXRpdGxlLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aGVhZC10aXRsZSB7XG4gICAgaGVpZ2h0OiAycmVtO1xuICAgIHBhZGRpbmc6IDAgMC43NXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoZWFkLWdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoZWFkLWl0ZW0sXG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGhlYWQtc3ViZ3JvdXAge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuICBcbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190Zm9vdCB7XG4gICAgZ3JpZC1yb3c6IDU7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgei1pbmRleDogMTAwMDE7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aGVhZCBpZ3gtZGlzcGxheS1jb250YWluZXIsIC5pZ3gtZ3JpZF9fdGhlYWQgLmdyaWRfX3dyYXBwZXIgaWd4LWRpc3BsYXktY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyIGlneC1kaXNwbGF5LWNvbnRhaW5lciwgLmlneC1ncmlkX190ciAuZ3JpZF9fd3JhcHBlciBpZ3gtZGlzcGxheS1jb250YWluZXIsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fc3VtbWFyaWVzIGlneC1kaXNwbGF5LWNvbnRhaW5lciwgLmlneC1ncmlkX19zdW1tYXJpZXMgLmdyaWRfX3dyYXBwZXIgaWd4LWRpc3BsYXktY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Rib2R5IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZ3JpZC1yb3c6IDQ7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjc0KTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHotaW5kZXg6IDE7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190Ym9keS1tZXNzYWdlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzQpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fc2Nyb2xsIHtcbiAgICBncmlkLXJvdzogNjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiAjZjRmNGY0O1xuICAgIHotaW5kZXg6IDEwMDAxOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fc2Nyb2xsLXN0YXJ0IHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDgpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fc2Nyb2xsLW1haW4gaWd4LWRpc3BsYXktY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDA7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19zY3JvbGwtbWFpbiBpZ3gtaG9yaXpvbnRhbC12aXJ0dWFsLWhlbHBlciB7XG4gICAgaGVpZ2h0OiAxMDAlOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y4ZjhmODtcbiAgICBvdXRsaW5lLXN0eWxlOiBub25lO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHI6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbiAgICAgIGNvbG9yOiBibGFjazsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1vZGQge1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgY29sb3I6IGluaGVyaXQ7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ci0tZXZlbiB7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBjb2xvcjogaW5oZXJpdDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1zZWxlY3RlZCB7XG4gICAgY29sb3I6ICNkZGQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG4gICAgICBjb2xvcjogI2RkZDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkIC5pZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3Ige1xuICAgICAgY29sb3I6ICNkZGQ7IH1cbiAgICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkIC5pZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3I6aG92ZXIge1xuICAgICAgICBjb2xvcjogI2RkZDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1lZGl0IHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U0MWM3NztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1lZGl0OjphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGhlaWdodDogMC4wNjI1cmVtO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB0b3A6IC0wLjA2MjVyZW07XG4gICAgICBsZWZ0OiAwO1xuICAgICAgYmFja2dyb3VuZDogI2U0MWM3NzsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLWVkaXQgLmlneC1ncmlkX190ZC0tZWRpdGluZyB7XG4gICAgICBib3JkZXI6IG5vbmU7IH1cbiAgICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLWVkaXQgLmlneC1ncmlkX190ZC0tZWRpdGluZyAuaWd4LWlucHV0LWdyb3VwLS1mb2N1c2VkIC5pZ3gtaW5wdXQtZ3JvdXBfX2J1bmRsZSwgLmlneC1pbnB1dC1ncm91cC0tZm9jdXNlZCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1lZGl0IC5pZ3gtZ3JpZF9fdGQtLWVkaXRpbmcgLmlneC1pbnB1dC1ncm91cF9fYnVuZGxlIHtcbiAgICAgICAgY2FyZXQtY29sb3I6ICNlNDFjNzcgIWltcG9ydGFudDsgfVxuICAgICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ci0tZWRpdCAuaWd4LWdyaWRfX3RkLS1lZGl0aW5nIC5pZ3gtaW5wdXQtZ3JvdXBfX2JvcmRlciB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNlNDFjNzcgIWltcG9ydGFudDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1lZGl0ZWQ6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAwLjEyNXJlbTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgei1pbmRleDogMjtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMjYpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLWdyb3VwIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2dyb3VuZDogI2Y0ZjRmNCAhaW1wb3J0YW50OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLWZpbHRlcmVkIC5pZ3gtZ3JpZF9fdGQtdGV4dCB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvciB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1maWx0ZXJlZCAuaWd4LWdyaWRfX3RyZWUtZ3JvdXBpbmctaW5kaWNhdG9yOmhvdmVyIHtcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzgpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLWZpbHRlcmVkIC5pZ3gtZ3JpZF9fdGQtLXNlbGVjdGVkIC5pZ3gtZ3JpZF9fdGQtdGV4dCB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyLS1maWx0ZXJlZCAuaWd4LWdyaWRfX3RkLS1zZWxlY3RlZCAuaWd4LWdyaWRfX3RyZWUtZ3JvdXBpbmctaW5kaWNhdG9yIHtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190ZC0tc2VsZWN0ZWQgLmlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvcjpob3ZlciB7XG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190ZC10ZXh0IHtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvciB7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvcjpob3ZlciB7XG4gICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190ZC0tc2VsZWN0ZWQgLmlneC1ncmlkX190ZC10ZXh0IHtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190ZC0tc2VsZWN0ZWQgLmlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvciB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHItLXNlbGVjdGVkLmlneC1ncmlkX190ci0tZmlsdGVyZWQgLmlneC1ncmlkX190ZC0tc2VsZWN0ZWQgLmlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvcjpob3ZlciB7XG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3Ige1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBvdXRsaW5lLXN0eWxlOiBub25lO1xuICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3I6aG92ZXIge1xuICAgICAgY29sb3I6ICMwOWY7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aGVhZC10aXRsZSwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aCwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleDogMSAxIDAlO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgb3V0bGluZS1zdHlsZTogbm9uZTtcbiAgICBwYWRkaW5nOiAwIDEuNXJlbTtcbiAgICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgICBsaW5lLWhlaWdodDogMXJlbTtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLXRyZWUtY2VsbCB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RkLXRleHQge1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX190ZCwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQge1xuICAgIHBhZGRpbmc6IDAgMXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX190ZCwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQge1xuICAgIHBhZGRpbmc6IDAgMC43NXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLS1mdywgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ZC0tZncge1xuICAgIGZsZXgtZ3JvdzogMDtcbiAgICBvdXRsaW5lLXN0eWxlOiBub25lOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLXNlbGVjdGVkIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzQpICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLWJvdHRvbTogMDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLXNlbGVjdGVkIC5pZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3Ige1xuICAgICAgY29sb3I6ICNmZmY7IH1cbiAgICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLXNlbGVjdGVkIC5pZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3I6aG92ZXIge1xuICAgICAgICBjb2xvcjogI2ZmZjsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RkLS1lZGl0ZWQgLmlneC1ncmlkX190ZC10ZXh0IHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ci0tZGVsZXRlZCAuaWd4LWdyaWRfX3RkLXRleHQge1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICBjb2xvcjogI2ZmMTM0YTtcbiAgICB0ZXh0LWRlY29yYXRpb24tbGluZTogbGluZS10aHJvdWdoOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLWVkaXRpbmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgICBib3JkZXI6IDAuMTI1cmVtIHNvbGlkIHJnYmEoMCwgMCwgMCwgMC43NCk7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RkLS1lZGl0aW5nIGlneC1pbnB1dC1ncm91cCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi10b3A6IC0xNnB4OyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ZC0tZWRpdGluZyAuaWd4LWlucHV0LWdyb3VwX19pbnB1dCwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ZC0tZWRpdGluZyAuaWd4LWlucHV0LWdyb3VwX190ZXh0YXJlYSB7XG4gICAgICBmb250LXNpemU6IDAuODEyNXJlbSAhaW1wb3J0YW50O1xuICAgICAgbGluZS1oZWlnaHQ6IDFyZW0gIWltcG9ydGFudDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLS1waW5uZWQsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLXBpbm5lZCwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ZC0tcGlubmVkLWxhc3Qge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xuICAgIHotaW5kZXg6IDk5OTk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC0tcGlubmVkLWxhc3QsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLXBpbm5lZC1sYXN0IHtcbiAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMjYpICFpbXBvcnRhbnQ7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aGVhZC10aXRsZSwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aCB7XG4gICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIHBhZGRpbmc6IDAgMS41cmVtO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgb3V0bGluZS1zdHlsZTogbm9uZTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLS1maWx0ZXJpbmcge1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NCk7XG4gICAgei1pbmRleDogMzsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX190aCwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgge1xuICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICBtaW4taGVpZ2h0OiAyLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fdGgsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoIHtcbiAgICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gICAgbWluLWhlaWdodDogMnJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLXRpdGxlIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbWluLXdpZHRoOiAzY2g7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgY3Vyc29yOiBpbml0aWFsO1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICAvKiBoZXkgSUUsIHRoZSB0ZXh0IHNob3VsZCB0YWtlIG1vc3Qgb2YgdGhlIHNwYWNlICovXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgbGluZS1oZWlnaHQ6IDQuMTY2NjY2Njc7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fdGgtdGl0bGUsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLXRpdGxlIHtcbiAgICBsaW5lLWhlaWdodDogMy4zMzMzMzMzMzsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX190aC10aXRsZSwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtdGl0bGUge1xuICAgIGxpbmUtaGVpZ2h0OiAyLjY2NjY2NjY3OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtaWNvbnMge1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBtaW4td2lkdGg6IDE1cHg7XG4gICAgLyogc29ydC1pY29uIHdpZHRoICovXG4gICAgaGVpZ2h0OiAzLjEyNXJlbTtcbiAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtaWNvbnM6ZW1wdHkge1xuICAgICAgbWluLXdpZHRoOiAwOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1pY29ucyAuc29ydC1pY29uIHtcbiAgICAgIHdpZHRoOiAwLjkzNzVyZW07XG4gICAgICBoZWlnaHQ6IDAuOTM3NXJlbTtcbiAgICAgIG1pbi13aWR0aDogMC45Mzc1cmVtO1xuICAgICAgLyogeWVhaCBJRSwgaXQgcmVhbGx5IG5lZWRzIHRvIGJlIDE1cHggd2lkZS4uLiAqL1xuICAgICAgZm9udC1zaXplOiAwLjkzNzVyZW07XG4gICAgICBjb2xvcjogI2U0MWM3NzsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX190aC1pY29ucywgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtaWNvbnMge1xuICAgIGhlaWdodDogMi41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3RoLWljb25zLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1pY29ucyB7XG4gICAgaGVpZ2h0OiAycmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtLW51bWJlciwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ZC0tbnVtYmVyIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC0tbnVtYmVyIC5pZ3gtZ3JpZF9fdGgtaWNvbnMsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGQtLW51bWJlciAuaWd4LWdyaWRfX3RoLWljb25zIHtcbiAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgIG9yZGVyOiAtMTsgfVxuICAgICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC0tbnVtYmVyIC5pZ3gtZ3JpZF9fdGgtaWNvbnMgLnNvcnQtaWNvbiwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190ZC0tbnVtYmVyIC5pZ3gtZ3JpZF9fdGgtaWNvbnMgLnNvcnQtaWNvbiB7XG4gICAgICAgIG9yZGVyOiAxOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fY2J4LXNlbGVjdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBhZGRpbmc6IDAgMS41cmVtO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICB6LWluZGV4OiAxOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX2NieC1zZWxlY3Rpb24sIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2NieC1zZWxlY3Rpb24ge1xuICAgIHBhZGRpbmc6IDAgMXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19jYngtc2VsZWN0aW9uLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19jYngtc2VsZWN0aW9uIHtcbiAgICBwYWRkaW5nOiAwIDAuNzVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1yZXNpemUtaGFuZGxlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDRweDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IC0ycHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDI7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1yZXNpemUtbGluZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGN1cnNvcjogY29sLXJlc2l6ZTtcbiAgICB3aWR0aDogNHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlNDFjNzc7XG4gICAgei1pbmRleDogMjsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtcmVzaXplLWxpbmU6OmJlZm9yZSwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1yZXNpemUtbGluZTo6YWZ0ZXIge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB3aWR0aDogOTZweDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtcmVzaXplLWxpbmU6OmJlZm9yZSB7XG4gICAgICByaWdodDogMTAwJTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtcmVzaXplLWxpbmU6OmFmdGVyIHtcbiAgICAgIGxlZnQ6IDEwMCU7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19zdW1tYXJpZXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3N1bW1hcmllcy1wYXRjaCB7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLWRyb3AtaW5kaWNhdG9yLWxlZnQsXG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItcmlnaHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMXB4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogMTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLWRyb3AtaW5kaWNhdG9yLWxlZnQge1xuICAgIGxlZnQ6IC0xcHg7IH1cbiAgXG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItcmlnaHQge1xuICAgIHJpZ2h0OiAtMXB4OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItbGVmdC5pZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItLWFjdGl2ZSwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1kcm9wLWluZGljYXRvci1yaWdodC5pZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItLWFjdGl2ZSB7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2U0MWM3NzsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLWRyb3AtaW5kaWNhdG9yLS1hY3RpdmU6OmFmdGVyLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RoLWRyb3AtaW5kaWNhdG9yLS1hY3RpdmU6OmJlZm9yZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogMDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGxlZnQ6IC0zcHg7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1kcm9wLWluZGljYXRvci0tYWN0aXZlOjpiZWZvcmUge1xuICAgIGJvdHRvbTogMDtcbiAgICBib3JkZXItd2lkdGg6IDAgNHB4IDRweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNlNDFjNzc7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190aC1kcm9wLWluZGljYXRvci0tYWN0aXZlOjphZnRlciB7XG4gICAgdG9wOiAwO1xuICAgIGJvcmRlci13aWR0aDogNHB4IDRweCAwO1xuICAgIGJvcmRlci1jb2xvcjogI2U0MWM3NyB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Njcm9sbC1vbi1kcmFnLWxlZnQsXG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fc2Nyb2xsLW9uLWRyYWctcmlnaHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTVweDtcbiAgICB0b3A6IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDI1OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fc2Nyb2xsLW9uLWRyYWctbGVmdCB7XG4gICAgbGVmdDogMDsgfVxuICBcbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19zY3JvbGwtb24tZHJhZy1yaWdodCB7XG4gICAgcmlnaHQ6IDA7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19zY3JvbGwtb24tZHJhZy1waW5uZWQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTVweDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDI1OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZHJhZy1naG9zdC1pbWFnZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xuICAgIGhlaWdodDogMy4xMjVyZW07XG4gICAgbWluLWhlaWdodDogMy4xMjVyZW07XG4gICAgdG9wOiAtOTk5OTlweDtcbiAgICBsZWZ0OiAtOTk5OTlweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm94LXNoYWRvdzogMCAzcHggNXB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjI2KSwgMCA1cHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKSwgMCAxcHggMTRweCAwIHJnYmEoMCwgMCwgMCwgMC4wOCk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB6LWluZGV4OiAyMDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZHJhZy1naG9zdC1pbWFnZSAuaWd4LWdyaWRfX3RoLXRpdGxlIHtcbiAgICAgIG1pbi13aWR0aDogY2FsYygxMDAlIC0gMjRweCk7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2RyYWctZ2hvc3QtaW1hZ2UgLmlneC1ncmlkX190aC1pY29ucyB7XG4gICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19kcmFnLWdob3N0LWltYWdlIC5pZ3gtZ3JpZF9fdGhlYWQtdGl0bGUge1xuICAgICAgYm9yZGVyOiBub25lOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX2RyYWctZ2hvc3QtaW1hZ2UsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2RyYWctZ2hvc3QtaW1hZ2Uge1xuICAgIGhlaWdodDogMi41cmVtO1xuICAgIG1pbi1oZWlnaHQ6IDIuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19kcmFnLWdob3N0LWltYWdlLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19kcmFnLWdob3N0LWltYWdlIHtcbiAgICBoZWlnaHQ6IDJyZW07XG4gICAgbWluLWhlaWdodDogMnJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2RyYWctZ2hvc3QtaW1hZ2UtaWNvbiB7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7XG4gICAgbWFyZ2luLXJpZ2h0OiAwLjc1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZHJhZy1naG9zdC1pbWFnZS1pY29uLWdyb3VwIHtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4KTtcbiAgICBwYWRkaW5nOiAwIDEuNXJlbTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIG1hcmdpbi1yaWdodDogMC41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZHJhZy1jb2wtaGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNGY0OyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19kcmFnLWNvbC1oZWFkZXIgLmlneC1ncmlkX190aC10aXRsZSxcbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2RyYWctY29sLWhlYWRlciAuaWd4LWdyaWRfX3RoLWljb25zIHtcbiAgICAgIG9wYWNpdHk6IC40OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNGY0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgb3V0bGluZS1zdHlsZTogbm9uZTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y4ZjhmODtcbiAgICBtaW4taGVpZ2h0OiAzLjEyNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAjZWFlYWVhOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLWFjdGl2ZSAuaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvciB7XG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1hY3RpdmU6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogI2VhZWFlYTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX19ncm91cC1yb3csIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLXJvdyB7XG4gICAgbWluLWhlaWdodDogMi41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX2dyb3VwLXJvdywgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93IHtcbiAgICBtaW4taGVpZ2h0OiAycmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JvdXAtbGFiZWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgbGluZS1oZWlnaHQ6IDFyZW07IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyb3VwLWxhYmVsID4gKiB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuMjVyZW07IH1cbiAgICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JvdXAtbGFiZWwgPiAqOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncm91cC1sYWJlbF9faWNvbiB7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyb3VwLWxhYmVsX19pY29uLmlneC1pY29uLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyb3VwLWxhYmVsX19pY29uLmlneC1pY29uLS1pbmFjdGl2ZSB7XG4gICAgICBjb2xvcjogIzA5ZjtcbiAgICAgIHdpZHRoOiAxcmVtO1xuICAgICAgaGVpZ2h0OiAxcmVtO1xuICAgICAgZm9udC1zaXplOiAxcmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JvdXAtbGFiZWxfX2NvbHVtbi1uYW1lIHtcbiAgICBjb2xvcjogIzA5ZjtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGZvbnQtc2l6ZTogMTJweDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyb3VwLWxhYmVsX19jb3VudC1iYWRnZSA+IGRpdiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTtcbiAgICBmb250LXNpemU6IDAuNzVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncm91cC1sYWJlbF9fdGV4dCB7XG4gICAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NCk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgW2Rpcj0ncnRsJ10gLmlneC1ncmlkX19ncm91cC1jb250ZW50IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciBbZGlyPSdydGwnXSAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX19ncm91cC1jb250ZW50LCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgW2Rpcj0ncnRsJ10gLmlneC1ncmlkX19ncm91cC1jb250ZW50IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDFyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgW2Rpcj0ncnRsJ10gLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fZ3JvdXAtY29udGVudCwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIFtkaXI9J3J0bCddIC5pZ3gtZ3JpZF9fZ3JvdXAtY29udGVudCB7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIFtkaXI9J3J0bCddIC5pZ3gtZ3JvdXAtbGFiZWwgPiAqIHtcbiAgICBtYXJnaW4tbGVmdDogMC4yNXJlbTsgfVxuICAgIC5ncmlkX193cmFwcGVyIFtkaXI9J3J0bCddIC5pZ3gtZ3JvdXAtbGFiZWwgPiAqOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIGZsZXg6IDEgMSBhdXRvO1xuICAgIHBhZGRpbmctbGVmdDogMS41cmVtO1xuICAgIG1pbi1oZWlnaHQ6IDMuMTI1cmVtOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1jb250ZW50OmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IHRyYW5zcGFyZW50OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX2dyb3VwLWNvbnRlbnQsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLWNvbnRlbnQge1xuICAgIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgICBtaW4taGVpZ2h0OiAyLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fZ3JvdXAtY29udGVudCwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtY29udGVudCB7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtO1xuICAgIG1pbi1oZWlnaHQ6IDJyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24ge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIHotaW5kZXg6IDk5OTk7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDEuNXJlbTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwLjc1cmVtOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb246OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDAuMDYyNXJlbTtcbiAgICAgIGJvdHRvbTogLTFweDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uIC5pZ3gtYnV0dG9uLS1pY29uIHtcbiAgICAgIHdpZHRoOiAxLjc1cmVtO1xuICAgICAgaGVpZ2h0OiAxLjc1cmVtO1xuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbjpmb2N1cyAuaWd4LWJ1dHRvbi0taWNvbiwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb246aG92ZXIgLmlneC1idXR0b24tLWljb24ge1xuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NCk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24ge1xuICAgIHBhZGRpbmctbGVmdDogMXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24sIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbiB7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXBhcmVhIHtcbiAgICBncmlkLXJvdzogMjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICBiYWNrZ3JvdW5kOiAjZjRmNGY0O1xuICAgIG1pbi1oZWlnaHQ6IDMuNTYyNXJlbTtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMS41cmVtO1xuICAgIHotaW5kZXg6IDI7XG4gICAgaGVpZ2h0OiAxMDAlOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cGFyZWE6Zm9jdXMge1xuICAgICAgb3V0bGluZS1zdHlsZTogbm9uZTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwYXJlYS1jb25uZWN0b3Ige1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAwIDAuMjVyZW07IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwYXJlYS1jb25uZWN0b3IgaWd4LWljb24ge1xuICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICBmb250LXNpemU6IDE2cHg7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fZ3JvdXBhcmVhLCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cGFyZWEge1xuICAgIG1pbi1oZWlnaHQ6IDMuMDYyNXJlbTtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19ncm91cGFyZWEsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwYXJlYSB7XG4gICAgbWluLWhlaWdodDogMi41NjI1cmVtO1xuICAgIHBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWRyb3AtYXJlYSwgLmdyaWRfX3dyYXBwZXIgLmlneC1kcm9wLWFyZWEtLWNvbXBhY3QsIC5ncmlkX193cmFwcGVyIC5pZ3gtZHJvcC1hcmVhLS1jb3N5IHtcbiAgICBtaW4td2lkdGg6IDVyZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBoZWlnaHQ6IDJyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgbWFyZ2luOiAwLjI1cmVtO1xuICAgIGZsZXg6IDEgMCAwJTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDQpOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1kcm9wLWFyZWEgLmlneC1kcm9wLWFyZWFfX2ljb24sIC5ncmlkX193cmFwcGVyIC5pZ3gtZHJvcC1hcmVhLS1jb21wYWN0IC5pZ3gtZHJvcC1hcmVhX19pY29uLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWRyb3AtYXJlYS0tY29zeSAuaWd4LWRyb3AtYXJlYV9faWNvbiB7XG4gICAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4KTtcbiAgICAgIHdpZHRoOiAxcmVtO1xuICAgICAgaGVpZ2h0OiAxcmVtO1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1kcm9wLWFyZWEtLWhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDgpOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZHJvcC1hcmVhLS1jb21wYWN0IHtcbiAgICBoZWlnaHQ6IDEuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xuICAgIHBhZGRpbmc6IDAgMC41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZHJvcC1hcmVhLS1jb3N5IHtcbiAgICBoZWlnaHQ6IDEuNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xuICAgIHBhZGRpbmc6IDAgMC4zNzVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1kcm9wLWFyZWFfX3RleHQge1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTtcbiAgICBmb250LXNpemU6IDAuODEyNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcGFkZGluZy1sZWZ0OiAxLjVyZW07XG4gICAgcGFkZGluZy1yaWdodDogMC43NXJlbTtcbiAgICBtaW4taGVpZ2h0OiAzLjEyNXJlbTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXBpbmctaW5kaWNhdG9yIGlneC1pY29uIHtcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xuICAgICAgd2lkdGg6IDEuNXJlbTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXBpbmctaW5kaWNhdG9yOmhvdmVyLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvcjpmb2N1cyB7XG4gICAgICBvdXRsaW5lLXN0eWxlOiBub25lOyB9XG4gICAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvcjpob3ZlciBpZ3gtaWNvbiwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cGluZy1pbmRpY2F0b3I6Zm9jdXMgaWd4LWljb24ge1xuICAgICAgICBjb2xvcjogIzA5ZjsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX19ncm91cGluZy1pbmRpY2F0b3IsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvciB7XG4gICAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICAgIG1pbi1oZWlnaHQ6IDIuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19ncm91cGluZy1pbmRpY2F0b3IsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvciB7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtO1xuICAgIG1pbi1oZWlnaHQ6IDJyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19oZWFkZXItaW5kZW50YXRpb24ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwLjc1cmVtO1xuICAgIGJhY2tncm91bmQ6ICNmNGY0ZjQ7XG4gICAgei1pbmRleDogMTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLWV4cGFuZC1idG4ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdG9wOiAwLjgxMjVyZW07XG4gICAgbGVmdDogMS41cmVtOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1leHBhbmQtYnRuOmhvdmVyIHtcbiAgICAgIGNvbG9yOiAjMDlmOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX2dyb3VwLWV4cGFuZC1idG4sIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLWV4cGFuZC1idG4ge1xuICAgIHRvcDogMC41cmVtO1xuICAgIGxlZnQ6IDFyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fZ3JvdXAtZXhwYW5kLWJ0biwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtZXhwYW5kLWJ0biB7XG4gICAgdG9wOiAwLjI1cmVtO1xuICAgIGxlZnQ6IDAuNzVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTEge1xuICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDEuNXJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtMSB7XG4gICAgcGFkZGluZy1sZWZ0OiAxLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMSB7XG4gICAgcGFkZGluZy1sZWZ0OiAxLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC0xLCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTEge1xuICAgIHBhZGRpbmctbGVmdDogY2FsYygxcmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMSwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTEge1xuICAgIHBhZGRpbmctbGVmdDogMXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTEsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtMSB7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDAuNzVyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC0xLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtMSB7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC0xLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMSB7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjc1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC0yIHtcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICAgIHBhZGRpbmctbGVmdDogY2FsYygzcmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC0yIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDNyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMiB7XG4gICAgcGFkZGluZy1sZWZ0OiAzcmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtMiwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC0yIHtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoMnJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTIsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC0yIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDJyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC0yLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTIge1xuICAgIHBhZGRpbmctbGVmdDogY2FsYygxLjVyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC0yLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtMiB7XG4gICAgcGFkZGluZy1sZWZ0OiAxLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTIsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC0yIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtMyB7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoNC41cmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC0zIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDQuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC0zIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDQuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTMsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtMyB7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDNyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC0zLCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMyB7XG4gICAgcGFkZGluZy1sZWZ0OiAzcmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtMywgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC0zIHtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoMi4yNXJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTMsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC0zIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDIuMjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTMsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC0zIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDIuMjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTQge1xuICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDZyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTQge1xuICAgIHBhZGRpbmctbGVmdDogNnJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC00IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDZyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC00LCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTQge1xuICAgIHBhZGRpbmctbGVmdDogY2FsYyg0cmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtNCwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTQge1xuICAgIHBhZGRpbmctbGVmdDogNHJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTQsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtNCB7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDNyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC00LCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtNCB7XG4gICAgcGFkZGluZy1sZWZ0OiAzcmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC00LCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtNCB7XG4gICAgcGFkZGluZy1sZWZ0OiAzcmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC01IHtcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICAgIHBhZGRpbmctbGVmdDogY2FsYyg3LjVyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTUge1xuICAgIHBhZGRpbmctbGVmdDogNy41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTUge1xuICAgIHBhZGRpbmctbGVmdDogNy41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtNSwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC01IHtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoNXJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTUsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC01IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC01LCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTUge1xuICAgIHBhZGRpbmctbGVmdDogY2FsYygzLjc1cmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtNSwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTUge1xuICAgIHBhZGRpbmctbGVmdDogMy43NXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtNSwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTUge1xuICAgIHBhZGRpbmctbGVmdDogMy43NXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtNiB7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoOXJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtNiB7XG4gICAgcGFkZGluZy1sZWZ0OiA5cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTYge1xuICAgIHBhZGRpbmctbGVmdDogOXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTYsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtNiB7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDZyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC02LCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtNiB7XG4gICAgcGFkZGluZy1sZWZ0OiA2cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtNiwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC02IHtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoNC41cmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtNiwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTYge1xuICAgIHBhZGRpbmctbGVmdDogNC41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC02LCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtNiB7XG4gICAgcGFkZGluZy1sZWZ0OiA0LjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTcge1xuICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDEwLjVyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTcge1xuICAgIHBhZGRpbmctbGVmdDogMTAuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC03IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC03LCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTcge1xuICAgIHBhZGRpbmctbGVmdDogY2FsYyg3cmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtNywgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTcge1xuICAgIHBhZGRpbmctbGVmdDogN3JlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTcsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtNyB7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDUuMjVyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC03LCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtNyB7XG4gICAgcGFkZGluZy1sZWZ0OiA1LjI1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC03LCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtNyB7XG4gICAgcGFkZGluZy1sZWZ0OiA1LjI1cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC04IHtcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICAgIHBhZGRpbmctbGVmdDogY2FsYygxMnJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtOCB7XG4gICAgcGFkZGluZy1sZWZ0OiAxMnJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC04IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEycmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtOCwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC04IHtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoOHJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTgsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC04IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDhyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC04LCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTgge1xuICAgIHBhZGRpbmctbGVmdDogY2FsYyg2cmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtOCwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTgge1xuICAgIHBhZGRpbmctbGVmdDogNnJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtOCwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTgge1xuICAgIHBhZGRpbmctbGVmdDogNnJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtOSB7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoMTMuNXJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtOSB7XG4gICAgcGFkZGluZy1sZWZ0OiAxMy41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTkge1xuICAgIHBhZGRpbmctbGVmdDogMTMuNXJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTksIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtOSB7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDlyZW0gKyAxLjVyZW0pOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29zeSAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC05LCAuaWd4LWdyaWQtLWNvc3kgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtOSB7XG4gICAgcGFkZGluZy1sZWZ0OiA5cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZC0tY29tcGFjdCAuaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtOSwgLmlneC1ncmlkLS1jb21wYWN0IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC05IHtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoNi43NXJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fZ3JvdXAtcm93LS1wYWRkaW5nLWxldmVsLTksIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC05IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDYuNzVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTksIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC05IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDYuNzVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTEwIHtcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICAgIHBhZGRpbmctbGVmdDogY2FsYygxNXJlbSArIDEuNXJlbSk7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtMTAge1xuICAgIHBhZGRpbmctbGVmdDogMTVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMTAge1xuICAgIHBhZGRpbmctbGVmdDogMTVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb3N5IC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC0xMCwgLmlneC1ncmlkLS1jb3N5IC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fcm93LWluZGVudGF0aW9uLS1sZXZlbC0xMCB7XG4gICAgcGFkZGluZy1sZWZ0OiBjYWxjKDEwcmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvc3kgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMTAsIC5pZ3gtZ3JpZC0tY29zeSAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3RyZWUtY2VsbC0tcGFkZGluZy1sZXZlbC0xMCB7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHJlbTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTEwLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tLWxldmVsLTEwIHtcbiAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoNy41cmVtICsgMS41cmVtKTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWQtLWNvbXBhY3QgLmlneC1ncmlkX19ncm91cC1yb3ctLXBhZGRpbmctbGV2ZWwtMTAsIC5pZ3gtZ3JpZC0tY29tcGFjdCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC0xMCB7XG4gICAgcGFkZGluZy1sZWZ0OiA3LjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkLS1jb21wYWN0IC5pZ3gtZ3JpZF9fdHJlZS1jZWxsLS1wYWRkaW5nLWxldmVsLTEwLCAuaWd4LWdyaWQtLWNvbXBhY3QgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtMTAge1xuICAgIHBhZGRpbmctbGVmdDogNy41cmVtOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fb3V0bGV0IHtcbiAgICB6LWluZGV4OiAyO1xuICAgIHBvc2l0aW9uOiBmaXhlZDsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX3Jvdy1lZGl0aW5nLW91dGxldCB7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLWNlbGwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICAgIGhlaWdodDogMy4xMjVyZW07XG4gICAgcGFkZGluZzogMCAxLjVyZW07XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLWNlbGwgaWd4LWNoaXBzLWFyZWEge1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcbiAgICAgIGZsZXgtd3JhcDogbm93cmFwOyB9XG4gICAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsIGlneC1jaGlwcy1hcmVhIC5pZ3gtZmlsdGVyaW5nLWNoaXBzX19jb25uZWN0b3Ige1xuICAgICAgICBmb250LXNpemU6IDAuNzVyZW07XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIG1hcmdpbjogMCAwLjVyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3IsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLWNlbGwtaW5kaWNhdG9yLS1oaWRkZW4ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZy1yaWdodDogOHB4O1xuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsLWluZGljYXRvciBpZ3gtaWNvbiwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3ItLWhpZGRlbiBpZ3gtaWNvbiB7XG4gICAgICB3aWR0aDogMThweDtcbiAgICAgIGhlaWdodDogMThweDtcbiAgICAgIGZvbnQtc2l6ZTogMThweDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLWNlbGwtaW5kaWNhdG9yIC5pZ3gtYmFkZ2UsIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLWNlbGwtaW5kaWNhdG9yLS1oaWRkZW4gLmlneC1iYWRnZSwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3IgLmlneC1iYWRnZV9fY2lyY2xlLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsLWluZGljYXRvci0taGlkZGVuIC5pZ3gtYmFkZ2VfX2NpcmNsZSwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3IgLmlneC1iYWRnZV9fY2lyY2xlLS1pbmZvLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsLWluZGljYXRvci0taGlkZGVuIC5pZ3gtYmFkZ2VfX2NpcmNsZS0taW5mbywgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3IgLmlneC1iYWRnZV9fY2lyY2xlLS1zdWNjZXNzLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsLWluZGljYXRvci0taGlkZGVuIC5pZ3gtYmFkZ2VfX2NpcmNsZS0tc3VjY2VzcywgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3IgLmlneC1iYWRnZV9fY2lyY2xlLS13YXJuaW5nLCAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsLWluZGljYXRvci0taGlkZGVuIC5pZ3gtYmFkZ2VfX2NpcmNsZS0td2FybmluZywgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3IgLmlneC1iYWRnZV9fY2lyY2xlLS1lcnJvciwgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3ItLWhpZGRlbiAuaWd4LWJhZGdlX19jaXJjbGUtLWVycm9yIHtcbiAgICAgIC8qIHN0YXJ0IG9mIElFIHZlcnRpY2FsIGFsaWdubWVudCBmaXggKi9cbiAgICAgIHRvcDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgICAgLyogZW5kIG9mIElFIHZlcnRpY2FsIGFsaWdubWVudCBmaXggKi9cbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAxNHB4O1xuICAgICAgaGVpZ2h0OiAxNHB4O1xuICAgICAgbWluLXdpZHRoOiAxNHB4O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgcmlnaHQ6IDA7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctY2VsbC1pbmRpY2F0b3ItLWhpZGRlbiB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuOyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLXJvdyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzQpO1xuICAgIGJvdHRvbTogMDtcbiAgICB6LWluZGV4OiAzOyB9XG4gICAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctcm93OjphZnRlciB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgI2ZmZiwgMCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICAgICAgei1pbmRleDogLTE7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1yb3cgaWd4LWlucHV0LWdyb3VwIHtcbiAgICAgIGZsZXg6IDAgMCAyMDBweDsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLXJvdyBpZ3gtcHJlZml4OmZvY3VzIHtcbiAgICAgIGNvbG9yOiAjZTQxYzc3OyB9XG4gIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLXJvdy1tYWluIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXg6IDE7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDE3NnB4KTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLXJvdy1tYWluIGlneC1jaGlwcy1hcmVhIHtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XG4gICAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgICAgIG1hcmdpbjogMCAwLjVyZW07IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1yb3ctbWFpbiBpZ3gtY2hpcCB7XG4gICAgICBtYXJnaW46IDAgMC4yNXJlbTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLXJvdy1tYWluIFtpZ3hCdXR0b25dIGlneC1pY29uIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IDAuNzVyZW07XG4gICAgICAvKiBJRSBmaXggZm9yIHZlcnRpY2FsIGFsaWdubWVudCovXG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTsgfVxuICAgIC5ncmlkX193cmFwcGVyIC5pZ3gtZ3JpZF9fZmlsdGVyaW5nLXJvdy1tYWluIFtpZ3hCdXR0b25dIHNwYW4ge1xuICAgICAgbWFyZ2luLWxlZnQ6IDFyZW07IH1cbiAgLmdyaWRfX3dyYXBwZXIgLmlneC1ncmlkX19maWx0ZXJpbmctcm93LXNjcm9sbC1zdGFydCB7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAyNHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICBtYXJnaW46IDAgOHB4O1xuICAgIHotaW5kZXg6IDE7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1yb3ctc2Nyb2xsLXN0YXJ0OjphZnRlciB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGxlZnQ6IGNhbGMoMTAwJSArIDhweCk7XG4gICAgICB3aWR0aDogMTBweDtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgd2hpdGUsIHRyYW5zcGFyZW50KTsgfVxuICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1yb3ctc2Nyb2xsLWVuZCB7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAyNHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICBtYXJnaW46IDAgOHB4O1xuICAgIHotaW5kZXg6IDE7IH1cbiAgICAuZ3JpZF9fd3JhcHBlciAuaWd4LWdyaWRfX2ZpbHRlcmluZy1yb3ctc2Nyb2xsLWVuZDo6YmVmb3JlIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcmlnaHQ6IGNhbGMoMTAwJSArIDhweCk7XG4gICAgICB3aWR0aDogMTBweDtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBsZWZ0LCB3aGl0ZSwgdHJhbnNwYXJlbnQpOyB9XG4gIC5ncmlkX193cmFwcGVyIDpyb290IHtcbiAgICAtLWlneC1wcm9ncmVzcy1saW5lYXItdHJhY2stY29sb3I6IHJnYmEoMTgxLCAxODEsIDE4MSwgMC41KTtcbiAgICAtLWlneC1wcm9ncmVzcy1saW5lYXItZmlsbC1jb2xvci1kZWZhdWx0OiBvcmFuZ2U7XG4gICAgLS1pZ3gtcHJvZ3Jlc3MtbGluZWFyLWZpbGwtY29sb3ItZGFuZ2VyOiAjZmYxMzRhO1xuICAgIC0taWd4LXByb2dyZXNzLWxpbmVhci1maWxsLWNvbG9yLXdhcm5pbmc6ICNmYmIxM2M7XG4gICAgLS1pZ3gtcHJvZ3Jlc3MtbGluZWFyLWZpbGwtY29sb3ItaW5mbzogIzEzNzdkNTtcbiAgICAtLWlneC1wcm9ncmVzcy1saW5lYXItZmlsbC1jb2xvci1zdWNjZXNzOiAjNGViODYyO1xuICAgIC0taWd4LXByb2dyZXNzLWxpbmVhci1zdHJpcGVzLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XG4gICAgLS1pZ3gtcHJvZ3Jlc3MtbGluZWFyLXRleHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42Mik7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XG4gICAgd2lkdGg6IDEwMCU7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fYmFyIHtcbiAgICB3aWR0aDogaW5oZXJpdDtcbiAgICBoZWlnaHQ6IDRweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XG4gIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXJfX2Jhci1iYXNlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMTgxLCAxODEsIDE4MSwgMC41KTtcbiAgICB6LWluZGV4OiAwOyB9XG4gIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXJfX2Jhci1wcm9ncmVzcywgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLS1kZWZhdWx0LCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLWRhbmdlciwgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLS13YXJuaW5nLCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLWluZm8sIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXJfX2Jhci1wcm9ncmVzcy0tc3VjY2VzcyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47IH1cbiAgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhci0tc3RyaXBlZCAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MsIC5wcm9ncmVzcy1saW5lYXItLXN0cmlwZWQgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyLS1zdHJpcGVkIC5wcm9ncmVzcy1saW5lYXJfX2Jhci1wcm9ncmVzcy0tZGVmYXVsdCwgLnByb2dyZXNzLWxpbmVhci0tc3RyaXBlZCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLWRlZmF1bHQsIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXItLXN0cmlwZWQgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLS1kYW5nZXIsIC5wcm9ncmVzcy1saW5lYXItLXN0cmlwZWQgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLS1kYW5nZXIsIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXItLXN0cmlwZWQgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLS13YXJuaW5nLCAucHJvZ3Jlc3MtbGluZWFyLS1zdHJpcGVkIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXJfX2Jhci1wcm9ncmVzcy0td2FybmluZywgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhci0tc3RyaXBlZCAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLWluZm8sIC5wcm9ncmVzcy1saW5lYXItLXN0cmlwZWQgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLS1pbmZvLCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyLS1zdHJpcGVkIC5wcm9ncmVzcy1saW5lYXJfX2Jhci1wcm9ncmVzcy0tc3VjY2VzcywgLnByb2dyZXNzLWxpbmVhci0tc3RyaXBlZCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLXN1Y2Nlc3Mge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgtNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNykgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNykgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQwcHggNDBweDsgfVxuICAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLWRlZmF1bHQge1xuICAgIGJhY2tncm91bmQ6IG9yYW5nZTsgfVxuICAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLWRhbmdlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMTM0YTsgfVxuICAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX19iYXItcHJvZ3Jlc3MtLXdhcm5pbmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYmIxM2M7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fYmFyLXByb2dyZXNzLS1pbmZvIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTM3N2Q1OyB9XG4gIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXJfX2Jhci1wcm9ncmVzcy0tc3VjY2VzcyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRlYjg2MjsgfVxuICAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX192YWx1ZSwgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fdmFsdWUtLXN0YXJ0LCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX192YWx1ZS0tY2VudGVyLCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX192YWx1ZS0tZW5kLCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX192YWx1ZS0tdG9wLCAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX192YWx1ZS0taGlkZGVuIHtcbiAgICBtYXJnaW46IDA7XG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42Mik7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fdmFsdWUsIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXJfX3ZhbHVlLS1zdGFydCB7XG4gICAgYWxpZ24tc2VsZjogZmxleC1zdGFydDsgfVxuICAuZ3JpZF9fd3JhcHBlciAucHJvZ3Jlc3MtbGluZWFyX192YWx1ZS0tY2VudGVyIHtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fdmFsdWUtLWVuZCB7XG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7IH1cbiAgLmdyaWRfX3dyYXBwZXIgLnByb2dyZXNzLWxpbmVhcl9fdmFsdWUtLXRvcCB7XG4gICAgb3JkZXI6IC0xOyB9XG4gIC5ncmlkX193cmFwcGVyIC5wcm9ncmVzcy1saW5lYXJfX3ZhbHVlLS1oaWRkZW4ge1xuICAgIGRpc3BsYXk6IG5vbmU7IH1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xuICAuZ3JpZF9fd3JhcHBlciB7XG4gICAgd2lkdGg6IDk4JSAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBhZGRpbmctbGVmdDogMSU7XG4gICAgcGFkZGluZy1yaWdodDogMSU7IH0gfVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzIwcHgpIHtcbiAgLmdyaWRfX3dyYXBwZXIge1xuICAgIHdpZHRoOiA3MjBweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMCAzcHg7XG4gICAgcGFkZGluZy1yaWdodDogNXB4OyB9IH1cblxuLnNhbXBsZS1jb2x1bW4ge1xuICBtYXJnaW46IDAgIWltcG9ydGFudDsgfVxuXG4uc3dpdGNoLXNhbXBsZV9fdGl0bGUge1xuICBtYXJnaW46IDAgMS4yNXJlbSAwIDA7IH1cblxuLnNhbXBsZV9faGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMS4yNXJlbTsgfVxuXG4uc3dpdGNoLXNhbXBsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMy4xMjVyZW07IH1cblxuLnN3aXRjaC1zYW1wbGVfX2xhYmVsIHtcbiAgbWFyZ2luOiAwIDAuNXJlbSAwIDA7IH1cblxuLm5hbWUge1xuICB3aWR0aDogNi4yNXJlbTtcbiAgbWFyZ2luOiAwIDEuODc1cmVtOyB9XG5cbi5uYW1lLFxuLnRpdGxlIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG92ZXJmbG93OiBoaWRkZW47IH1cblxuLmJhZGdlX3dyYXAsXG4uY2VsbF9faW5uZXIsXG4uY2VsbF9faW5uZXJfMiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTsgfVxuXG4uY2VsbF9faW5uZXIsXG4uYmFkZ2Vfd3JhcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyB9XG5cbi5ncmlkU2FtcGxlX19maWx0ZXIge1xuICB3aWR0aDogMTIuNXJlbTsgfVxuXG4uZmxhZ1BhcmVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmctbGVmdDogMS40Mzc1cmVtOyB9XG5cbi5mbGFnIHtcbiAgd2lkdGg6IDEuNXJlbTsgfVxuXG4uY3VwIHtcbiAgcGFkZGluZy1sZWZ0OiAyMHB4OyB9XG5cbi5yb3dJbmRleCB7XG4gIG1hcmdpbi1sZWZ0OiAzLjU2MjVyZW07IH1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDYwcmVtKSB7XG4gIC5ncmlkX193cmFwcGVyIHtcbiAgICB3aWR0aDogNjByZW07IH0gfVxuXG4uaWd4LXBhZ2luYXRvciA+ICoge1xuICBtYXJnaW46IDAgMC4zMTI1cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XG5cbi5saW5lYXItYmFyLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlOyB9XG4iLCIvLyBBbmd1bGFyIGhhY2sgZm9yIGJpbmRpbmcgdG8gW2hpZGRlbl0gcHJvcGVydHlcbi8vIG5vdCB3b3JraW5nIFxuW2hpZGRlbl0ge1xuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cbiIsIi8vLy9cbi8vLyBAZ3JvdXAgYmVtXG4vLy8gQGF1dGhvciA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3J1bm5pbmdza3VsbFwiIHRhcmdldD1cIl9ibGFua1wiPkp1YW4gUGF0dGVuPC9hPlxuLy8vIEBhdXRob3IgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaW1lb25vZmZcIiB0YXJnZXQ9XCJfYmxhbmtcIj5TaW1lb24gU2ltZW9ub2ZmPC9hPlxuLy8vL1xuXG4vLy8gQHR5cGUgU3RyaW5nIC0gVGhlIEVsZW1lbnQgc2VwYXJhdG9yIHVzZWQuIERlZmF1bHQgJ19fJy5cbiRiZW0tLXNlcC1lbGVtOiBpZih2YXJpYWJsZS1leGlzdHMoYmVtLS1zZXAtZWxlbSksICRiZW0tLXNlcC1lbGVtLCAnX18nKTtcbi8vLyBAdHlwZSBTdHJpbmcgLSBUaGUgTW9kaWZpZXIgc2VwYXJhdG9yIHVzZWQuIERlZmF1bHQgJy0tJy5cbiRiZW0tLXNlcC1tb2Q6IGlmKHZhcmlhYmxlLWV4aXN0cyhiZW0tLXNlcC1tb2QpLCAkYmVtLS1zZXAtbW9kLCAnLS0nKTtcbi8vLyBAdHlwZSBTdHJpbmcgLSBUaGUgTW9kaWZpZXIgVmFsdWUgc2VwYXJhdG9yIHVzZWQuIERlZmF1bHQgJy0nLlxuJGJlbS0tc2VwLW1vZC12YWw6IGlmKHZhcmlhYmxlLWV4aXN0cyhiZW0tLXNlcC1tb2QtdmFsKSwgJGJlbS0tc2VwLW1vZC12YWwsICctJyk7XG5cbi8vLyBDb252ZXJ0cyBhIHBhc3NlZCBzZWxlY3RvciB2YWx1ZSBpbnRvIHBsYWluIHN0cmluZy5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge1N0cmluZ30gJHMgLSBUaGUgc2VsZWN0b3IgdG8gYmUgY29udmVydGVkLlxuLy8vIEByZXR1cm5zIHtTdHJpbmd9XG5AZnVuY3Rpb24gYmVtLS1zZWxlY3Rvci10by1zdHJpbmcoJHMpIHtcbiAgICBAaWYgJHMgPT0gbnVsbCB7XG4gICAgICAgIEByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8vY2FzdCB0byBzdHJpbmdcbiAgICAkczogaW5zcGVjdCgkcyk7XG4gICAgQGlmIHN0ci1pbmRleCgkcywgJygnKSB7XG4gICAgICAgIC8vIHJ1Ynkgc2FzcyA9PiBcIihzZWxlY3RvciwpXCJcbiAgICAgICAgQHJldHVybiBzdHItc2xpY2UoJHMsIDIsIC0zKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgLy8gbGlic2FzcyA9PiBcInNlbGVjdG9yXCJcbiAgICAgICAgQHJldHVybiBzdHItc2xpY2UoJHMsIDEsIC0xKTtcbiAgICB9XG59XG5cbi8vLyBQcmVwZW5kcyBhIGRvdCB0byB0aGUgcGFzc2VkIEJFTSBzZWxlY3Rvci5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge1N0cmluZ30gJHggLSBUaGUgQkVNIHNlbGVjdG9yIHRvIHByZXBlbmQgYSBkb3QgdG8uXG4vLy8gQHJldHVybnMge1N0cmluZ31cbi8vLyBAZXhhbXBsZSBzY3NzIC0gUmV0dXJuc1xuLy8vICAgLiN7JHh9XG5AZnVuY3Rpb24gYmVtLS13aXRoLWRvdCgkeCkge1xuICAgICRmaXJzdDogc3RyLXNsaWNlKCR4LCAwLCAxKTtcbiAgICBAcmV0dXJuIGlmKCRmaXJzdD09Jy4nLCAkeCwgJy4nKyR4KTtcbn1cblxuLy8vIENvbnZlcnRzIGEga2V5LXZhbHVlIG1hcCBpbnRvIGEgbW9kaWZpZXIgc3RyaW5nLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vIEBwYXJhbSB7TGlzdH0gJG0gLSBUaGUgbW9kaWZpZXIgbGlzdCB0byBnZXQgY29udmVydGVkLlxuLy8vIEByZXR1cm5zIHtTdHJpbmd9XG5AZnVuY3Rpb24gYmVtLS1tb2Qtc3RyKCRtKSB7XG4gICAgQGlmIHR5cGUtb2YoJG0pID09ICdtYXAnIHtcbiAgICAgICAgJG1tOiBudGgoJG0sIDEpO1xuICAgICAgICBAcmV0dXJuIG50aCgkbW0sIDEpICsgJGJlbS0tc2VwLW1vZC12YWwgKyBudGgoJG1tLCAyKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQHJldHVybiAkbTtcbiAgICB9XG59XG5cbi8vLyBQcmVmaXhlcyB0aGUgYmxvY2sgbmFtZSB0byBhbiBlbGVtZW50IHNlbGVjdG9yIHN0cmluZyxcbi8vLyB3aXRoIHRoZSBlbGVtZW50IHNlcGFyYXRvciBzdHJpbmcgdXNlZCBhcyBhIGRpdmlkZXIuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRiIC0gVGhlIGJsb2NrIG5hbWUuXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRlIC0gVGhlIGVsZW1lbnQgbmFtZS5cbi8vLyBAcmV0dXJucyB7U3RyaW5nfVxuLy8vIEBleGFtcGxlIHNjc3MgLSBSZXR1cm5zXG4vLy8gICAuYmxvY2tfX2VsZW1lbnRcbkBmdW5jdGlvbiBiZW0tLWVsZW0tc3RyKCRiLCAkZSkge1xuICAgIEByZXR1cm4gJGIgKyAkYmVtLS1zZXAtZWxlbSArICRlO1xufVxuXG4vLy8gUmV0dXJucyBhIGJsb2NrIHNlbGVjdG9yIHN0cmluZyBhZmZpeGVkIGJ5IHRoZSBtb2RpZmllciBzZWxlY3Rvcixcbi8vLyBmb2xsb3dlZCBieSB0aGUgZWxlbWVudCBzZWxlY3RvciBzdHJpbmcuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRibG9jayAtIFRoZSBibG9jayBuYW1lLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkZWxlbSAtIFRoZSBzdWItZWxlbWVudCBuYW1lLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkbW9kIC0gVGhlIG1vZGlmaWVyIG5hbWUuXG4vLy8gQHJldHVybnMge1N0cmluZ31cbi8vLyBAZXhhbXBsZSBzY3NzIC0gUmV0dXJuc1xuLy8vICAgLmJsb2NrLS1tb2RpZmllciAuYmxvY2tfX2VsZW1lbnRcbkBmdW5jdGlvbiBiZW0tLWJlbS1zdHIoJGJsb2NrLCAkZWxlbSwgJG1vZCkge1xuICAgICRlbGVtOiBpZigkZWxlbSwgJyAnICsgJGVsZW0sICcnKTtcbiAgICBAcmV0dXJuICgkYmxvY2sgKyAkYmVtLS1zZXAtbW9kICsgYmVtLS1tb2Qtc3RyKCRtb2QpICsgJGVsZW0pO1xufVxuXG4vLy8gQ2hlY2tzIGlmIHRoZSBlbGVtZW50IHNlcGFyYXRvciBzdHJpbmcgaXMgcGFydCBvZiB0aGUgcGFzc2VkIHN0cmluZy5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge1N0cmluZ30gJHggLSBUaGUgc3RyaW5nIHRvIGNoZWNrLlxuLy8vIEByZXR1cm5zIHtudW1iZXJ8bnVsbH0gV2lsbCByZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBvY2N1cmFuY2UsXG4vLy8gb3IgbnVsbCBpZiB0aGUgZWxlbWVudCBzZXBhcmF0b3IgbmFtZSBpcyBub3QgcGFydCBvZiB0aGUgcGFzc2VkIHN0cmluZy5cbkBmdW5jdGlvbiBiZW0tLWNvbnRhaW5zLWVsZW0oJHgpIHtcbiAgICAvLyBpZiB5b3Ugc2V0IHRoZSBzZXBhcmF0b3JzIHRvIGNvbW1vbiBzdHJpbmdzLCB0aGlzIGNvdWxkIGZhaWxcbiAgICBAcmV0dXJuIHN0ci1pbmRleCgkeCwgJGJlbS0tc2VwLWVsZW0pO1xufVxuXG4vLy8gQ2hlY2tzIGlmIHRoZSBtb2RpZmllciBzZXBhcmF0b3Igc3RyaW5nIGlzIHBhcnQgb2YgdGhlIHBhc3NlZCBzdHJpbmcuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICR4IC0gVGhlIHN0cmluZyB0byBjaGVjay5cbi8vLyBAcmV0dXJucyB7bnVtYmVyfG51bGx9IFdpbGwgcmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgb2NjdXJhbmNlLFxuLy8vIG9yIG51bGwgaWYgdGhlIG1vZGlmaWVyIHNlcGFyYXRvciBzdHJpbmcgaXMgbm90IHBhcnQgb2YgdGhlIHBhc3NlZCBzdHJpbmcuXG5AZnVuY3Rpb24gYmVtLS1jb250YWlucy1tb2QoJHgpIHtcbiAgICAvLyBpZiB5b3Ugc2V0IHRoZSBzZXBhcmF0b3JzIHRvIGNvbW1vbiBzdHJpbmdzLCB0aGlzIGNvdWxkIGZhaWxcbiAgICBAcmV0dXJuIHN0ci1pbmRleCgkeCwgJGJlbS0tc2VwLW1vZCk7XG59XG5cbi8vLyBDaGVja3MgaWYgdGhlIHBhc3NlZCBzZWxlY3RvciBzdHJpbmcgY29udGFpbnMgYSBjb2xvbi5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge1N0cmluZ30gJHggLSBUaGUgc3RyaW5nIHRvIGNoZWNrIGZvciBjb2xvbnMuXG4vLy8gQHJldHVybnMge251bWJlcnxudWxsfSBXaWxsIHJldHVybiB0aGUgaW5kZXggb2YgdGhlIG9jY3VyYW5jZSxcbi8vLyBvciBudWxsIGlmIHRoZSBzdHJpbmcgZG9lcyBub3QgY29udGFpbiBhbnkgY29sb25zLlxuQGZ1bmN0aW9uIGJlbS0tY29udGFpbnMtcHNldWRvKCR4KSB7XG4gICAgQHJldHVybiBzdHItaW5kZXgoJHgsICc6Jyk7XG59XG5cbi8vLyBSZXR1cm5zIHRoZSBCRU0gYmxvY2stbmFtZSB0aGF0IGdlbmVyYXRlZCBgJHhgLiBEb2VzIG5vdCBpbmNsdWRlIGxlYWRpbmcgXCIuXCIuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICR4IC0gVGhlIGJsb2NrIG5hbWUuXG5AZnVuY3Rpb24gYmVtLS1leHRyYWN0LWJsb2NrKCR4KSB7XG4gICAgQGlmIGJlbS0tY29udGFpbnMtbW9kKCR4KSB7XG4gICAgICAgIEByZXR1cm4gc3RyLXNsaWNlKCR4LCAxLCBzdHItaW5kZXgoJHgsICRiZW0tLXNlcC1tb2QpLTEpO1xuICAgIH0gQGVsc2UgaWYgYmVtLS1jb250YWlucy1lbGVtKCR4KSB7XG4gICAgICAgIEByZXR1cm4gc3RyLXNsaWNlKCR4LCAxLCBzdHItaW5kZXgoJHgsICRiZW0tLXNlcC1lbGVtKS0xKTtcbiAgICB9IEBlbHNlIGlmIGJlbS0tY29udGFpbnMtcHNldWRvKCR4KSB7XG4gICAgICAgIEByZXR1cm4gc3RyLXNsaWNlKCR4LCAxLCBzdHItaW5kZXgoJHgsICc6JyktMSk7XG4gICAgfVxuICAgIEByZXR1cm4gJHg7XG59XG5cbi8vLyBSZXR1cm5zIHRoZSBmaXJzdCBzZWxlY3RvciBvZiBhIG5lc3RlZCBzZWxlY3RvciBzdHJpbmcuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICR4IC0gVGhlIHNlbGVjdG9yIHRvIHNlYXJjaCBmb3IuXG4vLy8gQHJldHVybnMge1N0cmluZ31cbkBmdW5jdGlvbiBiZW0tLWV4dHJhY3QtZmlyc3Qtc2VsZWN0b3IoJHgpIHtcbiAgICAkZW93OiBzdHItaW5kZXgoJHgsICcgJykgb3IgLTE7XG4gICAgQHJldHVybiBzdHItc2xpY2UoJHgsIDEsICRlb3cpO1xufVxuXG4vLy8gR2VuZXJhdGVzIGEgZnVsbCBCRU0gc2VsZWN0b3IuXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAcGFyYW0ge1N0cmluZ30gJGJsb2NrIC0gUmVxdWlyZWQuIEEgc3RyaW5nIGJsb2NrIG5hbWUuXG4vLy8gQHBhcmFtIHtTdHJpbmd8TGlzdH0gJGVsZW0gLSBPcHRpb25hbC4gQSBzdWItZWxlbWVudCBuYW1lLiBJZiBgJG1vZGAgaXMgbm90IHByZXNlbnQsIGl0IGlzXG4vLy8gam9pbmVkIHdpdGggJGJsb2NrLiBJZiAkbW9kIGlzIHByZXNlbnQsIGl0IGlzIG5lc3RlZCB1bmRlciBgJGJsb2NrLS0kbW9kYC5cbi8vLyBAcGFyYW0ge1N0cmluZ3xNYXB9ICRtb2QgLSBPcHRpb25hbC4gQSBibG9jayBtb2RpZmllci5cbi8vLyBAZXhhbXBsZSBzY3NzIEluY2x1ZGUgYSBibG9ja1xuLy8vICAgQGluY2x1ZGUgYmVtLXNlbGVjdG9yKGJsb2NrKTsgLy8gb3V0cHV0cyAuYmxvY2tcbi8vLyBAZXhhbXBsZSBzY3NzIEluY2x1ZGUgYSBibG9jayBhbmQgYW4gZWxlbWVudFxuLy8vICAgQGluY2x1ZGUgYmVtLXNlbGVjdG9yKGJsb2NrLCAkZTplbGVtKTsgLy8gb3V0cHV0cyAuYmxvY2tfX2VsZW1cbi8vLyBAZXhhbXBsZSBzY3NzIEluY2x1ZGUgYmxvY2ssIGVsZW1lbnQsIGFuZCBlbGVtZW50IG1vZGlmaWVyXG4vLy8gICBAaW5jbHVkZSBiZW0tc2VsZWN0b3IoYmxvY2ssICRlOihlbGVtLGVtb2QpOyAvLyBvdXRwdXRzIC5ibG9ja19fZWxlbS1lbW9kXG4vLy8gQGV4YW1wbGUgc2NzcyBJbmNsdWRlIGJsb2NrIGFuZCBibG9jayBtb2RpZmllclxuLy8vICAgQGluY2x1ZGUgYmVtLXNlbGVjdG9yKGJsb2NrLCAkbTptb2QpIC8vIG91dHB1dHMgLmJsb2NrLS1tb2Rcbi8vLyBAZXhhbXBsZSBzY3NzIEluY2x1ZGUgYmxvY2sgYW5kIG1vZGlmaWVyIHZhbHVlXG4vLy8gICBAaW5jbHVkZSBiZW0tc2VsZWN0b3IoYmxvY2ssICRtOihtb2Q6dmFsKSk7IC8vIG91dHB1dHMgLmJsb2NrLS1tb2QtdmFsXG4vLy8gQGV4YW1wbGUgc2NzcyBJbmNsdWRlIGJsb2NrIG1vZGlmaWVyIGZvbGxvd2VkIGJ5IGJsb2NrIHN1Yi1lbGVtZW50XG4vLy8gICBAaW5jbHVkZSBiZW0tc2VsZWN0b3IoYmxvY2ssICRtOm1vZCwgJGU6ZWxlbSk7IC8vIG91dHB1dHMgLmJsb2NrLS1tb2QgLmJsb2NrX19lbGVtXG5AZnVuY3Rpb24gYmVtLXNlbGVjdG9yKCRibG9jaywgJGU6IG51bGwsICRlbGVtOiBudWxsLCAkbTogbnVsbCwgJG1vZDogbnVsbCwgJG1vZHM6IG51bGwpIHtcbiAgICAkYmxvY2s6IGJlbS0td2l0aC1kb3QoJGJsb2NrKTtcbiAgICAkZWxlbTogJGUgb3IgJGVsZW07XG4gICAgLy8gUmV0dXJuIGVhcmx5IGlmIHBvc3NpYmxlXG4gICAgJG1vZHM6ICRtIG9yICRtb2Qgb3IgJG1vZHM7XG4gICAgQGlmIG5vdCAoJGVsZW0gb3IgJG1vZHMpIHtcbiAgICAgICAgQHJldHVybiAkYmxvY2s7XG4gICAgfVxuICAgIEBpZiAkZWxlbSB7XG4gICAgICAgIC8vIFVzZXIgcGFzc2VkIGFuIGVsZW1lbnQtc3BlY2lmaWMgbW9kaWZpZXJcbiAgICAgICAgQGlmICh0eXBlLW9mKCRlbGVtKSA9PSBsaXN0KSBhbmQgbnRoKCRlbGVtLCAyKSB7XG4gICAgICAgICAgICAvLyBGb3Igbm93IHdlIGRvbid0IHN1cHBvcnQgbXVsdGlwbGUgZWxlbS1tb2RzIGF0IG9uY2VcbiAgICAgICAgICAgIEBpZiB0eXBlLW9mKG50aCgkZWxlbSwgMikpID09IGxpc3Qge1xuICAgICAgICAgICAgICAgIEBlcnJvciAnT25seSBvbmUgZWxlbWVudC1tb2RpZmllciBhbGxvd2VkLic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkZWxlbTogc3RyLXNsaWNlKGJlbS1zZWxlY3RvcihudGgoJGVsZW0sIDEpLCAkbTogbnRoKCRlbGVtLCAyKSksIDIpO1xuICAgICAgICB9XG4gICAgICAgICRlbGVtOiBiZW0tLWVsZW0tc3RyKCRibG9jaywgJGVsZW0pO1xuICAgIH1cbiAgICBAaWYgbm90ICRtb2RzIHtcbiAgICAgICAgQHJldHVybiBiZW0tLXdpdGgtZG90KCRlbGVtKTtcbiAgICB9XG4gICAgQGlmIHR5cGUtb2YoJG1vZHMpICE9IGxpc3Qge1xuICAgICAgICAkbW9kczogKCRtb2RzLCApO1xuICAgIH1cbiAgICAkYmVtY2xzOiAnJztcbiAgICBAZm9yICRpIGZyb20gMSB0byBsZW5ndGgoJG1vZHMpIHtcbiAgICAgICAgJGJlbWNsczogJGJlbWNscyArIGJlbS0tYmVtLXN0cigkYmxvY2ssICRlbGVtLCBudGgoJG1vZHMsICRpKSkgKyAnLCAnO1xuICAgIH1cbiAgICAkYmVtY2xzOiAkYmVtY2xzICsgYmVtLS1iZW0tc3RyKCRibG9jaywgJGVsZW0sIG50aCgkbW9kcywgLTEpKTtcbiAgICBAcmV0dXJuICRiZW1jbHM7XG59XG5cbi8vLyBTaW1wbHkgdW5yb2xscyBpbnRvIGEgY2xhc3Mtc2VsZWN0b3IuIFRoZSBtYWluIHB1cnBvc2Ugb2YgdXNpbmcgdGhpcyBtaXhpblxuLy8vIGlzIHRvIGNsZWFybHkgZGVub3RlIHRoZSBzdGFydCBvZiBhIEJFTSBibG9jay5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBwYXJhbSB7U3RyaW5nfSAkYmxvY2sgLSBUaGUgYmxvY2sgbmFtZS5cbkBtaXhpbiBiZW0tYmxvY2soJGJsb2NrKSB7XG4gICAgQGF0LXJvb3Qge1xuICAgICAgICAje2JlbS1zZWxlY3RvcigkYmxvY2spfSB7XG4gICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8vIFVucm9sbHMgaW50byBhIHByb3BlciBCRU0gZWxlbWVudCBzZWxlY3RvciwgZGVwZW5kaW5nIG9uIHRoZSBjb250ZXh0LlxuLy8vIEluc2lkZSBqdXN0IGEgYmxvY2ssIHlpZWxkcyBhIHJvb3QtbGV2ZWwgYC5ibG9ja19fZWxlbWAuXG4vLy8gSW5zaWRlIGEgbW9kIG9yIHBzZXVkby1zZWxlY3RvciwgeWllbGRzIGEgbmVzdGVkIGAuYmxvY2stLW1vZCAuYmxvY2tfX2VsZW1gLlxuLy8vIElmICRtb2QgaXMgaW5jbHVkZWQsIGl0IGlzIGFwcGVuZGVkIHRvIHRoZSBibG9jayBzZWxlY3Rvci4gTXVsdGlwbGVcbi8vLyAkbW9kcyBhcmUgbm90IHN1cHBvcnRlZC5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBwYXJhbSB7U3RyaW5nfSAkZWxlbSAtIFRoZSBzdWItZWxlbWVudCBuYW1lLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkbSAtIFRoZSBtb2RpZmllciBuYW1lLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkbW9kIC0gQW4gYWxpYXMgb2YgYCRtYC5cbkBtaXhpbiBiZW0tZWxlbSgkZWxlbSwgJG06IG51bGwsICRtb2Q6IG51bGwsICRtb2RzOiBudWxsKSB7XG4gICAgJHRoaXM6IGJlbS0tc2VsZWN0b3ItdG8tc3RyaW5nKCYpO1xuICAgICRibG9jazogYmVtLS1leHRyYWN0LWJsb2NrKCR0aGlzKTtcbiAgICAkZmlyc3Q6IGJlbS0tZXh0cmFjdC1maXJzdC1zZWxlY3RvcigkdGhpcyk7XG4gICAgJG5lc3RlZDogYmVtLS1jb250YWlucy1wc2V1ZG8oJHRoaXMpIG9yIGJlbS0tY29udGFpbnMtbW9kKCR0aGlzKTtcblxuICAgICRtb2Q6ICRtIG9yICRtb2Q7XG4gICAgJG14OiAoKTtcblxuICAgIEBpZiAkdGhpcyA9PSAnJyB7XG4gICAgICAgIEBlcnJvciAnRGV0ZWN0ZWQgYW4gRWxlbWVudCB0aGF0IGlzIG5vdCBpbnNpZGUgYSBCbG9jazogI3skZWxlbX0nO1xuICAgIH1cblxuICAgIEBpZiBiZW0tLWNvbnRhaW5zLWVsZW0oJHRoaXMpIHtcbiAgICAgICAgQGVycm9yICdEZXRlY3RlZCBhIG11bHRpLWxldmVsIG5lc3RlZCBFbGVtZW50ICgjeyR0aGlzfSAjeyRlbGVtfSkhIEJlbWVyYWxkIGRvZXNuXFwndCBzdXBwb3J0IG5lc3RlZCAnICsgJ2VsZW1lbnRzIGJlY2F1c2UgdGhleSBkbyBub3QgaGF2ZSBCRU0gbmF0dXJlICh3d3cuZ2V0YmVtLmNvbS9mYXEvI2Nzcy1uZXN0ZWQtZWxlbWVudHMpLiAnICsgJ0lmIHlvdSBtdXN0IGRvIGl0LCB1c2UgYSBoYXJkY29kZWQgc2VsZWN0b3IgbGlrZSAmX19zdWJzdWJlbGVtICc7XG4gICAgfVxuXG4gICAgQGlmICRtb2RzICE9IG51bGwgYW5kIHR5cGUtb2YoJG1vZHMpID09ICdsaXN0JyB7XG4gICAgICAgIEBlYWNoICRpIGluICRtb2RzIHtcbiAgICAgICAgICAgICRteDogYXBwZW5kKCRteCwgI3tiZW0tc2VsZWN0b3IoJGJsb2NrLCAkZTogKCRlbGVtLCAkaSkpfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBpZiBub3QoJG5lc3RlZCkge1xuICAgICAgICAvLyBOb3JtYWwgY2FzZSwgbm8gcHNldWRvLXNlbGVjdG9yIHByZXNlbnQgb3IgbW9kLCBzbyBubyBuZXN0aW5nLlxuICAgICAgICAvLyAuYmxvY2tfX2VsZW0geyAuLi4gfVxuICAgICAgICBAYXQtcm9vdCB7XG4gICAgICAgICAgICBAaWYgJG1vZHMgPT0gbnVsbCB7XG4gICAgICAgICAgICAgICAgI3tiZW0tc2VsZWN0b3IoJGJsb2NrLCAkZTogKCRlbGVtLCAkbW9kKSl9IHtcbiAgICAgICAgICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICAgICAgI3tpbXBsb2RlKCRteCl9IHtcbiAgICAgICAgICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIC8vIHBzZXVkby1lbGVtZW50IG9yIG1vZCBwcmVzZW50LCBzbyB3ZSBoYXZlIG5lc3RpbmcuXG4gICAgICAgIC8vIC5ibG9jazphY3RpdmUgLmJsb2NrX19lbGVtIHsgLi4uIH1cbiAgICAgICAgLy8gLmJsb2NrLS1tb2QgLmJsb2NrX19lbGVtIHsgLi4uIH1cbiAgICAgICAgQGF0LXJvb3Qge1xuICAgICAgICAgICAgJHNlbGVjdG9yOiAkZmlyc3QgKyAnICcgKyBiZW0tc2VsZWN0b3IoJGJsb2NrLCAkZTogKCRlbGVtLCAkbW9kKSk7XG5cbiAgICAgICAgICAgIEBpZiAkbW9kcyA9PSBudWxsIHtcbiAgICAgICAgICAgICAgICAjeyRzZWxlY3Rvcn0ge1xuICAgICAgICAgICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICAgICAgICAjeyRmaXJzdH0gI3tpbXBsb2RlKCRteCl9IHtcbiAgICAgICAgICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8gVW5yb2xscyBpbnRvIGEgQkVNIGJsb2NrLW1vZGlmaWVyIHNlbGVjdG9yLlxuLy8vIFRoaXMgbWl4aW4gZG9lcyBub3QgZ2VuZXJhdGUgZWxlbWVudC1tb2RpZmllcnMsIHRoZSBiZW0tZWxlbSBtaXhpbiBpbnN0ZWFkLlxuLy8vIE5lc3RpbmcgYmVtLW1vZCBpbnNpZGUgYSBwc2V1ZG8tc2VsZWN0b3IgaXMgbm90IHN1cHBvcnRlZCwgYmVjYXVzZSB3aGF0XG4vLy8gdGhhdCBzaG91bGQgbWVhbiBpc24ndCBjbGVhci5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBwYXJhbSB7U3RyaW5nfSAkbW9kIC0gVGhlIG1vZGlmaWVyIG5hbWUuXG5AbWl4aW4gYmVtLW1vZCgkbW9kKSB7XG4gICAgJHNraXA6IGZhbHNlO1xuICAgICR0aGlzOiBiZW0tLXNlbGVjdG9yLXRvLXN0cmluZygmKTtcbiAgICBAaWYgJHRoaXMgPT0gJycge1xuICAgICAgICBAZXJyb3IgJ0RldGVjdGVkIGEgTW9kaWZpZXIgdGhhdCBpcyBub3QgaW5zaWRlIGEgQmxvY2s6ICcgKyAkbW9kO1xuICAgIH1cbiAgICBAaWYgKGJlbS0tY29udGFpbnMtZWxlbSgkdGhpcykpIHtcbiAgICAgICAgQGVycm9yICdOZXN0aW5nIGEgTW9kaWZpZXIgaW5zaWRlIGFuIEVsZW1lbnQgKCN7JHRoaXN9ICN7JG1vZH0pICcgKyAnaXMgbm90IHN1cHBvcnRlZC4gSW5zdGVhZCwgdXNlIGJlbS1lbGVtKG15ZWxlbSwgZWxlbS1tb2QpIHN5bnRheC4nO1xuICAgIH1cbiAgICBAaWYgKGJlbS0tY29udGFpbnMtcHNldWRvKCR0aGlzKSkge1xuICAgICAgICBAZXJyb3IgJ05lc3RpbmcgYSBNb2RpZmllciBpbnNpZGUgYSBwc2V1ZG8tc2VsZWN0b3IgaXMgbm90IHN1cHBvcnRlZDogI3skdGhpc30gI3skbW9kfSc7XG4gICAgfVxuICAgIEBhdC1yb290IHtcbiAgICAgICAgI3tiZW0tc2VsZWN0b3IoJHRoaXMsICRtOiAkbW9kKX0ge1xuICAgICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLyBVbnJvbGxzIGludG8gYSBibG9jay0tbW9kaWZpZXIuW2Jsb2NrLS1tb2RpZmllci4uLl0gLmJsb2NrX19lbFxuLy8vIFRoaXMgbWl4aW4gaXMgdXNlZnVsIHdoZW4gd2Ugd2FudCB0byBhcHBseSBjbGFzc2VzIHRvIGEgYmxvY2ssXG4vLy8gb3IgYmxvY2sgZWxlbWVudCB3aGVuIHR3byBvciBtb3JlIG1vZGlmaWVycyBhcmUgYXBwbGllZCBpbiB0YW5kZW1cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBwYXJhbSB7TGlzdH0gJG1vZHMgLSBBIGxpc3Qgb2YgbW9kaWZpZXJzXG5AbWl4aW4gYmVtLW1vZHMoJG1vZHMuLi4pIHtcbiAgICAkdGhpczogYmVtLS1zZWxlY3Rvci10by1zdHJpbmcoJik7XG4gICAgJG1vZC1jbGFzc2VzOiAoKTtcbiAgICBAZWFjaCAkbW9kIGluICRtb2RzIHtcbiAgICAgICAgQGlmICR0aGlzID09ICcnIHtcbiAgICAgICAgICAgIEBlcnJvciAnRGV0ZWN0ZWQgYSBNb2RpZmllciB0aGF0IGlzIG5vdCBpbnNpZGUgYSBCbG9jazogJyArICRtb2Q7XG4gICAgICAgIH1cbiAgICAgICAgQGlmIChiZW0tLWNvbnRhaW5zLWVsZW0oJHRoaXMpKSB7XG4gICAgICAgICAgICBAZXJyb3IgJ05lc3RpbmcgYSBNb2RpZmllciBpbnNpZGUgYW4gRWxlbWVudCAoI3skdGhpc30gI3skbW9kfSkgJyArICdpcyBub3Qgc3VwcG9ydGVkLiBJbnN0ZWFkLCB1c2UgYmVtLWVsZW0obXllbGVtLCBlbGVtLW1vZCkgc3ludGF4Lic7XG4gICAgICAgIH1cbiAgICAgICAgQGlmIChiZW0tLWNvbnRhaW5zLXBzZXVkbygkdGhpcykpIHtcbiAgICAgICAgICAgIEBlcnJvciAnTmVzdGluZyBhIE1vZGlmaWVyIGluc2lkZSBhIHBzZXVkby1zZWxlY3RvciBpcyBub3Qgc3VwcG9ydGVkOiAjeyR0aGlzfSAjeyRtb2R9JztcbiAgICAgICAgfVxuICAgICAgICAkbW9kLWNsYXNzZXM6IGFwcGVuZCgkbW9kLWNsYXNzZXMsICN7YmVtLXNlbGVjdG9yKCRibG9jazogJHRoaXMsICRtOiAkbW9kKX0pXG4gICAgfVxuICAgIEBhdC1yb290IHtcbiAgICAgICAgI3tpbXBsb2RlKCRtb2QtY2xhc3Nlcyl9IHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8gQGFsaWFzIGJlbS1zZWxlY3RvclxuQG1peGluIGJlbSgkYmxvY2ssICRlOiBudWxsLCAkZWxlbTogbnVsbCwgJG06IG51bGwsICRtb2Q6IG51bGwsICRtb2RzOiBudWxsKSB7XG4gICAgI3tiZW0tc2VsZWN0b3IoJGJsb2NrLCAkZTogJGUsICRlbGVtOiAkZWxlbSwgJG06ICRtLCAkbW9kOiAkbW9kLCAkbW9kczogJG1vZHMpfSB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cblxuLy8vIEBhbGlhcyBiZW0tYmxvY2tcbkBtaXhpbiBibG9jaygkYmxvY2spIHtcbiAgICBAaW5jbHVkZSBiZW0tYmxvY2soJGJsb2NrKSB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cblxuLy8vIEBhbGlhcyBiZW0tZWxlbVxuQG1peGluIGVsZW0oJGVsZW0sICRtOiBudWxsLCAkbW9kOiBudWxsLCAkbW9kczogbnVsbCkge1xuICAgIEBpbmNsdWRlIGJlbS1lbGVtKCRlbGVtLCAkbTogJG0sICRtb2Q6ICRtb2QsICRtb2RzOiAkbW9kcykge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5cbi8vLyBAYWxpYXMgYmVtLW1vZFxuQG1peGluIG1vZCgkbW9kKSB7XG4gICAgQGluY2x1ZGUgYmVtLW1vZCgkbW9kKSB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cblxuLy8vIEBhbGlhcyBiZW0tbW9kc1xuQG1peGluIG1vZHMoJG1vZHMuLi4pIHtcbiAgICBAaW5jbHVkZSBiZW0tbW9kcygkbW9kcy4uLikge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5cbi8vLyBAYWxpYXMgYmVtLWJsb2NrXG5AbWl4aW4gYigkYmxvY2spIHtcbiAgICBAaW5jbHVkZSBiZW0tYmxvY2soJGJsb2NrKSB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cblxuLy8vIEBhbGlhcyBiZW0tZWxlbVxuQG1peGluIGUoJGVsZW0sICRtOiBudWxsLCAkbW9kOiBudWxsLCAkbW9kczogbnVsbCkge1xuICAgIEBpbmNsdWRlIGJlbS1lbGVtKCRlbGVtLCAkbTogJG0sICRtb2Q6ICRtb2QsICRtb2RzOiAkbW9kcykge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5cbi8vLyBAYWxpYXMgYmVtLW1vZFxuQG1peGluIG0oJG1vZCkge1xuICAgIEBpbmNsdWRlIGJlbS1tb2QoJG1vZCkge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG5cbi8vLyBAYWxpYXMgYmVtLW1vZHNcbkBtaXhpbiBteCgkbW9kcy4uLikge1xuICAgIEBpbmNsdWRlIGJlbS1tb2RzKCRtb2RzLi4uKSB7XG4gICAgICAgIEBjb250ZW50O1xuICAgIH1cbn1cbiIsIiVkaXNwbGF5LWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogaW5oZXJpdDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuJWRpc3BsYXktY29udGFpbmVyLS1pbmFjdGl2ZSB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbkBpbmNsdWRlIGIoaWd4LWRpc3BsYXktY29udGFpbmVyKSB7XG4gICAgQGV4dGVuZCAlZGlzcGxheS1jb250YWluZXIgIW9wdGlvbmFsO1xuXG4gICAgQGluY2x1ZGUgbShpbmFjdGl2ZSkge1xuICAgICAgICBAZXh0ZW5kICVkaXNwbGF5LWNvbnRhaW5lci0taW5hY3RpdmUgIW9wdGlvbmFsO1xuICAgIH1cbn1cbiIsIiV2aGVscGVyLWRpc3BsYXkge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHotaW5kZXg6IDEwMDAxO1xufVxuXG4ldmhlbHBlci0tdmVydGljYWwge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMThweDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG59XG5cbiV2aGVscGVyLS1ob3Jpem9udGFsIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuJXZoZWxwZXItY29udGVudC0tdmVydGljYWwge1xuICAgIHdpZHRoOiAxcHg7XG59XG5cbiV2aGVscGVyLWNvbnRlbnQtLWhvcml6b250YWwge1xuICAgIGhlaWdodDogMXB4O1xufVxuXG5AaW5jbHVkZSBiKGlneC12aGVscGVyKSB7XG4gICAgQGluY2x1ZGUgbSh2ZXJ0aWNhbCkge1xuICAgICAgICBAZXh0ZW5kICV2aGVscGVyLWRpc3BsYXkgIW9wdGlvbmFsO1xuICAgICAgICBAZXh0ZW5kICV2aGVscGVyLS12ZXJ0aWNhbCAhb3B0aW9uYWw7XG5cbiAgICAgICAgQGluY2x1ZGUgZShwbGFjZWhvbGRlci1jb250ZW50KSB7XG4gICAgICAgICAgICBAZXh0ZW5kICV2aGVscGVyLWNvbnRlbnQtLXZlcnRpY2FsICFvcHRpb25hbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBpbmNsdWRlIG0oaG9yaXpvbnRhbCkge1xuICAgICAgICBAZXh0ZW5kICV2aGVscGVyLWRpc3BsYXkgIW9wdGlvbmFsO1xuICAgICAgICBAZXh0ZW5kICV2aGVscGVyLS1ob3Jpem9udGFsICFvcHRpb25hbDtcblxuICAgICAgICBAaW5jbHVkZSBlKHBsYWNlaG9sZGVyLWNvbnRlbnQpIHtcbiAgICAgICAgICAgIEBleHRlbmQgJXZoZWxwZXItY29udGVudC0taG9yaXpvbnRhbCAhb3B0aW9uYWw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIlaWd4LXRvZ2dsZS0taGlkZGVuIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG5cbkBpbmNsdWRlIGIoaWd4LXRvZ2dsZSkge1xuICAgIEBpbmNsdWRlIG0oaGlkZGVuKSB7XG4gICAgICAgIEBleHRlbmQgJWlneC10b2dnbGUtLWhpZGRlbiAhb3B0aW9uYWw7XG4gICAgfVxufVxuIiwiLy8vLyBDYXJvdXNlbFxuLy8vIEBncm91cCBjb21wb25lbnRzXG4vLy8gQGF1dGhvciA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NpbWVvbm9mZlwiIHRhcmdldD1cIl9ibGFua1wiPlNpbWVvbiBTaW1lb25vZmY8L2E+XG4vLy8gQHJlcXVpcmVzIHttaXhpbn0gYmVtLWJsb2NrXG4vLy8gQHJlcXVpcmVzIHttaXhpbn0gYmVtLWVsZW1cbi8vLyBAcmVxdWlyZXMge21peGlufSBiZW0tbW9kXG4vLy8vXG5pZ3gtY2Fyb3VzZWwge1xuICAgIG91dGxpbmUtc3R5bGU6IG5vbmU7XG59XG5cbkBpbmNsdWRlIGIoaWd4LWNhcm91c2VsKSB7XG4gICAgJHRoaXM6IGJlbS0tc2VsZWN0b3ItdG8tc3RyaW5nKCYpO1xuICAgIEBpbmNsdWRlIHJlZ2lzdGVyLWNvbXBvbmVudChzdHItc2xpY2UoJHRoaXMsIDIsIC0xKSk7XG5cbiAgICBAZXh0ZW5kICVpZ3gtY2Fyb3VzZWwtZGlzcGxheSAhb3B0aW9uYWw7XG5cbiAgICBAaW5jbHVkZSBlKGlubmVyKSB7XG4gICAgICAgIEBleHRlbmQgJWlneC1jYXJvdXNlbC1zbGlkZS13cmFwcGVyICFvcHRpb25hbDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBlKGluZGljYXRvcnMpIHtcbiAgICAgICAgQGV4dGVuZCAlaWd4LWNhcm91c2VsLWluZGljYXRvcnMgIW9wdGlvbmFsO1xuICAgIH1cblxuICAgIEBpbmNsdWRlIGUoYXJyb3cpIHtcbiAgICAgICAgQGV4dGVuZCAlaWd4LWNhcm91c2VsLWFycm93ICFvcHRpb25hbDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBlKGFycm93LCAkbTogcHJldikge1xuICAgICAgICBAZXh0ZW5kICVpZ3gtY2Fyb3VzZWwtYXJyb3cgIW9wdGlvbmFsO1xuICAgICAgICBAZXh0ZW5kICVpZ3gtY2Fyb3VzZWwtYXJyb3ctLXByZXYgIW9wdGlvbmFsO1xuXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgQGV4dGVuZCAlaWd4LWNhcm91c2VsLWFycm93LS1ob3ZlciAhb3B0aW9uYWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAaW5jbHVkZSBlKGFycm93LCAkbTogbmV4dCkge1xuICAgICAgICBAZXh0ZW5kICVpZ3gtY2Fyb3VzZWwtYXJyb3cgIW9wdGlvbmFsO1xuICAgICAgICBAZXh0ZW5kICVpZ3gtY2Fyb3VzZWwtYXJyb3ctLW5leHQgIW9wdGlvbmFsO1xuXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgQGV4dGVuZCAlaWd4LWNhcm91c2VsLWFycm93LS1ob3ZlciAhb3B0aW9uYWw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBpbmNsdWRlIGIoaWd4LXNsaWRlKSB7XG4gICAgQGV4dGVuZCAlaWd4LWNhcm91c2VsLXNsaWRlICFvcHRpb25hbDtcbn1cbiIsIi8vLy9cbi8vLyBAZ3JvdXAgY29tcG9uZW50c1xuLy8vIEBhdXRob3IgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaW1lb25vZmZcIiB0YXJnZXQ9XCJfYmxhbmtcIj5TaW1lb24gU2ltZW9ub2ZmPC9hPlxuLy8vIEByZXF1aXJlcyB7bWl4aW59IGJlbS1ibG9ja1xuLy8vIEByZXF1aXJlcyB7bWl4aW59IGJlbS1lbGVtXG4vLy8gQHJlcXVpcmVzIHttaXhpbn0gYmVtLW1vZFxuLy8vL1xuQGluY2x1ZGUgYihpZ3gtb3ZlcmxheSkge1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogMDtcbiAgICAkYmxvY2s6IGJlbS0tc2VsZWN0b3ItdG8tc3RyaW5nKCYpO1xuICAgIEBpbmNsdWRlIHJlZ2lzdGVyLWNvbXBvbmVudChpZ3gtb3ZlcmxheSk7XG5cbiAgICBAaW5jbHVkZSBlKHdyYXBwZXIpIHtcbiAgICAgICAgQGV4dGVuZCAlb3ZlcmxheS13cmFwcGVyICFvcHRpb25hbDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBlKHdyYXBwZXIsICRtOiBtb2RhbCkge1xuICAgICAgICBAZXh0ZW5kICVvdmVybGF5LXdyYXBwZXIgIW9wdGlvbmFsO1xuICAgICAgICBAZXh0ZW5kICVvdmVybGF5LXdyYXBwZXItLW1vZGFsICFvcHRpb25hbDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBlKGNvbnRlbnQpIHtcbiAgICAgICAgQGV4dGVuZCAlb3ZlcmxheS1jb250ZW50ICFvcHRpb25hbDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBlKGNvbnRlbnQsICRtOiBtb2RhbCkge1xuICAgICAgICBAZXh0ZW5kICVvdmVybGF5LWNvbnRlbnQgIW9wdGlvbmFsO1xuICAgICAgICBAZXh0ZW5kICVvdmVybGF5LWNvbnRlbnQtLW1vZGFsICFvcHRpb25hbDtcbiAgICB9XG59XG4iLCIvLy8vXG4vLy8gQGdyb3VwIHRoZW1lc1xuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGF1dGhvciA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NpbWVvbm9mZlwiIHRhcmdldD1cIl9ibGFua1wiPlNpbWVvbiBTaW1lb25vZmY8L2E+XG4vLy8gQGF1dGhvciA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2Rlc2lnOXN0ZWluXCIgdGFyZ2V0PVwiX2JsYW5rXCI+TWFyaW4gUG9wb3Y8L2E+XG4vLy8vXG5cbi8vLyBAcGFyYW0ge01hcH0gJHBhbGV0dGUgWyRkZWZhdWx0LXBhbGV0dGVdIC0gVGhlIHBhbGV0dGUgdXNlZCBhcyBiYXNpcyBmb3Igc3R5bGluZyB0aGUgY29tcG9uZW50LlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciBbY3VycmVudENvbG9yXSAtIFRoZSBpY29uIGNvbG9yLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkc2l6ZSBbMjRweF0gLSBUaGUgaWNvbiBzaXplLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRkaXNhYmxlZC1jb2xvciBbcmdiYSgwLCAwLCAwLCAuMzgpXSAtIFRoZSBkaXNhYmxlZCBpY29uIGNvbG9yLlxuLy8vXG4vLy8gQHJlcXVpcmVzIGlneC1jb2xvclxuLy8vIEByZXF1aXJlcyBleHRlbmRcbi8vLyBAcmVxdWlyZXMgcmVtXG4vLy9cbi8vLyBAZXhhbXBsZSBzY3NzIENoYW5nZSB0aGUgaWNvbiBjb2xvclxuLy8vICAgJG15LWljb24tdGhlbWU6IGlneC1pY29uLXRoZW1lKCRjb2xvcjogb3JhbmdlKTtcbi8vLyAgIC8vIFBhc3MgdGhlIHRoZW1lIHRvIHRoZSBpZ3gtaWNvbiBjb21wb25lbnQgbWl4aW5cbi8vLyAgIEBpbmNsdWRlIGlneC1pY29uKCRteS1pY29uLXRoZW1lKTtcbkBmdW5jdGlvbiBpZ3gtaWNvbi10aGVtZShcbiAgICAkcGFsZXR0ZTogJGRlZmF1bHQtcGFsZXR0ZSxcbiAgICAkcHJlc2V0OiBudWxsLFxuXG4gICAgJGNvbG9yOiBudWxsLFxuICAgICRzaXplOiBudWxsLFxuICAgICRkaXNhYmxlZC1jb2xvcjogbnVsbFxuKSB7XG4gICAgJGRlZmF1bHQtdGhlbWU6IChcbiAgICAgICAgbmFtZTogJ2lneC1pY29uJyxcbiAgICAgICAgY29sb3I6IGN1cnJlbnRDb2xvcixcbiAgICAgICAgc2l6ZTogcmVtKDI0cHgpLFxuICAgICAgICBkaXNhYmxlZC1jb2xvcjogY3VycmVudENvbG9yXG4gICAgKTtcblxuICAgIEBpZiAkcHJlc2V0IHtcbiAgICAgICAgJGRlZmF1bHQtdGhlbWU6IG1hcC1nZXQoJHByZXNldCwgbWFwLWdldCgkZGVmYXVsdC10aGVtZSwgJ25hbWUnKSk7XG4gICAgfVxuXG4gICAgQHJldHVybiBleHRlbmQoJGRlZmF1bHQtdGhlbWUsIChcbiAgICAgICAgcGFsZXR0ZTogJHBhbGV0dGUsXG4gICAgICAgIGNvbG9yOiAkY29sb3IsXG4gICAgICAgIHNpemU6ICRzaXplLFxuICAgICAgICBkaXNhYmxlZC1jb2xvcjogJGRpc2FibGVkLWNvbG9yXG4gICAgKSk7XG59XG5cbi8vLyBAcGFyYW0ge01hcH0gJHRoZW1lIC0gVGhlIHRoZW1lIHVzZWQgdG8gc3R5bGUgdGhlIGNvbXBvbmVudC5cbi8vLyBAcmVxdWlyZXMge21peGlufSBpZ3gtcm9vdC1jc3MtdmFyc1xuLy8vIEByZXF1aXJlcyByZW1cbi8vLyBAcmVxdWlyZXMgLS12YXJcbkBtaXhpbiBpZ3gtaWNvbigkdGhlbWUpIHtcbiAgICBAaW5jbHVkZSBpZ3gtcm9vdC1jc3MtdmFycygkdGhlbWUpO1xuXG4gICAgLy8gQGRlYnVnICR0aGVtZTtcblxuICAgICRpZ3gtaWNvbi1mb250LXNpemU6IC0tdmFyKCR0aGVtZSwgJ3NpemUnKTtcblxuICAgICVpZ3gtaWNvbi1kaXNwbGF5IHtcbiAgICAgICAgd2lkdGg6ICRpZ3gtaWNvbi1mb250LXNpemU7XG4gICAgICAgIGhlaWdodDogJGlneC1pY29uLWZvbnQtc2l6ZTtcbiAgICAgICAgZm9udC1zaXplOiAkaWd4LWljb24tZm9udC1zaXplO1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnY29sb3InKTtcblxuICAgICAgICBzdmcge1xuICAgICAgICAgICAgd2lkdGg6IGluaGVyaXQ7XG4gICAgICAgICAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgICAgICAgICBmaWxsOiBjdXJyZW50Q29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlaWd4LWljb24tLWluYWN0aXZlIHtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2Rpc2FibGVkLWNvbG9yJykgIWltcG9ydGFudDtcbiAgICAgICAgb3BhY2l0eTogLjU0O1xuICAgIH1cbn1cblxuJWlneC1zdmctY29udGFpbmVyIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgd2lkdGg6IDA7XG4gICAgaGVpZ2h0OiAwO1xuICAgIGZvbnQtc2l6ZTogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiQGltcG9ydCAnfmlnbml0ZXVpLWFuZ3VsYXIvbGliL2NvcmUvc3R5bGVzL3RoZW1lcy9pbmRleCc7XHJcblxyXG4kZ3JpZC1zYW1wbGUtdGhlbWU6IGlneC1ncmlkLXRoZW1lKFxyXG4gICRyb3ctc2VsZWN0ZWQtYmFja2dyb3VuZDogIzMzMyxcclxuICAkcm93LXNlbGVjdGVkLXRleHQtY29sb3I6ICNkZGQsXHJcbiAgJHJvdy1ob3Zlci1iYWNrZ3JvdW5kOiAjZjhmOGY4LFxyXG4gICRyb3ctYm9yZGVyLWNvbG9yOiAjZjhmOGY4LFxyXG4gICRjZWxsLXNlbGVjdGVkLWJhY2tncm91bmQ6IGlneC1jb2xvcigkZGVmYXVsdC1wYWxldHRlLCBncmF5cywgODAwKSxcclxuICAkY2VsbC1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjZmZmXHJcbik7XHJcblxyXG4kcHJvZ3Jlc3NCYXItc2FtcGxlLXRoZW1lOiBpZ3gtcHJvZ3Jlc3MtbGluZWFyLXRoZW1lKFxyXG4gICR0cmFjay1jb2xvcjogcmdiYSgxODEsIDE4MSwgMTgxLCAwLjUpLFxyXG4gICRmaWxsLWNvbG9yLWRlZmF1bHQ6IG9yYW5nZVxyXG4pO1xyXG5cclxuLmdyaWRfX3dyYXBwZXIge1xyXG4gIEBpbmNsdWRlIGlneC1ncmlkKCRncmlkLXNhbXBsZS10aGVtZSk7XHJcbiAgQGluY2x1ZGUgaWd4LXByb2dyZXNzLWxpbmVhcigkcHJvZ3Jlc3NCYXItc2FtcGxlLXRoZW1lKTtcclxuICB3aWR0aDogMTAwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogMTAwMHB4KSB7XHJcbiAgLmdyaWRfX3dyYXBwZXIge1xyXG4gICAgd2lkdGg6IDk4JSAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDElO1xyXG4gICAgcGFkZGluZy1yaWdodDogMSU7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzIwcHgpIHtcclxuICAuZ3JpZF9fd3JhcHBlciB7XHJcbiAgICB3aWR0aDogNzIwcHggIWltcG9ydGFudDtcclxuICAgIG1hcmdpbjogMCAzcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XHJcbiAgfVxyXG59XHJcblxyXG4uc2FtcGxlLWNvbHVtbiB7XHJcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5zd2l0Y2gtc2FtcGxlX190aXRsZSB7XHJcbiAgbWFyZ2luOiAwIHJlbSgyMHB4KSAwIDA7XHJcbn1cclxuXHJcbi5zYW1wbGVfX2hlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXJnaW4tYm90dG9tOiByZW0oMjBweCk7XHJcbn1cclxuXHJcbi5zd2l0Y2gtc2FtcGxlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogcmVtKDUwcHgpO1xyXG59XHJcbi5zd2l0Y2gtc2FtcGxlX19sYWJlbCB7XHJcbiAgbWFyZ2luOiAwIHJlbSg4KSAwIDA7XHJcbn1cclxuXHJcbi5uYW1lIHtcclxuICB3aWR0aDogcmVtKDEwMHB4KTtcclxuICBtYXJnaW46IDAgcmVtKDMwcHgpO1xyXG59XHJcblxyXG4ubmFtZSxcclxuLnRpdGxlIHtcclxuICBAaW5jbHVkZSBlbGxpcHNpcygpO1xyXG59XHJcblxyXG4uYmFkZ2Vfd3JhcCxcclxuLmNlbGxfX2lubmVyLFxyXG4uY2VsbF9faW5uZXJfMiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLmNlbGxfX2lubmVyLFxyXG4uYmFkZ2Vfd3JhcCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLmdyaWRTYW1wbGVfX2ZpbHRlciB7XHJcbiAgd2lkdGg6IHJlbSgyMDBweCk7XHJcbn1cclxuXHJcbi5mbGFnUGFyZW50IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBhZGRpbmctbGVmdDogcmVtKDIzcHgpO1xyXG59XHJcblxyXG4uZmxhZyB7XHJcbiAgd2lkdGg6IHJlbSgyNHB4KTtcclxufVxyXG5cclxuLmN1cCB7XHJcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG59XHJcblxyXG4ucm93SW5kZXgge1xyXG4gIG1hcmdpbi1sZWZ0OiByZW0oNTdweCk7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiByZW0oOTYwcHgpKSB7XHJcbiAgLmdyaWRfX3dyYXBwZXIge1xyXG4gICAgd2lkdGg6IHJlbSg5NjBweCk7XHJcbiAgfVxyXG59XHJcblxyXG4uaWd4LXBhZ2luYXRvciA+ICoge1xyXG4gIG1hcmdpbjogMCAwLjMxMjVyZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ubGluZWFyLWJhci1jb250YWluZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbiIsIi8vLy9cbi8vLyBAZ3JvdXAgdGhlbWVzXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAYXV0aG9yIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2ltZW9ub2ZmXCIgdGFyZ2V0PVwiX2JsYW5rXCI+U2ltZW9uIFNpbWVvbm9mZjwvYT5cbi8vLyBAYXV0aG9yIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vZGVzaWc5c3RlaW5cIiB0YXJnZXQ9XCJfYmxhbmtcIj5NYXJpbiBQb3BvdjwvYT5cbi8vLy9cblxuLy8vIEBwYXJhbSB7TWFwfSAkcGFsZXR0ZSBbJGRlZmF1bHQtcGFsZXR0ZV0gLSBUaGUgcGFsZXR0ZSB1c2VkIGFzIGJhc2lzIGZvciBzdHlsaW5nIHRoZSBjb21wb25lbnQuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGhlYWRlci1iYWNrZ3JvdW5kIFsjZmVmZWZlXSAtIFRoZSB0YWJsZSBoZWFkZXIgYmFja2dyb3VuZCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkaGVhZGVyLXRleHQtY29sb3IgW3JnYmEoMCwgMCwgMCwgLjU0KV0gLSBUaGUgdGFibGUgaGVhZGVyIHRleHQgY29sb3IuXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRoZWFkZXItYm9yZGVyLXdpZHRoIFsxcHhdIC0gVGhlIGJvcmRlciB3aWR0aCB1c2VkIGZvciBoZWFkZXIgYm9yZGVycy5cbi8vLyBAcGFyYW0ge1N0cmluZ30gJGhlYWRlci1ib3JkZXItc3R5bGUgW3NvbGlkXSAtIFRoZSBib3JkZXIgc3R5bGUgdXNlZCBmb3IgaGVhZGVyIGJvcmRlcnMuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGhlYWRlci1ib3JkZXItY29sb3IgW3JnYmEoMCwgMCwgMCwgLjA4KV0gLSBUaGUgY29sb3IgdXNlZCBmb3IgaGVhZGVyIGJvcmRlcnMuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGdob3N0LWhlYWRlci10ZXh0LWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC41NCldIC0gVGhlIGRyYWdnZWQgaGVhZGVyIHRleHQgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGdob3N0LWhlYWRlci1pY29uLWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC4zOCldIC0gVGhlIGRyYWdnZWQgaGVhZGVyIGljb24gY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGdob3N0LWhlYWRlci1iYWNrZ3JvdW5kIFsjZmZmXSAtIFRoZSBkcmFnZ2VkIGhlYWRlciBiYWNrZ3JvdW5kIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb250ZW50LWJhY2tncm91bmQgWyNmZmZdIC0gVGhlIHRhYmxlIGJvZHkgYmFja2dyb3VuZCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkY29udGVudC10ZXh0LWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC43NCldIC0gVGhlIHRhYmxlIGJvZHkgdGV4dCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkcm93LW9kZC1iYWNrZ3JvdW5kIFsjZmZmXSAtIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIG9kZCByb3dzLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRyb3ctZXZlbi1iYWNrZ3JvdW5kIFsjZmZmXSAtIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIGV2ZW4gcm93cy5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkcm93LW9kZC10ZXh0LWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC43NCldIC0gVGhlIHRleHQgY29sb3Igb2Ygb2RkIHJvd3MuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJHJvdy1ldmVuLXRleHQtY29sb3IgW3JnYmEoMCwgMCwgMCwgLjc0KV0gLSBUaGUgdGV4dCBjb2xvciBvZiBldmVuIHJvd3MuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJHJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kIFtyZ2JhKDAsIDAsIDAsIC43NCldIC0gVGhlIHNlbGVjdGVkIHJvdyBiYWNrZ3JvdW5kIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRyb3ctc2VsZWN0ZWQtdGV4dC1jb2xvciBbaWd4LWNvbnRyYXN0LWNvbG9yIG9mIHJnYmEoMCwgMCwgMCwgLjc0KV0gLSBUaGUgc2VsZWN0ZWQgcm93IHRleHQgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJHJvdy1ob3Zlci1iYWNrZ3JvdW5kIFsjZWFlYWVhXSAtIFRoZSBob3ZlciByb3cgYmFja2dyb3VuZCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkcm93LWhvdmVyLXRleHQtY29sb3IgW2lneC1jb250cmFzdC1jb2xvciBvZiByZ2JhKDAsIDAsIDAsIC4wOCldIC0gVGhlIGhvdmVyIHJvdyB0ZXh0IGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRyb3ctYm9yZGVyLWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC4xMildIC0gVGhlIHJvdyBib3R0b20gYm9yZGVyIGNvbG9yLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkcGlubmVkLWJvcmRlci13aWR0aCBbMnB4XSAtIFRoZSBib3JkZXIgd2lkdGggb2YgdGhlIHBpbm5lZCBib3JkZXIuXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRwaW5uZWQtYm9yZGVyLXN0eWxlIFtzb2xpZF0gLSBUaGUgQ1NTIGJvcmRlciBzdHlsZSBvZiB0aGUgcGlubmVkIGJvcmRlci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkcGlubmVkLWJvcmRlci1jb2xvciBbcmdiYSgwLCAwLCAwLCAuMjQpXSAtIFRoZSBjb2xvciBvZiB0aGUgcGlubmVkIGJvcmRlci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkY2VsbC1zZWxlY3RlZC1iYWNrZ3JvdW5kIFtwcmltYXJ5IDUwMF0gLSBUaGUgc2VsZWN0ZWQgY2VsbCBiYWNrZ3JvdW5kIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjZWxsLXNlbGVjdGVkLXRleHQtY29sb3IgW2lneC1jb250cmFzdC1jb2xvciBvZiBwcmltYXJ5IDUwMF0gLSBUaGUgc2VsZWN0ZWQgY2VsbCB0ZXh0IGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRyZXNpemUtbGluZS1jb2xvciBbc2Vjb25kYXJ5IDUwMF0gLSBUaGUgdGFibGUgaGVhZGVyIHJlc2l6ZSBsaW5lIGNvbG9yLlxuLy8vXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGdyb3VwYXJlYS1iYWNrZ3JvdW5kIFsjZjRmNGY0XSAtIFRoZSBncmlkIGdyb3VwIGFyZWEgYmFja2dyb3VuZCBjb2xvci5cbi8vL1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRncm91cC1yb3ctYmFja2dyb3VuZCBbI2Y0ZjRmNF0gLSBUaGUgZ3JpZCBncm91cCByb3cgYmFja2dyb3VuZCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZ3JvdXAtcm93LXNlbGVjdGVkLWJhY2tncm91bmQgW3JnYigyMzQsIDIzNCwgMjM0KV0gLSBUaGUgZHJvcCBhcmVhIGJhY2tncm91bmQgb24gZHJvcCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkYWN0aXZlLWV4cGFuZC1pY29uLWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC41NCldIC0gVGhlIGRyb3AgYXJlYSBiYWNrZ3JvdW5kIG9uIGRyb3AgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGFjdGl2ZS1leHBhbmQtaWNvbi1ob3Zlci1jb2xvciBbIzA5Zl0gLSBUaGUgZHJvcCBhcmVhIGJhY2tncm91bmQgb24gZHJvcCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZ3JvdXAtbGFiZWwtY29sdW1uLW5hbWUtdGV4dCBbcHJpbWFyeSA1MDBdIC0gVGhlIGdyaWQgZ3JvdXAgcm93IGNvbHVtbiBuYW1lIHRleHQgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGdyb3VwLWxhYmVsLWljb24gW3ByaW1hcnkgNTAwXSAtIFRoZSBncmlkIGdyb3VwIHJvdyBpY29uIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRncm91cC1sYWJlbC10ZXh0IFtyZ2JhKDAsIDAsIDAsIC43NCldIC0gVGhlIGdyaWQgZ3JvdXAgcm93IHRleHQgY29sb3IuXG4vLy9cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZXhwYW5kLWFsbC1pY29uLWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC41NCldIC0gVGhlIGdyaWQgaGVhZGVyIGV4cGFuZCBhbGwgZ3JvdXAgcm93cyBpY29uIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRleHBhbmQtYWxsLWljb24taG92ZXItY29sb3IgW3JnYmEoMCwgMCwgMCwgLjc0KV0gLSBUaGUgZ3JpZCBoZWFkZXIgZXhwYW5kIGFsbCBncm91cCByb3dzIGljb24gaG92ZXIgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGV4cGFuZC1pY29uLWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC41NCldIC0gVGhlIGdyaWQgcm93IGV4cGFuZCBpY29uIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRleHBhbmQtaWNvbi1ob3Zlci1jb2xvciBbcHJpbWFyeSA1MDBdIC0gVGhlIGdyaWQgcm93IGV4cGFuZCBpY29uIGhvdmVyIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRncm91cC1jb3VudC1iYWNrZ3JvdW5kIFtyZ2JhKDAsIDAsIDAsIC4wOCldIC0gVGhlIGdyaWQgZ3JvdXAgcm93IGNvbnQgYmFkZ2UgYmFja2dyb3VuZCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZ3JvdXAtY291bnQtdGV4dC1jb2xvciBbcmdiYSgwLCAwLCAwLCAuNTQpXSAtIFRoZSBncmlkIGdyb3VwIHJvdyBjb250IGJhZGdlIHRleHQgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGRyb3AtYXJlYS10ZXh0LWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC41NCldIC0gVGhlIGRyb3AgYXJlYSB0ZXh0IGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRkcm9wLWFyZWEtaWNvbi1jb2xvciBbcmdiYSgwLCAwLCAwLCAuMzgpXSAtIFRoZSBkcm9wIGFyZWEgaWNvbiBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZHJvcC1hcmVhLWJhY2tncm91bmQgW3JnYmEoMCwgMCwgMCwgLjA0KV0gLSBUaGUgZHJvcCBhcmVhIGJhY2tncm91bmQgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGRyb3AtYXJlYS1vbi1kcm9wLWJhY2tncm91bmQgW3JnYmEoMCwgMCwgMCwgLjA4KV0gLSBUaGUgZHJvcCBhcmVhIGJhY2tncm91bmQgb24gZHJvcCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkdHJlZS1maWx0ZXJlZC10ZXh0LWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC4wNCldIC0gZ3JvdXBpbmcgcm93IGJhY2tncm91bmQgY29sb3Igb24gZm9jdXMuXG4vLy9cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZmlsdGVyaW5nLWhlYWRlci1iYWNrZ3JvdW5kIFsjZmZmXSAtIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBmaWx0ZXJlZCBjb2x1bW4gaGVhZGVyLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRmaWx0ZXJpbmctaGVhZGVyLXRleHQtY29sb3IgW3JnYmEoMCwgMCwgMCwgLjc0KV0gLSBUaGUgdGV4dCBjb2xvciBjb2xvciBvZiB0aGUgZmlsdGVyZWQgY29sdW1uIGhlYWRlci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZmlsdGVyaW5nLXJvdy1iYWNrZ3JvdW5kIFsjZmZmXSAtIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBmaWx0ZXJpbmcgcm93LlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRmaWx0ZXJpbmctcm93LXRleHQtY29sb3IgW3JnYmEoMCwgMCwgMCwgLjc0KV0gLSBUaGUgdGV4dC1jb2xvciBjb2xvciBvZiB0aGUgZmlsdGVyaW5nIHJvdy5cbi8vL1xuLy8vIEByZXF1aXJlcyBpZ3gtY29sb3Jcbi8vLyBAcmVxdWlyZXMgaWd4LWNvbnRyYXN0LWNvbG9yXG4vLy8gQHJlcXVpcmVzIHRleHQtY29udHJhc3Rcbi8vLyBAcmVxdWlyZXMgaGV4cmdiYVxuLy8vIEByZXF1aXJlcyBleHRlbmRcbkBmdW5jdGlvbiBpZ3gtZ3JpZC10aGVtZShcbiAgICAkcGFsZXR0ZTogJGRlZmF1bHQtcGFsZXR0ZSxcbiAgICAkcHJlc2V0OiBudWxsLFxuXG4gICAgJGhlYWRlci1iYWNrZ3JvdW5kOiBudWxsLFxuICAgICRoZWFkZXItdGV4dC1jb2xvcjogbnVsbCxcbiAgICAkaGVhZGVyLWJvcmRlci13aWR0aDogbnVsbCxcbiAgICAkaGVhZGVyLWJvcmRlci1zdHlsZTogbnVsbCxcbiAgICAkaGVhZGVyLWJvcmRlci1jb2xvcjogbnVsbCxcblxuICAgICRjb250ZW50LWJhY2tncm91bmQ6IG51bGwsXG4gICAgJGNvbnRlbnQtdGV4dC1jb2xvcjogbnVsbCxcblxuICAgICRnaG9zdC1oZWFkZXItdGV4dC1jb2xvcjogbnVsbCxcbiAgICAkZ2hvc3QtaGVhZGVyLWljb24tY29sb3I6IG51bGwsXG4gICAgJGdob3N0LWhlYWRlci1iYWNrZ3JvdW5kOiBudWxsLFxuXG4gICAgJHJvdy1vZGQtYmFja2dyb3VuZDogbnVsbCxcbiAgICAkcm93LWV2ZW4tYmFja2dyb3VuZDogbnVsbCxcbiAgICAkcm93LW9kZC10ZXh0LWNvbG9yOiBudWxsLFxuICAgICRyb3ctZXZlbi10ZXh0LWNvbG9yOiBudWxsLFxuICAgICRyb3ctc2VsZWN0ZWQtYmFja2dyb3VuZDogbnVsbCxcbiAgICAkcm93LXNlbGVjdGVkLXRleHQtY29sb3I6IG51bGwsXG4gICAgJHJvdy1ob3Zlci1iYWNrZ3JvdW5kOiBudWxsLFxuICAgICRyb3ctaG92ZXItdGV4dC1jb2xvcjogbnVsbCxcbiAgICAkcm93LWJvcmRlci1jb2xvcjogbnVsbCxcblxuICAgICRwaW5uZWQtYm9yZGVyLXdpZHRoOiBudWxsLFxuICAgICRwaW5uZWQtYm9yZGVyLXN0eWxlOiBudWxsLFxuICAgICRwaW5uZWQtYm9yZGVyLWNvbG9yOiBudWxsLFxuXG4gICAgJGNlbGwtc2VsZWN0ZWQtYmFja2dyb3VuZDogbnVsbCxcbiAgICAkY2VsbC1zZWxlY3RlZC10ZXh0LWNvbG9yOiBudWxsLFxuICAgICRjZWxsLWVkaXRpbmctYmFja2dyb3VuZDogbnVsbCxcblxuICAgICRlZGl0LW1vZGUtY29sb3I6IG51bGwsXG4gICAgJGVkaXRlZC1yb3ctaW5kaWNhdG9yOiBudWxsLFxuICAgICRjZWxsLWVkaXRlZC12YWx1ZS1jb2xvcjogbnVsbCxcblxuICAgICRyZXNpemUtbGluZS1jb2xvcjogbnVsbCxcbiAgICAkZHJvcC1pbmRpY2F0b3ItY29sb3I6IG51bGwsXG5cbiAgICAkZ3JvdXBhcmVhLWJhY2tncm91bmQ6IG51bGwsXG5cbiAgICAkZ3JvdXAtcm93LWJhY2tncm91bmQ6IG51bGwsXG4gICAgJGdyb3VwLXJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kOiBudWxsLFxuICAgICRncm91cC1sYWJlbC1jb2x1bW4tbmFtZS10ZXh0OiBudWxsLFxuICAgICRncm91cC1sYWJlbC1pY29uOiBudWxsLFxuICAgICRncm91cC1sYWJlbC10ZXh0OiBudWxsLFxuXG4gICAgJGV4cGFuZC1hbGwtaWNvbi1jb2xvcjogbnVsbCxcbiAgICAkZXhwYW5kLWFsbC1pY29uLWhvdmVyLWNvbG9yOiBudWxsLFxuXG4gICAgJGV4cGFuZC1pY29uLWNvbG9yOiBudWxsLFxuICAgICRleHBhbmQtaWNvbi1ob3Zlci1jb2xvcjogbnVsbCxcblxuICAgICRhY3RpdmUtZXhwYW5kLWljb24tY29sb3I6IG51bGwsXG4gICAgJGFjdGl2ZS1leHBhbmQtaWNvbi1ob3Zlci1jb2xvcjogbnVsbCxcblxuICAgICRncm91cC1jb3VudC1iYWNrZ3JvdW5kOiBudWxsLFxuICAgICRncm91cC1jb3VudC10ZXh0LWNvbG9yOiBudWxsLFxuXG4gICAgJGRyb3AtYXJlYS10ZXh0LWNvbG9yOiBudWxsLFxuICAgICRkcm9wLWFyZWEtaWNvbi1jb2xvcjogbnVsbCxcbiAgICAkZHJvcC1hcmVhLWJhY2tncm91bmQ6IG51bGwsXG4gICAgJGRyb3AtYXJlYS1vbi1kcm9wLWJhY2tncm91bmQ6IG51bGwsXG5cbiAgICAkZmlsdGVyaW5nLWhlYWRlci1iYWNrZ3JvdW5kOiBudWxsLFxuICAgICRmaWx0ZXJpbmctaGVhZGVyLXRleHQtY29sb3I6IG51bGwsXG4gICAgJGZpbHRlcmluZy1yb3ctYmFja2dyb3VuZDogbnVsbCxcbiAgICAkZmlsdGVyaW5nLXJvdy10ZXh0LWNvbG9yOiBudWxsLFxuICAgICR0cmVlLWZpbHRlcmVkLXRleHQtY29sb3I6IG51bGxcbikge1xuICAgICRkZWZhdWx0LXRoZW1lOiAoXG4gICAgICAgIG5hbWU6ICdpZ3gtZ3JpZCcsXG5cbiAgICAgICAgaGVhZGVyLWJhY2tncm91bmQ6IGhleHJnYmEoaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCAxMDApKSxcbiAgICAgICAgaGVhZGVyLXRleHQtY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgNjAwKSxcbiAgICAgICAgaGVhZGVyLWJvcmRlci13aWR0aDogMXB4LFxuICAgICAgICBoZWFkZXItYm9yZGVyLXN0eWxlOiBzb2xpZCxcbiAgICAgICAgaGVhZGVyLWJvcmRlci1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCAyMDApLFxuXG4gICAgICAgIGNvbnRlbnQtYmFja2dyb3VuZDogI2ZmZixcbiAgICAgICAgY29udGVudC10ZXh0LWNvbG9yOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdncmF5cycsIDgwMCksXG5cbiAgICAgICAgZ2hvc3QtaGVhZGVyLXRleHQtY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgNjAwKSxcbiAgICAgICAgZ2hvc3QtaGVhZGVyLWljb24tY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJyksXG4gICAgICAgIGdob3N0LWhlYWRlci1iYWNrZ3JvdW5kOiAjZmZmLFxuXG4gICAgICAgIHJvdy1vZGQtYmFja2dyb3VuZDogI2ZmZixcbiAgICAgICAgcm93LWV2ZW4tYmFja2dyb3VuZDogI2ZmZixcbiAgICAgICAgcm93LW9kZC10ZXh0LWNvbG9yOiBpbmhlcml0LFxuICAgICAgICByb3ctZXZlbi10ZXh0LWNvbG9yOiBpbmhlcml0LFxuICAgICAgICByb3ctc2VsZWN0ZWQtYmFja2dyb3VuZDogaGV4cmdiYShpZ3gtY29sb3IoJHBhbGV0dGUsICdncmF5cycsIDgwMCkpLFxuICAgICAgICByb3ctc2VsZWN0ZWQtdGV4dC1jb2xvcjogaWd4LWNvbnRyYXN0LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCA4MDApLFxuICAgICAgICByb3ctaG92ZXItYmFja2dyb3VuZDogaGV4cmdiYShpZ3gtY29sb3IoJHBhbGV0dGUsICdncmF5cycsIDIwMCkpLFxuICAgICAgICByb3ctaG92ZXItdGV4dC1jb2xvcjogaWd4LWNvbnRyYXN0LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCAyMDApLFxuICAgICAgICByb3ctYm9yZGVyLWNvbG9yOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdncmF5cycsIDMwMCksXG5cbiAgICAgICAgcGlubmVkLWJvcmRlci13aWR0aDogMnB4LFxuICAgICAgICBwaW5uZWQtYm9yZGVyLXN0eWxlOiBzb2xpZCxcbiAgICAgICAgcGlubmVkLWJvcmRlci1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCA0MDApLFxuXG4gICAgICAgIGNlbGwtc2VsZWN0ZWQtYmFja2dyb3VuZDogaWd4LWNvbG9yKCRwYWxldHRlLCAncHJpbWFyeScpLFxuICAgICAgICBjZWxsLXNlbGVjdGVkLXRleHQtY29sb3I6IGlneC1jb250cmFzdC1jb2xvcigkcGFsZXR0ZSwgJ3ByaW1hcnknKSxcbiAgICAgICAgY2VsbC1lZGl0aW5nLWJhY2tncm91bmQ6ICNmZmYsXG5cbiAgICAgICAgZWRpdC1tb2RlLWNvbG9yOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdzZWNvbmRhcnknKSxcbiAgICAgICAgZWRpdGVkLXJvdy1pbmRpY2F0b3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgNDAwKSxcbiAgICAgICAgY2VsbC1lZGl0ZWQtdmFsdWUtY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgNjAwKSxcblxuICAgICAgICByZXNpemUtbGluZS1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnc2Vjb25kYXJ5JyksXG5cbiAgICAgICAgZHJvcC1pbmRpY2F0b3ItY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ3NlY29uZGFyeScpLFxuXG4gICAgICAgIGdyb3VwYXJlYS1iYWNrZ3JvdW5kOiBoZXhyZ2JhKGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgMTAwKSksXG5cbiAgICAgICAgZ3JvdXAtbGFiZWwtY29sdW1uLW5hbWUtdGV4dDogaWd4LWNvbG9yKCRwYWxldHRlLCAncHJpbWFyeScsIDUwMCksXG4gICAgICAgIGdyb3VwLWxhYmVsLWljb246IGlneC1jb2xvcigkcGFsZXR0ZSwgJ3ByaW1hcnknLCA1MDApLFxuICAgICAgICBncm91cC1sYWJlbC10ZXh0OiBpZ3gtY29sb3IoJHBhbGV0dGUsICdncmF5cycsIDgwMCksXG4gICAgICAgIGV4cGFuZC1hbGwtaWNvbi1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCA2MDApLFxuICAgICAgICBleHBhbmQtYWxsLWljb24taG92ZXItY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgODAwKSxcblxuICAgICAgICBleHBhbmQtaWNvbi1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCA2MDApLFxuICAgICAgICBleHBhbmQtaWNvbi1ob3Zlci1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAncHJpbWFyeScpLFxuICAgICAgICBhY3RpdmUtZXhwYW5kLWljb24tY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgNTAwKSxcbiAgICAgICAgYWN0aXZlLWV4cGFuZC1pY29uLWhvdmVyLWNvbG9yOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdwcmltYXJ5JyksXG5cbiAgICAgICAgZ3JvdXAtY291bnQtYmFja2dyb3VuZDogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCAyMDApLFxuICAgICAgICBncm91cC1jb3VudC10ZXh0LWNvbG9yOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdncmF5cycsIDYwMCksXG5cbiAgICAgICAgZHJvcC1hcmVhLXRleHQtY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgNjAwKSxcbiAgICAgICAgZHJvcC1hcmVhLWljb24tY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJyksXG4gICAgICAgIGRyb3AtYXJlYS1iYWNrZ3JvdW5kOiBpZ3gtY29sb3IoJHBhbGV0dGUsIGdyYXlzLCAxMDApLFxuICAgICAgICBkcm9wLWFyZWEtb24tZHJvcC1iYWNrZ3JvdW5kOiBpZ3gtY29sb3IoJHBhbGV0dGUsIGdyYXlzLCAyMDApLFxuXG4gICAgICAgIGdyb3VwLXJvdy1iYWNrZ3JvdW5kOiBoZXhyZ2JhKGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgMTAwKSksXG4gICAgICAgIGdyb3VwLXJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kOiBoZXhyZ2JhKGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgMjAwKSksXG5cbiAgICAgICAgZmlsdGVyaW5nLWhlYWRlci1iYWNrZ3JvdW5kOiAjZmZmLFxuICAgICAgICBmaWx0ZXJpbmctaGVhZGVyLXRleHQtY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgODAwKSxcbiAgICAgICAgZmlsdGVyaW5nLXJvdy1iYWNrZ3JvdW5kOiAjZmZmLFxuICAgICAgICBmaWx0ZXJpbmctcm93LXRleHQtY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgODAwKSxcbiAgICAgICAgdHJlZS1maWx0ZXJlZC10ZXh0LWNvbG9yOiBpZ3gtY29sb3IoJHBhbGV0dGUsIGdyYXlzLCA1MDApXG4gICAgKTtcblxuICAgIEBpZiAkcHJlc2V0IHtcbiAgICAgICAgJGRlZmF1bHQtdGhlbWU6IG1hcC1nZXQoJHByZXNldCwgbWFwLWdldCgkZGVmYXVsdC10aGVtZSwgJ25hbWUnKSk7XG4gICAgfVxuXG4gICAgJHRyZWUtc2VsZWN0ZWQtZmlsdGVyZWQtcm93LXRleHQtY29sb3I6IHJnYmEodGV4dC1jb250cmFzdChtYXAtZ2V0KCRkZWZhdWx0LXRoZW1lLCAncm93LXNlbGVjdGVkLWJhY2tncm91bmQnKSksIC41KTtcbiAgICAkdHJlZS1zZWxlY3RlZC1maWx0ZXJlZC1jZWxsLXRleHQtY29sb3I6IHJnYmEodGV4dC1jb250cmFzdChtYXAtZ2V0KCRkZWZhdWx0LXRoZW1lLCAnY2VsbC1zZWxlY3RlZC1iYWNrZ3JvdW5kJykpLCAuNSk7XG5cbiAgICBAaWYgbm90KCRnaG9zdC1oZWFkZXItaWNvbi1jb2xvcikgYW5kICRnaG9zdC1oZWFkZXItYmFja2dyb3VuZCB7XG4gICAgICAgICRnaG9zdC1oZWFkZXItaWNvbi1jb2xvcjogcmdiYSh0ZXh0LWNvbnRyYXN0KCRnaG9zdC1oZWFkZXItYmFja2dyb3VuZCksIC4wNyk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZ2hvc3QtaGVhZGVyLXRleHQtY29sb3IpIGFuZCAkZ2hvc3QtaGVhZGVyLWJhY2tncm91bmQge1xuICAgICAgICAkZ2hvc3QtaGVhZGVyLXRleHQtY29sb3I6IHRleHQtY29udHJhc3QoJGdob3N0LWhlYWRlci1iYWNrZ3JvdW5kKTtcbiAgICB9XG5cbiAgICBAaWYgbm90KCRoZWFkZXItdGV4dC1jb2xvcikgYW5kICRoZWFkZXItYmFja2dyb3VuZCB7XG4gICAgICAgICRoZWFkZXItdGV4dC1jb2xvcjogdGV4dC1jb250cmFzdCgkaGVhZGVyLWJhY2tncm91bmQpO1xuICAgIH1cblxuICAgIEBpZiBub3QoJGhlYWRlci1ib3JkZXItY29sb3IpIGFuZCAkaGVhZGVyLWJhY2tncm91bmQge1xuICAgICAgICAkaGVhZGVyLWJvcmRlci1jb2xvcjogcmdiYSh0ZXh0LWNvbnRyYXN0KCRoZWFkZXItYmFja2dyb3VuZCksIC4yNCk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkY29udGVudC10ZXh0LWNvbG9yKSBhbmQgJGNvbnRlbnQtYmFja2dyb3VuZCB7XG4gICAgICAgICRjb250ZW50LXRleHQtY29sb3I6IHRleHQtY29udHJhc3QoJGNvbnRlbnQtYmFja2dyb3VuZCk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkcm93LW9kZC1iYWNrZ3JvdW5kKSBhbmQgJGNvbnRlbnQtYmFja2dyb3VuZCB7XG4gICAgICAgICRyb3ctb2RkLWJhY2tncm91bmQ6ICRjb250ZW50LWJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkcm93LWV2ZW4tYmFja2dyb3VuZCkgYW5kICRjb250ZW50LWJhY2tncm91bmQge1xuICAgICAgICAkcm93LWV2ZW4tYmFja2dyb3VuZDogJGNvbnRlbnQtYmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICBAaWYgbm90KCRyb3ctb2RkLXRleHQtY29sb3IpIGFuZCAkcm93LW9kZC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJHJvdy1vZGQtdGV4dC1jb2xvcjogdGV4dC1jb250cmFzdCgkcm93LW9kZC1iYWNrZ3JvdW5kKTtcbiAgICB9XG5cbiAgICBAaWYgbm90KCRyb3ctZXZlbi10ZXh0LWNvbG9yKSBhbmQgJHJvdy1ldmVuLWJhY2tncm91bmQge1xuICAgICAgICAkcm93LWV2ZW4tdGV4dC1jb2xvcjogdGV4dC1jb250cmFzdCgkcm93LWV2ZW4tYmFja2dyb3VuZCk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkcm93LWhvdmVyLWJhY2tncm91bmQpIGFuZCAkY29udGVudC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJHJvdy1ob3Zlci1iYWNrZ3JvdW5kOiByZ2JhKHRleHQtY29udHJhc3QoJGNvbnRlbnQtYmFja2dyb3VuZCksIC4wOClcbiAgICB9XG5cbiAgICBAaWYgbm90KCRyb3ctaG92ZXItdGV4dC1jb2xvcikgYW5kICRyb3ctaG92ZXItYmFja2dyb3VuZCB7XG4gICAgICAgICRyb3ctaG92ZXItdGV4dC1jb2xvcjogdGV4dC1jb250cmFzdCgkcm93LWhvdmVyLWJhY2tncm91bmQpO1xuICAgIH1cblxuICAgIEBpZiBub3QoJGNlbGwtc2VsZWN0ZWQtdGV4dC1jb2xvcikgYW5kICRjZWxsLXNlbGVjdGVkLWJhY2tncm91bmQge1xuICAgICAgICAkY2VsbC1zZWxlY3RlZC10ZXh0LWNvbG9yOiB0ZXh0LWNvbnRyYXN0KCRjZWxsLXNlbGVjdGVkLWJhY2tncm91bmQpO1xuICAgIH1cblxuICAgIEBpZiBub3QoJHJvdy1zZWxlY3RlZC10ZXh0LWNvbG9yKSBhbmQgJHJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJHJvdy1zZWxlY3RlZC10ZXh0LWNvbG9yOiAkcm93LXNlbGVjdGVkLWJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkcm93LWJvcmRlci1jb2xvcikgYW5kICRjb250ZW50LWJhY2tncm91bmQge1xuICAgICAgICAkcm93LWJvcmRlci1jb2xvcjogcmdiYSh0ZXh0LWNvbnRyYXN0KCRjb250ZW50LWJhY2tncm91bmQpLCAuMDgpXG4gICAgfVxuXG4gICAgQGlmIG5vdCgkcGlubmVkLWJvcmRlci1jb2xvcikgYW5kICRjb250ZW50LWJhY2tncm91bmQge1xuICAgICAgICAkcGlubmVkLWJvcmRlci1jb2xvcjogcmdiYSh0ZXh0LWNvbnRyYXN0KCRjb250ZW50LWJhY2tncm91bmQpLCAuMDgpXG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZ3JvdXAtcm93LWJhY2tncm91bmQpIGFuZCAkaGVhZGVyLWJhY2tncm91bmQge1xuICAgICAgICAkZ3JvdXAtcm93LWJhY2tncm91bmQ6ICRoZWFkZXItYmFja2dyb3VuZFxuICAgIH1cblxuICAgIEBpZiBub3QoJGV4cGFuZC1pY29uLWNvbG9yKSBhbmQgJGdyb3VwLXJvdy1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJGV4cGFuZC1pY29uLWNvbG9yOiB0ZXh0LWNvbnRyYXN0KCRncm91cC1yb3ctYmFja2dyb3VuZClcbiAgICB9XG5cbiAgICBAaWYgbm90KCRncm91cC1sYWJlbC10ZXh0KSBhbmQgJGdyb3VwLXJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJGdyb3VwLWxhYmVsLXRleHQ6IHRleHQtY29udHJhc3QoJGdyb3VwLXJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kKVxuICAgIH1cblxuICAgIEBpZiBub3QoJGV4cGFuZC1pY29uLWNvbG9yKSBhbmQgJGdyb3VwLXJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJGV4cGFuZC1pY29uLWNvbG9yOiB0ZXh0LWNvbnRyYXN0KCRncm91cC1yb3ctc2VsZWN0ZWQtYmFja2dyb3VuZClcbiAgICB9XG5cbiAgICBAaWYgbm90KCRncm91cC1jb3VudC1iYWNrZ3JvdW5kKSBhbmQgJGdyb3VwLXJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJGdyb3VwLWNvdW50LWJhY2tncm91bmQ6IHRleHQtY29udHJhc3QoJGdyb3VwLXJvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kKTtcbiAgICB9XG5cbiAgICBAaWYgbm90KCRleHBhbmQtYWxsLWljb24tY29sb3IpIGFuZCAkaGVhZGVyLWJhY2tncm91bmQge1xuICAgICAgICAkZXhwYW5kLWFsbC1pY29uLWNvbG9yOiByZ2JhKHRleHQtY29udHJhc3QoJGhlYWRlci1iYWNrZ3JvdW5kKSwgLjg3KTtcbiAgICB9XG5cbiAgICBAaWYgbm90KCRleHBhbmQtYWxsLWljb24taG92ZXItY29sb3IpIGFuZCAkaGVhZGVyLWJhY2tncm91bmQge1xuICAgICAgICAkZXhwYW5kLWFsbC1pY29uLWhvdmVyLWNvbG9yOiB0ZXh0LWNvbnRyYXN0KCRoZWFkZXItYmFja2dyb3VuZCk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZ3JvdXAtbGFiZWwtdGV4dCkgYW5kICRncm91cC1yb3ctYmFja2dyb3VuZCB7XG4gICAgICAgICRncm91cC1sYWJlbC10ZXh0OiB0ZXh0LWNvbnRyYXN0KCRncm91cC1yb3ctYmFja2dyb3VuZClcbiAgICB9XG5cbiAgICBAaWYgbm90KCRncm91cC1jb3VudC1iYWNrZ3JvdW5kKSBhbmQgJGdyb3VwLXJvdy1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJGdyb3VwLWNvdW50LWJhY2tncm91bmQ6IHRleHQtY29udHJhc3QoJGdyb3VwLXJvdy1iYWNrZ3JvdW5kKTtcbiAgICB9XG5cbiAgICBAaWYgbm90KCRncm91cC1jb3VudC10ZXh0LWNvbG9yKSBhbmQgJGdyb3VwLWNvdW50LWJhY2tncm91bmQge1xuICAgICAgICAkZ3JvdXAtY291bnQtdGV4dC1jb2xvcjogdGV4dC1jb250cmFzdCgkZ3JvdXAtY291bnQtYmFja2dyb3VuZCk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZ3JvdXBhcmVhLWJhY2tncm91bmQpIGFuZCAkaGVhZGVyLWJhY2tncm91bmQge1xuICAgICAgICAkZ3JvdXBhcmVhLWJhY2tncm91bmQ6ICRoZWFkZXItYmFja2dyb3VuZFxuICAgIH1cblxuICAgIEBpZiBub3QoJGRyb3AtYXJlYS1iYWNrZ3JvdW5kKSBhbmQgJGdyb3VwYXJlYS1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJGRyb3AtYXJlYS1iYWNrZ3JvdW5kOiB0ZXh0LWNvbnRyYXN0KCRncm91cGFyZWEtYmFja2dyb3VuZCk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZHJvcC1hcmVhLW9uLWRyb3AtYmFja2dyb3VuZCkgYW5kICRkcm9wLWFyZWEtYmFja2dyb3VuZCB7XG4gICAgICAgICRkcm9wLWFyZWEtb24tZHJvcC1iYWNrZ3JvdW5kOiAkZHJvcC1hcmVhLWJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZHJvcC1hcmVhLXRleHQtY29sb3IpIGFuZCAkZHJvcC1hcmVhLWJhY2tncm91bmQge1xuICAgICAgICAkZHJvcC1hcmVhLXRleHQtY29sb3I6IHRleHQtY29udHJhc3QoJGRyb3AtYXJlYS1iYWNrZ3JvdW5kKVxuICAgIH1cblxuICAgIEBpZiBub3QoJGZpbHRlcmluZy1oZWFkZXItYmFja2dyb3VuZCkgYW5kICRoZWFkZXItYmFja2dyb3VuZCB7XG4gICAgICAgIEBpZiBsdW1pbmFuY2UoJGhlYWRlci1iYWNrZ3JvdW5kKSA8IC41IHtcbiAgICAgICAgICAgICRmaWx0ZXJpbmctaGVhZGVyLWJhY2tncm91bmQ6IGxpZ2h0ZW4oJGhlYWRlci1iYWNrZ3JvdW5kLCAyNSUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZmlsdGVyaW5nLWhlYWRlci10ZXh0LWNvbG9yKSBhbmQgJGZpbHRlcmluZy1oZWFkZXItYmFja2dyb3VuZCB7XG4gICAgICAgICRmaWx0ZXJpbmctaGVhZGVyLXRleHQtY29sb3I6IHRleHQtY29udHJhc3QoaGV4cmdiYSgkZmlsdGVyaW5nLWhlYWRlci1iYWNrZ3JvdW5kKSk7XG4gICAgfVxuXG4gICAgQGlmIG5vdCgkZmlsdGVyaW5nLXJvdy1iYWNrZ3JvdW5kKSBhbmQgJGhlYWRlci1iYWNrZ3JvdW5kIHtcbiAgICAgICAgQGlmIGx1bWluYW5jZSgkaGVhZGVyLWJhY2tncm91bmQpIDwgLjUge1xuICAgICAgICAgICAgJGZpbHRlcmluZy1yb3ctYmFja2dyb3VuZDogbGlnaHRlbigkaGVhZGVyLWJhY2tncm91bmQsIDI1JSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAaWYgbm90KCRmaWx0ZXJpbmctcm93LXRleHQtY29sb3IpIGFuZCAkZmlsdGVyaW5nLXJvdy1iYWNrZ3JvdW5kIHtcbiAgICAgICAgJGZpbHRlcmluZy1yb3ctdGV4dC1jb2xvcjogdGV4dC1jb250cmFzdChoZXhyZ2JhKCRmaWx0ZXJpbmctcm93LWJhY2tncm91bmQpKTtcbiAgICB9XG5cbiAgICBAcmV0dXJuIGV4dGVuZCgkZGVmYXVsdC10aGVtZSwgKFxuICAgICAgICBwYWxldHRlOiAkcGFsZXR0ZSxcblxuICAgICAgICBoZWFkZXItYmFja2dyb3VuZDogJGhlYWRlci1iYWNrZ3JvdW5kLFxuICAgICAgICBoZWFkZXItdGV4dC1jb2xvcjogJGhlYWRlci10ZXh0LWNvbG9yLFxuICAgICAgICBoZWFkZXItYm9yZGVyLXdpZHRoOiAkaGVhZGVyLWJvcmRlci13aWR0aCxcbiAgICAgICAgaGVhZGVyLWJvcmRlci1zdHlsZTogJGhlYWRlci1ib3JkZXItc3R5bGUsXG4gICAgICAgIGhlYWRlci1ib3JkZXItY29sb3I6ICRoZWFkZXItYm9yZGVyLWNvbG9yLFxuXG4gICAgICAgIGdob3N0LWhlYWRlci10ZXh0LWNvbG9yOiAkZ2hvc3QtaGVhZGVyLXRleHQtY29sb3IsXG4gICAgICAgIGdob3N0LWhlYWRlci1pY29uLWNvbG9yOiAkZ2hvc3QtaGVhZGVyLWljb24tY29sb3IsXG4gICAgICAgIGdob3N0LWhlYWRlci1iYWNrZ3JvdW5kOiAkZ2hvc3QtaGVhZGVyLWJhY2tncm91bmQsXG5cbiAgICAgICAgY29udGVudC1iYWNrZ3JvdW5kOiAkY29udGVudC1iYWNrZ3JvdW5kLFxuICAgICAgICBjb250ZW50LXRleHQtY29sb3I6ICRjb250ZW50LXRleHQtY29sb3IsXG5cbiAgICAgICAgcm93LW9kZC1iYWNrZ3JvdW5kOiAkcm93LW9kZC1iYWNrZ3JvdW5kLFxuICAgICAgICByb3ctZXZlbi1iYWNrZ3JvdW5kOiAkcm93LWV2ZW4tYmFja2dyb3VuZCxcbiAgICAgICAgcm93LW9kZC10ZXh0LWNvbG9yOiAkcm93LW9kZC10ZXh0LWNvbG9yLFxuICAgICAgICByb3ctZXZlbi10ZXh0LWNvbG9yOiAkcm93LWV2ZW4tdGV4dC1jb2xvcixcbiAgICAgICAgcm93LXNlbGVjdGVkLWJhY2tncm91bmQ6ICRyb3ctc2VsZWN0ZWQtYmFja2dyb3VuZCxcbiAgICAgICAgcm93LXNlbGVjdGVkLXRleHQtY29sb3I6ICRyb3ctc2VsZWN0ZWQtdGV4dC1jb2xvcixcbiAgICAgICAgcm93LWhvdmVyLWJhY2tncm91bmQ6ICRyb3ctaG92ZXItYmFja2dyb3VuZCxcbiAgICAgICAgcm93LWhvdmVyLXRleHQtY29sb3I6ICRyb3ctaG92ZXItdGV4dC1jb2xvcixcbiAgICAgICAgcm93LWJvcmRlci1jb2xvcjogJHJvdy1ib3JkZXItY29sb3IsXG5cbiAgICAgICAgcGlubmVkLWJvcmRlci13aWR0aDogJHBpbm5lZC1ib3JkZXItd2lkdGgsXG4gICAgICAgIHBpbm5lZC1ib3JkZXItc3R5bGU6ICRwaW5uZWQtYm9yZGVyLXN0eWxlLFxuICAgICAgICBwaW5uZWQtYm9yZGVyLWNvbG9yOiAkcGlubmVkLWJvcmRlci1jb2xvcixcblxuICAgICAgICBjZWxsLXNlbGVjdGVkLWJhY2tncm91bmQ6ICRjZWxsLXNlbGVjdGVkLWJhY2tncm91bmQsXG4gICAgICAgIGNlbGwtZWRpdGluZy1iYWNrZ3JvdW5kOiAkY2VsbC1lZGl0aW5nLWJhY2tncm91bmQsXG4gICAgICAgIGNlbGwtc2VsZWN0ZWQtdGV4dC1jb2xvcjogJGNlbGwtc2VsZWN0ZWQtdGV4dC1jb2xvcixcblxuICAgICAgICBlZGl0LW1vZGUtcm93LWJvcmRlci1jb2xvcjogJGVkaXQtbW9kZS1jb2xvcixcbiAgICAgICAgZWRpdGVkLXJvdy1pbmRpY2F0b3I6ICRlZGl0ZWQtcm93LWluZGljYXRvcixcbiAgICAgICAgY2VsbC1lZGl0ZWQtdmFsdWUtY29sb3I6ICRjZWxsLWVkaXRlZC12YWx1ZS1jb2xvcixcblxuICAgICAgICByZXNpemUtbGluZS1jb2xvcjogJHJlc2l6ZS1saW5lLWNvbG9yLFxuXG4gICAgICAgIGRyb3AtaW5kaWNhdG9yLWNvbG9yOiAkZHJvcC1pbmRpY2F0b3ItY29sb3IsXG5cbiAgICAgICAgZ3JvdXBhcmVhLWJhY2tncm91bmQ6ICRncm91cGFyZWEtYmFja2dyb3VuZCxcbiAgICAgICAgZ3JvdXAtbGFiZWwtY29sdW1uLW5hbWUtdGV4dDogJGdyb3VwLWxhYmVsLWNvbHVtbi1uYW1lLXRleHQsXG4gICAgICAgIGdyb3VwLWxhYmVsLWljb246ICRncm91cC1sYWJlbC1pY29uLFxuICAgICAgICBncm91cC1sYWJlbC10ZXh0OiAkZ3JvdXAtbGFiZWwtdGV4dCxcblxuICAgICAgICBleHBhbmQtYWxsLWljb24tY29sb3I6ICRleHBhbmQtYWxsLWljb24tY29sb3IsXG4gICAgICAgIGV4cGFuZC1hbGwtaWNvbi1ob3Zlci1jb2xvcjogJGV4cGFuZC1hbGwtaWNvbi1ob3Zlci1jb2xvcixcblxuICAgICAgICBleHBhbmQtaWNvbi1jb2xvcjogJGV4cGFuZC1pY29uLWNvbG9yLFxuICAgICAgICBleHBhbmQtaWNvbi1ob3Zlci1jb2xvcjogJGV4cGFuZC1pY29uLWhvdmVyLWNvbG9yLFxuICAgICAgICBhY3RpdmUtZXhwYW5kLWljb24tY29sb3I6ICRhY3RpdmUtZXhwYW5kLWljb24tY29sb3IsXG4gICAgICAgIGFjdGl2ZS1leHBhbmQtaWNvbi1ob3Zlci1jb2xvcjogJGFjdGl2ZS1leHBhbmQtaWNvbi1ob3Zlci1jb2xvcixcblxuICAgICAgICBncm91cC1jb3VudC1iYWNrZ3JvdW5kOiAkZ3JvdXAtY291bnQtYmFja2dyb3VuZCxcbiAgICAgICAgZ3JvdXAtY291bnQtdGV4dC1jb2xvcjogJGdyb3VwLWNvdW50LXRleHQtY29sb3IsXG5cbiAgICAgICAgZ3JvdXAtcm93LWJhY2tncm91bmQ6ICRncm91cC1yb3ctYmFja2dyb3VuZCxcblxuICAgICAgICBkcm9wLWFyZWEtdGV4dC1jb2xvcjogJGRyb3AtYXJlYS10ZXh0LWNvbG9yLFxuICAgICAgICBkcm9wLWFyZWEtaWNvbi1jb2xvcjogJGRyb3AtYXJlYS1pY29uLWNvbG9yLFxuICAgICAgICBkcm9wLWFyZWEtb24tZHJvcC1iYWNrZ3JvdW5kOiAkZHJvcC1hcmVhLW9uLWRyb3AtYmFja2dyb3VuZCxcbiAgICAgICAgZHJvcC1hcmVhLWJhY2tncm91bmQ6ICRkcm9wLWFyZWEtYmFja2dyb3VuZCxcblxuICAgICAgICBmaWx0ZXJpbmctaGVhZGVyLWJhY2tncm91bmQ6ICRmaWx0ZXJpbmctaGVhZGVyLWJhY2tncm91bmQsXG4gICAgICAgIGZpbHRlcmluZy1oZWFkZXItdGV4dC1jb2xvcjogJGZpbHRlcmluZy1oZWFkZXItdGV4dC1jb2xvcixcbiAgICAgICAgZmlsdGVyaW5nLXJvdy1iYWNrZ3JvdW5kOiAkZmlsdGVyaW5nLXJvdy1iYWNrZ3JvdW5kLFxuICAgICAgICBmaWx0ZXJpbmctcm93LXRleHQtY29sb3I6ICRmaWx0ZXJpbmctcm93LXRleHQtY29sb3IsXG5cbiAgICAgICAgdHJlZS1maWx0ZXJlZC10ZXh0LWNvbG9yOiAkdHJlZS1maWx0ZXJlZC10ZXh0LWNvbG9yLFxuICAgICAgICB0cmVlLXNlbGVjdGVkLWZpbHRlcmVkLXJvdy10ZXh0LWNvbG9yOiAkdHJlZS1zZWxlY3RlZC1maWx0ZXJlZC1yb3ctdGV4dC1jb2xvcixcbiAgICAgICAgdHJlZS1zZWxlY3RlZC1maWx0ZXJlZC1jZWxsLXRleHQtY29sb3I6ICR0cmVlLXNlbGVjdGVkLWZpbHRlcmVkLWNlbGwtdGV4dC1jb2xvclxuICAgICkpO1xufVxuXG4vLy8gQHBhcmFtIHtNYXB9ICR0aGVtZSAtIFRoZSB0aGVtZSB1c2VkIHRvIHN0eWxlIHRoZSBjb21wb25lbnQuXG4vLy8gQHJlcXVpcmVzIHttaXhpbn0gaWd4LXJvb3QtY3NzLXZhcnNcbi8vLyBAcmVxdWlyZXMge21peGlufSBlbGxpcHNpc1xuLy8vIEByZXF1aXJlcyBpZ3gtY29sb3Jcbi8vLyBAcmVxdWlyZXMgaWd4LWNvbnRyYXN0LWNvbG9yXG4vLy8gQHJlcXVpcmVzIGlneC1lbGV2YXRpb25cbi8vLyBAcmVxdWlyZXMgJGVsZXZhdGlvbnNcbi8vLyBAcmVxdWlyZXMgcmVtXG4vLy8gQHJlcXVpcmVzIC0tdmFyXG5AbWl4aW4gaWd4LWdyaWQoJHRoZW1lKSB7XG4gICAgQGluY2x1ZGUgaWd4LXJvb3QtY3NzLXZhcnMoJHRoZW1lKTtcblxuICAgICRwYWxldHRlOiBtYXAtZ2V0KCR0aGVtZSwgJ3BhbGV0dGUnKTtcbiAgICAvLyBAZGVidWcgJHRoZW1lO1xuXG4gICAgJGdyaWQtYnI6IDJweDtcbiAgICAkZ3JpZC1zaGFkb3c6IGlneC1lbGV2YXRpb24oJGVsZXZhdGlvbnMsIDIpO1xuXG4gICAgJGdyaWQtY2FwdGlvbi1mczogcmVtKDIwcHgpO1xuICAgICRncmlkLWNhcHRpb24tbGg6IHJlbSgzMnB4KTtcbiAgICAkZ3JpZC1jYXB0aW9uLXBhZGRpbmc6IHJlbSgxNnB4KSByZW0oMjRweCk7XG5cbiAgICAkZ3JpZC1oZWFkLWZzOiByZW0oMTJweCk7XG4gICAgJGdyaWQtaGVhZC1mdzogNjAwO1xuICAgICR0cmFuc2l0aW9uOiBhbGwgMTIwbXMgJGVhc2UtaW4tb3V0LWN1YmljO1xuXG4gICAgLy8gQ2VsbFxuICAgICRncmlkLWNlbGwtYWxpZ24tbnVtOiByaWdodDtcbiAgICAkZ3JpZC1jZWxsLWZzOiByZW0oMTNweCk7XG4gICAgJGdyaWQtY2VsbC1saDogcmVtKDE2cHgpO1xuICAgICRncmlkLWNlbGwtcGlubmVkLXN0eWxlOiAxcHggc29saWQ7XG4gICAgJGdyaWQtY2VsbC1waW5uZWQtYm9yZGVyLWNvbG9yOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdncmF5cycsIDMwMCk7XG5cbiAgICAkZ3JpZC1oZWFkZXItYm9yZGVyOiAtLXZhcigkdGhlbWUsICdoZWFkZXItYm9yZGVyLXdpZHRoJykgLS12YXIoJHRoZW1lLCAnaGVhZGVyLWJvcmRlci1zdHlsZScpIC0tdmFyKCR0aGVtZSwgJ2hlYWRlci1ib3JkZXItY29sb3InKTtcblxuICAgICRjZWxsLXBpbjogKFxuICAgICAgICBzdHlsZTogLS12YXIoJHRoZW1lLCAncGlubmVkLWJvcmRlci13aWR0aCcpIC0tdmFyKCR0aGVtZSwgJ3Bpbm5lZC1ib3JkZXItc3R5bGUnKSxcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3Bpbm5lZC1ib3JkZXItY29sb3InKVxuICAgICk7XG5cbiAgICAkZ3JpZC1oZWFkZXItcGFkZGluZzogKFxuICAgICAgICBjb21mb3J0YWJsZTogMCByZW0oMjRweCksXG4gICAgICAgIGNvc3k6IDAgcmVtKDE2cHgpLFxuICAgICAgICBjb21wYWN0OiAwIHJlbSgxMnB4KVxuICAgICk7XG5cbiAgICAkZ3JpZC1oZWFkZXItaGVpZ2h0OiAoXG4gICAgICAgIGNvbWZvcnRhYmxlOiByZW0oNTBweCksXG4gICAgICAgIGNvc3k6IHJlbSg0MHB4KSxcbiAgICAgICAgY29tcGFjdDogcmVtKDMycHgpXG4gICAgKTtcblxuICAgICRkcm9wLWFyZWEtaGVpZ2h0OiAoXG4gICAgICAgIGNvbWZvcnRhYmxlOiByZW0oMzJweCksXG4gICAgICAgIGNvc3k6IHJlbSgyNHB4KSxcbiAgICAgICAgY29tcGFjdDogcmVtKDI0cHgpXG4gICAgKTtcblxuICAgICRkcm9wLWFyZWEtcGFkZGluZzogKFxuICAgICAgICBjb21mb3J0YWJsZTogMCByZW0oMTZweCksXG4gICAgICAgIGNvc3k6IDAgcmVtKDhweCksXG4gICAgICAgIGNvbXBhY3Q6IDAgcmVtKDZweClcbiAgICApO1xuXG4gICAgJGdyaWQtY2VsbC1wYWRkaW5nOiAoXG4gICAgICAgIGNvbWZvcnRhYmxlOiAwIHJlbSgyNHB4KSxcbiAgICAgICAgY29zeTogMCByZW0oMTZweCksXG4gICAgICAgIGNvbXBhY3Q6IDAgcmVtKDEycHgpXG4gICAgKTtcblxuICAgICRncm91cGFyZWEtcGFkZGluZzogKFxuICAgICAgICBjb21mb3J0YWJsZTogcmVtKDhweCkgcmVtKDI0cHgpLFxuICAgICAgICBjb3N5OiByZW0oOHB4KSByZW0oMTZweCksXG4gICAgICAgIGNvbXBhY3Q6IHJlbSg0cHgpIHJlbSgxMnB4KVxuICAgICk7XG5cbiAgICAkZ3JvdXBhcmVhLW1pbi1oZWlnaHQ6IChcbiAgICAgICAgY29tZm9ydGFibGU6IHJlbSg1N3B4KSxcbiAgICAgICAgY29zeTogcmVtKDQ5cHgpLFxuICAgICAgICBjb21wYWN0OiByZW0oNDFweClcbiAgICApO1xuXG4gICAgJGdyaWQtZ3JvdXBpbmctaW5kaWNhdG9yLXBhZGRpbmc6IChcbiAgICAgICAgY29tZm9ydGFibGU6IHJlbSgyNHB4KSxcbiAgICAgICAgY29zeTogcmVtKDE2cHgpLFxuICAgICAgICBjb21wYWN0OiByZW0oMTJweClcbiAgICApO1xuXG4gICAgJGluZGljYXRvci1pY29uLXdpZHRoOiByZW0oMjRweCk7XG4gICAgJGdyb3VwaW5nLXBhZGRpbmctcmlnaHQ6IHJlbSgxMnB4KTtcblxuICAgICVncmlkLWRpc3BsYXkge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvIGF1dG8gMWZyIGF1dG8gYXV0bztcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRncmlkLWJyO1xuICAgICAgICBib3gtc2hhZG93OiAkZ3JpZC1zaGFkb3c7XG4gICAgICAgIG91dGxpbmUtc3R5bGU6IG5vbmU7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHotaW5kZXg6IDA7XG5cbiAgICAgICAgJWNieC1kaXNwbGF5IHtcbiAgICAgICAgICAgIG1pbi13aWR0aDogcmVtKDIwcHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWQtY2FwdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogJGdyaWQtY2FwdGlvbi1mcztcbiAgICAgICAgbGluZS1oZWlnaHQ6ICRncmlkLWNhcHRpb24tbGg7XG4gICAgICAgIHBhZGRpbmc6ICRncmlkLWNhcHRpb24tcGFkZGluZztcbiAgICAgICAgZ3JpZC1yb3c6IDE7XG4gICAgfVxuXG4gICAgJWdyaWQtdGhlYWQsXG4gICAgJWdyaWQtdGZvb3Qge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kOiAtLXZhcigkdGhlbWUsICdoZWFkZXItYmFja2dyb3VuZCcpO1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnaGVhZGVyLXRleHQtY29sb3InKTtcblxuICAgICAgICAlZ3JpZC1yb3cge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgICAgei1pbmRleDogMjtcblxuICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICAgICAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICVncmlkLXRoZWFkIHtcbiAgICAgICAgZ3JpZC1yb3c6IDM7XG4gICAgICAgIGJvcmRlci1ib3R0b206ICRncmlkLWhlYWRlci1ib3JkZXI7XG4gICAgICAgIHotaW5kZXg6IDI7XG5cbiAgICAgICAgJWdyaWRfX2dyb3VwLWluZGVudGF0aW9uIHtcbiAgICAgICAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJWdyaWRfX2NieC1zZWxlY3Rpb24ge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogKG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbWZvcnRhYmxlJykgLSByZW0oMjBweCkpIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgICVncmlkLXJvdzpsYXN0LW9mLXR5cGUge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVncmlkLXRoZWFkLS1jb3N5IHtcbiAgICAgICAgJWdyaWRfX2NieC1zZWxlY3Rpb24ge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogKG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2Nvc3knKSAtIHJlbSgyMHB4KSkgLyAyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWQtdGhlYWQtLWNvbXBhY3Qge1xuICAgICAgICAlZ3JpZF9fY2J4LXNlbGVjdGlvbiB7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAobWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29tcGFjdCcpIC0gcmVtKDIwcHgpKSAvIDI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlZ3JpZC10aGVhZC10aXRsZSB7XG4gICAgICAgIGZsZXgtYmFzaXM6IGF1dG8gIWltcG9ydGFudDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlciAhaW1wb3J0YW50O1xuICAgICAgICBib3JkZXItYm90dG9tOiAkZ3JpZC1oZWFkZXItYm9yZGVyO1xuICAgICAgICBoZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbWZvcnRhYmxlJyk7XG4gICAgfVxuXG4gICAgJWdyaWQtdGhlYWQtdGl0bGUtLXBpbm5lZCB7XG4gICAgICAgIGJvcmRlci1yaWdodDogbWFwLWdldCgkY2VsbC1waW4sICdzdHlsZScpIG1hcC1nZXQoJGNlbGwtcGluLCAnY29sb3InKSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgICVncmlkLXRoZWFkLXRpdGxlLS1jb3N5IHtcbiAgICAgICAgaGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb3N5Jyk7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtY2VsbC1wYWRkaW5nLCAnY29zeScpO1xuICAgIH1cblxuICAgICVncmlkLXRoZWFkLXRpdGxlLS1jb21wYWN0IHtcbiAgICAgICAgaGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21wYWN0Jyk7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtY2VsbC1wYWRkaW5nLCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgICVncmlkLXRoZWFkLWdyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xuICAgIH1cblxuICAgIC8qIFdlIHNldCB0aG9zZSB3aXRoIHBvc2l0aW9uIHJlbGF0aXZlXG4gICAgc28gdGhhdCB0aGUgZHJvcCBpbmRpY2F0b3JzIGJlIHNjb3BlZFxuICAgIHRvIHRoZWlyIHJlc3BlY3RpdmUgZ3JvdXAuIFRoZSBpdGVtXG4gICAgYmVpbmcgdGhlIHRvcG1vc3QgZWxlbWVudCwgd2hpbGUgdGhlXG4gICAgc3ViZ3JvdXAgZW5jYXBzdWxhdGVzIGNoaWxkcmVuIG9mIGVhY2hcbiAgICB0aGVhZCBpdGVtIGFuZCBncm91cC5cbiAgICAqL1xuICAgICVncmlkLXRoZWFkLWl0ZW0sXG4gICAgJWdyaWQtdGhlYWQtc3ViZ3JvdXAge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgJWdyaWQtdGZvb3Qge1xuICAgICAgICBncmlkLXJvdzogNTtcbiAgICAgICAgYm9yZGVyLXRvcDogJGdyaWQtaGVhZGVyLWJvcmRlcjtcbiAgICAgICAgei1pbmRleDogMTAwMDE7XG4gICAgfVxuXG4gICAgJWdyaWQtZGlzcGxheS1jb250YWluZXItdGhlYWQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgfVxuXG4gICAgJWdyaWQtZGlzcGxheS1jb250YWluZXItdHIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgfVxuXG4gICAgJWdyaWQtdGJvZHkge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGdyaWQtcm93OiA0O1xuICAgICAgICBiYWNrZ3JvdW5kOiAtLXZhcigkdGhlbWUsICdjb250ZW50LWJhY2tncm91bmQnKTtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2NvbnRlbnQtdGV4dC1jb2xvcicpO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgIH1cblxuICAgICVncmlkLXRib2R5LW1lc3NhZ2Uge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnY29udGVudC10ZXh0LWNvbG9yJyk7XG4gICAgfVxuXG4gICAgJWdyaWQtc2Nyb2xsIHtcbiAgICAgICAgZ3JpZC1yb3c6IDY7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJhY2tncm91bmQ6IC0tdmFyKCR0aGVtZSwgJ2hlYWRlci1iYWNrZ3JvdW5kJyk7XG4gICAgICAgIHotaW5kZXg6IDEwMDAxO1xuICAgIH1cblxuICAgICVncmlkLXNjcm9sbC1zdGFydCB7XG4gICAgICAgIGJhY2tncm91bmQ6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgMjAwKTtcbiAgICB9XG5cbiAgICAlZ3JpZC1zY3JvbGwtbWFpbiB7XG4gICAgICAgIGlneC1kaXNwbGF5LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZ3gtaG9yaXpvbnRhbC12aXJ0dWFsLWhlbHBlciB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlZ3JpZC1yb3cge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtLXZhcigkdGhlbWUsICdjb250ZW50LWJhY2tncm91bmQnKTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIC0tdmFyKCR0aGVtZSwgJ3Jvdy1ib3JkZXItY29sb3InKTtcbiAgICAgICAgb3V0bGluZS1zdHlsZTogbm9uZTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogLS12YXIoJHRoZW1lLCAncm93LWhvdmVyLWJhY2tncm91bmQnKTtcbiAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdyb3ctaG92ZXItdGV4dC1jb2xvcicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWQtcm93LS1vZGQge1xuICAgICAgICBiYWNrZ3JvdW5kOiAtLXZhcigkdGhlbWUsICdyb3ctb2RkLWJhY2tncm91bmQnKTtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3Jvdy1vZGQtdGV4dC1jb2xvcicpO1xuICAgIH1cblxuICAgICVncmlkLXJvdy0tZXZlbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IC0tdmFyKCR0aGVtZSwgJ3Jvdy1ldmVuLWJhY2tncm91bmQnKTtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3Jvdy1ldmVuLXRleHQtY29sb3InKTtcbiAgICB9XG5cbiAgICAlZ3JpZC1yb3ctLXNlbGVjdGVkIHtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3Jvdy1zZWxlY3RlZC10ZXh0LWNvbG9yJyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3Jvdy1zZWxlY3RlZC1iYWNrZ3JvdW5kJyk7XG5cbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtLXZhcigkdGhlbWUsICdyb3ctc2VsZWN0ZWQtYmFja2dyb3VuZCcpO1xuICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3Jvdy1zZWxlY3RlZC10ZXh0LWNvbG9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWdyaWRfX3RyZWUtZ3JvdXBpbmctaW5kaWNhdG9yIHtcbiAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdyb3ctc2VsZWN0ZWQtdGV4dC1jb2xvcicpO1xuXG4gICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAncm93LXNlbGVjdGVkLXRleHQtY29sb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fdHItLWVkaXQge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgLS12YXIoJHRoZW1lLCAnZWRpdC1tb2RlLWNvbG9yJyk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgICAmOjphZnRlciB7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGhlaWdodDogcmVtKDEpO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB0b3A6IHJlbSgtMSk7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogLS12YXIoJHRoZW1lLCAnZWRpdC1tb2RlLWNvbG9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWdyaWRfX3RkLS1lZGl0aW5nIHtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcblxuICAgICAgICAgICAgJWZvcm0tZ3JvdXAtYnVuZGxlLS1mb2N1cyB7XG4gICAgICAgICAgICAgICAgY2FyZXQtY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2VkaXQtbW9kZS1jb2xvcicpICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICVmb3JtLWdyb3VwLWJvcmRlciB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogLS12YXIoJHRoZW1lLCAnZWRpdC1tb2RlLWNvbG9yJykgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fdHItLWVkaXRlZCB7XG4gICAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiByZW0oMik7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogLS12YXIoJHRoZW1lLCAnZWRpdGVkLXJvdy1pbmRpY2F0b3InKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVncmlkLXJvdy0tZ3JvdXAge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGJhY2tncm91bmQ6IC0tdmFyKCR0aGVtZSwgJ2hlYWRlci1iYWNrZ3JvdW5kJykgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWQtcm93LS1maWx0ZXJlZCB7XG4gICAgICAgICVncmlkLWNlbGwtdGV4dCB7XG4gICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAndHJlZS1maWx0ZXJlZC10ZXh0LWNvbG9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWdyaWRfX3RyZWUtZ3JvdXBpbmctaW5kaWNhdG9yIHtcbiAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICd0cmVlLWZpbHRlcmVkLXRleHQtY29sb3InKTtcblxuICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3RyZWUtZmlsdGVyZWQtdGV4dC1jb2xvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJWdyaWQtY2VsbC0tc2VsZWN0ZWQge1xuICAgICAgICAgICAgJWdyaWQtY2VsbC10ZXh0IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAndHJlZS1zZWxlY3RlZC1maWx0ZXJlZC1jZWxsLXRleHQtY29sb3InKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJWlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvciB7XG4gICAgICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3RyZWUtc2VsZWN0ZWQtZmlsdGVyZWQtY2VsbC10ZXh0LWNvbG9yJyk7XG5cbiAgICAgICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3RyZWUtc2VsZWN0ZWQtZmlsdGVyZWQtY2VsbC10ZXh0LWNvbG9yJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWQtcm93LS1zZWxlY3RlZC0tZmlsdGVyZWQge1xuICAgICAgICAlZ3JpZC1jZWxsLXRleHQge1xuICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3RyZWUtc2VsZWN0ZWQtZmlsdGVyZWQtcm93LXRleHQtY29sb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgICVpZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3RyZWUtc2VsZWN0ZWQtZmlsdGVyZWQtcm93LXRleHQtY29sb3InKTtcblxuICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3RyZWUtc2VsZWN0ZWQtZmlsdGVyZWQtcm93LXRleHQtY29sb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICVncmlkLWNlbGwtLXNlbGVjdGVkIHtcbiAgICAgICAgICAgICVncmlkLWNlbGwtdGV4dCB7XG4gICAgICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3RyZWUtc2VsZWN0ZWQtZmlsdGVyZWQtY2VsbC10ZXh0LWNvbG9yJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICVpZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICd0cmVlLXNlbGVjdGVkLWZpbHRlcmVkLWNlbGwtdGV4dC1jb2xvcicpO1xuXG4gICAgICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICd0cmVlLXNlbGVjdGVkLWZpbHRlcmVkLWNlbGwtdGV4dC1jb2xvcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fdHJlZS1ncm91cGluZy1pbmRpY2F0b3Ige1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIG91dGxpbmUtc3R5bGU6IG5vbmU7XG4gICAgICAgIG1hcmdpbi1yaWdodDogcmVtKDgpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2V4cGFuZC1pY29uLWNvbG9yJyk7XG5cbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZXhwYW5kLWljb24taG92ZXItY29sb3InKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWQtY2VsbC1kaXNwbGF5IHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4OiAxIDEgMCU7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG91dGxpbmUtc3R5bGU6IG5vbmU7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtY2VsbC1wYWRkaW5nLCAnY29tZm9ydGFibGUnKTtcbiAgICAgICAgZm9udC1zaXplOiAkZ3JpZC1jZWxsLWZzO1xuICAgICAgICBsaW5lLWhlaWdodDogJGdyaWQtY2VsbC1saDtcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX190ZC0tdHJlZS1jZWxsIHtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG5cbiAgICAlZ3JpZC1jZWxsLXRleHQge1xuICAgICAgICBAaW5jbHVkZSBlbGxpcHNpcygpO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtZGlzcGxheS0tY29zeSB7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtY2VsbC1wYWRkaW5nLCAnY29zeScpO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtZGlzcGxheS0tY29tcGFjdCB7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtY2VsbC1wYWRkaW5nLCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtLWZpeGVkLXdpZHRoIHtcbiAgICAgICAgLy8gcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBmbGV4LWdyb3c6IDA7XG4gICAgICAgIG91dGxpbmUtc3R5bGU6IG5vbmU7XG4gICAgfVxuXG4gICAgJWdyaWQtY2VsbC0tc2VsZWN0ZWQge1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnY2VsbC1zZWxlY3RlZC10ZXh0LWNvbG9yJyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2NlbGwtc2VsZWN0ZWQtYmFja2dyb3VuZCcpICFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDA7XG5cbiAgICAgICAgJWlneC1ncmlkX190cmVlLWdyb3VwaW5nLWluZGljYXRvciB7XG4gICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnY2VsbC1zZWxlY3RlZC10ZXh0LWNvbG9yJyk7XG5cbiAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdjZWxsLXNlbGVjdGVkLXRleHQtY29sb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fdGQtLWVkaXRlZCB7XG4gICAgICAgICVncmlkLWNlbGwtdGV4dCB7XG4gICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnY2VsbC1lZGl0ZWQtdmFsdWUtY29sb3InKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fdHItLWRlbGV0ZWQge1xuICAgICAgICAlZ3JpZC1jZWxsLXRleHQge1xuICAgICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICAgICAgY29sb3I6IGlneC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgJ3BhbGV0dGUnKSwgJ2Vycm9yJyk7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb24tbGluZTogbGluZS10aHJvdWdoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX190ZC0tZWRpdGluZyB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2NlbGwtZWRpdGluZy1iYWNrZ3JvdW5kJykgIWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyOiByZW0oMnB4KSBzb2xpZCAtLXZhcigkdGhlbWUsICdjZWxsLXNlbGVjdGVkLWJhY2tncm91bmQnKTtcblxuICAgICAgICBpZ3gtaW5wdXQtZ3JvdXAge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtMTZweDtcbiAgICAgICAgfVxuXG4gICAgICAgICVmb3JtLWdyb3VwLWlucHV0IHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBnbG9iYWwgdHlwb2dyYXBoeVxuICAgICAgICAgICAgZm9udC1zaXplOiAkZ3JpZC1jZWxsLWZzICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogJGdyaWQtY2VsbC1saCAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWQtY2VsbC0tcGlubmVkIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICB6LWluZGV4OiA5OTk5O1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtLXBpbm5lZC1sYXN0IHtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBtYXAtZ2V0KCRjZWxsLXBpbiwgJ3N0eWxlJykgbWFwLWdldCgkY2VsbC1waW4sICdjb2xvcicpICFpbXBvcnRhbnQ7XG5cbiAgICAgICAgJiVncmlkLWNlbGwtLWVkaXRpbmcge1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBtYXAtZ2V0KCRjZWxsLXBpbiwgJ3N0eWxlJykgLS12YXIoJHRoZW1lLCAnY2VsbC1zZWxlY3RlZC1iYWNrZ3JvdW5kJykgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVncmlkLWNlbGwtaGVhZGVyIHtcbiAgICAgICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgICAgZm9udC1zaXplOiAkZ3JpZC1oZWFkLWZzO1xuICAgICAgICBmb250LXdlaWdodDogJGdyaWQtaGVhZC1mdztcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBwYWRkaW5nOiBtYXAtZ2V0KCRncmlkLWhlYWRlci1wYWRkaW5nLCAnY29tZm9ydGFibGUnKTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAkZ3JpZC1oZWFkZXItYm9yZGVyO1xuICAgICAgICBvdXRsaW5lLXN0eWxlOiBub25lO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtaGVhZGVyLS1maWx0ZXJpbmcge1xuICAgICAgICBiYWNrZ3JvdW5kOiAtLXZhcigkdGhlbWUsICdmaWx0ZXJpbmctaGVhZGVyLWJhY2tncm91bmQnKTtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2ZpbHRlcmluZy1oZWFkZXItdGV4dC1jb2xvcicpO1xuICAgICAgICB6LWluZGV4OiAzO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtaGVhZGVyLS1jb3N5IHtcbiAgICAgICAgcGFkZGluZzogbWFwLWdldCgkZ3JpZC1oZWFkZXItcGFkZGluZywgJ2Nvc3knKTtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29zeScpO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtaGVhZGVyLS1jb21wYWN0IHtcbiAgICAgICAgcGFkZGluZzogbWFwLWdldCgkZ3JpZC1oZWFkZXItcGFkZGluZywgJ2NvbXBhY3QnKTtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtaGVhZGVyLXRpdGxlIHtcbiAgICAgICAgQGluY2x1ZGUgZWxsaXBzaXMoKTtcbiAgICAgICAgbWluLXdpZHRoOiAzY2g7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICBjdXJzb3I6IGluaXRpYWw7XG4gICAgICAgIGZsZXgtZ3JvdzogMTsgLyogaGV5IElFLCB0aGUgdGV4dCBzaG91bGQgdGFrZSBtb3N0IG9mIHRoZSBzcGFjZSAqL1xuICAgICAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbWZvcnRhYmxlJykgLyAkZ3JpZC1oZWFkLWZzO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtaGVhZGVyLXRpdGxlLS1jb3N5IHtcbiAgICAgICAgbGluZS1oZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2Nvc3knKSAvICRncmlkLWhlYWQtZnM7XG4gICAgfVxuXG4gICAgJWdyaWQtY2VsbC1oZWFkZXItdGl0bGUtLWNvbXBhY3Qge1xuICAgICAgICBsaW5lLWhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29tcGFjdCcpIC8gJGdyaWQtaGVhZC1mcztcbiAgICB9XG5cbiAgICAlZ3JpZC1jZWxsLWhlYWRlci1pY29ucyB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgbWluLXdpZHRoOiAxNXB4OyAvKiBzb3J0LWljb24gd2lkdGggKi9cbiAgICAgICAgaGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21mb3J0YWJsZScpO1xuICAgICAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcblxuICAgICAgICAmOmVtcHR5IHtcbiAgICAgICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zb3J0LWljb24ge1xuICAgICAgICAgICAgd2lkdGg6IHJlbSgxNXB4KTtcbiAgICAgICAgICAgIGhlaWdodDogcmVtKDE1cHgpO1xuICAgICAgICAgICAgbWluLXdpZHRoOiByZW0oMTVweCk7IC8qIHllYWggSUUsIGl0IHJlYWxseSBuZWVkcyB0byBiZSAxNXB4IHdpZGUuLi4gKi9cbiAgICAgICAgICAgIGZvbnQtc2l6ZTogcmVtKDE1cHgpO1xuICAgICAgICAgICAgY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ3NlY29uZGFyeScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWQtY2VsbC1oZWFkZXItaWNvbnMtLWNvc3kge1xuICAgICAgICBoZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2Nvc3knKTtcbiAgICB9XG5cbiAgICAlZ3JpZC1jZWxsLWhlYWRlci1pY29ucy0tY29tcGFjdCB7XG4gICAgICAgIGhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgICVncmlkLWNlbGwtbnVtYmVyIHtcbiAgICAgICAgdGV4dC1hbGlnbjogJGdyaWQtY2VsbC1hbGlnbi1udW07XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgICAgICAgJWdyaWQtY2VsbC1oZWFkZXItaWNvbnMge1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgb3JkZXI6IC0xO1xuXG4gICAgICAgICAgICAuc29ydC1pY29uIHtcbiAgICAgICAgICAgICAgICBvcmRlcjogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICVncmlkX19jYngtc2VsZWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLXBhZGRpbmcsICdjb21mb3J0YWJsZScpO1xuICAgICAgICBib3JkZXItcmlnaHQ6IC0tdmFyKCR0aGVtZSwgJ2hlYWRlci1ib3JkZXItd2lkdGgnKVxuICAgICAgICAgICAgLS12YXIoJHRoZW1lLCAnaGVhZGVyLWJvcmRlci1zdHlsZScpXG4gICAgICAgICAgICAtLXZhcigkdGhlbWUsICdoZWFkZXItYm9yZGVyLWNvbG9yJyk7XG4gICAgICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgfVxuXG4gICAgJWdyaWRfX2NieC1zZWxlY3Rpb24tLWNvc3kge1xuICAgICAgICBwYWRkaW5nOiBtYXAtZ2V0KCRncmlkLWhlYWRlci1wYWRkaW5nLCAnY29zeScpO1xuICAgIH1cblxuICAgICVncmlkX19jYngtc2VsZWN0aW9uLS1jb21wYWN0IHtcbiAgICAgICAgcGFkZGluZzogbWFwLWdldCgkZ3JpZC1oZWFkZXItcGFkZGluZywgJ2NvbXBhY3QnKTtcbiAgICB9XG5cbiAgICAlZ3JpZF9fcmVzaXplLWhhbmRsZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDRweDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogLTJweDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgIH1cblxuICAgICVncmlkX19yZXNpemUtbGluZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgY3Vyc29yOiBjb2wtcmVzaXplO1xuICAgICAgICB3aWR0aDogNHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtLXZhcigkdGhlbWUsICdyZXNpemUtbGluZS1jb2xvcicpO1xuICAgICAgICB6LWluZGV4OiAyO1xuXG4gICAgICAgICY6OmJlZm9yZSxcbiAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB3aWR0aDogOTZweDtcbiAgICAgICAgfVxuXG4gICAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgICAgICByaWdodDogMTAwJTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgICAgIGxlZnQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlZ3JpZC1zdW1tYXJpZXMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICAgIH1cblxuICAgICVncmlkLXN1bW1hcmllcy1wYXRjaCB7XG4gICAgICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICB9XG5cbiAgICAvLyBDb2x1bW4gbW92aW5nXG4gICAgJWlneC1ncmlkX190aC1kcm9wLWluZGljYXRvci1sZWZ0LFxuICAgICVpZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItcmlnaHQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxcHg7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItbGVmdCB7XG4gICAgICAgIGxlZnQ6IC0xcHg7XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX190aC1kcm9wLWluZGljYXRvci1yaWdodCB7XG4gICAgICAgIHJpZ2h0OiAtMXB4O1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fdGgtZHJvcC1pbmRpY2F0b3ItLWFjdGl2ZSB7XG4gICAgICAgICYlaWd4LWdyaWRfX3RoLWRyb3AtaW5kaWNhdG9yLWxlZnQsXG4gICAgICAgICYlaWd4LWdyaWRfX3RoLWRyb3AtaW5kaWNhdG9yLXJpZ2h0IHtcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIC0tdmFyKCR0aGVtZSwgJ2Ryb3AtaW5kaWNhdG9yLWNvbG9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICAmOjphZnRlcixcbiAgICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICAgICAgbGVmdDogLTNweDtcbiAgICAgICAgfVxuXG4gICAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IDAgNHB4IDRweDtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgLS12YXIoJHRoZW1lLCAnZHJvcC1pbmRpY2F0b3ItY29sb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGJvcmRlci13aWR0aDogNHB4IDRweCAwO1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAtLXZhcigkdGhlbWUsICdkcm9wLWluZGljYXRvci1jb2xvcicpIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWdyaWRfX3Njcm9sbC1vbi1kcmFnLWxlZnQsXG4gICAgJWdyaWRfX3Njcm9sbC1vbi1kcmFnLXJpZ2h0IHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTVweDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHotaW5kZXg6IDI1O1xuICAgIH1cblxuICAgICVncmlkX19zY3JvbGwtb24tZHJhZy1sZWZ0IHtcbiAgICAgICAgbGVmdDogMDtcbiAgICB9XG5cbiAgICAlZ3JpZF9fc2Nyb2xsLW9uLWRyYWctcmlnaHQge1xuICAgICAgICByaWdodDogMDtcbiAgICB9XG5cbiAgICAlZ3JpZF9fc2Nyb2xsLW9uLWRyYWctcGlubmVkIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTVweDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHotaW5kZXg6IDI1O1xuICAgIH1cblxuICAgICVncmlkX19kcmFnLWdob3N0LWltYWdlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtLXZhcigkdGhlbWUsICdnaG9zdC1oZWFkZXItYmFja2dyb3VuZCcpO1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZ2hvc3QtaGVhZGVyLXRleHQtY29sb3InKTtcbiAgICAgICAgaGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21mb3J0YWJsZScpO1xuICAgICAgICBtaW4taGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21mb3J0YWJsZScpO1xuICAgICAgICB0b3A6IC05OTk5OXB4O1xuICAgICAgICBsZWZ0OiAtOTk5OTlweDtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3gtc2hhZG93OiBpZ3gtZWxldmF0aW9uKCRlbGV2YXRpb25zLCA1KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgei1pbmRleDogMjA7XG5cbiAgICAgICAgJWdyaWQtY2VsbC1oZWFkZXItdGl0bGUge1xuICAgICAgICAgICAgbWluLXdpZHRoOiBjYWxjKDEwMCUgLSAyNHB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICVncmlkLWNlbGwtaGVhZGVyLWljb25zIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAlZ3JpZC10aGVhZC10aXRsZSB7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlZ3JpZF9fZHJhZy1naG9zdC1pbWFnZS0tY29zeSB7XG4gICAgICAgIGhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29zeScpO1xuICAgICAgICBtaW4taGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb3N5Jyk7XG4gICAgfVxuXG4gICAgJWdyaWRfX2RyYWctZ2hvc3QtaW1hZ2UtLWNvbXBhY3Qge1xuICAgICAgICBoZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbXBhY3QnKTtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgICVncmlkX19kcmFnLWdob3N0LWltYWdlLWljb24ge1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZ2hvc3QtaGVhZGVyLWljb24tY29sb3InKTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiByZW0oMTJweCk7XG4gICAgfVxuXG4gICAgJWdyaWRfX2RyYWctZ2hvc3QtaW1hZ2UtaWNvbi1ncm91cCB7XG4gICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdnaG9zdC1oZWFkZXItaWNvbi1jb2xvcicpO1xuICAgICAgICBwYWRkaW5nOiAtLXZhcigkZ3JpZC1oZWFkZXItcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgIG1hcmdpbi1yaWdodDogcmVtKDgpO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZHJhZy1jb2wtaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogLS12YXIoJHRoZW1lLCAnaGVhZGVyLWJhY2tncm91bmQnKTtcblxuICAgICAgICAlZ3JpZC1jZWxsLWhlYWRlci10aXRsZSxcbiAgICAgICAgJWdyaWQtY2VsbC1oZWFkZXItaWNvbnMge1xuICAgICAgICAgICAgb3BhY2l0eTogLjQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHcm91cCBieSBzZWN0aW9uXG4gICAgJWlneC1ncmlkX19ncm91cC1yb3cge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtLXZhcigkdGhlbWUsICdncm91cC1yb3ctYmFja2dyb3VuZCcpO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBvdXRsaW5lLXN0eWxlOiBub25lO1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgLS12YXIoJHRoZW1lLCAncm93LWJvcmRlci1jb2xvcicpO1xuICAgICAgICBtaW4taGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21mb3J0YWJsZScpO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXAtcm93LS1hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiAtLXZhcigkdGhlbWUsICdncm91cC1yb3ctc2VsZWN0ZWQtYmFja2dyb3VuZCcpO1xuXG4gICAgICAgICVpZ3gtZ3JpZF9fZ3JvdXBpbmctaW5kaWNhdG9yIHtcbiAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdleHBhbmQtaWNvbi1jb2xvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAtLXZhcigkdGhlbWUsICdncm91cC1yb3ctc2VsZWN0ZWQtYmFja2dyb3VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX19ncm91cC1yb3ctLWNvc3kge1xuICAgICAgICBtaW4taGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb3N5Jyk7XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX19ncm91cC1yb3ctLWNvbXBhY3Qge1xuICAgICAgICBtaW4taGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21wYWN0Jyk7XG4gICAgfVxuXG4gICAgJWlneC1ncm91cC1sYWJlbCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IHJlbSgxNnB4KTtcblxuICAgICAgICA+ICoge1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiByZW0oNHB4KTtcblxuICAgICAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlaWd4LWdyb3VwLWxhYmVsX19pY29uIHtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgICAgICAgJiVpZ3gtaWNvbi1kaXNwbGF5IHtcbiAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdncm91cC1sYWJlbC1pY29uJyk7XG4gICAgICAgICAgICB3aWR0aDogcmVtKDE2cHgpO1xuICAgICAgICAgICAgaGVpZ2h0OiByZW0oMTZweCk7XG4gICAgICAgICAgICBmb250LXNpemU6IHJlbSgxNnB4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JvdXAtbGFiZWxfX2NvbHVtbi1uYW1lIHtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2dyb3VwLWxhYmVsLWNvbHVtbi1uYW1lLXRleHQnKTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cblxuICAgICVpZ3gtZ3JvdXAtbGFiZWxfX2NvdW50LWJhZGdlIHtcbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogLS12YXIoJHRoZW1lLCAnZ3JvdXAtY291bnQtYmFja2dyb3VuZCcpO1xuICAgICAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2dyb3VwLWNvdW50LXRleHQtY29sb3InKTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGdyaWQtaGVhZC1mcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JvdXAtbGFiZWxfX3RleHQge1xuICAgICAgICBmb250LXNpemU6IHJlbSgxM3B4KTtcbiAgICAgICAgY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2dyb3VwLWxhYmVsLXRleHQnKVxuICAgIH1cblxuICAgIFtkaXI9J3J0bCddIHtcbiAgICAgICAgJWlneC1ncmlkX19ncm91cC1jb250ZW50IHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWdyaWRfX2dyb3VwLWNvbnRlbnQtLWNvc3kge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiBtYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29zeScpO1xuICAgICAgICB9XG5cbiAgICAgICAgJWlneC1ncmlkX19ncm91cC1jb250ZW50LS1jb21wYWN0e1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiBtYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29tcGFjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgJWlneC1ncm91cC1sYWJlbCB7XG4gICAgICAgICAgICA+ICoge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiByZW0oNHB4KTtcblxuICAgICAgICAgICAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXAtY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICAgIHBhZGRpbmctbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG4gICAgICAgIG1pbi1oZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbWZvcnRhYmxlJyk7XG5cbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBvdXRsaW5lOiB0cmFuc3BhcmVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXAtY29udGVudC0tY29zeSB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2Nvc3knKTtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29zeScpO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXAtY29udGVudC0tY29tcGFjdHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiBtYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29tcGFjdCcpO1xuICAgICAgICBtaW4taGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21wYWN0Jyk7XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX19yb3ctaW5kZW50YXRpb24ge1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgei1pbmRleDogOTk5OTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiBtYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29tZm9ydGFibGUnKTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogJGdyb3VwaW5nLXBhZGRpbmctcmlnaHQ7XG5cbiAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogcmVtKDFweCk7XG4gICAgICAgICAgICBib3R0b206IC0xcHg7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWJ1dHRvbi0taWNvbiB7XG4gICAgICAgICAgICB3aWR0aDogcmVtKDI4cHgpO1xuICAgICAgICAgICAgaGVpZ2h0OiByZW0oMjhweCk7XG4gICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZXhwYW5kLWFsbC1pY29uLWNvbG9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICAmOmZvY3VzLFxuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICVpZ3gtYnV0dG9uLS1pY29uIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZXhwYW5kLWFsbC1pY29uLWhvdmVyLWNvbG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tY29zeSB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2Nvc3knKTtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tY29tcGFjdCB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbXBhY3QnKTtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2dyb3VwYXJlYSB7XG4gICAgICAgIGdyaWQtcm93OiAyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJGdyaWQtaGVhZGVyLWJvcmRlcjtcbiAgICAgICAgYmFja2dyb3VuZDogLS12YXIoJHRoZW1lLCAnZ3JvdXBhcmVhLWJhY2tncm91bmQnKTtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JvdXBhcmVhLW1pbi1oZWlnaHQsICdjb21mb3J0YWJsZScpO1xuICAgICAgICBwYWRkaW5nOiBtYXAtZ2V0KCRncm91cGFyZWEtcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIGhlaWdodDogMTAwJTtcblxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmUtc3R5bGU6IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2dyb3VwYXJlYS1jb25uZWN0b3Ige1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbjogMCByZW0oNHB4KTtcblxuICAgICAgICBpZ3gtaWNvbiB7XG4gICAgICAgICAgICB3aWR0aDogMTZweDtcbiAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXBhcmVhLS1jb3N5IHtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JvdXBhcmVhLW1pbi1oZWlnaHQsICdjb3N5Jyk7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyb3VwYXJlYS1wYWRkaW5nLCAnY29zeScpO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXBhcmVhLS1jb21wYWN0IHtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JvdXBhcmVhLW1pbi1oZWlnaHQsICdjb21wYWN0Jyk7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyb3VwYXJlYS1wYWRkaW5nLCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgICVpZ3gtZHJvcC1hcmVhIHtcbiAgICAgICAgbWluLXdpZHRoOiByZW0oODBweCk7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgaGVpZ2h0OiBtYXAtZ2V0KCRkcm9wLWFyZWEtaGVpZ2h0LCAnY29tZm9ydGFibGUnKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogbWFwLWdldCgkZHJvcC1hcmVhLWhlaWdodCwgJ2NvbWZvcnRhYmxlJykgLyAyO1xuICAgICAgICBwYWRkaW5nOiBtYXAtZ2V0KCRkcm9wLWFyZWEtcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG4gICAgICAgIG1hcmdpbjogcmVtKDRweCk7XG4gICAgICAgIGZsZXg6IDEgMCAwJTtcbiAgICAgICAgYmFja2dyb3VuZDogLS12YXIoJHRoZW1lLCAnZHJvcC1hcmVhLWJhY2tncm91bmQnKTtcblxuICAgICAgICAlaWd4LWRyb3AtYXJlYV9faWNvbiB7XG4gICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZHJvcC1hcmVhLWljb24tY29sb3InKTtcbiAgICAgICAgICAgIHdpZHRoOiByZW0oMTZweCk7XG4gICAgICAgICAgICBoZWlnaHQ6IHJlbSgxNnB4KTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogcmVtKDE2cHgpO1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiByZW0oOHB4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZHJvcC1hcmVhLS1ob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IC0tdmFyKCR0aGVtZSwgJ2Ryb3AtYXJlYS1vbi1kcm9wLWJhY2tncm91bmQnKTtcbiAgICB9XG5cbiAgICAlaWd4LWRyb3AtYXJlYS0tY29zeSB7XG4gICAgICAgIGhlaWdodDogbWFwLWdldCgkZHJvcC1hcmVhLWhlaWdodCwgJ2Nvc3knKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogbWFwLWdldCgkZHJvcC1hcmVhLWhlaWdodCwgJ2Nvc3knKSAvIDI7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGRyb3AtYXJlYS1wYWRkaW5nLCAnY29zeScpO1xuICAgIH1cblxuICAgICVpZ3gtZHJvcC1hcmVhLS1jb21wYWN0IHtcbiAgICAgICAgaGVpZ2h0OiBtYXAtZ2V0KCRkcm9wLWFyZWEtaGVpZ2h0LCAnY29tcGFjdCcpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiBtYXAtZ2V0KCRkcm9wLWFyZWEtaGVpZ2h0LCAnY29tcGFjdCcpIC8gMjtcbiAgICAgICAgcGFkZGluZzogbWFwLWdldCgkZHJvcC1hcmVhLXBhZGRpbmcsICdjb21wYWN0Jyk7XG4gICAgfVxuXG5cbiAgICAlaWd4LWRyb3AtYXJlYV9fdGV4dCB7XG4gICAgICAgIEBpbmNsdWRlIGVsbGlwc2lzKCk7XG4gICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdkcm9wLWFyZWEtdGV4dC1jb2xvcicpO1xuICAgICAgICBmb250LXNpemU6IHJlbSgxM3B4KTtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHBhZGRpbmctbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6ICRncm91cGluZy1wYWRkaW5nLXJpZ2h0O1xuICAgICAgICBtaW4taGVpZ2h0OiBtYXAtZ2V0KCRncmlkLWhlYWRlci1oZWlnaHQsICdjb21mb3J0YWJsZScpO1xuXG4gICAgICAgIGlneC1pY29uIHtcbiAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdleHBhbmQtaWNvbi1jb2xvcicpO1xuICAgICAgICAgICAgd2lkdGg6ICRpbmRpY2F0b3ItaWNvbi13aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgICY6aG92ZXIsXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgb3V0bGluZS1zdHlsZTogbm9uZTtcblxuICAgICAgICAgICAgaWd4LWljb24ge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAtLXZhcigkdGhlbWUsICdleHBhbmQtaWNvbi1ob3Zlci1jb2xvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX19ncm91cGluZy1pbmRpY2F0b3ItLWNvc3kge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IG1hcC1nZXQoJGdyaWQtZ3JvdXBpbmctaW5kaWNhdG9yLXBhZGRpbmcsICdjb3N5Jyk7XG4gICAgICAgIG1pbi1oZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2Nvc3knKTtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2dyb3VwaW5nLWluZGljYXRvci0tY29tcGFjdCB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbXBhY3QnKTtcbiAgICAgICAgbWluLWhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9faGVhZGVyLWluZGVudGF0aW9uIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAkZ3JvdXBpbmctcGFkZGluZy1yaWdodDtcbiAgICAgICAgYmFja2dyb3VuZDogLS12YXIoJHRoZW1lLCAnaGVhZGVyLWJhY2tncm91bmQnKTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2dyb3VwLWV4cGFuZC1idG4ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHRvcDogKG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbWZvcnRhYmxlJykgLSByZW0oMjRweCkpIC8gMjtcbiAgICAgICAgbGVmdDogbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG5cbiAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZXhwYW5kLWljb24taG92ZXItY29sb3InKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXAtZXhwYW5kLWJ0bi0tY29zeSB7XG4gICAgICAgIHRvcDogKG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2Nvc3knKSAtIHJlbSgyNHB4KSkgLyAyO1xuICAgICAgICBsZWZ0OiBtYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29zeScpO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZ3JvdXAtZXhwYW5kLWJ0bi0tY29tcGFjdCB7XG4gICAgICAgIHRvcDogKG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbXBhY3QnKSAtIHJlbSgyNHB4KSkgLyAyO1xuICAgICAgICBsZWZ0OiBtYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29tcGFjdCcpO1xuICAgIH1cblxuICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggMTAge1xuICAgICAgICAvLyBDT01GT1JUQUJMRVxuICAgICAgICAlaWd4LWdyaWRfX3Jvdy1pbmRlbnRhdGlvbi0tbGV2ZWwtI3skaX0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogY2FsYygjeyRpKm1hcC1nZXQoJGdyaWQtZ3JvdXBpbmctaW5kaWNhdG9yLXBhZGRpbmcsICdjb21mb3J0YWJsZScpfSArICN7JGluZGljYXRvci1pY29uLXdpZHRofSk7XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWdyaWRfX2dyb3VwLXJvdy0tcGFkZGluZy1sZXZlbC0jeyRpfSB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6ICN7JGkqbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbWZvcnRhYmxlJyl9O1xuICAgICAgICB9XG5cbiAgICAgICAgJWlneC1ncmlkX190cmVlLWNlbGwtLXBhZGRpbmctbGV2ZWwtI3skaX0ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAjeyRpKm1hcC1nZXQoJGdyaWQtZ3JvdXBpbmctaW5kaWNhdG9yLXBhZGRpbmcsICdjb21mb3J0YWJsZScpfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENPU1lcbiAgICAgICAgJWlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tY29zeS0tbGV2ZWwtI3skaX0ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiBjYWxjKCN7JGkqbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2Nvc3knKX0gKyAjeyRpbmRpY2F0b3ItaWNvbi13aWR0aH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJWlneC1ncmlkX19ncm91cC1yb3ctY29zeS0tcGFkZGluZy1sZXZlbC0jeyRpfSB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6ICN7JGkqbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2Nvc3knKX07XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWdyaWRfX3RyZWUtY2VsbC1jb3N5LS1wYWRkaW5nLWxldmVsLSN7JGl9IHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogI3skaSptYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29zeScpfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENPTVBBQ1RcbiAgICAgICAgJWlneC1ncmlkX19yb3ctaW5kZW50YXRpb24tY29tcGFjdC0tbGV2ZWwtI3skaX0ge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiBjYWxjKCN7JGkqbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbXBhY3QnKX0gKyAjeyRpbmRpY2F0b3ItaWNvbi13aWR0aH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJWlneC1ncmlkX19ncm91cC1yb3ctY29tcGFjdC0tcGFkZGluZy1sZXZlbC0jeyRpfSB7XG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6ICN7JGkqbWFwLWdldCgkZ3JpZC1ncm91cGluZy1pbmRpY2F0b3ItcGFkZGluZywgJ2NvbXBhY3QnKX07XG4gICAgICAgIH1cblxuICAgICAgICAlaWd4LWdyaWRfX3RyZWUtY2VsbC1jb21wYWN0LS1wYWRkaW5nLWxldmVsLSN7JGl9IHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogI3skaSptYXAtZ2V0KCRncmlkLWdyb3VwaW5nLWluZGljYXRvci1wYWRkaW5nLCAnY29tcGFjdCcpfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fb3V0bGV0IHtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fcm93LWVkaXRpbmctb3V0bGV0IHtcbiAgICAgICAgei1pbmRleDogMTAwMDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAkZ3JpZC1oZWFkZXItYm9yZGVyO1xuICAgICAgICBib3JkZXItdG9wOiAkZ3JpZC1oZWFkZXItYm9yZGVyO1xuICAgICAgICBoZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2NvbWZvcnRhYmxlJyk7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLXBhZGRpbmcsICdjb21mb3J0YWJsZScpO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgICAgIGlneC1jaGlwcy1hcmVhIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMjVzICRlYXNlLW91dC1iYWNrO1xuICAgICAgICAgICAgZmxleC13cmFwOiBub3dyYXA7XG5cbiAgICAgICAgICAgIC5pZ3gtZmlsdGVyaW5nLWNoaXBzX19jb25uZWN0b3Ige1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogcmVtKDEycHgpO1xuICAgICAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgcmVtKDhweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsLWluZGljYXRvciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuXG4gICAgICAgIGlneC1pY29uIHtcbiAgICAgICAgICAgIHdpZHRoOiAxOHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAxOHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgJWlneC1iYWRnZS1kaXNwbGF5IHtcbiAgICAgICAgICAgIC8qIHN0YXJ0IG9mIElFIHZlcnRpY2FsIGFsaWdubWVudCBmaXggKi9cbiAgICAgICAgICAgIHRvcDogNTAlO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgICAgICAgICAgLyogZW5kIG9mIElFIHZlcnRpY2FsIGFsaWdubWVudCBmaXggKi9cbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxNHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAxNHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiAxNHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2ZpbHRlcmluZy1jZWxsLWluZGljYXRvci0taGlkZGVuIHtcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZmlsdGVyaW5nLWNlbGwtLWNvc3kge1xuICAgICAgICBoZWlnaHQ6IG1hcC1nZXQoJGdyaWQtaGVhZGVyLWhlaWdodCwgJ2Nvc3knKTtcbiAgICAgICAgcGFkZGluZzogbWFwLWdldCgkZ3JpZC1oZWFkZXItcGFkZGluZywgJ2NvbWZvcnRhYmxlJyk7XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX19maWx0ZXJpbmctY2VsbC0tY29tcGFjdCB7XG4gICAgICAgIGhlaWdodDogbWFwLWdldCgkZ3JpZC1oZWFkZXItaGVpZ2h0LCAnY29tcGFjdCcpO1xuICAgICAgICBwYWRkaW5nOiBtYXAtZ2V0KCRncmlkLWhlYWRlci1wYWRkaW5nLCAnY29tZm9ydGFibGUnKTtcbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2ZpbHRlcmluZy1yb3cge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIHBhZGRpbmc6IG1hcC1nZXQoJGdyaWQtY2VsbC1wYWRkaW5nLCAnY29zeScpO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGJhY2tncm91bmQ6IC0tdmFyKCR0aGVtZSwgJ2ZpbHRlcmluZy1yb3ctYmFja2dyb3VuZCcpO1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAnZmlsdGVyaW5nLXJvdy10ZXh0LWNvbG9yJyk7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgei1pbmRleDogMztcblxuICAgICAgICAmOjphZnRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgLS12YXIoJHRoZW1lLCAnZmlsdGVyaW5nLXJvdy1iYWNrZ3JvdW5kJyksXG4gICAgICAgICAgICAgICAgMCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIC4xMik7XG4gICAgICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlneC1pbnB1dC1ncm91cCB7XG4gICAgICAgICAgICBmbGV4OiAwIDAgMjAwcHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZ3gtcHJlZml4OmZvY3VzIHtcbiAgICAgICAgICAgIGNvbG9yOiBpZ3gtY29sb3IobWFwLWdldCgkdGhlbWUsICdwYWxldHRlJyksICdzZWNvbmRhcnknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICVpZ3gtZ3JpZF9fZmlsdGVyaW5nLXJvdy1tYWluIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAxNzZweCk7XG5cbiAgICAgICAgaWd4LWNoaXBzLWFyZWEge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4yNXMgJGVhc2Utb3V0LWJhY2s7XG4gICAgICAgICAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgICAgICAgICAgIG1hcmdpbjogMCByZW0oOHB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlneC1jaGlwIHtcbiAgICAgICAgICAgIG1hcmdpbjogMCByZW0oNHB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFtpZ3hCdXR0b25dIHtcbiAgICAgICAgICAgIGlneC1pY29uIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgbGVmdDogcmVtKDEycHgpO1xuICAgICAgICAgICAgICAgIC8qIElFIGZpeCBmb3IgdmVydGljYWwgYWxpZ25tZW50Ki9cbiAgICAgICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiByZW0oMTZweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAlaWd4LWdyaWRfX2ZpbHRlcmluZy1zY3JvbGwtc3RhcnQge1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgICAgICBtYXJnaW46IDAgOHB4O1xuICAgICAgICB6LWluZGV4OiAxO1xuXG4gICAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgbGVmdDogY2FsYygxMDAlICsgOHB4KTtcbiAgICAgICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCB3aGl0ZSwgdHJhbnNwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJWlneC1ncmlkX19maWx0ZXJpbmctc2Nyb2xsLWVuZCB7XG4gICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICAgIG1hcmdpbjogMCA4cHg7XG4gICAgICAgIHotaW5kZXg6IDE7XG5cbiAgICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgcmlnaHQ6IGNhbGMoMTAwJSArIDhweCk7XG4gICAgICAgICAgICB3aWR0aDogMTBweDtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBsZWZ0LCB3aGl0ZSwgdHJhbnNwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vL1xuLy8vIEBncm91cCBVdGlsaXRpZXNcbi8vLyBAYXV0aG9yIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2ltZW9ub2ZmXCIgdGFyZ2V0PVwiX2JsYW5rXCI+U2ltZW9uIFNpbWVvbm9mZjwvYT5cbi8vLy9cblxuLy8vIEhpZGVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBleGFtcGxlIHNjc3MgLSBTYW1wbGUgdXNhZ2Vcbi8vLyAgIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSB7XG4vLy8gICAgIEBpbmNsdWRlIGhpZGUtZGVmYXVsdCgpO1xuLy8vICAgfVxuQG1peGluIGhpZGUtZGVmYXVsdCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxcHg7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgbWFyZ2luOiAtMXB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBjbGlwOiByZWN0KDAsIDAsIDAsIDApO1xuICAgIG91dGxpbmU6IDA7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG4vLy8gR2VuZXJhdGVzIGEgbGluZWFyIGdyYWRpZW50LlxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQHBhcmFtIHtzdHJpbmd9ICRkaXJlY3Rpb24gLSBUaGUgZGlyZWN0aW9uIG9mIHRoZSBncmFkaWVudC5cbi8vLyBAcGFyYW0ge0xpc3R9ICRjb2xvci1zdG9wcyAtIEEgbGlzdCBvZiBjb2xvciBzdG9wcyB0byBiZSB1c2VkIGluIHRoZSBncmFkaWVudC5cbi8vLyBAZXhhbXBsZSBzY3NzIC0gU2FtcGxlIHVzYWdlXG4vLy8gICAuYm96byB7XG4vLy8gICAgIGJhY2tncm91bmQ6IEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudChcInRvIHJpZ2h0XCIsIHJlZCwgb3JhbmdlKTtcbi8vLyAgIH1cbi8vLyBAb3V0cHV0cyBUaGUgQ1NTIHJlcHJlc2VudGF0aW9uIG9mIGxpbmVhci1ncmFkaWVudC5cbkBtaXhpbiBsaW5lYXItZ3JhZGllbnQoJGRpcmVjdGlvbiwgJGNvbG9yLXN0b3BzLi4uKSB7XG4gICAgLy8gRGlyZWN0aW9uIGhhcyBiZWVuIG9taXR0ZWQgYW5kIGhhcHBlbnMgdG8gYmUgYSBjb2xvci1zdG9wXG4gICAgQGlmIGlzLWRpcmVjdGlvbigkZGlyZWN0aW9uKSA9PSBmYWxzZSB7XG4gICAgICAgICRjb2xvci1zdG9wczogJGRpcmVjdGlvbiwgJGNvbG9yLXN0b3BzO1xuICAgICAgICAkZGlyZWN0aW9uOiAxODBkZWc7XG4gICAgfVxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgkZGlyZWN0aW9uLCAkY29sb3Itc3RvcHMpO1xufVxuXG4vLy8gUmVnaXN0ZXJzIGEga2V5ZnJhbWVzIGFuaW1hdGlvbiBpbiB0aGUgZ2xvYmFsIGtleWZyYW1lcyByZWdpc3RyeSBsaXN0LlxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIGFuaW1hdGlvbnNcbi8vLyBAcGFyYW0ge1N0cmluZ30gJG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUga2V5ZnJhbWVzIGFuaW1hdGlvbi5cbkBtaXhpbiBrZXlmcmFtZXMoJG5hbWUpIHtcbiAgICAka2V5ZnJhbWU6IG1hcC1nZXQoJGtleWZyYW1lcywgJG5hbWUpO1xuXG4gICAgQGlmICRrZXlmcmFtZSA9PSBudWxsIHtcbiAgICAgICAgJGtleWZyYW1lOiB1bmlxdWUtaWQoKTtcbiAgICAgICAgJGtleWZyYW1lczogbWFwLW1lcmdlKCRrZXlmcmFtZXMsICgjeyRuYW1lfTogJGtleWZyYW1lKSkgIWdsb2JhbDtcblxuICAgICAgICBAYXQtcm9vdCB7XG4gICAgICAgICAgICBAa2V5ZnJhbWVzICN7JG5hbWV9IHtcbiAgICAgICAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8vIFJlZ2lzdGVycyBhIGNvbXBvbmVudCB0byB0aGUgbGlzdCBvZiBrbm93biBjb21wb25lbnRzLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkbmFtZSAtIFRoZSBjb21wb25lbnQgbmFtZSB0byByZWdpc3Rlci5cbkBtaXhpbiByZWdpc3Rlci1jb21wb25lbnQoJG5hbWUpIHtcbiAgICAkY29tcG9uZW50OiBtYXAtZ2V0KCRjb21wb25lbnRzLCAkbmFtZSk7XG4gICAgQGlmICRjb21wb25lbnQgPT0gbnVsbCB7XG4gICAgICAgICRjb21wb25lbnQ6IHVuaXF1ZS1pZCgpO1xuICAgICAgICAkY29tcG9uZW50czogbWFwLW1lcmdlKCRjb21wb25lbnRzLCAoI3skbmFtZX06ICRjb21wb25lbnQpKSAhZ2xvYmFsO1xuICAgIH1cbn1cblxuLy8vIEFuaW1hdGVzIGFuIGVsZW1lbnQuXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgYW5pbWF0aW9uc1xuLy8vIEBwYXJhbSB7TGlzdH0gJGFuaW1hdGUgLSBUaGUgbGlzdCBvZiBhbmltYXRpb24gcHJvcGVydGllcy5cbi8vLyBAZXhhbXBsZSBzY3NzIC0gQW5pbWF0aW5nIGFuIGVsZW1lbnRcbi8vLyAgQGluY2x1ZGUgZmFkZS1pbigpOyAvLyBpbmNsdWRlIHRoZSAnZmFkZS1pbicga2V5ZnJhbWVzIGFuaW1hdGlvbiBtaXhpblxuLy8vXG4vLy8gIC5ib3pvIHtcbi8vLyAgICAgQGluY2x1ZGUgYW5pbWF0aW9uKCdmYWRlLWluJyAuM3MgZWFzZS1vdXQpO1xuLy8vICB9XG5AbWl4aW4gYW5pbWF0aW9uKCRhbmltYXRlLi4uKSB7XG4gICAgJG1heDogbGVuZ3RoKCRhbmltYXRlKTtcbiAgICAkYW5pbWF0aW9uczogJyc7XG4gICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkbWF4IHtcbiAgICAgICAgJGFuaW1hdGlvbnM6ICN7JGFuaW1hdGlvbnMgKyBudGgoJGFuaW1hdGUsICRpKX07XG4gICAgICAgIEBpZiAkaSA8ICRtYXgge1xuICAgICAgICAgICAgJGFuaW1hdGlvbnM6ICN7JGFuaW1hdGlvbnMgKyAnLCAnfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhbmltYXRpb246ICRhbmltYXRpb25zO1xufVxuXG4vLy8gQXBwbGllcyB0ZXh0LW92ZXJmbG93IGVsbGlwc2lzIHRvIGUgdGV4dCBlbGVtZW50LlxuLy8vIFRoaXMgd29uJ3Qgd29yayBvbiBkaXNwbGF5IGZsZXggZWxlbWVudHMuXG4vLy8gQGFjY2VzcyBwdWJsaWNcbkBtaXhpbiBlbGxpcHNpcygpIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi8vLyBHZW5lcmF0ZXMgYSBDU1MgY2xhc3MgbmFtZSBmb3IgYSBjb2xvciBmcm9tIGFcbi8vLyBnaXZlbiBuYW1lLCB2YXJpYW50LCBwcmVmaXggYW5kIHN1ZmZpeFxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vIEBwYXJhbSB7c3RyaW5nfSAkbmFtZSAtIFRoZSBtYWluIGNsYXNzIG5hbWUuXG4vLy8gQHBhcmFtIHtzdHJpbmd9ICR2YXJpYW50IC0gQW4gYWRkaXRpb25hbCBzdHJpbmcgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIG1haW4gY2xhc3MgbmFtZS5cbi8vLyBAcGFyYW0ge3N0cmluZ30gJHByZWZpeCAtIEEgcHJlZml4IHRvIGJlIGF0dGFjaGVkIHRvIHRoZSBuYW1lIGFuZCB2YXJpYW50IHN0cmluZy5cbi8vLyBAcGFyYW0ge3N0cmluZ30gJHByZWZpeCAtIEEgc3VmZml4IHRvIGJlIGF0dGFjaGVkIHRvIHRoZSBuYW1lIGFuZCB2YXJpYW50IHN0cmluZy5cbkBtaXhpbiBnZW4tY29sb3ItY2xhc3MoJG5hbWUsICR2YXJpYW50LCAkcHJlZml4LCAkc3VmZml4KSB7XG4gICAgJHByZWZpeDogaWYoJHByZWZpeCwgJyN7JHByZWZpeH0tJywgJycpO1xuICAgICRzdWZmaXg6IGlmKCRzdWZmaXgsICctI3skc3VmZml4fScsICcnKTtcblxuICAgIC4jeyRwcmVmaXh9I3skbmFtZX0tI3skdmFyaWFudH0jeyRzdWZmaXh9IHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgfVxufVxuXG4vLy8gR2VuZXJhdGVzIENTUyBjbGFzcyBuYW1lcyBmb3IgYWxsIGNvbG9ycyBmcm9tXG4vLy8gdGhlIGNvbG9yIHBhbGV0dGUgZm9yIGEgZ2l2ZW4gcHJvcGVydHksIHdpdGhcbi8vLyBvcHRpb25hbCBwcmVmaXggYW5kIHN1ZmZpeCBhdHRhY2hlZCB0byB0aGUgY2xhc3MgbmFtZS5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge3N0cmluZ30gJHByb3AgLSBUaGUgQ1NTIHByb3BlcnR5IHRvIGFzc2lnbiB0aGUgcGFsZXR0ZSBjb2xvciB0by5cbi8vLyBAcGFyYW0ge3N0cmluZ30gJHByZWZpeCAtIEEgcHJlZml4IHRvIGJlIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBuYW1lLlxuLy8vIEBwYXJhbSB7c3RyaW5nfSAkc3VmZml4IC0gQSBzdWZmaXggdG8gYmUgYXR0YWNoZWQgdG8gdGhlIGNsYXNzIG5hbWUuXG4vLy8gQGV4YW1wbGUgc2NzcyBHZW5lcmF0ZSBiYWNrZ3JvdW5kIGNsYXNzZXMgd2l0aCBjb2xvcnMgZnJvbSB0aGUgcGFsZXR0ZS5cbi8vLyAgIC8vIFdpbGwgZ2VuZXJhdGUgY2xhc3MgbmFtZXMgbGlrZVxuLy8vICAgLy8gLm15LXByaW1hcnktNTAwLWJnIHsgLi4uIH07XG4vLy8gICBAaW5jbHVkZSBnZW4tY29sb3ItY2xhc3Nlcyhcbi8vLyAgICAgJHByb3A6ICdiYWNrZ3JvdW5kLWNvbG9yJyxcbi8vLyAgICAgJHByZWZpeDogJ215JywgJHN1ZmZpeDogJ2JnJ1xuLy8vICAgKTtcbi8vLyBAcmVxdWlyZXMge21peGlufSBnZW4tY29sb3ItY2xhc3NcbkBtaXhpbiBnZW4tY29sb3ItY2xhc3NlcygkcHJvcCwgJHByZWZpeCwgJHN1ZmZpeCkge1xuICAgIEBlYWNoICRwYWxldHRlLW5hbWUsICRzdWItcGFsZXR0ZSBpbiAkZGVmYXVsdC1wYWxldHRlIHtcbiAgICAgICAgQGVhY2ggJHZhcmlhbnQsICRjb2xvciBpbiAkc3ViLXBhbGV0dGUge1xuICAgICAgICAgICAgQGlmIHR5cGUtb2YoJGNvbG9yKSAhPSAnbWFwJyB7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgZ2VuLWNvbG9yLWNsYXNzKCRwYWxldHRlLW5hbWUsICR2YXJpYW50LCAkcHJlZml4LCAkc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgICAgICN7JHByb3B9OiAkY29sb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8gR2VuZXJhdGVzIENTUyB2YXJpYWJsZXMgZm9yIGEgZ2l2ZW4gcGFsZXR0ZS5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge01hcH0gJHBhbGV0dGUgLSBUaGUgaWd4IHBhbGV0dGUgdG8gdXNlIHRvIGdlbmVyYXRlIGNzcyB2YXJpYWJsZXMgZm9yLlxuLy8vXG4vLy8gQGV4YW1wbGUgc2NzcyBHZW5lcmF0ZSBjc3MgdmFyaWFibGVzIGZvciB0aGUgYCRkZWZhdWx0LXBhbGV0dGVgLlxuLy8vICAgQGluY2x1ZGUgY3NzLXZhcnMtZnJvbS1wYWxldHRlKCRkZWZhdWx0LXBhbGV0dGUpO1xuLy8vXG5AbWl4aW4gY3NzLXZhcnMtZnJvbS1wYWxldHRlKCRwYWxldHRlKSB7XG4gICAgQGVhY2ggJHBhbGV0dGUtbmFtZSwgJHN1Yi1wYWxldHRlIGluICRwYWxldHRlIHtcbiAgICAgICAgQGVhY2ggJHZhcmlhbnQsICRjb2xvciBpbiAkc3ViLXBhbGV0dGUge1xuICAgICAgICAgICAgQGlmIHR5cGUtb2YoJGNvbG9yKSAhPSAnbWFwJyB7XG4gICAgICAgICAgICAgICAgLS1pZ3gtI3skcGFsZXR0ZS1uYW1lfS0jeyR2YXJpYW50fTogI3skY29sb3J9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8gR2VuZXJhdGVzIENTUyB2YXJpYWJsZXMgZm9yIGEgZ2l2ZW4gcGFsZXR0ZS5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBwYXJhbSB7TWFwfSAkcGFsZXR0ZSAtIFRoZSBpZ3ggcGFsZXR0ZSB0byB1c2UgdG8gZ2VuZXJhdGUgY3NzIHZhcmlhYmxlcyBmb3IuXG4vLy8gQHBhcmFtIHtzdHJpbmd9ICRzY29wZSBbbnVsbF0gLSBUaGUgc2NvcGUgb2YgdGhlIGdlbmVyYXRlZCBjc3MgdmFyaWFibGVzLlxuLy8vXG4vLy8gQGV4YW1wbGUgc2NzcyBHZW5lcmF0ZSBjc3MgdmFyaWFibGVzIGZvciB0aGUgYCRkZWZhdWx0LXBhbGV0dGVgLlxuLy8vICAgQGluY2x1ZGUgY3NzLXZhcnMtZnJvbS1wYWxldHRlKCRkZWZhdWx0LXBhbGV0dGUsICc6cm9vdCcpO1xuLy8vXG4vLy8gQHJlcXVpcmVzIHttaXhpbn0gY3NzLXZhcnMtZnJvbS1wYWxldHRlXG5AbWl4aW4gaWd4LXBhbGV0dGUtdmFycygkcGFsZXR0ZSwgJHNjb3BlOiBudWxsKSB7XG4gICAgQGlmICRzY29wZSA9PSBudWxsIHtcbiAgICAgICAgQGluY2x1ZGUgY3NzLXZhcnMtZnJvbS1wYWxldHRlKCRwYWxldHRlKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgI3skc2NvcGV9IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIGNzcy12YXJzLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLyBHZW5lcmF0ZXMgQ1NTIGNsYXNzIG5hbWVzIGZvciBhbGwgY29sb3JzIGZyb21cbi8vLyB0aGUgY29sb3IgcGFsZXR0ZSBmb3IgYSBnaXZlbiBwcm9wZXJ0eSwgd2l0aFxuLy8vIG9wdGlvbmFsIHByZWZpeCBhbmQgc3VmZml4IGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBuYW1lLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vIEBwYXJhbSB7c3RyaW5nfSAkcHJvcCAtIFRoZSBDU1MgcHJvcGVydHkgdG8gYXNzaWduIHRoZSBwYWxldHRlIGNvbG9yIHRvLlxuLy8vIEBwYXJhbSB7c3RyaW5nfSAkcHJlZml4IFtudWxsXSAtIEEgcHJlZml4IHRvIGJlIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBuYW1lLlxuLy8vIEBwYXJhbSB7c3RyaW5nfSAkc3VmZml4IFtpZ3hdIC0gQSBzdWZmaXggdG8gYmUgYXR0YWNoZWQgdG8gdGhlIGNsYXNzIG5hbWUuXG4vLy8gQGV4YW1wbGUgc2NzcyBHZW5lcmF0ZSBiYWNrZ3JvdW5kIGNsYXNzZXMgd2l0aCBjb2xvcnMgZnJvbSB0aGUgcGFsZXR0ZS5cbi8vLyAgIC8vIFdpbGwgZ2VuZXJhdGUgY2xhc3MgbmFtZXMgbGlrZVxuLy8vICAgLy8gLmlneC1wcmltYXJ5LTUwMC1iZyB7IC4uLiB9O1xuLy8vICAgQGluY2x1ZGUgaWd4LWNvbG9yLWNsYXNzZXMoXG4vLy8gICAgICRwcm9wOiAnYmFja2dyb3VuZC1jb2xvcicsXG4vLy8gICAgICRzdWZmaXg6ICdiZydcbi8vLyAgICk7XG4vLy8gQHJlcXVpcmVzIHttaXhpbn0gZ2VuLWNvbG9yLWNsYXNzZXNcbkBtaXhpbiBpZ3gtY29sb3ItY2xhc3NlcygkcHJvcCwgJHN1ZmZpeDogbnVsbCwgJHByZWZpeDogJ2lneCcpIHtcbiAgICBAaW5jbHVkZSBnZW4tY29sb3ItY2xhc3NlcygkcHJvcCwgJHByZWZpeCwgJHN1ZmZpeCk7XG59XG5cbi8vLyBQYXJzZXMgYSBtYXAgb2Yga2V5IHZhbHVlIHBhaXJzXG4vLy8gZnJvbSBjb21wb25lbnQgdGhlbWVzIHRvIGNzcyB2YXJpYWJsZXMuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHttYXB9ICR0aGVtZSAtIFRoZSBjb21wb25lbnQgdGhlbWUgdG8gYmUgdXNlZCB0byBnZW5lcmF0ZSBjc3MgdmFyaWFibGVzLlxuLy8vIEBleGFtcGxlIHNjc3MgQ29udmVydCB0aGVtZSBjb2xvcnMgdG8gY3NzIHZhcmlhYmxlcy5cbi8vLyAgICRteS10aGVtZTogaWd4LWF2YXRhci10aGVtZSgkaWNvbi1jb2xvcjogcmVkKTtcbi8vLyAgIDpyb290IHtcbi8vLyAgICAgQGluY2x1ZGUgY3NzLXZhcnMtZnJvbS10aGVtZSgkbXktdGhlbWUpO1xuLy8vICAgfVxuQG1peGluIGNzcy12YXJzLWZyb20tdGhlbWUoJHRoZW1lKSB7XG4gICAgJHByZWZpeDogbWFwLWdldCgkdGhlbWUsICduYW1lJyk7XG5cbiAgICBAZWFjaCAka2V5LCAkdmFsdWUgaW4gJHRoZW1lIHtcbiAgICAgICAgQGlmICRrZXkgIT0gJ25hbWUnIGFuZCAka2V5ICE9ICdwYWxldHRlJyB7XG4gICAgICAgICAgICAtLSN7JHByZWZpeH0tI3ska2V5fTogI3skdmFsdWV9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8gQWRkIHRoZW1lIGNvbG9ycyB0byB0aGUgZ2xvYmFsIHJvb3Qgc2NvcGVcbi8vLyBFbnN1cmVzIHRoZSBvcGVyYXRpb24gaXMgZG9uZSBvbmx5IG9uY2UuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHttYXB9ICR0aGVtZSAtIFRoZSBjb21wb25lbnQgdGhlbWUgdG8gZ2V0IHRoZVxuLy8vIEBleGFtcGxlIHNjc3MgQ29udmVydCB0aGVtZSBjb2xvcnMgdG8gY3NzIHZhcmlhYmxlcy5cbi8vLyBAcmVxdWlyZXMge21peGlufSBjc3MtdmFycy1mcm9tLXRoZW1lXG5AbWl4aW4gaWd4LXJvb3QtY3NzLXZhcnMoJHRoZW1lKSB7XG4gICAgJG5hbWU6IG1hcC1nZXQoJHRoZW1lLCAnbmFtZScpO1xuXG4gICAgQGlmIG1hcC1nZXQoJHRoZW1lcywgJG5hbWUpID09IG51bGwge1xuICAgICAgICAkaWQ6IHVuaXF1ZS1pZCgpO1xuICAgICAgICAkdGhlbWVzOiBtYXAtbWVyZ2UoJHRoZW1lcywgKCN7JG5hbWV9OiAkaWQpKSAhZ2xvYmFsO1xuXG4gICAgICAgIDpyb290IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIGNzcy12YXJzLWZyb20tdGhlbWUoJHRoZW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8vIEFkZCB0aGVtZSBjb2xvcnMgc2NvcGVkIHRvIGEgc3BlY2lmaWMgZWxlbWVudFxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQHBhcmFtIHttYXB9ICR0aGVtZSAtIFRoZSBjb21wb25lbnQgdGhlbWUgdG8gZ2V0IHRoZVxuLy8vIEBleGFtcGxlIHNjc3MgQ29udmVydCB0aGVtZSBjb2xvcnMgdG8gY3NzIHZhcmlhYmxlcy5cbi8vLyBAcmVxdWlyZXMge21peGlufSBjc3MtdmFycy1mcm9tLXRoZW1lXG5AbWl4aW4gaWd4LWNzcy12YXJzKCR0aGVtZSkge1xuICAgIEBpbmNsdWRlIGNzcy12YXJzLWZyb20tdGhlbWUoJHRoZW1lKTtcbn1cblxuLy8vIFNjb3BlcyBDU1MgcnVsZXMgdG8gYSBwcmVkZWZpbmVkIHRvcC1sZXZlbCBwYXJlbnQgc2VsZWN0b3IuXG4vLy8gUmVzcGVjdHMgc3BlY2lmaWNpdHkgYW5kIHNlbGVjdG9yIHNjb3Blcy5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge1N0cmluZ30gJHBhcmVudCAtIFRoZSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRvcCBsZXZlbCBzY29wZS5cbi8vLyBAZXhhbXBsZSBzY3NzIEFwcGx5IG1peGluIHN0eWxlIHJ1bGVzIG9ubHkgd2hlbiAnLmlneC10eXBvZ3JhcGh5JyBzZWxlY3RvciBpcyBwcmVzZW50LlxuLy8vICAgIEBtaXhpbiBpZ3gtY2FyZC10eXBvZ3JhcGh5IHtcbi8vLyAgICAgICBAaW5jbHVkZSBpZ3gtc2NvcGUoJy5pZ3gtdHlwb2dyYXBoeScpIHtcbi8vLyAgICAgICAgIC8vIHN0eWxlIHJ1bGVzLi4uXG4vLy8gICAgICAgfVxuLy8vICAgIH1cbi8vL1xuLy8vICAgIC8vIExhdGVyXG4vLy8gICAgLm15LXNlbGVjdG9yIHtcbi8vLyAgICAgIEBpbmNsdWRlIGlneC1jYXJkLXR5cG9ncmFwaHkoKTtcbi8vLyAgICB9XG4vLy9cbi8vLyAgICAvLyBHZW5lcmF0ZWQgQ1NTXG4vLy8gICAgLy8gLmlneC10eXBvZ3JhcGh5IC5teS1zZWxlY3RvciB7XG4vLy8gICAgLy8gICAgLi4uc3R5bGVzIHJ1bGVzIGFzIG91dHB1dCBieSBpZ3gtY2FyZC10eXBvZ3JhcGh5IG1peGluXG4vLy8gICAgLy8gfVxuQG1peGluIGlneC1zY29wZSgkcGFyZW50KSB7XG4gICAgQGVhY2ggJHNlbGVjdG9yIGluICYge1xuICAgICAgICAkbGVuOiBsZW5ndGgoJHNlbGVjdG9yKTtcbiAgICAgICAgQGlmICRsZW4gPT0gbnVsbCB7XG4gICAgICAgICAgICAkcGFyZW50OiAkcGFyZW50O1xuICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggJGxlbiB7XG4gICAgICAgICAgICAgICAgJHBhcmVudDogYXBwZW5kKCRwYXJlbnQsIG50aCgkc2VsZWN0b3IsICRpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBAYXQtcm9vdCAjeyRwYXJlbnR9IHtcbiAgICAgICAgICAgIEBjb250ZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vL1xuLy8vIEBncm91cCBlbGV2YXRpb25zXG4vLy8gQGF1dGhvciA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NpbWVvbm9mZlwiIHRhcmdldD1cIl9ibGFua1wiPlNpbWVvbiBTaW1lb25vZmY8L2E+XG4vLy8vXG5cbi8vLyBMZXZlbCAxIC0gVW1icmEgU2hhZG93c1xuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciAtIFRoZSBjb2xvciB1c2VkIHRvIGdlbmVyYXRlIHVtYnJhIHNoYWRvd3MuXG4vLy8gQHJldHVybnMge01hcH0gUmV0dXJucyBhIG1hcCBvZiAyNCBzaGFkb3cgZWxldmF0aW9ucyB3aXRoIHRoZSB1bWJyYSBjb2xvci5cbkBmdW5jdGlvbiBfbDEtc2hhZG93cygkY29sb3IpIHtcbiAgICBAcmV0dXJuIChcbiAgICAgICAgMTogMCAxcHggM3B4IDAgJGNvbG9yLFxuICAgICAgICAyOiAwIDFweCA1cHggMCAkY29sb3IsXG4gICAgICAgIDM6IDAgMXB4IDhweCAwICRjb2xvcixcbiAgICAgICAgNDogMCAycHggNHB4IC0xcHggJGNvbG9yLFxuICAgICAgICA1OiAwIDNweCA1cHggLTFweCAkY29sb3IsXG4gICAgICAgIDY6IDAgM3B4IDVweCAtMXB4ICRjb2xvcixcbiAgICAgICAgNzogMCA0cHggNXB4IC0ycHggJGNvbG9yLFxuICAgICAgICA4OiAwIDVweCA1cHggLTNweCAkY29sb3IsXG4gICAgICAgIDk6IDAgNXB4IDZweCAtM3B4ICRjb2xvcixcbiAgICAgICAgMTA6IDAgNnB4IDZweCAtM3B4ICRjb2xvcixcbiAgICAgICAgMTE6IDAgNnB4IDdweCAtNHB4ICRjb2xvcixcbiAgICAgICAgMTI6IDAgN3B4IDhweCAtNHB4ICRjb2xvcixcbiAgICAgICAgMTM6IDAgN3B4IDhweCAtNHB4ICRjb2xvcixcbiAgICAgICAgMTQ6IDAgN3B4IDlweCAtNHB4ICRjb2xvcixcbiAgICAgICAgMTU6IDAgOHB4IDlweCAtNXB4ICRjb2xvcixcbiAgICAgICAgMTY6IDAgOHB4IDEwcHggLTVweCAkY29sb3IsXG4gICAgICAgIDE3OiAwIDhweCAxMXB4IC01cHggJGNvbG9yLFxuICAgICAgICAxODogMCA5cHggMTFweCAtNXB4ICRjb2xvcixcbiAgICAgICAgMTk6IDAgOXB4IDEycHggLTZweCAkY29sb3IsXG4gICAgICAgIDIwOiAwIDEwcHggMTNweCAtNnB4ICRjb2xvcixcbiAgICAgICAgMjE6IDAgMTBweCAxM3B4IC02cHggJGNvbG9yLFxuICAgICAgICAyMjogMCAxMHB4IDE0cHggLTZweCAkY29sb3IsXG4gICAgICAgIDIzOiAwIDExcHggMTRweCAtN3B4ICRjb2xvcixcbiAgICAgICAgMjQ6IDAgMTFweCAxNXB4IC03cHggJGNvbG9yXG4gICAgKTtcbn1cblxuLy8vIExldmVsIDIgLSBQZW51bWJyYSBTaGFkb3dzXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGNvbG9yIC0gVGhlIGNvbG9yIHVzZWQgdG8gZ2VuZXJhdGUgcGVudW1icmEgc2hhZG93cy5cbi8vLyBAcmV0dXJucyB7TWFwfSBSZXR1cm5zIGEgbWFwIG9mIDI0IHNoYWRvdyBlbGV2YXRpb25zIHdpdGggdGhlIHBlbnVtYnJhIGNvbG9yLlxuQGZ1bmN0aW9uIF9sMi1zaGFkb3dzKCRjb2xvcikge1xuICAgIEByZXR1cm4gKFxuICAgICAgICAxOiAwIDFweCAxcHggMCAkY29sb3IsXG4gICAgICAgIDI6IDAgMnB4IDJweCAwICRjb2xvcixcbiAgICAgICAgMzogMCAzcHggNHB4IDAgJGNvbG9yLFxuICAgICAgICA0OiAwIDRweCA1cHggMCAkY29sb3IsXG4gICAgICAgIDU6IDAgNXB4IDhweCAwICRjb2xvcixcbiAgICAgICAgNjogMCA2cHggMTBweCAwICRjb2xvcixcbiAgICAgICAgNzogMCA3cHggMTBweCAxcHggJGNvbG9yLFxuICAgICAgICA4OiAwIDhweCAxMHB4IDFweCAkY29sb3IsXG4gICAgICAgIDk6IDAgOXB4IDEycHggMXB4ICRjb2xvcixcbiAgICAgICAgMTA6IDAgMTBweCAxNHB4IDFweCAkY29sb3IsXG4gICAgICAgIDExOiAwIDExcHggMTVweCAxcHggJGNvbG9yLFxuICAgICAgICAxMjogMCAxMnB4IDE3cHggMnB4ICRjb2xvcixcbiAgICAgICAgMTM6IDAgMTNweCAxOXB4IDJweCAkY29sb3IsXG4gICAgICAgIDE0OiAwIDE0cHggMjFweCAycHggJGNvbG9yLFxuICAgICAgICAxNTogMCAxNXB4IDIycHggMnB4ICRjb2xvcixcbiAgICAgICAgMTY6IDAgMTZweCAyNHB4IDJweCAkY29sb3IsXG4gICAgICAgIDE3OiAwIDE3cHggMjZweCAycHggJGNvbG9yLFxuICAgICAgICAxODogMCAxOHB4IDI4cHggMnB4ICRjb2xvcixcbiAgICAgICAgMTk6IDAgMTlweCAyOXB4IDJweCAkY29sb3IsXG4gICAgICAgIDIwOiAwIDIwcHggMzFweCAzcHggJGNvbG9yLFxuICAgICAgICAyMTogMCAyMXB4IDMzcHggM3B4ICRjb2xvcixcbiAgICAgICAgMjI6IDAgMjJweCAzNXB4IDNweCAkY29sb3IsXG4gICAgICAgIDIzOiAwIDIzcHggMzZweCAzcHggJGNvbG9yLFxuICAgICAgICAyNDogMCAyNHB4IDM4cHggM3B4ICRjb2xvclxuICAgICk7XG59XG5cbi8vLyBMZXZlbCAzIC0gQW1iaWVudCBTaGFkb3dzXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGNvbG9yIC0gVGhlIGNvbG9yIHVzZWQgdG8gZ2VuZXJhdGUgYW1iaWVudCBzaGFkb3dzLlxuLy8vIEByZXR1cm5zIHtNYXB9IFJldHVybnMgYSBtYXAgb2YgMjQgc2hhZG93IGVsZXZhdGlvbnMgd2l0aCB0aGUgYW1iaWVudCBjb2xvci5cbkBmdW5jdGlvbiBfbDMtc2hhZG93cygkY29sb3IpIHtcbiAgICBAcmV0dXJuIChcbiAgICAgICAgMTogMCAycHggMXB4IC0xcHggJGNvbG9yLFxuICAgICAgICAyOiAwIDNweCAxcHggLTJweCAkY29sb3IsXG4gICAgICAgIDM6IDAgM3B4IDNweCAtMnB4ICRjb2xvcixcbiAgICAgICAgNDogMCAxcHggMTBweCAwICRjb2xvcixcbiAgICAgICAgNTogMCAxcHggMTRweCAwICRjb2xvcixcbiAgICAgICAgNjogMCAxcHggMThweCAwICRjb2xvcixcbiAgICAgICAgNzogMCAycHggMTZweCAxcHggJGNvbG9yLFxuICAgICAgICA4OiAwIDNweCAxNHB4IDJweCAkY29sb3IsXG4gICAgICAgIDk6IDAgM3B4IDE2cHggMnB4ICRjb2xvcixcbiAgICAgICAgMTA6IDAgNHB4IDE4cHggM3B4ICRjb2xvcixcbiAgICAgICAgMTE6IDAgNHB4IDIwcHggM3B4ICRjb2xvcixcbiAgICAgICAgMTI6IDAgNXB4IDIycHggNHB4ICRjb2xvcixcbiAgICAgICAgMTM6IDAgNXB4IDI0cHggNHB4ICRjb2xvcixcbiAgICAgICAgMTQ6IDAgNXB4IDI2cHggNHB4ICRjb2xvcixcbiAgICAgICAgMTU6IDAgNnB4IDI4cHggNXB4ICRjb2xvcixcbiAgICAgICAgMTY6IDAgNnB4IDMwcHggNXB4ICRjb2xvcixcbiAgICAgICAgMTc6IDAgNnB4IDMycHggNXB4ICRjb2xvcixcbiAgICAgICAgMTg6IDAgN3B4IDM0cHggNnB4ICRjb2xvcixcbiAgICAgICAgMTk6IDAgN3B4IDM2cHggNnB4ICRjb2xvcixcbiAgICAgICAgMjA6IDAgOHB4IDM4cHggN3B4ICRjb2xvcixcbiAgICAgICAgMjE6IDAgOHB4IDQwcHggN3B4ICRjb2xvcixcbiAgICAgICAgMjI6IDAgOHB4IDQycHggN3B4ICRjb2xvcixcbiAgICAgICAgMjM6IDAgOXB4IDQ0cHggOHB4ICRjb2xvcixcbiAgICAgICAgMjQ6IDAgOXB4IDQ2cHggOHB4ICRjb2xvclxuICAgICk7XG59XG5cbi8vLyBSZXR1cm5zIHNoYWRvdyBiYXNlZCBvbiBlbGV2YXRpb24sIHVtYnJhLCBwZW51bWJyYSwgYW5kIGFtYmllbnQgc2hhZG93IGNvbG9ycy5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0ge251bWJlcn0gJGVsZXZhdGlvbiAtIFRoZSBlbGV2YXRpb24gbGV2ZWwgdG8gZ2VuZXJhdGUgYSBzaGFkb3cgZm9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRsMS1jb2xvciAtIFRoZSB1bWJyYSBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkbDItY29sb3IgLSBUaGUgcGVudW1icmEgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGwzLWNvbG9yIC0gVGhlIGFtYmllbnQgY29sb3IuXG4vLy8gQHJldHVybnMge1N0cmluZ30gLSBBIHN0cmluZyB0byBiZSB1c2VkIGFzIGJveC1zaGFkb3cgdmFsdWUuXG5AZnVuY3Rpb24gX2VsZXZhdGlvbigkZWxldmF0aW9uLCAkbDEtY29sb3IsICRsMi1jb2xvciwgJGwzLWNvbG9yKSB7XG4gICAgQHJldHVybiB1bnF1b3RlKFxuICAgICAgICAnI3ttYXAtZ2V0KF9sMS1zaGFkb3dzKCRsMS1jb2xvciksICRlbGV2YXRpb24pfSxcbiAgICAgICAgI3ttYXAtZ2V0KF9sMi1zaGFkb3dzKCRsMi1jb2xvciksICRlbGV2YXRpb24pfSxcbiAgICAgICAgI3ttYXAtZ2V0KF9sMy1zaGFkb3dzKCRsMy1jb2xvciksICRlbGV2YXRpb24pfSdcbiAgICApO1xufVxuXG4vLy8gUmV0dXJucyBhbiBpZ3ggZWxldmF0aW9uIGZyb20gYW4gaWd4LWVsZXZhdGlvbnMgcHJvZHVjZWQgbWFwLlxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQHBhcmFtIHtNYXB9ICRlbGV2YXRpb25zIC0gVGhlIGlneC1lbGV2YXRpb25zIG1hcCB0byBleHRyYWN0IHRoZSBlbGV2YXRpb24gZnJvbS5cbi8vLyBAcGFyYW0ge251bWJlcn0gJGVsZXZhdGlvbiAtIFRoZSBlbGV2YXRpb24gbGV2ZWwgZnJvbSAxIHRvIDI0LlxuLy8vIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgYSBib3gtc2hhZG93IHZhbHVlLlxuQGZ1bmN0aW9uIGlneC1lbGV2YXRpb24oJGVsZXZhdGlvbnMsICRlbGV2YXRpb24pIHtcbiAgICBAaWYgdHlwZS1vZigkZWxldmF0aW9uKSAhPSBudW1iZXIgb3Igbm90IHVuaXRsZXNzKCRlbGV2YXRpb24pIHtcbiAgICAgICAgQGVycm9yICckZWxldmF0aW9uIG11c3QgYmUgYSBudW1iZXInO1xuICAgIH1cblxuICAgIEBpZiAkZWxldmF0aW9uIDwgMSBvciAkZWxldmF0aW9uID4gMjQge1xuICAgICAgICBAZXJyb3IgJyRlbGV2YXRpb24gbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDI0JztcbiAgICB9XG5cbiAgICBAcmV0dXJuIG1hcC1nZXQoJGVsZXZhdGlvbnMsICN7JGVsZXZhdGlvbn0pO1xufVxuXG4vLy8gR2VuZXJhdGVzIGEgbWFwIG9mIDI0IHNoYWRvd3MuXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAcmVxdWlyZXMgX2VsZXZhdGlvblxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvci0xIC0gVGhlIHVtYnJhIHNoYWRvdyBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkY29sb3ItMiAtIFRoZSBwZW51bWJyYSBzaGFkb3cgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGNvbG9yLTMgLSBUaGUgYW1iaWVudCBzaGFkb3cgY29sb3IuXG5AZnVuY3Rpb24gaWd4LWVsZXZhdGlvbnMoJGNvbG9yLTEsICRjb2xvci0yLCAkY29sb3ItMykge1xuICAgICRyZXN1bHQ6ICgpO1xuXG4gICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAyNCB7XG4gICAgICAgICRlbGV2YXRpb246ICgjeyRpfTogX2VsZXZhdGlvbigkaSwgJGNvbG9yLTEsICRjb2xvci0yLCAkY29sb3ItMykpO1xuICAgICAgICAkcmVzdWx0OiBtYXAtbWVyZ2UoJHJlc3VsdCwgJGVsZXZhdGlvbilcbiAgICB9XG5cbiAgICBAcmV0dXJuICRyZXN1bHQ7XG59XG4iLCIvLy8vXG4vLy8gQGdyb3VwIFV0aWxpdGllc1xuLy8vIEBhdXRob3IgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaW1lb25vZmZcIiB0YXJnZXQ9XCJfYmxhbmtcIj5TaW1lb24gU2ltZW9ub2ZmPC9hPlxuLy8vL1xuXG4vLy8gQ29udmVydHMgcGl4ZWxzIHRvIHJlbGF0aXZlIHZhbHVlcyAoZW0pLlxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSAkcGl4ZWxzIC0gVGhlIHBpeGVsIHZhbHVlIHRvIGJlIGNvbnZlcnRlZC5cbi8vLyBAcGFyYW0ge251bWJlcnxzdHJpbmd9ICRjb250ZXh0IFskYnJvd3Nlci1jb250ZXh0XSAtIFRoZSBiYXNlIGNvbnRleHQgdG8gY29udmVydCBhZ2FpbnN0LlxuQGZ1bmN0aW9uIGVtKCRwaXhlbHMsICRjb250ZXh0OiAkYnJvd3Nlci1jb250ZXh0KSB7XG4gICAgQGlmICh1bml0bGVzcygkcGl4ZWxzKSkge1xuICAgICAgICAkcGl4ZWxzOiAkcGl4ZWxzICogMXB4O1xuICAgIH1cbiAgICBAaWYgKHVuaXRsZXNzKCRjb250ZXh0KSkge1xuICAgICAgICAkY29udGV4dDogJGNvbnRleHQgKiAxcHg7XG4gICAgfVxuICAgIEByZXR1cm4gKCRwaXhlbHMgLyAkY29udGV4dCkgKiAxZW07XG59XG5cbi8vLyBQaXhlbHMgdG8gcm9vdCByZWxhdGl2ZSB2YWx1ZXMgKHJlbSkuXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAcGFyYW0ge251bWJlcnxzdHJpbmd9ICRwaXhlbHMgLSBUaGUgcGl4ZWwgdmFsdWUgdG8gYmUgY29udmVydGVkLlxuLy8vIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gJGNvbnRleHQgWyRicm93c2VyLWNvbnRleHRdIC0gVGhlIGJhc2UgY29udGV4dCB0byBjb252ZXJ0IGFnYWluc3QuXG5AZnVuY3Rpb24gcmVtKCRwaXhlbHMsICRjb250ZXh0OiAkYnJvd3Nlci1jb250ZXh0KSB7XG4gICAgQGlmICh1bml0bGVzcygkcGl4ZWxzKSkge1xuICAgICAgICAkcGl4ZWxzOiAkcGl4ZWxzICogMXB4O1xuICAgIH1cbiAgICBAaWYgKHVuaXRsZXNzKCRjb250ZXh0KSkge1xuICAgICAgICAkY29udGV4dDogJGNvbnRleHQgKiAxcHg7XG4gICAgfVxuICAgIEByZXR1cm4gKCRwaXhlbHMgLyAkY29udGV4dCkgKiAxcmVtO1xufVxuXG4vLy8gQ2FsY3VsYXRlcyB0aGUgbHVtaW5hbmNlIGZvciBhIGdpdmVuIGNvbG9yLlxuLy8vIFNlZSBodHRwczovL3d3dy53My5vcmcvVFIvV0NBRzIwLVRFQ0hTL0cxNy5odG1sI0cxNy10ZXN0cy5cbi8vL1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciAtIFRoZSBjb2xvciB0byBjYWxjdWxhdGUgbHVtaW5hbmNlIGZvci5cbkBmdW5jdGlvbiBsdW1pbmFuY2UoJGNvbG9yKSB7XG4gICAgJHJlZDogbnRoKCRsaW5lYXItY2hhbm5lbC12YWx1ZXMsIHJlZCgkY29sb3IpICsgMSk7XG4gICAgJGdyZWVuOiBudGgoJGxpbmVhci1jaGFubmVsLXZhbHVlcywgZ3JlZW4oJGNvbG9yKSArIDEpO1xuICAgICRibHVlOiBudGgoJGxpbmVhci1jaGFubmVsLXZhbHVlcywgYmx1ZSgkY29sb3IpICsgMSk7XG5cbiAgICBAcmV0dXJuIC4yMTI2ICogJHJlZCArIC43MTUyICogJGdyZWVuICsgLjA3MjIgKiAkYmx1ZTtcbn1cblxuLy8vIENhbGN1bGF0ZXMgdGhlIGNvbnRyYXN0IHJhdGlvIGJldHdlZW4gdHdvIGNvbG9ycy5cbi8vLyBTZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL1dDQUcyMC1URUNIUy9HMTcuaHRtbCNHMTctdGVzdHNcbi8vL1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRiYWNrZ3JvdW5kIC0gVGhlIGJhY2tncm91bmQgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGZvcmVncm91bmQgLSBUaGUgZm9yZWdyb3VuZCBjb2xvci5cbi8vLyBAcmV0dXJucyB7TnVtYmVyfSAtIFRoZSBjb250cmFzdCByYXRpbyBiZXR3ZWVuIHRoZSBiYWNrZ3JvdW5kIGFuZCBmb3JlZ3JvdW5kIGNvbG9ycy5cbkBmdW5jdGlvbiBjb250cmFzdCgkYmFja2dyb3VuZCwgJGZvcmVncm91bmQpIHtcbiAgICAkYmFja0x1bTogbHVtaW5hbmNlKCRiYWNrZ3JvdW5kKSArIC4wNTtcbiAgICAkZm9yZUx1bTogbHVtaW5hbmNlKCRmb3JlZ3JvdW5kKSArIC4wNTtcblxuICAgIEByZXR1cm4gbWF4KCRiYWNrTHVtLCAkZm9yZUx1bSkgLyBtaW4oJGJhY2tMdW0sICRmb3JlTHVtKTtcbn1cblxuLy8vIEdlbmVyYXRlcyBhIGNvbG9yIHNoYWRlIGZyb20gYmFzZSBjb2xvciBhbmQgc2F0dXJhdGlvbiBsZXZlbC5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAZ3JvdXAgUGFsZXR0ZXNcbi8vLyBAcGFyYW0ge0NvbG9yfSAkY29sb3IgLSBUaGUgYmFzZSBjb2xvciB0byBiZSB1c2VkIHRvIGdlbmVyYXRlIGEgY29sb3Igc2hhZGUuXG4vLy8gQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSAkc2F0dXJhdGlvbiAtIFRoZSBzYXR1cmF0aW9uIGxldmVsIHVzZWQgdG8gY3JlYXRlIHRoZSBjb2xvciBzaGFkZS5cbkBmdW5jdGlvbiBnZW4tY29sb3IoJGNvbG9yLCAkc2F0dXJhdGlvbikge1xuICAgIEBpZiAoJHNhdHVyYXRpb24gPT0gNTApIHtcbiAgICAgICAgQHJldHVybiBsaWdodGVuKHNhdHVyYXRlKCRjb2xvciwgMTAuNCksIDM3LjcpO1xuICAgIH0gQGVsc2UgaWYgKCRzYXR1cmF0aW9uID09IDEwMCkge1xuICAgICAgICBAcmV0dXJuIGxpZ2h0ZW4oZGVzYXR1cmF0ZSgkY29sb3IsIDEwLjQpLCAzMS44KTtcbiAgICB9IEBlbHNlIGlmICgkc2F0dXJhdGlvbiA9PSAyMDApIHtcbiAgICAgICAgQHJldHVybiBsaWdodGVuKGRlc2F0dXJhdGUoJGNvbG9yLCAxNyksIDE4LjcpO1xuICAgIH0gQGVsc2UgaWYgKCRzYXR1cmF0aW9uID09IDMwMCkge1xuICAgICAgICBAcmV0dXJuIGxpZ2h0ZW4oZGVzYXR1cmF0ZSgkY29sb3IsIDEyLjkpLCA5LjEpO1xuICAgIH0gQGVsc2UgaWYgKCRzYXR1cmF0aW9uID09IDQwMCkge1xuICAgICAgICBAcmV0dXJuIGxpZ2h0ZW4oZGVzYXR1cmF0ZSgkY29sb3IsIDYuNiksIDQuMSk7XG4gICAgfSBAZWxzZSBpZiAoJHNhdHVyYXRpb24gPT0gNjAwKSB7XG4gICAgICAgIEByZXR1cm4gZGFya2VuKHNhdHVyYXRlKCRjb2xvciwgMTIuNCksIDUuMSk7XG4gICAgfSBAZWxzZSBpZiAoJHNhdHVyYXRpb24gPT0gNzAwKSB7XG4gICAgICAgIEByZXR1cm4gZGFya2VuKHNhdHVyYXRlKCRjb2xvciwgMjQuNSksIDguOCk7XG4gICAgfSBAZWxzZSBpZiAoJHNhdHVyYXRpb24gPT0gODAwKSB7XG4gICAgICAgIEByZXR1cm4gZGFya2VuKHNhdHVyYXRlKCRjb2xvciwgMjMuMiksIDEyLjcpO1xuICAgIH0gQGVsc2UgaWYgKCRzYXR1cmF0aW9uID09IDkwMCkge1xuICAgICAgICBAcmV0dXJuIGRhcmtlbihzYXR1cmF0ZSgkY29sb3IsIDE2LjEpLCAxNyk7XG4gICAgfSBAZWxzZSBpZiAoJHNhdHVyYXRpb24gPT0gJ0ExMDAnKSB7XG4gICAgICAgIEByZXR1cm4gbGlnaHRlbihzYXR1cmF0ZSgkY29sb3IsIDEwLjQpLCAxNi43KTtcbiAgICB9IEBlbHNlIGlmICgkc2F0dXJhdGlvbiA9PSAnQTIwMCcpIHtcbiAgICAgICAgQHJldHVybiBsaWdodGVuKHNhdHVyYXRlKCRjb2xvciwgMTAuNCksIDcuNyk7XG4gICAgfSBAZWxzZSBpZiAoJHNhdHVyYXRpb24gPT0gJ0E0MDAnKSB7XG4gICAgICAgIEByZXR1cm4gZGFya2VuKHNhdHVyYXRlKCRjb2xvciwgMTAuNCksIDMuOSk7XG4gICAgfSBAZWxzZSBpZiAoJHNhdHVyYXRpb24gPT0gJ0E3MDAnKSB7XG4gICAgICAgIEByZXR1cm4gZGFya2VuKHNhdHVyYXRlKCRjb2xvciwgMTAuNCksIDE2LjYpO1xuICAgIH1cbn1cblxuLy8vIFJldHJpZXZlcyBhIGNvbG9yIGZyb20gYSBjb2xvciBwYWxldHRlLlxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIFBhbGV0dGVzXG4vLy8gQHBhcmFtIHtNYXB9ICRwYWxldHRlIC0gVGhlIHNvdXJjZSBwYWxldHRlIG1hcC5cbi8vLyBAcGFyYW0ge3N0cmluZ30gJGNvbG9yIC0gVGhlIHRhcmdldCBjb2xvciBmcm9tIHRoZSBjb2xvciBwYWxldHRlLlxuLy8vIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gJHZhcmlhbnQgWzUwMF0gLSBUaGUgdGFyZ2V0IGNvbG9yIHNoYWRlIGZyb20gdGhlIGNvbG9yIHBhbGV0dGUuXG4vLy8gQHJldHVybnMge0NvbG9yfSBXaGl0ZSBpZiBubyBwYWxldHRlLCBjb2xvciwgYW5kIHZhcmlhbnQgbWF0Y2hlcyBmb3VuZC5cbkBmdW5jdGlvbiBpZ3gtY29sb3IoJHBhbGV0dGUsICRjb2xvciwgJHZhcmlhbnQ6IDUwMCkge1xuICAgIEBpZiBtYXAtZXhpc3RzKCRwYWxldHRlKSBhbmQgbWFwLWtleS1leGlzdHMoJHBhbGV0dGUsICRjb2xvcikgYW5kIG1hcC1rZXktZXhpc3RzKCRjb2xvciwgJHZhcmlhbnQpIHtcbiAgICAgICAgQHJldHVybiBtYXAtZ2V0KG1hcC1nZXQoJHBhbGV0dGUsICRjb2xvciksICR2YXJpYW50KTtcbiAgICB9XG4gICAgQHJldHVybiAjZmZmO1xufVxuXG4vLy8gUmV0cmlldmVzIGEgY29udHJhc3QgdGV4dCBjb2xvciBmb3IgYSBnaXZlbiBjb2xvciBmcm9tIGEgY29sb3IgcGFsZXR0ZS5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBncm91cCBQYWxldHRlc1xuLy8vIEBwYXJhbSB7TWFwfSAkcGFsZXR0ZSAtIFRoZSBzb3VyY2UgcGFsZXR0ZSBtYXAuXG4vLy8gQHBhcmFtIHtzdHJpbmd9ICRjb2xvciAtIFRoZSB0YXJnZXQgY29sb3IgZnJvbSB0aGUgY29sb3IgcGFsZXR0ZS5cbi8vLyBAcGFyYW0ge251bWJlcnx2YXJpYW50fSAkdmFyaWFudCAtIFRoZSB0YXJnZXQgY29sb3Igc2hhZGUgZnJvbSB0aGUgY29sb3IgcGFsZXR0ZS5cbi8vLyBAcmV0dXJucyB7Q29sb3J9IFsjZmZmXSAtIFJldHVybnMgd2hpdGUgaWYgbm93IHBhbGV0dGUsIGNvbG9yIGFuZC9vciB2YXJpYW50IG1hdGNoZXMgZm91bmQuXG5AZnVuY3Rpb24gaWd4LWNvbnRyYXN0LWNvbG9yKCRwYWxldHRlLCAkY29sb3IsICR2YXJpYW50OiA1MDApIHtcbiAgICBAaWYgbWFwLWV4aXN0cygkcGFsZXR0ZSkgYW5kIG1hcC1rZXktZXhpc3RzKCRwYWxldHRlLCAkY29sb3IpIGFuZCBtYXAta2V5LWV4aXN0cygkY29sb3IsICR2YXJpYW50KSB7XG4gICAgICAgIEByZXR1cm4gbWFwLWdldChtYXAtZ2V0KG1hcC1nZXQoJHBhbGV0dGUsICRjb2xvciksICdjb250cmFzdCcpLCAkdmFyaWFudCk7XG4gICAgfVxuICAgIEByZXR1cm4gI2ZmZjtcbn1cblxuLy8vIFJldHVybnMgYSBjb250cmFzdCBjb2xvciBmb3IgYSBwYXNzZWQgY29sb3IuXG4vLy8gQGFjY2VzcyBwdWJsaWNcbi8vLyBAZ3JvdXAgUGFsZXR0ZXNcbi8vLyBAcGFyYW0ge0NvbG9yfSAkY29sb3IgLSBUaGUgY29sb3IgdXNlZCB0byByZXR1cm4gYSBjb250cmFzdCBjb2xvciBmb3IuXG4vLy8gQHJldHVybnMge0NvbG9yfSAtIFJldHVybnMgZWl0aGVyIHdoaXRlIG9yIGJsYWNrIGRlcGVuZGluZyBvbiB0aGUgbHVtaW5hbmNlIG9mIHRoZSBpbnB1dCBjb2xvci5cbkBmdW5jdGlvbiB0ZXh0LWNvbnRyYXN0KCRjb2xvcikge1xuICAgICRsaWdodENvbnRyYXN0OiBjb250cmFzdCgkY29sb3IsIHdoaXRlKTtcbiAgICAkZGFya0NvbnRyYXN0OiBjb250cmFzdCgkY29sb3IsIGJsYWNrKTtcblxuICAgIEBpZiAoJGxpZ2h0Q29udHJhc3QgPiAkZGFya0NvbnRyYXN0KSB7XG4gICAgICAgIEByZXR1cm4gd2hpdGU7XG4gICAgfSBAZWxzZSB7XG4gICAgICAgIEByZXR1cm4gYmxhY2s7XG4gICAgfVxufVxuXG4vLy8gVGVzdCBpZiBgJHZhbHVlYCBpcyBhIHZhbGlkIGRpcmVjdGlvbi5cbi8vLyBAYWNjZXNzIHByaXZhdGVcbi8vLyBAcGFyYW0geyp9ICR2YWx1ZSAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuLy8vIEByZXR1cm4ge0Jvb2x9XG5AZnVuY3Rpb24gaXMtZGlyZWN0aW9uKCR2YWx1ZSkge1xuICAgICRpcy1rZXl3b3JkOiBpbmRleCggKCB0byB0b3AsIHRvIHRvcCByaWdodCwgdG8gcmlnaHQgdG9wLCB0byByaWdodCwgdG8gYm90dG9tIHJpZ2h0LCB0byByaWdodCBib3R0b20sIHRvIGJvdHRvbSwgdG8gYm90dG9tIGxlZnQsIHRvIGxlZnQgYm90dG9tLCB0byBsZWZ0LCB0byBsZWZ0IHRvcCwgdG8gdG9wIGxlZnQpLCAkdmFsdWUpO1xuICAgICRpcy1hbmdsZTogdHlwZS1vZigkdmFsdWUpPT0nbnVtYmVyJyBhbmQgaW5kZXgoJ2RlZycgJ2dyYWQnICd0dXJuJyAncmFkJywgdW5pdCgkdmFsdWUpKTtcbiAgICBAcmV0dXJuICRpcy1rZXl3b3JkIG9yICRpcy1hbmdsZTtcbn1cblxuLy8vIFRlc3QgaWYgYSBjb21wb25lbnQsIG9yIGxpc3Qgb2YgY29tcG9uZW50c1xuLy8vIGlzIGluIHRoZSBsaXN0IG9mIGtub3duIGNvbXBvbmVudHMuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtTdHJpbmd8TGlzdH0gJGV4Y2x1ZGVzIC0gVGhlIGNvbXBvbmVudHMgbGlzdCB0byBjaGVjayBpbi5cbi8vLyBAcmV0dXJuIHtMaXN0fSAtIFRoZSBsaXN0IG9mIHBhc3NlZCBpdGVtcy5cbkBmdW5jdGlvbiBpcy1jb21wb25lbnQoJGl0ZW1zKSB7XG4gICAgJHJlZ2lzdGVyOiBtYXAta2V5cygkY29tcG9uZW50cyk7XG4gICAgQGVhY2ggJGl0ZW0gaW4gJGl0ZW1zIHtcbiAgICAgICAgQGlmIG5vdChpbmRleCgkcmVnaXN0ZXIsICRpdGVtKSkge1xuICAgICAgICAgICAgQGVycm9yIHVucXVvdGUoJ0NhblxcJ3QgZXhjbHVkZSBcIiN7JGl0ZW19XCIgYmVjYXVzZSBpdCBpcyBub3QgaW4gdGhlIGxpc3Qgb2Yga25vd24gY29tcG9uZW50cy4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBAcmV0dXJuICRpdGVtcztcbn1cblxuLy8vIENvbnZlcnRzIG51bWJlcnMgdG8gSEVYIHZhbHVlIHN0cmluZ3MuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtudW1iZXJ9ICRudW0gLSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4vLy8gQHBhcmFtIHtyYWRpeH0gJHJhZGl4IC0gVGhlIGJhc2UgcmFkaXggdG8gdXNlIGZvciB0aGUgY29udmVyc2lvbi5cbi8vLyBAcmV0dXJuIHtTdHJpbmd9IC0gVGhlIHJlc3VsdGluZyBzdHJpbmcuXG5AZnVuY3Rpb24gdG8tc3RyaW5nKCRudW0sICRyYWRpeDogMTYpIHtcbiAgICAkY2hhcnM6ICcwMTIzNDU2Nzg5YWJjZGVmJztcbiAgICAkcmVzdWx0OiAnJztcbiAgICAkc2lnbjogJyc7XG4gICAgQGlmICRudW0gPCAwIHtcbiAgICAgICAgJHNpZ246ICctJztcbiAgICAgICAgJG51bTogYWJzKCRudW0pO1xuICAgIH1cbiAgICBAaWYgJG51bSA+PSAwIGFuZCAkbnVtIDwgJHJhZGl4IHtcbiAgICAgICAgQHJldHVybiAkc2lnbiArIHN0ci1zbGljZSgkY2hhcnMsICgkbnVtICsgMSksICgkbnVtICsgMSkpO1xuICAgIH1cbiAgICAkcTogJG51bTtcbiAgICBAd2hpbGUgJHEgIT0wIHtcbiAgICAgICAgJHI6ICRxICUgJHJhZGl4O1xuICAgICAgICAkcTogZmxvb3IoJHEgLyAkcmFkaXgpO1xuICAgICAgICAkcmVzdWx0OiBzdHItc2xpY2UoJGNoYXJzLCAoJHIgKyAxKSwgKCRyICsgMSkpICsgJHJlc3VsdDtcbiAgICB9XG4gICAgQHJldHVybiAkc2lnbiArICRyZXN1bHQ7XG59XG5cbi8vLyBDb252ZXJ0cyBhIHJnYmEgY29sb3IgdG8gYSBoZXhpZGVjaW1hbCBjb2xvci5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEByZXF1aXJlcyB7ZnVuY3Rpb259IHRvLXN0cmluZ1xuLy8vIEBwYXJhbSB7Q29sb3J9ICRyZ2JhIC0gVGhlIHJnYmEgY29sb3IgdG8gY29udmVydC5cbi8vLyBAcmV0dXJuIHtDb2xvcn0gLSBUaGUgaGV4aWRlY2ltYWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHJnYmEgdmFsdWUuXG5AZnVuY3Rpb24gaGV4cmdiYSgkcmdiYSkge1xuICAgIEBpZiB0eXBlLW9mKCRyZ2JhKSA9PSBjb2xvciB7XG4gICAgICAgICRyZWQ6IHJlZCgkcmdiYSk7XG4gICAgICAgICRncmVlbjogZ3JlZW4oJHJnYmEpO1xuICAgICAgICAkYmx1ZTogYmx1ZSgkcmdiYSk7XG4gICAgICAgICRhOiBhbHBoYSgkcmdiYSk7XG4gICAgICAgICRyOiBmbG9vcigkYSAqICRyZWQgKyAoMSAtICRhKSAqIDI1NSk7XG4gICAgICAgICRnOiBmbG9vcigkYSAqICRncmVlbiArICgxIC0gJGEpICogMjU1KTtcbiAgICAgICAgJGI6IGZsb29yKCRhICogJGJsdWUgKyAoMSAtICRhKSAqIDI1NSk7XG4gICAgICAgIEByZXR1cm4gcmdiKCRyLCAkZywgJGIpO1xuICAgIH1cbiAgICBAcmV0dXJuICRyZ2JhO1xufVxuXG4vLy8gRXh0ZW5kcyBhIE1hcCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyBvZiBhbm90aGVyIE1hcCBvYmplY3QuXG4vLy8gQGFjY2VzcyBwcml2YXRlXG4vLy8gQHBhcmFtIHtNYXB9ICRtYXAxIC0gVGhlIHNvdXJjZSBtYXAgdG8gZ2V0IGV4dGVuZGVkLlxuLy8vIEBwYXJhbSB7TWFwfSAkbWFwMiAtIFRoZSBtYXAgZXh0ZW5kaW5nIHRoZSBzb3VyY2UgbWFwLlxuLy8vIEByZXR1cm5zIHtNYXB9IC0gUmV0dXJucyB0aGUgb3JpZ2luYWwgbWFwIGV4dGVuZGVkIHdpdGggdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNlY29uZCBtYXAuXG5AZnVuY3Rpb24gZXh0ZW5kKCRtYXAxLCAkbWFwMikge1xuICAgICRyZXN1bHQ6ICgpO1xuICAgIEBlYWNoICRrZXksICR2YWx1ZSBpbiAkbWFwMiB7XG4gICAgICAgIEBpZiBub3QoJHZhbHVlKSB7XG4gICAgICAgICAgICAkcmVzdWx0OiBtYXAtbWVyZ2UoJHJlc3VsdCwgKFxuICAgICAgICAgICAgICAgICN7JGtleX06IG1hcC1nZXQoJG1hcDEsICRrZXkpXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICAkcmVzdWx0OiBtYXAtbWVyZ2UoJHJlc3VsdCwgKFxuICAgICAgICAgICAgICAgICN7JGtleX06ICR2YWx1ZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHJlc3VsdDogbWFwLW1lcmdlKCRtYXAxLCAkcmVzdWx0KTtcbiAgICBAcmV0dXJuICRyZXN1bHQ7XG59XG5cbi8vLyBHZW5lcmF0ZXMgYSBNYXRlcmlhbC1saWtlIGNvbG9yIHBhbGV0dGUgZm9yIGEgc2luZ2xlIGNvbG9yLlxuLy8vIEBhY2Nlc3MgcHJpdmF0ZVxuLy8vIEBncm91cCBQYWxldHRlc1xuLy8vIEByZXF1aXJlcyB7ZnVuY3Rpb259IGdlbi1jb2xvclxuLy8vIEBwYXJhbSB7Q29sb3J9ICRjb2xvciAtIFRoZSBiYXNlIGNvbG9yIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHBhbGV0dGUuXG4vLy8gQHJldHVybnMge01hcH0gLSBBIG1hcCBjb25zaXN0aW5nIG9mIDI2IGNvbG9yIHZhcmlhdGlvbnMuXG5AZnVuY3Rpb24gZ2VuZXJhdGUtcGFsZXR0ZSgkY29sb3IpIHtcbiAgICBAcmV0dXJuIChcbiAgICAgICAgNTA6IGdlbi1jb2xvcigkY29sb3IsIDUwKSxcbiAgICAgICAgMTAwOiBnZW4tY29sb3IoJGNvbG9yLCAxMDApLFxuICAgICAgICAyMDA6IGdlbi1jb2xvcigkY29sb3IsIDIwMCksXG4gICAgICAgIDMwMDogZ2VuLWNvbG9yKCRjb2xvciwgMzAwKSxcbiAgICAgICAgNDAwOiBnZW4tY29sb3IoJGNvbG9yLCA0MDApLFxuICAgICAgICA1MDA6ICRjb2xvcixcbiAgICAgICAgNjAwOiBnZW4tY29sb3IoJGNvbG9yLCA2MDApLFxuICAgICAgICA3MDA6IGdlbi1jb2xvcigkY29sb3IsIDcwMCksXG4gICAgICAgIDgwMDogZ2VuLWNvbG9yKCRjb2xvciwgODAwKSxcbiAgICAgICAgOTAwOiBnZW4tY29sb3IoJGNvbG9yLCA5MDApLFxuICAgICAgICBBMTAwOiBnZW4tY29sb3IoJGNvbG9yLCAnQTEwMCcpLFxuICAgICAgICBBMjAwOiBnZW4tY29sb3IoJGNvbG9yLCAnQTIwMCcpLFxuICAgICAgICBBNDAwOiBnZW4tY29sb3IoJGNvbG9yLCAnQTQwMCcpLFxuICAgICAgICBBNzAwOiBnZW4tY29sb3IoJGNvbG9yLCAnQTcwMCcpLFxuICAgICAgICBjb250cmFzdDogKFxuICAgICAgICAgICAgNTA6IHRleHQtY29udHJhc3QoZ2VuLWNvbG9yKCRjb2xvciwgNTApKSxcbiAgICAgICAgICAgIDEwMDogdGV4dC1jb250cmFzdChnZW4tY29sb3IoJGNvbG9yLCAxMDApKSxcbiAgICAgICAgICAgIDIwMDogdGV4dC1jb250cmFzdChnZW4tY29sb3IoJGNvbG9yLCAyMDApKSxcbiAgICAgICAgICAgIDMwMDogdGV4dC1jb250cmFzdChnZW4tY29sb3IoJGNvbG9yLCAzMDApKSxcbiAgICAgICAgICAgIDQwMDogdGV4dC1jb250cmFzdChnZW4tY29sb3IoJGNvbG9yLCA0MDApKSxcbiAgICAgICAgICAgIDUwMDogdGV4dC1jb250cmFzdCgkY29sb3IpLFxuICAgICAgICAgICAgNjAwOiB0ZXh0LWNvbnRyYXN0KGdlbi1jb2xvcigkY29sb3IsIDYwMCkpLFxuICAgICAgICAgICAgNzAwOiB0ZXh0LWNvbnRyYXN0KGdlbi1jb2xvcigkY29sb3IsIDcwMCkpLFxuICAgICAgICAgICAgODAwOiB0ZXh0LWNvbnRyYXN0KGdlbi1jb2xvcigkY29sb3IsIDgwMCkpLFxuICAgICAgICAgICAgOTAwOiB0ZXh0LWNvbnRyYXN0KGdlbi1jb2xvcigkY29sb3IsIDkwMCkpLFxuICAgICAgICAgICAgQTEwMDogdGV4dC1jb250cmFzdChnZW4tY29sb3IoJGNvbG9yLCAnQTEwMCcpKSxcbiAgICAgICAgICAgIEEyMDA6IHRleHQtY29udHJhc3QoZ2VuLWNvbG9yKCRjb2xvciwgJ0EyMDAnKSksXG4gICAgICAgICAgICBBNDAwOiB0ZXh0LWNvbnRyYXN0KGdlbi1jb2xvcigkY29sb3IsICdBNDAwJykpLFxuICAgICAgICAgICAgQTcwMDogdGV4dC1jb250cmFzdChnZW4tY29sb3IoJGNvbG9yLCAnQTcwMCcpKSxcbiAgICAgICAgKVxuICAgICk7XG59XG5cbi8vLyBHZW5lcmF0ZXMgYSBjb2xvciBwYWxldHRlLlxuLy8vIEBhY2Nlc3MgcHVibGljXG4vLy8gQGdyb3VwIFBhbGV0dGVzXG4vLy8gQHJlcXVpcmVzIHtmdW5jdGlvbn0gZ2VuZXJhdGUtcGFsZXR0ZVxuLy8vIEBwYXJhbSB7Q29sb3J9ICRwcmltYXJ5IC0gVGhlIHByaW1hcnkgY29sb3IgdXNlZCB0byBnZW5lcmF0ZSB0aGUgcHJpbWFyeSBjb2xvciBwYWxldHRlLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRzZWNvbmRhcnkgLSBUaGUgc2Vjb25kYXJ5IGNvbG9yIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHNlY29uZGFyeSBjb2xvciBwYWxldHRlLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRpbmZvIFsjMTM3N2Q1XSAtIFRoZSBpbmZvcm1hdGlvbiBjb2xvciB1c2VkIHRocm91Z2hvdXQgdGhlIGFwcGxpY2F0aW9uLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRzdWNjZXNzIFsjNGViODYyXSAtIFRoZSBzdWNjZXNzIGNvbG9yIHVzZWQgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24uXG4vLy8gQHBhcmFtIHtDb2xvcn0gJHdhcm4gWyNmYmIxM2NdIC0gVGhlIHdhcm5pbmcgY29sb3IgdXNlZCB0aHJvdWdob3V0IHRoZSBhcHBsaWNhdGlvbi5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZXJyb3IgWyNmZjEzNGFdIC0gVGhlIGVycm9yIGNvbG9yIHVzZWQgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24uXG4vLy8gQHJldHVybnMge01hcH0gLSBBIG1hcCBjb25zaXN0aW5nIG9mIDc0IGNvbG9yIHZhcmlhdGlvbnMsIGluY2x1ZGluZyB0aGUgYHByaW1hcnlgLCBgc2Vjb25kYXJ5YCwgYGdyYXlzYCxcbi8vLyBgaW5mb2AsIGBzdWNjZXNzYCwgYHdhcm5gLCBhbmQgYGVycm9yYCBjb2xvcnMuXG5AZnVuY3Rpb24gaWd4LXBhbGV0dGUoXG4gICAgJHByaW1hcnksXG4gICAgJHNlY29uZGFyeSxcbiAgICAkaW5mbzogIzEzNzdkNSxcbiAgICAkc3VjY2VzczogIzRlYjg2MixcbiAgICAkd2FybjogI2ZiYjEzYyxcbiAgICAkZXJyb3I6ICNmZjEzNGFcbikge1xuICAgICRwcmltYXJ5LXBhbGV0dGU6IGdlbmVyYXRlLXBhbGV0dGUoJHByaW1hcnkpO1xuICAgICRzZWNvbmRhcnktcGFsZXR0ZTogZ2VuZXJhdGUtcGFsZXR0ZSgkc2Vjb25kYXJ5KTtcblxuICAgIC8vIEBkZWJ1ZyAnUHJpbWFyeSBDb2xvcnMgUGFsZXR0ZTogI3skcHJpbWFyeS1wYWxldHRlfSc7XG4gICAgLy8gQGRlYnVnICdzZWNvbmRhcnkgQ29sb3JzIFBhbGV0dGU6ICN7JHNlY29uZGFyeS1wYWxldHRlfSc7XG4gICAgLy8gQGRlYnVnICdXYXJuIENvbG9ycyBQYWxldHRlOiAjeyR3YXJuLXBhbGV0dGV9JztcblxuICAgIEByZXR1cm4gKFxuICAgICAgICBwcmltYXJ5OiAkcHJpbWFyeS1wYWxldHRlLFxuICAgICAgICBzZWNvbmRhcnk6ICRzZWNvbmRhcnktcGFsZXR0ZSxcbiAgICAgICAgaW5mbzogKDUwMDogJGluZm8pLFxuICAgICAgICBzdWNjZXNzOiAoNTAwOiAkc3VjY2VzcyksXG4gICAgICAgIHdhcm46ICg1MDA6ICR3YXJuKSxcbiAgICAgICAgZXJyb3I6ICg1MDA6ICRlcnJvciksXG4gICAgICAgIGdyYXlzOiAoXG4gICAgICAgICAgICA1MDogcmdiYSgwLCAwLCAwLCAuMDIpLFxuICAgICAgICAgICAgMTAwOiByZ2JhKDAsIDAsIDAsIC4wNCksXG4gICAgICAgICAgICAyMDA6IHJnYmEoMCwgMCwgMCwgLjA4KSxcbiAgICAgICAgICAgIDMwMDogcmdiYSgwLCAwLCAwLCAuMTIpLFxuICAgICAgICAgICAgNDAwOiByZ2JhKDAsIDAsIDAsIC4yNiksXG4gICAgICAgICAgICA1MDA6IHJnYmEoMCwgMCwgMCwgLjM4KSxcbiAgICAgICAgICAgIDYwMDogcmdiYSgwLCAwLCAwLCAuNTQpLFxuICAgICAgICAgICAgNzAwOiByZ2JhKDAsIDAsIDAsIC42MiksXG4gICAgICAgICAgICA4MDA6IHJnYmEoMCwgMCwgMCwgLjc0KSxcbiAgICAgICAgICAgIDkwMDogcmdiYSgwLCAwLCAwLCAuODcpLFxuICAgICAgICAgICAgY29udHJhc3Q6IChcbiAgICAgICAgICAgICAgICA1MDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjAyKSkpLFxuICAgICAgICAgICAgICAgIDEwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjA0KSkpLFxuICAgICAgICAgICAgICAgIDIwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjA4KSkpLFxuICAgICAgICAgICAgICAgIDMwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjEyKSkpLFxuICAgICAgICAgICAgICAgIDQwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjI2KSkpLFxuICAgICAgICAgICAgICAgIDUwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjM4KSkpLFxuICAgICAgICAgICAgICAgIDYwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjU0KSkpLFxuICAgICAgICAgICAgICAgIDcwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjYyKSkpLFxuICAgICAgICAgICAgICAgIDgwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjc0KSkpLFxuICAgICAgICAgICAgICAgIDkwMDogdGV4dC1jb250cmFzdChoZXhyZ2JhKHJnYmEoMCwgMCwgMCwgLjg3KSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgKTtcbn1cblxuLy8vIFJldHVybnMgYSBzdHJpbmcgZnJvbSB0aGUgZWxlbWVudHMgb2YgYSBsaXN0LlxuLy8vIFdvcmtzIHJlY3Vyc2l2ZWx5IHNvIHRoZSBlbGVtZW50cyBjYW4gYmUgbGlzdHMgdGhlbXNlbHZlcy5cbi8vLyBAcGFyYW0ge0xpc3R9ICRsaXN0IFtudWxsXSAtIEEgbGlzdCBvZiBlbGVtZW50cyB0byBiZSB0dXJuZWQgaW50byBhIHN0cmluZy5cbi8vLyBAcGFyYW0ge1N0cmluZ30gJGdsdWUgWycnXSAtIEEgc3RyaW5nIHN5bWJvbCB0byBqb2luIHRoZSBlbGVtZW50cyBieS5cbkBmdW5jdGlvbiBpbXBsb2RlKCRsaXN0LCAkZ2x1ZTogJycpIHtcbiAgICAkcmVzdWx0OiBudWxsO1xuICAgIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggbGVuZ3RoKCRsaXN0KSB7XG4gICAgICAgICRlOiBudGgoJGxpc3QsICRpKTtcbiAgICAgICAgQGlmIHR5cGUtb2YoJGUpID09IGxpc3Qge1xuICAgICAgICAgICAgJHJlc3VsdDogJHJlc3VsdCN7aW1wbG9kZSgkZSwgJGdsdWUpfTtcbiAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICAkcmVzdWx0OiBpZihcbiAgICAgICAgICAgICAgICAkaSAhPSBsZW5ndGgoJGxpc3QpLFxuICAgICAgICAgICAgICAgICRyZXN1bHQjeyRlfSN7JGdsdWV9LFxuICAgICAgICAgICAgICAgICRyZXN1bHQjeyRlfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBAcmV0dXJuICRyZXN1bHQ7XG59XG5cbi8vLyBSZXR1cm5zIGEgQ1NTIHByb3BlcnR5IHZhbHVlLiBJdCBjb3VsZCByZXR1cm4gZWl0aGVyIGNzcyAnLS12YXInIG9yXG4vLy8gYSBwbGFpbiBzdHJpbmcgdmFsdWUgYmFzZWQgb24gdGhlbWUgY29uZmlndXJhdGlvbi5cbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBwYXJhbSB7bWFwfSAkbWFwIC0gVGhlIHNvdXJjZSB0aGVtZSB0byBiZSB1c2VkIHRvIHJlYWQgdmFsdWVzIGZyb20uXG4vLy8gQHBhcmFtIHtzdHJpbmd9ICRrZXkgLSBBIGtleSBmcm9tIHRoZSB0aGVtZSBtYXAgdG8gYXNzaWduIGFzIHZhbHVlIHRvIHRoZSBwcm9wZXJ0eS5cbi8vLyBAZXhhbXBsZSBzY3NzIEFzc2lnbiB0aGUgY29sb3IgcHJvcGVydHkgaW4gYSBydWxlLXNldCB0byBhIHZhbHVlIGZyb20gdGhlIGRlZmF1bHQgYXZhdGFyIHRoZW1lLlxuLy8vICAgJWlneC1hdmF0YXItaWNvbiB7XG4vLy8gICAgIGNvbG9yOiAtLXZhcigkYXZhdGFyLXRoZW1lLCAnaWNvbi1jb2xvcicpO1xuLy8vICAgfVxuLy8vICAgLy8gSWYgbGVnYWN5LXN1cHBvcnQgaXMgb2ZmLCBpdCB3aWxsIHByb2R1Y2UgdGhlIGZvbGxvd2luZzpcbi8vLyAgIC8vICVpZ3gtYXZhdGFyLWljb24ge1xuLy8vICAgLy8gICBjb2xvcjogdmFyKC0taWd4LWF2YXRhci1pY29uLWNvbG9yKTtcbi8vLyAgIC8vIH1cbi8vLyAgIC8vIG90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIHZhbHVlIGZvciBrZXkgJ2ljb24tY29sb3InIGluIHRoZSAnJGF2YXRhci10aGVtZSc7XG4vLy8gQHJldHVybnMge1N0cmluZ30gLSBUaGUgdmFsdWUgb2YgdGhlIGtleSBpbiB0aGUgcGFzc2VkIG1hcCwgb3IgdGhlIG5hbWUgb2Yga2V5IGNvbmNhdGVuYXRlZCB3aXRoIHRoZSBrZXkgbmFtZS5cbkBmdW5jdGlvbiAtLXZhcigkbWFwLCAka2V5KSB7XG4gICAgJGlneC1sZWdhY3ktc3VwcG9ydDogaWYoZ2xvYmFsLXZhcmlhYmxlLWV4aXN0cygnaWd4LWxlZ2FjeS1zdXBwb3J0JyksICRpZ3gtbGVnYWN5LXN1cHBvcnQsIHRydWUpO1xuXG4gICAgQGlmIG1hcC1oYXMta2V5KCRtYXAsICRrZXkpIHtcbiAgICAgICAgQGlmICRpZ3gtbGVnYWN5LXN1cHBvcnQgPT0gZmFsc2Uge1xuICAgICAgICAgICAgQHJldHVybiB1bnF1b3RlKCd2YXIoLS0je21hcC1nZXQoJG1hcCwgJ25hbWUnKX0tI3ska2V5fSknKTtcbiAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICBAcmV0dXJuIG1hcC1nZXQoJG1hcCwgJGtleSk7XG4gICAgICAgIH1cbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGVycm9yIHVucXVvdGUoJ1RoZSBtYXAgeW91IHBhc3NlZCBkb2VzIG5vdCBjb250YWluIGEga2V5ICN7JGtleX0nKTtcbiAgICB9XG59XG5cbi8vLyBTcGxpdHMgYSBzdHJpbmcgaW50byBhIGxpc3QgYnkgYSBnaXZlbiBzZXBhcmF0b3IuXG4vLy8gQHBhcmFtIHtzdHJpbmd9ICRzdHJpbmcgLSBUaGUgc3RyaW5nIHRvIHNwbGl0LlxuLy8vIEBwYXJhbSB7c3RyaW5nfSAkc2VwYXJhdG9yIC0gVGhlIHN0cmluZyBzZXBhcmF0b3IgdG8gc3BsaXQgdGhlIHN0cmluZyBieS5cbi8vL1xuQGZ1bmN0aW9uIHN0ci1zcGxpdCgkc3RyaW5nLCAkc2VwYXJhdG9yKSB7XG4gICAgJHNwbGl0LWFycjogKCk7XG4gICAgJGluZGV4IDogc3RyLWluZGV4KCRzdHJpbmcsICRzZXBhcmF0b3IpO1xuICAgIEB3aGlsZSAkaW5kZXggIT0gbnVsbCB7XG4gICAgICAgICRpdGVtOiBzdHItc2xpY2UoJHN0cmluZywgMSwgJGluZGV4IC0gMSk7XG4gICAgICAgICRzcGxpdC1hcnI6IGFwcGVuZCgkc3BsaXQtYXJyLCAkaXRlbSk7XG4gICAgICAgICRzdHJpbmc6IHN0ci1zbGljZSgkc3RyaW5nLCAkaW5kZXggKyAxKTtcbiAgICAgICAgJGluZGV4IDogc3RyLWluZGV4KCRzdHJpbmcsICRzZXBhcmF0b3IpO1xuICAgIH1cbiAgICAkc3BsaXQtYXJyOiBhcHBlbmQoJHNwbGl0LWFyciwgJHN0cmluZyk7XG4gICAgQHJldHVybiAkc3BsaXQtYXJyO1xufVxuXG4vLy8gQGlnbm9yZVxuQGZ1bmN0aW9uIGdldC10aGVtZSgkdGhlbWVzLCAkdGhlbWUpICB7XG4gICAgQGlmIHR5cGUtb2YoJHRoZW1lcykgPT0gJ21hcCcgYW5kIG1hcC1oYXMta2V5KCR0aGVtZXMsICR0aGVtZSkge1xuICAgICAgICBAcmV0dXJuIG1hcC1nZXQoJHRoZW1lcywgJHRoZW1lKTtcbiAgICB9XG5cbiAgICBAaWYgKGZ1bmN0aW9uLWV4aXN0cygnZ2V0LWZ1bmN0aW9uJykpIHtcbiAgICAgICAgQHJldHVybiBjYWxsKGdldC1mdW5jdGlvbigjeyR0aGVtZX0tdGhlbWUpKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQHJldHVybiBjYWxsKCgjeyR0aGVtZX0tdGhlbWUpKTtcbiAgICB9XG59XG4iLCIvLy8gRGVmYXVsdCB0aGVtZSBwYWxldHRlLlxuLy8vIFdpbGwgYmUgdGhlIG9uZSB1c2VkIGlmIG5vIHRoZW1lIHBhbGV0dGUgaXMgc3BlY2lmaWVkLlxuLy8vIEBncm91cCBwYWxldHRlc1xuLy8vIEB0eXBlIE1hcFxuLy8vIEBwcm9wIHtNYXB9IHByaW1hcnkgLSBUaGUgcHJpbWFyeSBzdWItcGFsZXR0ZSBjcmVhdGVkIGZyb20gdGhlIHByaW1hcnkgY29sb3IuXG4vLy8gQHByb3Age01hcH0gc2Vjb25kYXJ5IC0gVGhlIHNlY29uZGFyeSBzdWItcGFsZXR0ZSBjcmVhdGVkIGZyb20gdGhlIHNlY29uZGFyeSBjb2xvci5cbi8vLyBAcHJvcCB7TWFwfSBncmF5cyAtIFRoZSBncmF5cyBzdWItcGFsZXR0ZS4gSW5jbHVkZWQgYnkgZGVmYXVsdCBpbiBldmVyeSBpZ3gtcGFsZXR0ZS5cbi8vLyBAcHJvcCB7Q29sb3J9IHByaW1hcnkuMTAwIFsjYTdkOWZhXSAtIFRoZSAxMDAgdmFyaWFudCBvZiB0aGUgYHByaW1hcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gcHJpbWFyeS4yMDAgWyM2ZGJjZjFdIC0gVGhlIDIwMCB2YXJpYW50IG9mIHRoZSBgcHJpbWFyeWAgY29sb3IuXG4vLy8gQHByb3Age0NvbG9yfSBwcmltYXJ5LjMwMCBbIzNjYTlmMl0gLSBUaGUgMzAwIHZhcmlhbnQgb2YgdGhlIGBwcmltYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHByaW1hcnkuNDAwIFsjMWRhMGY3XSAtIFRoZSA0MDAgdmFyaWFudCBvZiB0aGUgYHByaW1hcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gcHJpbWFyeS41MDAgWyMwOWZdIC0gVGhlIDUwMCB2YXJpYW50IG9mIHRoZSBgcHJpbWFyeWAgY29sb3IgKGRlZmF1bHQpLlxuLy8vIEBwcm9wIHtDb2xvcn0gcHJpbWFyeS42MDAgWyMwMDg5ZTVdIC0gVGhlIDYwMCB2YXJpYW50IG9mIHRoZSBgcHJpbWFyeWAgY29sb3IuXG4vLy8gQHByb3Age0NvbG9yfSBwcmltYXJ5LjcwMCBbIzAwN2VkMl0gLSBUaGUgNzAwIHZhcmlhbnQgb2YgdGhlIGBwcmltYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHByaW1hcnkuODAwIFsjMDA3MmJlXSAtIFRoZSA4MDAgdmFyaWFudCBvZiB0aGUgYHByaW1hcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gcHJpbWFyeS45MDAgWyMwMDY1YThdIC0gVGhlIDkwMCB2YXJpYW50IG9mIHRoZSBgcHJpbWFyeWAgY29sb3IuXG4vLy8gQHByb3Age0NvbG9yfSBwcmltYXJ5LkExMDAgWyM1NWJiZmZdIC0gVGhlIEExMDAgdmFyaWFudCBvZiB0aGUgYHByaW1hcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gcHJpbWFyeS5BMjAwIFsjMjdhOWZmXSAtIFRoZSBBMjAwIHZhcmlhbnQgb2YgdGhlIGBwcmltYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHByaW1hcnkuQTQwMCBbIzAwOGRlYl0gLSBUaGUgQTQwMCB2YXJpYW50IG9mIHRoZSBgcHJpbWFyeWAgY29sb3IuXG4vLy8gQHByb3Age0NvbG9yfSBwcmltYXJ5LkE3MDAgWyMwMDY2YWFdIC0gVGhlIEE3MDAgdmFyaWFudCBvZiB0aGUgYHByaW1hcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gc2Vjb25kYXJ5LjEwMCBbI2YwYjJjZV0gLSBUaGUgMTAwIHZhcmlhbnQgb2YgdGhlIGBzZWNvbmRhcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gc2Vjb25kYXJ5LjIwMCBbI2UxN2ZhYl0gLSBUaGUgMjAwIHZhcmlhbnQgb2YgdGhlIGBzZWNvbmRhcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gc2Vjb25kYXJ5LjMwMCBbI2RjNTM5MV0gLSBUaGUgMzAwIHZhcmlhbnQgb2YgdGhlIGBzZWNvbmRhcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gc2Vjb25kYXJ5LjQwMCBbI2RmMzY4M10gLSBUaGUgNDAwIHZhcmlhbnQgb2YgdGhlIGBzZWNvbmRhcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gc2Vjb25kYXJ5LjUwMCBbI2U0MWM3N10gLSBUaGUgNTAwIHZhcmlhbnQgb2YgdGhlIGBzZWNvbmRhcnlgIGNvbG9yIChkZWZhdWx0KS5cbi8vLyBAcHJvcCB7Q29sb3J9IHNlY29uZGFyeS42MDAgWyNkYzBhNmFdIC0gVGhlIDYwMCB2YXJpYW50IG9mIHRoZSBgc2Vjb25kYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHNlY29uZGFyeS43MDAgWyNkMzAwNjBdIC0gVGhlIDcwMCB2YXJpYW50IG9mIHRoZSBgc2Vjb25kYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHNlY29uZGFyeS44MDAgWyNiZjAwNTddIC0gVGhlIDgwMCB2YXJpYW50IG9mIHRoZSBgc2Vjb25kYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHNlY29uZGFyeS45MDAgWyNhNTA0NGRdIC0gVGhlIDkwMCB2YXJpYW50IG9mIHRoZSBgc2Vjb25kYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHNlY29uZGFyeS5BMTAwIFsjZjY1ZmE0XSAtIFRoZSBBMTAwIHZhcmlhbnQgb2YgdGhlIGBzZWNvbmRhcnlgIGNvbG9yLlxuLy8vIEBwcm9wIHtDb2xvcn0gc2Vjb25kYXJ5LkEyMDAgWyNmMzM0OGJdIC0gVGhlIEEyMDAgdmFyaWFudCBvZiB0aGUgYHNlY29uZGFyeWAgY29sb3IuXG4vLy8gQHByb3Age0NvbG9yfSBzZWNvbmRhcnkuQTQwMCBbI2RmMGQ2ZF0gLSBUaGUgQTQwMCB2YXJpYW50IG9mIHRoZSBgc2Vjb25kYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IHNlY29uZGFyeS5BNzAwIFsjYTIwOTRmXSAtIFRoZSBBNzAwIHZhcmlhbnQgb2YgdGhlIGBwcmltYXJ5YCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjEwMCBbcmdiYSgwLCAwLCAwLCAuMDQpXSAtIFRoZSAxMDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjIwMCBbcmdiYSgwLCAwLCAwLCAuMDgpXSAtIFRoZSAyMDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjMwMCBbcmdiYSgwLCAwLCAwLCAuMTIpXSAtIFRoZSAzMDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjQwMCBbcmdiYSgwLCAwLCAwLCAuMjYpXSAtIFRoZSA0MDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjUwMCBbcmdiYSgwLCAwLCAwLCAuMzgpXSAtIFRoZSA1MDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjYwMCBbcmdiYSgwLCAwLCAwLCAuNTQpXSAtIFRoZSA2MDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjcwMCBbcmdiYSgwLCAwLCAwLCAuNjIpXSAtIFRoZSA3MDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjgwMCBbcmdiYSgwLCAwLCAwLCAuNzQpXSAtIFRoZSA4MDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGdyYXlzLjkwMCBbcmdiYSgwLCAwLCAwLCAuODcpXSAtIFRoZSA5MDAgdmFyaWFudCBvZiB0aGUgYGdyYXlzYCBjb2xvci5cbi8vLyBAcHJvcCB7Q29sb3J9IGluZm8gWyMxMzc3ZDVdIC0gVGhlIGBpbmZvYCBjb2xvci4gRGVmYXVsdCBmb3IgZXZlcnkgcGFsZXR0ZSBpZiBub3Qgc3BlY2lmaWVkLlxuLy8vIEBwcm9wIHtDb2xvcn0gc3VjY2VzcyBbIzRlYjg2Ml0gLSBUaGUgYHN1Y2Nlc3NgIGNvbG9yLiBEZWZhdWx0IGZvciBldmVyeSBwYWxldHRlIGlmIG5vdCBzcGVjaWZpZWQuXG4vLy8gQHByb3Age0NvbG9yfSB3YXJuIFsjZmJiMTNjXSAtIFRoZSBgd2FybmAgY29sb3IuIERlZmF1bHQgZm9yIGV2ZXJ5IHBhbGV0dGUgaWYgbm90IHNwZWNpZmllZC5cbi8vLyBAcHJvcCB7Q29sb3J9IGVycm9yIFsjZmYxMzRhXSAtIFRoZSBgZXJyb3JgLiBEZWZhdWx0IGZvciBldmVyeSBwYWxldHRlIGlmIG5vdCBzcGVjaWZpZWQuXG4vLy8gQHJlcXVpcmVzIGlneC1wYWxldHRlXG4kZGVmYXVsdC1wYWxldHRlOiBpZ3gtcGFsZXR0ZSgkcHJpbWFyeTogIzA5ZiwgJHNlY29uZGFyeTogI2U0MWM3NykgIWRlZmF1bHQ7XG5cbi8vLyBHbG9iYWwgT3ZlcmxheSBDb2xvclxuLy8vIEBncm91cCBwYWxldHRlc1xuLy8vIEB0eXBlIENvbG9yXG4vLy8gQHByb3Age01hcH0gJHBhbGV0dGUgWyRkZWZhdWx0LXBhbGV0dGVdIC0gVGhlIHBhbGV0dGUgdXNlZCB0byBleHRyYWN0IHRoZSBjb2xvciBmcm9tLlxuLy8vIEBwcm9wIHtTdHJpbmd9ICRjb2xvciBbZ3JheXNdIC0gVGhlIG5hbWUgb2YgdGhlIHN1Yi1wYWxldHRlIHRvIHRha2UgdGhlIGNvbG9yIGZyb20uXG4vLy8gQHJlcXVpcmVzIGlneC1jb2xvclxuJG92ZXJsYXktY29sb3I6IGlneC1jb2xvcigkZGVmYXVsdC1wYWxldHRlLCAnZ3JheXMnKSAhZGVmYXVsdDtcblxuLy8vIERlZmF1bHQgZWxldmF0aW9ucy4gV29yayBpbiBwcm9ncmVzcy5cbi8vLyBTdWJqZWN0IHRvIGNoYW5nZS5cbi8vLyBAZ3JvdXAgZWxldmF0aW9uc1xuLy8vIEB0eXBlIE1hcFxuLy8vIEBwcm9wIHtDb2xvcn0gJGNvbG9yLTEgW3JnYmEoMCwgMCwgMCwgLjI2KV0gLSBUaGUgY29sb3IgdXNlZCBmb3IgdGhlIHVtYnJhIHNoYWRvdy5cbi8vLyBAcHJvcCB7Q29sb3J9ICRjb2xvci0yIFtyZ2JhKDAsIDAsIDAsIC4xMildIC0gVGhlIGNvbG9yIHVzZWQgZm9yIHRoZSBwZW51bWJyYSBzaGFkb3cuXG4vLy8gQHByb3Age0NvbG9yfSAkY29sb3ItMyBbcmdiYSgwLCAwLCAwLCAuMDgpXSAtIFRoZSBjb2xvciB1c2VkIGZvciB0aGUgYW1iaWVudCBzaGFkb3cuXG4vLy8gQHJlcXVpcmVzIGlneC1lbGV2YXRpb25zXG4kZWxldmF0aW9uczogaWd4LWVsZXZhdGlvbnMoXG4gICAgcmdiYSgwLCAwLCAwLCAuMjYpLFxuICAgIHJnYmEoMCwgMCwgMCwgLjEyKSxcbiAgICByZ2JhKDAsIDAsIDAsIC4wOClcbikgIWRlZmF1bHQ7XG5cbiRkYXJrLWdyZWVuLXBhbGV0dGU6IGlneC1wYWxldHRlKCRwcmltYXJ5OiAjMDlmLCAkc2Vjb25kYXJ5OiAjNzJkYTY3KSAhZGVmYXVsdDtcblxuXG4iLCIvLy8vXG4vLy8gQGdyb3VwIGFuaW1hdGlvbnNcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBhdXRob3IgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaW1lb25vZmZcIiB0YXJnZXQ9XCJfYmxhbmtcIj5TaW1lb24gU2ltZW9ub2ZmPC9hPlxuLy8vL1xuXG4vLy8gQHR5cGUgVGltaW5nIEZ1bmN0aW9uXG4kZWFzZS1pbi1xdWFkOiBjdWJpYy1iZXppZXIoLjU1LCAuMDg1LCAuNjgsIC41Myk7XG4vLy8gQHR5cGUgVGltaW5nIEZ1bmN0aW9uXG4kZWFzZS1pbi1jdWJpYzogY3ViaWMtYmV6aWVyKC41NSwgLjU1LCAuNjc1LCAuMTkpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2UtaW4tcXVhcnQ6IGN1YmljLWJlemllciguODk1LCAuMDMsIC42ODUsIC4yMik7XG4vLy8gQHR5cGUgVGltaW5nIEZ1bmN0aW9uXG4kZWFzZS1pbi1xdWludDogY3ViaWMtYmV6aWVyKC43NTUsIC4wNSwgLjg1NSwgLjA2KTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLWluLXNpbmU6IGN1YmljLWJlemllciguNDcsIDAsIC43NDUsIC43MTUpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2UtaW4tZXhwbzogY3ViaWMtYmV6aWVyKC45NSwgLjA1LCAuNzk1LCAuMDM1KTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLWluLWNpcmM6IGN1YmljLWJlemllciguOTUsIC4wNSwgLjc5NSwgLjAzNSk7XG4vLy8gQHR5cGUgVGltaW5nIEZ1bmN0aW9uXG4kZWFzZS1pbi1iYWNrOiBjdWJpYy1iZXppZXIoLjk1LCAuMDUsIC43OTUsIC4wMzUpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2Utb3V0LXF1YWQ6IGN1YmljLWJlemllciguMjUsIC40NiwgLjQ1LCAuOTQpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2Utb3V0LWN1YmljOiBjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLW91dC1xdWFydDogY3ViaWMtYmV6aWVyKC4xNjUsIC44NCwgLjQ0LCAxKTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLW91dC1xdWludDogY3ViaWMtYmV6aWVyKC4yMywgMSwgLjMyLCAxKTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLW91dC1zaW5lOiBjdWJpYy1iZXppZXIoLjM5LCAuNTc1LCAuNTY1LCAxKTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLW91dC1leHBvOiBjdWJpYy1iZXppZXIoLjE5LCAxLCAuMjIsIDEpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2Utb3V0LWNpcmM6IGN1YmljLWJlemllciguMDc1LCAuODIsIC4xNjUsIDEpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2Utb3V0LWJhY2s6IGN1YmljLWJlemllciguMTc1LCAuODg1LCAuMzIsIDEuMjc1KTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLWluLW91dC1xdWFkOiBjdWJpYy1iZXppZXIoLjQ1NSwgLjAzLCAuNTE1LCAuOTU1KTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLWluLW91dC1jdWJpYzogY3ViaWMtYmV6aWVyKC42NDUsIC4wNDUsIC4zNTUsIDEpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2UtaW4tb3V0LXF1YXJ0OiBjdWJpYy1iZXppZXIoLjc3LCAwLCAuMTc1LCAxKTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLWluLW91dC1xdWludDogLjVzIGN1YmljLWJlemllciguODYsIDAsIC4wNywgMSk7XG4vLy8gQHR5cGUgVGltaW5nIEZ1bmN0aW9uXG4kZWFzZS1pbi1vdXQtc2luZTogY3ViaWMtYmV6aWVyKC40NDUsIC4wNSwgLjU1LCAuOTUpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2UtaW4tb3V0LWV4cG86IGN1YmljLWJlemllcigxLCAwLCAwLCAxKTtcbi8vLyBAdHlwZSBUaW1pbmcgRnVuY3Rpb25cbiRlYXNlLWluLW91dC1jaXJjOiBjdWJpYy1iZXppZXIoLjc4NSwgLjEzNSwgLjE1LCAuODYpO1xuLy8vIEB0eXBlIFRpbWluZyBGdW5jdGlvblxuJGVhc2UtaW4tb3V0LWJhY2s6IGN1YmljLWJlemllciguNjgsIC0uNTUsIC4yNjUsIDEuNTUpO1xuIiwiLy8vL1xuLy8vIEBncm91cCB0aGVtZXNcbi8vLyBAYWNjZXNzIHB1YmxpY1xuLy8vIEBhdXRob3IgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaW1lb25vZmZcIiB0YXJnZXQ9XCJfYmxhbmtcIj5TaW1lb24gU2ltZW9ub2ZmPC9hPlxuLy8vIEBhdXRob3IgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9kZXNpZzlzdGVpblwiIHRhcmdldD1cIl9ibGFua1wiPk1hcmluIFBvcG92PC9hPlxuLy8vL1xuXG4vLy8gQHBhcmFtIHtNYXB9ICRwYWxldHRlIFskZGVmYXVsdC1wYWxldHRlXSAtIFRoZSBwYWxldHRlIHVzZWQgYXMgYmFzaXMgZm9yIHN0eWxpbmcgdGhlIGNvbXBvbmVudC5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkdHJhY2stY29sb3IgW3JnYmEoMCwgMCwgMCwgLjEyKV0gLSBUaGUgbWFpbiB0cmFjayBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZmlsbC1jb2xvci1kZWZhdWx0IFtwcmltYXJ5IDUwMF0gLSBUaGUgdHJhY2sgZGVmYXVsdCBmaWxsIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRmaWxsLWNvbG9yLWRhbmdlciBbZXJyb3IgNTAwXSAtIFRoZSB0cmFjayBkYW5nZXIgZmlsbCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkZmlsbC1jb2xvci13YXJuaW5nIFt3YXJuIDUwMF0gLSBUaGUgdHJhY2sgd2FybmluZyBmaWxsIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICRmaWxsLWNvbG9yLWluZm8gW2luZm8gNTAwXSAtIFRoZSB0cmFjayBpbmZvIGZpbGwgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGZpbGwtY29sb3Itc3VjY2VzcyBbc3VjY2VzcyA1MDBdIC0gVGhlIHRyYWNrIHN1Y2Nlc3MgZmlsbCBjb2xvci5cbi8vLyBAcGFyYW0ge0NvbG9yfSAkc3RyaXBlcy1jb2xvciBbcmdiYSgyNTUsIDI1NSwgMjU1LCAuNyldIC0gVGhlIHRyYWNrIHN0cmlwZXMgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJHRleHQtY29sb3IgW3JnYmEoMCwgMCwgMCwgLjYyKV0gLSBUaGUgdHJhY2sgdmFsdWUgdGV4dCBjb2xvci5cbi8vL1xuLy8vIEByZXF1aXJlcyBleHRlbmRcbi8vLyBAcmVxdWlyZXMgaWd4LWNvbG9yXG4vLy9cbi8vLyBAZXhhbXBsZSBzY3NzIENoYW5nZSB0aGUgc3RyaXBlcyBjb2xvclxuLy8vICAgJG15LXByb2dyZXNzLWxpbmVhci10aGVtZTogaWd4LXByb2dyZXNzLWxpbmVhci10aGVtZShcbi8vLyAgICAgJHN0cmlwZXMtY29sb3I6IG9yYW5nZVxuLy8vICAgKTtcbi8vLyAgIC8vIFBhc3MgdGhlIHRoZW1lIHRvIHRoZSBpZ3gtcHJvZ3Jlc3MtbGluZWFyIGNvbXBvbmVudCBtaXhpblxuLy8vICAgQGluY2x1ZGUgaWd4LXByb2dyZXNzLWxpbmVhcigkbXktcHJvZ3Jlc3MtbGluZWFyLXRoZW1lKTtcbkBmdW5jdGlvbiBpZ3gtcHJvZ3Jlc3MtbGluZWFyLXRoZW1lKFxuICAgICRwYWxldHRlOiAkZGVmYXVsdC1wYWxldHRlLFxuICAgICRwcmVzZXQ6IG51bGwsXG5cbiAgICAkdHJhY2stY29sb3I6IG51bGwsXG4gICAgJGZpbGwtY29sb3ItZGVmYXVsdDogbnVsbCxcbiAgICAkZmlsbC1jb2xvci1kYW5nZXI6IG51bGwsXG4gICAgJGZpbGwtY29sb3Itd2FybmluZzogbnVsbCxcbiAgICAkZmlsbC1jb2xvci1pbmZvOiBudWxsLFxuICAgICRmaWxsLWNvbG9yLXN1Y2Nlc3M6IG51bGwsXG4gICAgJHN0cmlwZXMtY29sb3I6IG51bGwsXG4gICAgJHRleHQtY29sb3I6IG51bGxcbikge1xuICAgICRkZWZhdWx0LXRoZW1lOiAoXG4gICAgICAgIG5hbWU6ICdpZ3gtcHJvZ3Jlc3MtbGluZWFyJyxcbiAgICAgICAgdHJhY2stY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ2dyYXlzJywgMzAwKSxcbiAgICAgICAgZmlsbC1jb2xvci1kZWZhdWx0OiBpZ3gtY29sb3IoJHBhbGV0dGUsICdwcmltYXJ5JyksXG4gICAgICAgIGZpbGwtY29sb3ItZGFuZ2VyOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdlcnJvcicpLFxuICAgICAgICBmaWxsLWNvbG9yLXdhcm5pbmc6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ3dhcm4nKSxcbiAgICAgICAgZmlsbC1jb2xvci1pbmZvOiBpZ3gtY29sb3IoJHBhbGV0dGUsICdpbmZvJyksXG4gICAgICAgIGZpbGwtY29sb3Itc3VjY2VzczogaWd4LWNvbG9yKCRwYWxldHRlLCAnc3VjY2VzcycpLFxuICAgICAgICBzdHJpcGVzLWNvbG9yOiByZ2JhKCNmZmYsIC43KSxcbiAgICAgICAgdGV4dC1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCA3MDApXG4gICAgKTtcblxuICAgIEBpZiAkcHJlc2V0IHtcbiAgICAgICAgJGRlZmF1bHQtdGhlbWU6IG1hcC1nZXQoJHByZXNldCwgbWFwLWdldCgkZGVmYXVsdC10aGVtZSwgJ25hbWUnKSk7XG4gICAgfVxuXG4gICAgQHJldHVybiBleHRlbmQoJGRlZmF1bHQtdGhlbWUsIChcbiAgICAgICAgcGFsZXR0ZTogJHBhbGV0dGUsXG4gICAgICAgIHRyYWNrLWNvbG9yOiAkdHJhY2stY29sb3IsXG4gICAgICAgIGZpbGwtY29sb3ItZGVmYXVsdDogJGZpbGwtY29sb3ItZGVmYXVsdCxcbiAgICAgICAgZmlsbC1jb2xvci1kYW5nZXI6ICRmaWxsLWNvbG9yLWRhbmdlcixcbiAgICAgICAgZmlsbC1jb2xvci13YXJuaW5nOiAkZmlsbC1jb2xvci13YXJuaW5nLFxuICAgICAgICBmaWxsLWNvbG9yLWluZm86ICRmaWxsLWNvbG9yLWluZm8sXG4gICAgICAgIGZpbGwtY29sb3Itc3VjY2VzczogJGZpbGwtY29sb3Itc3VjY2VzcyxcbiAgICAgICAgc3RyaXBlcy1jb2xvcjogJHN0cmlwZXMtY29sb3IsXG4gICAgICAgIHRleHQtY29sb3I6ICR0ZXh0LWNvbG9yXG4gICAgKSk7XG59XG5cbi8vLyBAcGFyYW0ge01hcH0gJHRoZW1lIC0gVGhlIHRoZW1lIHVzZWQgdG8gc3R5bGUgdGhlIGNvbXBvbmVudC5cbi8vLyBAcmVxdWlyZXMge21peGlufSBpZ3gtcm9vdC1jc3MtdmFyc1xuLy8vIEByZXF1aXJlcyBlbVxuLy8vIEByZXF1aXJlcyAtLXZhclxuQG1peGluIGlneC1wcm9ncmVzcy1saW5lYXIoJHRoZW1lKSB7XG4gICAgQGluY2x1ZGUgaWd4LXJvb3QtY3NzLXZhcnMoJHRoZW1lKTtcblxuICAgIC8vIEBkZWJ1ZyAkdGhlbWU7XG5cbiAgICAkYmFyLWhlaWdodDogNHB4O1xuICAgICRzdHJpcGUtY29sb3I6IC0tdmFyKCR0aGVtZSwgJ3N0cmlwZXMtY29sb3InKTtcbiAgICAkdmFsdWUtZnM6IGVtKDE0cHgsIDE2cHgpO1xuICAgICR2YWx1ZS1mdzogNjAwO1xuICAgICR2YWx1ZS1tYXJnaW46IDA7XG5cbiAgICAlbGluZWFyLWRpc3BsYXkge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgJWxpbmVhci1iYXIge1xuICAgICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICAgICAgaGVpZ2h0OiAkYmFyLWhlaWdodDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG5cbiAgICAlbGluZWFyLWJhci1iYXNlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogaW5oZXJpdDtcbiAgICAgICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgICBiYWNrZ3JvdW5kOiAtLXZhcigkdGhlbWUsICd0cmFjay1jb2xvcicpO1xuICAgICAgICB6LWluZGV4OiAwO1xuICAgIH1cblxuICAgICVsaW5lYXItYmFyLXByb2dyZXNzIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuXG4gICAgJWxpbmVhci1iYXItcHJvZ3Jlc3MtLXN0cmlwZWQge1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgICAgICAtNDVkZWcsXG4gICAgICAgICAgICAkc3RyaXBlLWNvbG9yIDI1JSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50IDI1JSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50IDUwJSxcbiAgICAgICAgICAgICRzdHJpcGUtY29sb3IgNTAlLFxuICAgICAgICAgICAgJHN0cmlwZS1jb2xvciA3NSUsXG4gICAgICAgICAgICB0cmFuc3BhcmVudCA3NSUsXG4gICAgICAgICAgICB0cmFuc3BhcmVudFxuICAgICAgICApO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDQwcHggNDBweDtcbiAgICB9XG5cbiAgICAlbGluZWFyLWJhci1wcm9ncmVzcy0tZGVmYXVsdCB7XG4gICAgICAgIGJhY2tncm91bmQ6IC0tdmFyKCR0aGVtZSwgJ2ZpbGwtY29sb3ItZGVmYXVsdCcpXG4gICAgfVxuXG4gICAgJWxpbmVhci1iYXItcHJvZ3Jlc3MtLWRhbmdlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2ZpbGwtY29sb3ItZGFuZ2VyJyk7XG4gICAgfVxuXG4gICAgJWxpbmVhci1iYXItcHJvZ3Jlc3MtLXdhcm5pbmcge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtLXZhcigkdGhlbWUsICdmaWxsLWNvbG9yLXdhcm5pbmcnKTtcbiAgICB9XG5cbiAgICAlbGluZWFyLWJhci1wcm9ncmVzcy0taW5mbyB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IC0tdmFyKCR0aGVtZSwgJ2ZpbGwtY29sb3ItaW5mbycpO1xuICAgIH1cblxuICAgICVsaW5lYXItYmFyLXByb2dyZXNzLS1zdWNjZXNzIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogLS12YXIoJHRoZW1lLCAnZmlsbC1jb2xvci1zdWNjZXNzJyk7XG4gICAgfVxuXG5cbiAgICAlbGluZWFyLXZhbHVlIHtcbiAgICAgICAgbWFyZ2luOiAkdmFsdWUtbWFyZ2luO1xuICAgICAgICBjb2xvcjogLS12YXIoJHRoZW1lLCAndGV4dC1jb2xvcicpO1xuICAgICAgICBmb250LXNpemU6ICR2YWx1ZS1mcztcbiAgICAgICAgZm9udC13ZWlnaHQ6ICR2YWx1ZS1mdztcbiAgICB9XG5cbiAgICAlbGluZWFyLXZhbHVlLS1zdGFydCB7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgfVxuXG4gICAgJWxpbmVhci12YWx1ZS0tY2VudGVyIHtcbiAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIH1cblxuICAgICVsaW5lYXItdmFsdWUtLWVuZCB7XG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgIH1cblxuICAgICVsaW5lYXItdmFsdWUtLXRvcCB7XG4gICAgICAgIG9yZGVyOiAtMTtcbiAgICB9XG5cbiAgICAlbGluZWFyLXZhbHVlLS1oaWRkZW4ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbn1cblxuLy8vIEBwYXJhbSB7TWFwfSAkcGFsZXR0ZSBbJGRlZmF1bHQtcGFsZXR0ZV0gLSBUaGUgcGFsZXR0ZSB1c2VkIGFzIGJhc2lzIGZvciBzdHlsaW5nIHRoZSBjb21wb25lbnQuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJGJhc2UtY2lyY2xlLWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC4xMildIC0gVGhlIGJhc2UgY2lyY2xlIGZpbGwgY29sb3IuXG4vLy8gQHBhcmFtIHtDb2xvcn0gJHByb2dyZXNzLWNpcmNsZS1jb2xvciBbcHJpbWFyeSA1MDBdIC0gVGhlIHByb2dyZXNzIGNpcmNsZSBmaWxsIGNvbG9yLlxuLy8vIEBwYXJhbSB7Q29sb3J9ICR0ZXh0LWNvbG9yIFtyZ2JhKDAsIDAsIDAsIC42MildIC0gVGhlIHZhbHVlIHRleHQgY29sb3IuXG4vLy9cbi8vLyBAcmVxdWlyZXMgZXh0ZW5kXG4vLy8gQHJlcXVpcmVzIGlneC1jb2xvclxuLy8vXG4vLy8gQGV4YW1wbGUgc2NzcyBDaGFuZ2UgdGhlIGNpcmNsZSBwcm9ncmVzcyBjb2xvclxuLy8vICAgJG15LXByb2dyZXNzLWNpcmN1bGFyLXRoZW1lOiBpZ3gtcHJvZ3Jlc3MtY2lyY3VsYXItdGhlbWUoXG4vLy8gICAgICRwcm9ncmVzcy1jaXJjbGUtY29sb3I6IHB1cnBsZVxuLy8vICAgKTtcbi8vLyAgIC8vIFBhc3MgdGhlIHRoZW1lIHRvIHRoZSBpZ3gtcHJvZ3Jlc3MtY2lyY3VsYXIgY29tcG9uZW50IG1peGluXG4vLy8gICBAaW5jbHVkZSBpZ3gtcHJvZ3Jlc3MtY2lyY3VsYXIoJG15LXByb2dyZXNzLWNpcmNsZS10aGVtZSk7XG5AZnVuY3Rpb24gaWd4LXByb2dyZXNzLWNpcmN1bGFyLXRoZW1lKFxuICAgICRwYWxldHRlOiAkZGVmYXVsdC1wYWxldHRlLFxuXG4gICAgJGJhc2UtY2lyY2xlLWNvbG9yOiBudWxsLFxuICAgICRwcm9ncmVzcy1jaXJjbGUtY29sb3I6IG51bGwsXG4gICAgJHRleHQtY29sb3I6IG51bGxcbikge1xuICAgICRkZWZhdWx0LXRoZW1lOiAoXG4gICAgICAgIG5hbWU6ICdpZ3gtcHJvZ3Jlc3MtY2lyY3VsYXInLFxuICAgICAgICBiYXNlLWNpcmNsZS1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCAzMDApLFxuICAgICAgICBwcm9ncmVzcy1jaXJjbGUtY29sb3I6IGlneC1jb2xvcigkcGFsZXR0ZSwgJ3ByaW1hcnknKSxcbiAgICAgICAgdGV4dC1jb2xvcjogaWd4LWNvbG9yKCRwYWxldHRlLCAnZ3JheXMnLCA3MDApXG4gICAgKTtcblxuICAgIEByZXR1cm4gZXh0ZW5kKCRkZWZhdWx0LXRoZW1lLCAoXG4gICAgICAgIHBhbGV0dGU6ICRwYWxldHRlLFxuICAgICAgICBiYXNlLWNpcmNsZS1jb2xvcjogJGJhc2UtY2lyY2xlLWNvbG9yLFxuICAgICAgICBwcm9ncmVzcy1jaXJjbGUtY29sb3I6ICRwcm9ncmVzcy1jaXJjbGUtY29sb3IsXG4gICAgICAgIHRleHQtY29sb3I6ICR0ZXh0LWNvbG9yXG4gICAgKSk7XG59XG5cbi8vLyBAcGFyYW0ge01hcH0gJHRoZW1lIC0gVGhlIHRoZW1lIHVzZWQgdG8gc3R5bGUgdGhlIGNvbXBvbmVudC5cbi8vLyBAcmVxdWlyZXMge21peGlufSBpZ3gtcm9vdC1jc3MtdmFyc1xuLy8vIEByZXF1aXJlcyByZW1cbi8vLyBAcmVxdWlyZXMgLS12YXJcbkBtaXhpbiBpZ3gtcHJvZ3Jlc3MtY2lyY3VsYXIoJHRoZW1lKSB7XG4gICAgQGluY2x1ZGUgaWd4LXJvb3QtY3NzLXZhcnMoJHRoZW1lKTtcblxuICAgIC8vIEBkZWJ1ZyAkdGhlbWU7XG5cbiAgICAkY2lyY3VsYXItdmFsdWUtZnM6IHJlbSgzMnB4LCAxNnB4KTtcbiAgICAkY2lyY3VsYXItdmFsdWUtZnc6IDYwMDtcblxuICAgICVjaXJjdWxhci1kaXNwbGF5IHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG5cbiAgICAlY2lyY3VsYXItaW5uZXJjaXJjbGUge1xuICAgICAgICBzdHJva2Utd2lkdGg6IDQ7XG4gICAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xuICAgICAgICBzdHJva2U6IC0tdmFyKCR0aGVtZSwgJ2Jhc2UtY2lyY2xlLWNvbG9yJyk7XG4gICAgfVxuXG4gICAgJWNpcmN1bGFyLWNpcmNsZSB7XG4gICAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xuICAgICAgICBzdHJva2U6IC0tdmFyKCR0aGVtZSwgJ3Byb2dyZXNzLWNpcmNsZS1jb2xvcicpO1xuICAgICAgICBzdHJva2Utd2lkdGg6IDY7XG4gICAgICAgIHN0cm9rZS1saW5lY2FwOiByb3VuZDtcbiAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDI4OTtcbiAgICAgICAgc3Ryb2tlLWRhc2hhcnJheTogMjg5O1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiA1MCUgNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xuICAgIH1cblxuICAgICVjaXJjdWxhci10ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAkY2lyY3VsYXItdmFsdWUtZnM7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkY2lyY3VsYXItdmFsdWUtZnc7XG4gICAgICAgIGZpbGw6IC0tdmFyKCR0aGVtZSwgJ3RleHQtY29sb3InKTtcbiAgICB9XG5cbiAgICAlY2lyY3VsYXItdGV4dC0taGlkZGVuIHtcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/grid/grid.component.ts":
/*!****************************************!*\
  !*** ./src/app/grid/grid.component.ts ***!
  \****************************************/
/*! exports provided: GridComponent, CustomBPMSummary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridComponent", function() { return GridComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomBPMSummary", function() { return CustomBPMSummary; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var igniteui_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! igniteui-angular */ "./node_modules/igniteui-angular/fesm5/igniteui-angular.js");
/* harmony import */ var _services_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/data */ "./src/app/grid/services/data.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/data.service */ "./src/app/grid/services/data.service.ts");
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! faker */ "./node_modules/faker/index.js");
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_4__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GridComponent = /** @class */ (function () {
    function GridComponent(zone, dataService) {
        this.zone = zone;
        this.dataService = dataService;
        this.topSpeedSummary = CustomTopSpeedSummary;
        this.bnpSummary = CustomBPMSummary;
        this.isFinished = false;
        this._live = true;
    }
    Object.defineProperty(GridComponent.prototype, "live", {
        get: function () {
            return this._live;
        },
        set: function (val) {
            var _this = this;
            this._live = val;
            if (this._live) {
                this._timer = setInterval(function () { return _this.ticker(); }, 3000);
            }
            else {
                clearInterval(this._timer);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hideNumber", {
        get: function () {
            return this.windowWidth && this.windowWidth < 960;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hideBeatsPerMinute", {
        get: function () {
            return this.windowWidth && this.windowWidth < 860;
        },
        enumerable: true,
        configurable: true
    });
    GridComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localData = _services_data__WEBPACK_IMPORTED_MODULE_2__["randomData"];
        this.windowWidth = window.innerWidth;
        this._timer = setInterval(function () { return _this.ticker(); }, 3000);
    };
    GridComponent.prototype.ngOnDestroy = function () {
        clearInterval(this._timer);
    };
    GridComponent.prototype.isTop3 = function (cell) {
        var top = cell.value > 0 && cell.value < 4;
        if (top) {
            cell.row.nativeElement.classList.add('top3');
        }
        else {
            cell.row.nativeElement.classList.remove('top3');
        }
        return top;
    };
    GridComponent.prototype.cellSelection = function (evt) {
        var cell = evt.cell;
        this.grid1.selectRows([cell.row.rowID], true);
    };
    GridComponent.prototype.getIconType = function (cell) {
        switch (cell.row.rowData.Position) {
            case 'up':
                return 'arrow_upward';
            case 'current':
                return 'arrow_forward';
            case 'down':
                return 'arrow_downward';
        }
    };
    GridComponent.prototype.getBadgeType = function (cell) {
        switch (cell.row.rowData.Position) {
            case 'up':
                return 'success';
            case 'current':
                return 'warning';
            case 'down':
                return 'error';
        }
    };
    GridComponent.prototype.onResize = function (event) {
        this.windowWidth = event.target.innerWidth;
    };
    GridComponent.prototype.filter = function (term) {
        this.grid1.filter('Name', term, igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxStringFilteringOperand"].instance().condition('contains'));
        this.grid1.markForCheck();
    };
    GridComponent.prototype.ticker = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.updateData();
            _this.zone.run(function () { return _this.grid1.markForCheck(); });
        });
    };
    GridComponent.prototype.updateData = function () {
        this.localData.map(function (rec) {
            var val = faker__WEBPACK_IMPORTED_MODULE_4__["random"].number();
            rec.Number = val;
        });
        var unsortedData = this.localData.slice(0);
        this.localData
            .sort(function (a, b) { return b.Number - a.Number; })
            .map(function (rec, idx) { return (rec.Id = idx + 1); });
        this.localData = this.localData.slice(0);
        var _loop_1 = function (i) {
            this_1.localData.some(function (elem, ind) {
                if (unsortedData[i].Id === elem.Id) {
                    var position = i - ind;
                    if (position < 0) {
                        elem.Position = 'down';
                    }
                    else if (position === 0) {
                        elem.Position = 'current';
                    }
                    else {
                        elem.Position = 'up';
                    }
                    return true;
                }
            });
        };
        var this_1 = this;
        // tslint:disable-next-line:prefer-for-of
        // Browser compatibility: for-of, No support for IE
        for (var i = 0; i < unsortedData.length; i++) {
            _loop_1(i);
        }
        if (this.localData[0].TrackProgress >= 100) {
            this.live = false;
            this.isFinished = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('grid1', { read: igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxGridComponent"] }),
        __metadata("design:type", igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxGridComponent"])
    ], GridComponent.prototype, "grid1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GridComponent.prototype, "onResize", null);
    GridComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            selector: 'app-grid',
            styles: [__webpack_require__(/*! ./grid.component.scss */ "./src/app/grid/grid.component.scss")],
            template: __webpack_require__(/*! ./grid.component.html */ "./src/app/grid/grid.component.html")
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _services_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"]])
    ], GridComponent);
    return GridComponent;
}());

var CustomTopSpeedSummary = /** @class */ (function (_super) {
    __extends(CustomTopSpeedSummary, _super);
    function CustomTopSpeedSummary() {
        return _super.call(this) || this;
    }
    CustomTopSpeedSummary.prototype.operate = function (data) {
        if (data && !data.length) {
            return;
        }
        var result = [];
        result.push({
            key: 'average',
            label: 'average',
            summaryResult: igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxNumberSummaryOperand"].average(data).toFixed(2)
        });
        return result;
    };
    return CustomTopSpeedSummary;
}(igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxNumberSummaryOperand"]));
var CustomBPMSummary = /** @class */ (function (_super) {
    __extends(CustomBPMSummary, _super);
    function CustomBPMSummary() {
        return _super.call(this) || this;
    }
    CustomBPMSummary.prototype.operate = function (data) {
        if (data && !data.length) {
            return;
        }
        var result = [];
        result.push({
            key: 'min',
            label: 'min',
            summaryResult: igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxNumberSummaryOperand"].min(data)
        }, {
            key: 'max',
            label: 'max',
            summaryResult: igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxNumberSummaryOperand"].max(data)
        }, {
            key: 'average',
            label: 'average',
            summaryResult: igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxNumberSummaryOperand"].average(data).toFixed(2)
        });
        return result;
    };
    return CustomBPMSummary;
}(igniteui_angular__WEBPACK_IMPORTED_MODULE_1__["IgxNumberSummaryOperand"]));



/***/ }),

/***/ "./src/app/grid/services/data.service.ts":
/*!***********************************************!*\
  !*** ./src/app/grid/services/data.service.ts ***!
  \***********************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http
                .get('https://randomuser.me/api/?inc=gender,name,picture&results=' + 200)
                .subscribe(function (data) {
                resolve(data.results);
            });
        });
    };
    DataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/grid/services/data.ts":
/*!***************************************!*\
  !*** ./src/app/grid/services/data.ts ***!
  \***************************************/
/*! exports provided: randomData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomData", function() { return randomData; });
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! faker */ "./node_modules/faker/index.js");
/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_0__);

var randomData = [];
for (var i = 1; i <= 1000; i++) {
    randomData.push({
        Id: i,
        Name: faker__WEBPACK_IMPORTED_MODULE_0__["name"].findName(),
        Number: faker__WEBPACK_IMPORTED_MODULE_0__["random"].number()
    });
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills */ "./src/polyfills.ts");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");



Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]).then(function (ref) {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
        window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
    // Otherwise, log the boot error
}).catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/es6/array */ "./node_modules/core-js/es6/array.js");
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_array__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/es6/date */ "./node_modules/core-js/es6/date.js");
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_date__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/es6/function */ "./node_modules/core-js/es6/function.js");
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/es6/map */ "./node_modules/core-js/es6/map.js");
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/es6/math */ "./node_modules/core-js/es6/math.js");
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_math__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/es6/number */ "./node_modules/core-js/es6/number.js");
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/es6/object */ "./node_modules/core-js/es6/object.js");
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_object__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/es6/parse-float */ "./node_modules/core-js/es6/parse-float.js");
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/es6/parse-int */ "./node_modules/core-js/es6/parse-int.js");
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/es6/regexp */ "./node_modules/core-js/es6/regexp.js");
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/es6/set */ "./node_modules/core-js/es6/set.js");
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_set__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/es6/string */ "./node_modules/core-js/es6/string.js");
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_string__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/es6/symbol */ "./node_modules/core-js/es6/symbol.js");
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_es6_weak_map__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/es6/weak-map */ "./node_modules/core-js/es6/weak-map.js");
/* harmony import */ var core_js_es6_weak_map__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_weak_map__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_es7_object__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/es7/object */ "./node_modules/core-js/es7/object.js");
/* harmony import */ var core_js_es7_object__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_es7_object__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var classlist_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! classlist.js */ "./node_modules/classlist.js/classList.js");
/* harmony import */ var classlist_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(classlist_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/es6/reflect */ "./node_modules/core-js/es6/reflect.js");
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/es7/reflect */ "./node_modules/core-js/es7/reflect.js");
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var web_animations_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! web-animations-js */ "./node_modules/web-animations-js/web-animations.min.js");
/* harmony import */ var web_animations_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(web_animations_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var hammerjs_hammer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! hammerjs/hammer */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs_hammer__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(hammerjs_hammer__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_20__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/* IE9, IE10 and IE11 requires all of the following polyfills. */















/** IE10 and IE11 requires the following for NgClass support on SVG elements */
 // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following for the Reflect API. */

/* Evergreen browsers require these. */
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.

/*
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 */
 // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */

 // Included with Angular CLI.
/***************************************************************************************************
 * @angular/animations polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import "intl";  // Run `npm install --save intl`.
// import "intl/locale-data/jsonp/de";
/**
 * Need to import at least one locale-data with intl.
 */
// import "intl/locale-data/jsonp/en";


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\susan\code\test2-angular\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map