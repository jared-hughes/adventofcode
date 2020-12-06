const fs = require('fs')

fs.promises.readFile("day03.in", {encoding: 'utf8'})
  .then((dataString) => {
    const lines = dataString.split("\n")
    // ends with a newline, so remove that element
    lines.splice(-1, 1)
    solve(
      lines.map(s => [...s].map(e => e=="#"))
    )
  })

function solve(grid) {
  // takes grid as a boolean matrix: a list of rows
  const dx = 3;
  const dy = 1;
  let treesEncountered = 0;
  for (let x = 0, y = 0; y < grid.length; x += dx, y += dy) {
    const line = grid[y]
    if (line[x % line.length]) {
      treesEncountered++;
      console.log(y,x)
    }
  }
  console.log(treesEncountered)
}
