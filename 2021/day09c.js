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
const { count } = require("console");

fs.promises.readFile("day09.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L.map((line) => [...line].map((c) => parseInt(c))));
});

function solve(L) {
  let count = {};
  for (y = 0; y < L.length; y++) {
    for (x = 0; x < L[y].length; x++) {
      a = L[y][x];
      if (a < 9) {
        let [X, Y] = endpoint(L, x, y);
        k = X + "_" + Y;
        count[k] ??= 0;
        count[k] += 1;
      }
    }
  }
  s = sort(Object.values(count));
  print(s.at(-1) * s.at(-2) * s.at(-3));
}

function endpoint(L, x, y) {
  for (let [dx, dy] of [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]) {
    let X = x + dx;
    let Y = y + dy;
    if (L[Y] !== undefined && L[Y][X] !== undefined && L[Y][X] < L[y][x]) {
      return endpoint(L, X, Y);
    }
  }
  return [x, y];
}
