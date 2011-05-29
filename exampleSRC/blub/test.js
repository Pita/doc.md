/**
 This is an example module
*/

/**
 * This is our second test function
 * @param b We don't know what b ist
 * @param a {Number} a ist 21, the half answer
 * @return {void} nothing
 * ...
 */
exports.test2=function( a, b)
{
  console.log("test2");
}

/**
 * This is the first test function
 * @param a {String} Parameter is text
 * @param b {Number} B is a number, its 42
 */
exports.test = function(a,b)
{
  console.log("test");
}

/**
 * bla ist another unimportant variable that we export
 * why? cause we can!
 */
exports.bla = "content";

/**
 * Just a variable
 * @type object
 */
exports.foo = {foo: "bar"}

exports.blink = "yeah!";

exports.test3 = function(d ,k , a)
{
  console.log("test3");
} 
