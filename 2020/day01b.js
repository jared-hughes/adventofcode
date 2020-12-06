const fs = require('fs')

// Same input file as day 1a
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
  // Strategy/algorithm: move a middle value through the array, then
  // work from both ends along the remainder for an O(N^2) algorithm
  for (let mid = 1; mid < numbers.length-1; mid++) {
    // Inside is same as day 1a but with different goal value and end conditions
    let lo = 0;
    let hi = numbers.length-1;
    const goal = 2020 - numbers[mid];
    let total = null;
    while (total != goal && lo < mid && mid < hi) {
      total = numbers[lo] + numbers[hi];
      if (total < goal) {
        lo++;
      }
      else if (total > goal) {
        hi--;
      }
    }
    if (total == goal) {
      console.log(lo, mid, hi, numbers[lo], numbers[mid], numbers[hi], numbers[lo]*numbers[mid]*numbers[hi])
    }
  }
}
