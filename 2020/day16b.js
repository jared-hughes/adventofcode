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
    const myTicket = L[1].split(/\n/)[1].split(",").map(int)
    const otherTickets = L[2].split(/\n/).slice(1).map(row =>
      row.split(",").map(int)
    )
    solve(rules, myTicket, otherTickets);
  })

function meets(v, r) {
  return (r[1] <= v && v <= r[2]) || (r[3] <= v && v <= r[4])
}

function solve(rules, myTicket, tickets) {
  let total = 0;
  // Array of possible rules for each position
  let possible = tickets[0].map(e => new Set(_.cloneDeep(rules)))
  // Remove each invalid rule for each position
  for (let ticket of tickets) {
    if (ticket.some(v => !rules.some(r => meets(v,r)))) {
      continue;
    }
    _.zip(ticket, possible).map(([v, poss]) => {
      [...poss].filter(r => !meets(v, r))
      .map(r => {poss.delete(r)})
    })
  }
  possible = possible.map(p => new Set([...p].map(e => e[0])))
  // Reminiscent of a sudoku solver
  // Naively loop n times
  for (let i of _.range(possible.length)) {
    // Remove u from all other sets if u is in a set with cardinality 1
    possible.filter(p1 => p1.size == 1)
    .map(p1 => {
      let u = [...p1.values()][0]
      // The filter check avoids the own set
      possible.filter(p2 => p2.size > 1)
      .map(p2 => {p2.delete(u)})
    })
  }
  // Did this by hand during the actual contest because I thought it would be faster
  // That was a mistake
  possible = possible.map(e => [...e][0])
  clog(product(
    _.zip(possible, myTicket)
    .filter(([poss, my]) => poss.startsWith("departure"))
    .map(([poss, my]) => my)
  ))
}
