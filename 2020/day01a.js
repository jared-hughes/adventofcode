const fs = require('fs')

fs.promises.readFile("day01.in", {encoding: 'utf8'})
  .then((dataString) => {
    const lines = dataString.split("\n")
    // ends with a newline, so remove that element
    lines.splice(-1, 1)
    solve(
      lines.map(s => parseInt(s))
    )
  })

function solve(numbers) {
  // Javascript defaults to sorting alphabetically, so override with a comparison function
  numbers.sort((a, b) => a - b)
  // Strategy/algorithm: work from both ends: O(N) algorithm after sorting
  let lo = 0;
  let hi = numbers.length-1;
  const goal = 2020;
  let total = null;
  while (total != goal) {
    total = numbers[lo] + numbers[hi];
    if (total < goal) {
      lo++;
    }
    else if (total > goal) {
      hi--;
    }
  }
  console.log(lo, hi, numbers[lo], numbers[hi], numbers[lo]*numbers[hi])
}
