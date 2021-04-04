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

function resolve(L, M) {
  // const M = 20
  L = [...L, ..._.range(10, M + 1)]
  // doubly-linked list
  let d = {}
  clog(L)
  for (let i=0; i<L.length; i++) {
    d[L[i]] = i+1 < L.length ? L[i+1] : L[0]
  }
  let current = L[0]
  for (let i=0; i<10 * M; i++) {
    // clog()
    let a = d[current]
    let b = d[a]
    let c = d[b]
    let picked = [a,b,c]
    // clog(current, picked)
    d[current] = d[c]
    let dest = current - 1;
    while (picked.includes(dest) || dest < 1) {
      dest -= 1;
      if (dest < 1) {
        dest = M
      }
    }
    d[c] = d[dest]
    d[dest] = a
    current = d[current]
  }
  return [d[1], d[d[1]]]
  // return [L[L.indexOf(1)+1], L[L.indexOf(1)+2]]
  clog(L.join(","))
}

function solve(L) {
  let u = resolve(L, 1000000)
  clog(u)
  clog(product(u))
}
