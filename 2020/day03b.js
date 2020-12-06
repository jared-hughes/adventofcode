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
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]
  console.log([1, ...slopes].reduce((acc, [dx, dy]) => acc * total(grid, dx, dy)));
}

function total(grid, dx, dy) {
  let treesEncountered = 0;
  for (let x = 0, y = 0; y < grid.length; x += dx, y += dy) {
    const line = grid[y]
    if (line[x % line.length]) {
      treesEncountered++;
    }
  }
  console.log(dx, dy, treesEncountered);
  return treesEncountered;
}
