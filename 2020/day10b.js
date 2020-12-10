const fs = require('fs')
// All imported in advance because typing speed
import {
  sort, int, print, sum, product, chr, ord, isAllEqual, isIncreasing,
  isStrictlyIncreasing, isDecreasing, isStrictlyDecreasing, increments,
  allDistinct
} from '../utils/utils.js'
require('lodash.combinations')
require('lodash.multicombinations')
require('lodash.permutations')
require('lodash.multipermutations')
require('lodash.product')
const _ = require('lodash')

fs.promises.readFile("day10.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split("\n")
    solve(L.map(int))
  })

function solve(L) {
  let s = sort(L);
  s = [0, ...s, _.last(s)+3]
  let w = s.map(x => 0);
  w[0] = 1;

  for (let i of _.range(1, s.length)) {
    for (let j of _.range(i-3, i)) {
      if (s[j] >= s[i] - 3) {
        w[i] += w[j];
      }
    }
  }
  print(w[w.length-1])
}
