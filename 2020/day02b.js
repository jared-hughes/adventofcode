const fs = require('fs')

fs.promises.readFile("day02.in", {encoding: 'utf8'})
  .then((dataString) => {
    const lines = dataString.split("\n")
    // ends with a newline, so remove that element
    lines.splice(-1, 1)
    solve(
      lines.map(s => s.match(/(?<lo>\d+)-(?<hi>\d+) (?<char>.): (?<password>.*)/))
    )
  })

function solve(lines) {
  let numValid = 0
  for (let line of lines) {
    const {lo, hi, char, password} = line.groups;
    // bitwise XOR works like true=1 and false=0
    if ((password[lo-1] == char) ^ (password[hi-1] == char)) {
      numValid++;
    }
  }
  console.log(numValid)
}
