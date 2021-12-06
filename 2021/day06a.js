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

fs.promises.readFile("day06.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L[0].split(/,/g).map(int));
});

function solve(L) {
  c = [];
  for (i = 0; i < 9; i++) {
    c[i] = 0;
  }
  for (k of L) {
    c[k]++;
  }
  for (i = 0; i < 80; i++) {
    births = c[0];
    c[0] = c[1];
    c[1] = c[2];
    c[2] = c[3];
    c[3] = c[4];
    c[4] = c[5];
    c[5] = c[6];
    c[6] = c[7] + births;
    c[7] = c[8];
    c[8] = births;
  }
  print(sum(c));
}
