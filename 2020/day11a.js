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

fs.promises.readFile("day11.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split("\n")
    solve(L.map(row => [...row]))
  })

function solve(grid) {
  let changed = true
  const w = grid[0].length;
  const h = grid.length;
  while (changed) {
    changed = false
    const lastGrid = _.cloneDeep(grid);
    for (let y=0; y<h; y++) {
      for (let x=0; x<w; x++) {
        let tot = sum([[-1,0],[1,0],[0,1],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]].map(([dx,dy]) => {
          let nx = x + dx;
          let ny = y + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            return lastGrid[ny][nx] == "#";
          }
          return 0;
        }))
        if (lastGrid[y][x] == "L" && tot == 0) {
          changed = true
          grid[y][x] = "#";
        } else if (lastGrid[y][x] == "#" && tot >= 4) {
          changed = true
          grid[y][x] = "L";
        }
      }
    }
  }
  // print(grid.map(row => row.join("")).join("\n"))
  // print("-")
  print(sum(_.flatten(grid).map(e => e == "#")))
}
