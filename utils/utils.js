const assert = require('assert');
const _ = require('lodash');

// 12.toString(2) => 1100
// parseInt("1100", 2) => 12

module.exports = {
  // fixes headache in past due to arr.map(parseInt) applying parseInt(element, index, array)
  // Ooh this would be same as _.ary(parseInt, 1)
  int: s => parseInt(s, 10),
  // faster to type and return starting value. I would use log except it looks too much like Math.log
  print: e => {console.log(e); return e},
  // bunch of faster-to-type functional programming patterns
  // sum repeats lodash, but product does not
  sum: numbers => numbers.reduce((acc, e) => acc+e),
  product: numbers => numbers.reduce((acc, e) => acc*e),
  chr: v => String.fromCharCode(v),
  ord: str => str.charCodeAt(0),
  isAllEqual: arr => arr.every(e => e == arr[0]),
  isIncreasing: arr => arr.every((e, i) => i==0 || e >= arr[i-1]),
  isStrictlyIncreasing: arr => arr.every((e, i) => i==0 || e >= arr[i-1]),
  isDecreasing: arr => arr.every((e, i) => i==0 || e <= arr[i-1]),
  isStrictlyDecreasing: arr => arr.every((e, i) => i==0 || e <= arr[i-1]),
  increments: arr => arr.slice(1).map((e, i) => e - arr[i]),
  allDistinct: arr => _.uniq(arr).length === arr.length,
}
