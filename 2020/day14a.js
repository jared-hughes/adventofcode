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

fs.promises.readFile("day14.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n?mask = /).splice(1).map(e => e.split("\n"))
    solve(L.map(([mask, ...lines]) => {
      return [
        mask,
        [...lines.join("").matchAll(/\d+/g)].map(e => int(e[0]))
      ]
    }
    ))
  })

function solve(L) {
  let values = {}
  console.log(L)
  L.map(([mask, assigns]) => {
    for (let i=0; i<assigns.length; i+=2) {
      values[assigns[i]] = 0;
      let val = assigns[i+1];
      let bin = val.toString(2);
      // There are so many better ways to do this
      //  - Keep track as string and use parseInt(s, 2)
      //  - Iterate the other direction and multiply by 2 at each place
      for (let j=0; j<36; j++) {
        if (mask[35-j] == 'X') {
          if (j < bin.length) {
            values[assigns[i]] += int(bin[bin.length-j-1])*math.pow(2,j);
          }
        } else if (mask[35-j] == '1') {
          values[assigns[i]] += math.pow(2,j)
        }
      }
      print(values[assigns[i]])
    }
  })
  print(sum(_.values((values))))
}
