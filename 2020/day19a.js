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

fs.promises.readFile("day19.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n\n/)
    let rules = L[0].split(/\n/)
    solve(rules, L[1].split(/\n/));
  })

function regex(rule, R) {
  return "(" + rule.replace(/\d+/g, m => regex(R[m], R)).replace(/"| /g, "") + ")"
}

function solve(rules, messages) {
  let R = {}
  rules = rules.map(e => {
    let [_, i, m] = e.match(/(\d+): (.*)/);
    R[i] = m;
  })
  clog(messages.filter(e => e.match("^" + regex(R[0], R) + "$")).length)
}
