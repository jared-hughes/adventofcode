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

fs.promises.readFile("day21.in", { encoding: "utf8" }).then((dataString) => {
  solve();
});

function solve() {
  let pos = [2, 1];
  let s = [0, 0];
  let p = 0;
  let v = 0;
  while (Math.max(...s) < 1000) {
    pos[p] += (v % 100) + 1 + ((v + 1) % 100) + 1 + ((v + 2) % 100) + 1;
    pos[p] = ((pos[p] - 1) % 10) + 1;
    s[p] += pos[p];
    v += 3;
    p = 1 - p;
  }
  print(Math.min(...s) * v);
}
