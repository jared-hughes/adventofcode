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

fs.promises.readFile("day16.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n\n/)
    const rules = L[0].split(/\n/).map(row => {
      let match = row.match(/(.*): (\d+)-(\d+) or (\d+)-(\d+)/)
      return [match[1], ...[...match].slice(2).map(int)]
    })
    const otherTickets = L[2].split(/\n/).slice(1).map(row =>
      row.split(",").map(int)
    )
    solve(rules, otherTickets);
  })

function meets(v, r) {
  return (r[1] <= v && v <= r[2]) || (r[3] <= v && v <= r[4])
}

function solve(rules, tickets) {
  let total = 0;
  for (let ticket of tickets) {
    ticket.filter(v => !rules.some(rule => meets(v, rule)))
    .map(failed => {total += failed})
  }
  clog(total)
}
