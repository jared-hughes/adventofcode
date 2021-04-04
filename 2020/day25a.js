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

fs.promises.readFile("day25.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n/g)
    solve(L.map(line => int(line)))
  })

function transform(subject, loopSize) {
  let val = 1;
  for (let i of _.range(loopSize)) {
    val = (val * subject)%20201227
  }
  return val
  // subject ^ loopSize mod 20201227
}

function solve(L) {
  const M = 20201227;
  let v = 1
  for (let i=0; i<M; i++) {
    if (L[0] == v) {
      clog(i)
      clog(L[1])
      clog(transform(L[1], i))
      break
    }
    if (L[1] == v) {
      clog((L[0] ** i) % M)
      break
    }
    v = (v*7)%M
  }
}
