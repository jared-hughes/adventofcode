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
import * as math from 'mathjs'

fs.promises.readFile("day13.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split("\n")
    solve(L[1].split(",").map((m,i) => [i,m]).filter(([i,m]) => m != "x").map(([i,m]) => [int(i),int(m)]))
  })

function solve(ids) {
  // ids = [(i,m),...] such that t+i=0 (mod m)
  // Learn: (-i%m+m)%m <=> math.mod(i, m)
  ids = ids.map(([i,m]) => [(-i%m+m)%m, m])
  // ids = [(a,m),...] such that t=a (mod m)
  // Chinese Remainder Theorem (reduced two at a time)
  let [a, m] = [[0,1], ...ids].reduce(([a,m], [b,n]) => {
    // m is not necessarily invertible mod n
    // even if it was, it would take too long to code in an analytic solution
    for (let i=0; i<n; i++) {
      if ((m*i+a)%n == b) {
        return [(m*i+a), math.lcm(m,n)]
      }
    }
  })
  console.log(a)
}
