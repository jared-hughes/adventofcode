const fs = require('fs')

fs.promises.readFile("day06.in", {encoding: 'utf8'})
  .then((dataString) => {
    const groups = dataString.split("\n\n")
    solve(groups)
  })

function solve(groups) {
  let total = 0;
  for (const group of groups) {
    let answerSet = new Set();
    for (const person of group.split("\n")) {
      for (const c of person) {
        answerSet.add(c)
      }
    }
    total += answerSet.size;
  }
  console.log(total)
}
