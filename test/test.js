var assert = require('chai').assert;
var checker = require('../checker.js')

suite('checker', function() {
	var basic_chk = checker();

	test('simple check - json', function(done) {
		var obj1 = {
				a: 'a',
				b: 'b'
			},
			obj2 = {
				a: 'xxx'
			};
		var result = basic_chk.check(obj1, obj2);
		assert.ok(result.errMsg);
		done();
	});

	test('simple check - string', function(done) {
		var obj1 = {
				a: 'a',
				b: 'b'
			},
			obj2 = JSON.stringify(obj1);
		var result = basic_chk.check(obj1, obj2);
		assert.isNull(result.errMsg);
		done();
	});

	test('complex check', function(done) {
		var obj1 = {
			_OPTION_a: "a",
			_OPTION_d: "a",
			c: [{ b: "b", _OPTION_c: "c" }, 
			 	{ b: "b", _OPTION_c: "c" }]
		};

		var obj2 = {
			a: "a",
			c: [{ b: "b" }, 
				{ b: "b", _OPTION_c: "x" }]
		};
		var chk = checker({
			option_prefix: "_OPTION_",
			seperator: "/"
		}); 
		var result = chk.check(obj1, obj2);
		assert.isNull(result.errMsg);
		done();
	});
});