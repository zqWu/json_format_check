
var Checker = require('./checker.js');

var obj1 = {a: "a"}
var obj2 = {b: 'a'}
console.log(Checker().check(obj1, obj2));

// var obj2a = {a: "a"}
// var obj2b = {a: 1}
// console.log(Checker().check(obj2a, obj2b));

// var foo1 = {b: {a: "a",	b: "b"}}
// var foo2 = {b: {a: "a",	c: "b"}}
// console.log(Checker().check(foo1, foo2));

// var test3a = [{	a: "a",	b: "b"}];
// var test3b = [{	a: "a",	c: "b"}];
// console.log(Checker().check(test3a, test3b));


// var test4a = {b: [{a: "a",b: "b"}]}
// var test4b = {b: [{a: "a",c: "b"}]}
// console.log(Checker().check(test4a, test4b));

// var test5a = {
// 	a: [{a: "a",b: "b"}],
// 	b: [{a: "a",b: "b"}]
// }
// var test5b = {	
// 	a: [{a: "a",b: "b"}],
// 	b: [{a: "a",c: "b"}]
// }
// console.log(Checker().check(test5a, test5b));

// var test6a = {
// 	_OPTION_a: "a",
// 	_OPTION_d: "a",
// 	c:[	{b:"b",_OPTION_c:"c"},
// 		{b:"b",_OPTION_c:"c"}
// 	]
	
// }

// var test6b = {
// 	a: "a",
// 	c:[	{b:"b"},
// 		{b:"b",_OPTION_c:"x"},
// 	]
	
// }
// console.log(Checker({
// 	option_prefix: "_OPTION_",
// 	seperator: "/"
// }).check(test6a, test6b));