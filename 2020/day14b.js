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
  L.map(([mask, assigns]) => {
    for (let i=0; i<assigns.length; i+=2) {
      let out = assigns[i+1];
      let bin = assigns[i].toString(2);
      let l = bin.length
      let address = [0]
      for (let j=0; j<36; j++) {
        if (mask[35-j] == 'X') {
          address = address.concat(address.map(e => e + math.pow(2,j)));
        } else if (mask[35-j] == '1' || (mask[35-j] == '0' && bin[l-j-1] == '1')) {
          address = address.map(e => e + math.pow(2,j));
        }
      }
      address.map(e => {
        values[e] = out
      })
    }
  })
  print(sum(_.values((values))))
}
