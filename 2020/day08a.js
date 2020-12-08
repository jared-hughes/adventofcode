const fs = require('fs')

fs.promises.readFile("day08.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const lines = dataString.split("\n")
    solve(lines.map(line => line.match(/(?<instruction>nop|jmp|acc) (?<num>(\+|-)\d+)/).groups)
      .map(({instruction, num}) => [instruction, parseInt(num)])
    )
  })

function solve(lines) {
  let reached = lines.map(e => false)
  let i = 0;
  let acc = 0;
  while (!reached[i]) {
    reached[i] = true
    let [inst, d] = lines[i];
    if (inst == "nop") {
      i++;
    }
    else if (inst == "acc") {
      acc += d
      i++;
    }
    else {
      i += d;
    }
  }
  console.log(acc)
}
