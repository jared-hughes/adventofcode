const fs = require('fs')

function toInt(s) {
  if (s == "no") {
    return 0
  } else {
    return parseInt(s)
  }
}

fs.promises.readFile("day07.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const lines = dataString.split("\n")
    solve(lines.map(line => [
      line.match(/(\w+ \w+) bags? contain/)[1],
      Object.fromEntries([...line.matchAll(/(\d+) (\w+ \w+) bags?/g)].map(e => [e[2], toInt(e[1])]))
    ]))
  })

function size(bag, map) {
  // Simple recursive approach
  if (Object.keys(map[bag]).length === 0) {
    return 0
  } else {
    let total = 0;
    for (let i in map[bag]) {
      total += map[bag][i] * (1+size(i, map))
    }
    return total
  }
}

function solve(lines) {
  const map = {};
  for (let [start, ends] of lines) {
    map[start] = ends
  }
  console.log(size('shiny gold', map))
}
