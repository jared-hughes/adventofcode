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

fs.promises.readFile("day03.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L);
});

function solve(L) {
  x = 0;
  y = 0;
  for (i = 0; i < 12; i++) {
    a = { 0: 0, 1: 0 };
    L.map((l) => (a[l[i]] += 1));
    x *= 2;
    y *= 2;
    if (a[1] > a[0]) {
      x += 1;
    } else {
      y += 1;
    }
  }
  print(x * y);
}
