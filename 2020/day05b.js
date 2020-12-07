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
  // Use a Set for O(N) performance, yay!
  const idSet = new Set()
  let minID = 1024;
  let maxID = 0;
  for (let pass of passes) {
    const id = seatID(pass);
    idSet.add(id);
    minID = Math.min(minID, id);
    maxID = Math.max(maxID, id);
  }
  for (let i=minID; i<maxID; i++) {
    if (!idSet.has(i) && idSet.has(i-1) && idSet.has(i+1)) {
      console.log(i)
    }
  }
}
