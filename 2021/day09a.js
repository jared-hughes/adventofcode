const fs = require("fs");
// All imported in advance because typing speed
const {
  sort,
  int,
  print,
  clog,
  sum,
  product,
  chr,
  ord,
  isAllEqual,
  isIncreasing,
  isStrictlyIncreasing,
  isDecreasing,
  isStrictlyDecreasing,
  increments,
  allDistinct,
} = require("../utils/utils.js");
require("lodash.combinations");
require("lodash.multicombinations");
require("lodash.permutations");
require("lodash.multipermutations");
require("lodash.product");
const _ = require("lodash");
const math = require("mathjs");

fs.promises.readFile("day09.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L.map((line) => [...line].map((c) => parseInt(c))));
});

function solve(L) {
  let tot = 0;
  for (y = 0; y < L.length; y++) {
    for (x = 0; x < L[y].length; x++) {
      a = L[y][x];
      if (
        a < ((L[y - 1] ?? [])[x] ?? 99) &&
        a < ((L[y + 1] ?? [])[x] ?? 99) &&
        a < (L[y][x - 1] ?? 99) &&
        a < (L[y][x + 1] ?? 99)
      ) {
        clog(y, x, a);
        tot += a + 1;
      }
    }
  }
  print(tot);
}
