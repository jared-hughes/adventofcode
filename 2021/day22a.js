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

fs.promises.readFile("day22.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(
    L.map((line) => line.split(" "))
      .map(([L, R]) => [L === "on" ? 1 : 0, R.match(/-?\d+/g).map(int)])
      .filter(([L, R]) => R.every((e) => Math.abs(e) <= 50))
  );
});

function solve(L) {
  M = [];
  for ([V, R] of L) {
    let [x, X, y, Y, z, Z] = R;
    for (let a = x; a <= X; a++) {
      for (let b = y; b <= Y; b++) {
        for (let c = z; c <= Z; c++) {
          M[a + 50 + 101 * (b + 50) + 101 * 101 * (c + 50)] = V;
        }
      }
    }
  }
  print(M);
  print(sum(M));
}
