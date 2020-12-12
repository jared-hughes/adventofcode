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

fs.promises.readFile("day12.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split("\n")
    solve(L.map(row => [row[0], int(row.slice(1))]))
  })

function solve(L) {
  // ship's position
  let x=0, y=0;
  // dx and dy refer to the waypoint's position relative to the ship
  let dx=10, dy=1;

  // First map is to avoid two cases for R and L
  L.map(([e,v])=>(e=="R" ? ["L", 360-v] : [e,v]))
  .map(([e, v]) => {
    switch(e) {
      case "N":
        dy += v;
        break;
      case "S":
        dy -= v;
        break;
      case "E":
        dx += v;
        break;
      case "W":
        dx -= v;
        break;
      case "F":
        x += dx * v;
        y += dy * v;
        break;
      case "L":
        if (v == 180) {
          [dx, dy] = [-dx, -dy]
        } else if (v == 90) {
          [dy, dx] = [dx, -dy]
        } else if (v == 270) {
          [dy, dx] = [-dx, dy]
        } else {
          print("unhandled angle")
        }
    }
    // console.log(x,y, dx, dy)
  })

  print(Math.abs(x)+Math.abs(y))
}
