const fs = require('fs')

fs.promises.readFile("day07.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const lines = dataString.split("\n")
    solve(lines.map(line => [
      line.match(/(\w+ \w+) bags? contain/)[1],
      [...line.matchAll(/\d+ (\w+ \w+) bags?/g)].map(e => e[1])
    ]))
  })

function solve(lines) {
  const outers = new Set();
  outers.add("shiny gold")
  for (let i=0; i<lines.length; i++) {
    for (let [start, ends] of lines) {
      if (outers.has(start)) {
        continue
      }
      if (ends.some(e => outers.has(e))) {
        outers.add(start)
      }
    }
  }
  // subtract the outer of "shiny gold"
  console.log(outers.size -1)
}
