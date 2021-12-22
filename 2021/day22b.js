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

let max = Math.max;
let min = Math.min;

fs.promises.readFile("day22.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(
    L.map((line) => line.split(" ")).map(([L, R]) => [
      L === "on" ? 1 : 0,
      R.match(/-?\d+/g).map(int),
    ])
  );
});

function size(V) {
  return (
    max(V[1] - V[0] + 1, 0) * max(V[3] - V[2] + 1, 0) * max(V[5] - V[4] + 1, 0)
  );
}

function intersection(V, U) {
  A = [
    max(V[0], U[0]),
    min(V[1], U[1]),
    max(V[2], U[2]),
    min(V[3], U[3]),
    max(V[4], U[4]),
    min(V[5], U[5]),
  ];
  return A;
}

function solve(L) {
  let groups = [[], L.map(([V, e], i) => [i, i, size(e), e, V])];
  for (let s = 2; s <= L.length; s++) {
    groups[s] = [];
    for (let i = 0; i < L.length; i++) {
      for (let V of groups[s - 1]) {
        let [lo, hi, _, W] = V;
        if (i > hi) {
          let I = intersection(W, L[i][1]);
          let S = size(I);
          if (S > 0) {
            groups[s].push([lo, i, S, I, L[i][0]]);
          }
        }
      }
    }
  }

  let tot = 0;
  for (let s = 1; s <= L.length; s++) {
    k = -1 * (-1) ** s;
    for (let [lo, _, S, __] of groups[s]) {
      if (L[lo][0]) {
        tot += k * S;
      }
    }
  }
  print(tot);
}
