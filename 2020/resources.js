module.exports = {
  qsort: numbers => numbers.sort((a, b) => a - b),
  // fixes headache in past due to arr.map(parseInt) applying parseInt(element, index, array)
  int: s => parseInt(s, 10),
  // faster to type. I would use log except it looks too much like Math.log
  print: console.log,
  // bunch of faster-to-type functional programming patterns
  sum: numbers => numbers.reduce((acc, e) => acc+e),
  product: numbers => numbers.reduce((acc, e) => acc*e),
  min: numbers => numbers.reduce((acc, e) => Math.min(acc, e)),
  max: numbers => numbers.reduce((acc, e) => Math.max(acc, e)),
  deepClone: x => JSON.parse(JSON.stringify(x)),
  isEmptyObject: obj => Object.keys(obj).length === 0,
}
