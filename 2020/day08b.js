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

function terminates(lines) {
  let reached = lines.map(e => false)
  let i = 0;
  let acc = 0;
  while (true) {
    if (i == lines.length) {
      return acc;
    }
    if (reached[i]) {
      return null
    }
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
}

function solve(lines) {
  for (let i=0; i<lines.length; i++) {
    let q = JSON.parse(JSON.stringify(lines))
    if (q[i][0] == "acc") {
      continue
    }
    q[i][0] = q[i][0] == "nop" ? "jmp" : "nop";
    if (terminates(q) !== null) {
      console.log(terminates(q))
    }
  }
}
