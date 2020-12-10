const fs = require('fs')
// All imported in advance because typing speed
import {
  int, print, sum, product, chr, ord, isAllEqual, isIncreasing,
  isStrictlyIncreasing, isDecreasing, isStrictlyDecreasing, increments,
  allDistinct
} from '../utils/utils.js'

fs.promises.readFile("day09.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split("\n")
    solve(L.map(int))
  })

function solve(L) {
  const c = 25
  for (let i=c; i<L.length; i++) {
    let isValid = false;
    for (let j=i-c; j<i-1; j++) {
      if (isValid) {
        break;
      }
      for (let k=j+1; k<i; k++) {
        if (L[j] + L[k] == L[i]) {
          isValid = true;
          break;
        }
      }
    }
    if (!isValid) {
      print(L[i])
    }
  }
}
