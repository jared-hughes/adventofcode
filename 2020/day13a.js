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
import math from 'mathjs'

fs.promises.readFile("day13.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split("\n")
    solve(int(L[0]), L[1].split(",").filter(e => e != "x").map(int))
  })

function solve(c, ids) {
  let L = ids.map(i => i - c%i);
  let m = _.min(L)
  print(ids[L.indexOf(m)]*m)
}
