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

fs.promises.readFile("day15.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/,/)
    solve(L.map(int))
  })

function solve(L) {
  let hist = new Map();
  for (let i=0; i<L.length-1; i++) {
    hist.set(L[i], i);
  }
  let last = L[L.length-1];
  let T = 30000000;
  for (let i of _.range(L.length, T)) {
    let speak = 0;
    if (hist.has(last)) {
      speak = i-hist.get(last)-1
    }
    hist.set(last, i-1)
    last = speak;
  }
  clog(last)
}
