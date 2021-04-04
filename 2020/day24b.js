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

fs.promises.readFile("day24.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n/g)
    solve(L.map(line => [...line.matchAll(/e|se|sw|w|nw|ne/g)].map(e => e[0])))
  })

function pos(ls) {
  let x=0,y=0;
  for (let p of ls) {
    let dx,dy;
    [dx,dy] = {
      'e': [1, 0],
      'ne': [0.5, 1],
      'nw': [-0.5, 1],
      'w': [-1, 0],
      'sw': [-0.5, -1],
      'se': [0.5, -1]
    }[p]
    x += dx;
    y += dy;
  }
  return [x,y]
}

function solve(L) {
  let flipped = new Set()
  for (let ls of L) {
    let p = pos(ls).join(",")
    if (flipped.has(p)) {
      flipped.delete(p)
    } else {
      flipped.add(p)
    }
  }
  for (let i=0; i<100; i++) {
    let adjCount = {}
    for (let b of flipped) {
      let x,y;
      [x,y] = b.split(",").map(e => parseFloat(e))
      let dx,dy;
      for ([dx,dy] of [[1, 0],[0.5, 1],[-0.5, 1],[-1, 0],[-0.5, -1],[0.5, -1]]) {
        let c = (x + dx)+","+(y + dy)
        adjCount[c] = adjCount[c] === undefined ? 1 : adjCount[c]+1;
      }
    }
    let newFlipped = new Set()
    for (let b in adjCount) {
      if (flipped.has(b)) {
        // black
        if (adjCount[b] == 1 || adjCount[b] == 2) {
          newFlipped.add(b)
        }
      } else {
        // white
        if (adjCount[b] == 2) {
          newFlipped.add(b)
        }
      }
    }
    flipped = newFlipped
    clog(flipped.size)
  }
}
