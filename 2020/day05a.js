const fs = require('fs')

fs.promises.readFile("day05.in", {encoding: 'utf8'})
  .then((dataString) => {
    const lines = dataString.split("\n")
    // ends with a newline, so remove that element
    lines.splice(-1, 1)
    solve(lines)
  })

function seatID(pass) {
  // interprets pass as the reverse of a binary number
  let total = 0;
  for (let c of pass) {
    total *= 2
    total += c == "B" || c == "R";
  }
  return total
}

function solve(passes) {
  console.log([-1, ...passes].reduce(
    (acc, pass) => Math.max(acc, seatID(pass))
  ))
}
