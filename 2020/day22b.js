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

fs.promises.readFile("day22.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n\n/g)
    solve(L.map(player => player.split(/\n/g).slice(1).map(int)))
  })

function score(L) {
  let total = 0;
  for (let i=0; i<L.length; i++) {
    total += L[L.length - i - 1] * (i+1)
  }
  return total
}

function winner(L) {
  let seenBefore = new Set()
  while (true) {
    let roundKey = JSON.stringify(L);
    if (seenBefore.has(roundKey)) {
      return 0
    }
    seenBefore.add(roundKey)
    if (L[0].length == 0) {
      clog(score(L[1]))
      return 1
    } else if (L[1].length == 0) {
      clog(score(L[0]))
      return 0
    }
    let a = L[0].shift();
    let b = L[1].shift();
    if (L[0].length >= a && L[1].length >= b) {
      // recursive combat
      if (winner([L[0].slice(0, a), L[1].slice(0, b)]) == 0) {
        L[0].push(a)
        L[0].push(b)
      } else {
        L[1].push(b)
        L[1].push(a)
      }
    } else {
      if (a > b) {
        L[0].push(a)
        L[0].push(b)
      } else {
        L[1].push(b)
        L[1].push(a)
      }
    }
  }

}

function solve(L) {
  winner(L)
}
