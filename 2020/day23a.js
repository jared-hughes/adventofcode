const fs = require('fs')
// All imported in advance because typing speed
import {
  sort, int, print, clog, sum, product, chr, ord, isAllEqual, isIncreasing,
  isStrictlyIncreasing, isDecreasing, isStrictlyDecreasing, increments,
  allDistinct
} from '../utils/utils.js'
require('lodash.combinations')
require('lodash.multicombinations')
require('lodash.permutations')
require('lodash.multipermutations')
require('lodash.product')
const _ = require('lodash')
import * as math from 'mathjs'

fs.promises.readFile("day23.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n/g)
    solve([...dataString].map(int))
  })

function solve(L) {
  function l(x) {
    return L[x % L.length]
  }
  for (let i=0; i<100; i++) {
    // clog("")
    // clog(i+1)
    // clog(L.join(""))
    let picked = L.splice(1, 3)
    let dest = L[0] - 1;
    while (picked.includes(dest) || dest < 1) {
      dest -= 1;
      if (dest < 1) {
        dest = 9
      }
    }
    clog(L.length)
    clog(L.indexOf(dest))
    L.splice((L.indexOf(dest) + 1), 0, ...picked)
    L = [...L.slice(1), L[0]]
  }
  clog(L.join(""))
}
