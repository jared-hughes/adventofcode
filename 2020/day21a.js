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

fs.promises.readFile("day21.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n/g)
    solve(L.map(line => {
      let ls = line.slice(0,line.length-1).split(" (contains ")
      return [
        ls[0].split(" "),
        ls[1].split(", ")
      ]
    }))
  })


function solve(L) {
  // Each allergen is found in exactly one ingredient. Each ingredient contains zero or one allergen.
  let allAllergens = new Set()
  L.map(e => e[1].map(f=>allAllergens.add(f)))
  let allIngredients = []
  L.map(e => e[0].map(f=>allIngredients.push(f)))
  let possible = [...allAllergens].map(a => {
    return _.intersection(...L.filter(e => e[1].includes(a)).map(e => e[0]))
  })
  let canHaveAllergen = _.union(...possible)
  let none = allIngredients.filter(e => !canHaveAllergen.includes(e))
  clog(allAllergens)
  clog(possible)
  clog(none.length)
}
