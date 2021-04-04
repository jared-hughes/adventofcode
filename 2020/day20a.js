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

fs.promises.readFile("day20.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n\n/g)
    solve(L.map(tile => ({
      id: tile.split(/\n/g)[0].match(/Tile (\d+):/)[1],
      borders: _.zip(...borders(tile.split(/\n/g).slice(1)
        .map(line => [...line].map(c => c == "#" ? 1 : 0))).map(prints))
    })))
  })

function prints(border) {
  return [
    parseInt(border.join(""), 2),
    parseInt(_.reverse([...border]).join(""), 2)
  ]
}

function borders(grid) {
  return [
    grid[0],
    _.zip(...grid)[grid.length-1],
    grid[grid.length-1],
    _.zip(...grid)[0]
  ]
}

function solve(L) {
  let edges = L.map(e => e.borders).flat(2)
  let centers = L.filter(({id, borders}) => {
    // find some center piece
    return borders[0].every(e => edges.filter(f => f==e).length > 1)
    // borders.map(flips => {
    //   clog (edges.filter(e => flips.includes(e)).length - 2)
    // })
  })
  let edgesP = L.filter(({id, borders}) => {
    // find some center piece
    return borders[0].filter(e => edges.filter(f => f==e).length > 1).length == 2
    // borders.map(flips => {
    //   clog (edges.filter(e => flips.includes(e)).length - 2)
    // })
  })
  clog("C", product(edgesP.map(e => int(e.id))))
}
