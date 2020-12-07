const fs = require('fs')

fs.promises.readFile("day06.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const groups = dataString.split("\n\n")
    solve(groups)
  })

function solve(groups) {
  let total = 0;
  for (const group of groups) {
    const people = group.split("\n");
    // Every character in the first person's string is included in every other
    // persons' string
    total += [...people[0]].filter(c => (
      people.every(s => s.includes(c))
    )).length
  }
  console.log(total)
}
