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

fs.promises.readFile("day18.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n/)
    solve(L);
  })

function calc(s) {
  // Remove the parentheses around single numbers
  let s1 = s.replace(/\((\d+)\)/g, "$1")
  // Fairly simple; since the second replacement is not global, it goes left-to-right
  let s2 = s1.replace(/\d+ (\*|\+) \d+/, m=>eval(print(m)))
  if (s == s2) {
    return int(s)
  }
  return calc(s2)
}


function solve(L) {
  clog(sum(L.map(calc)))
}
