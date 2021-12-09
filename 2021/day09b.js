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
  let sizes = [];
  for (y = 0; y < L.length; y++) {
    for (x = 0; x < L[y].length; x++) {
      a = L[y][x];
      if (
        a < ((L[y - 1] ?? [])[x] ?? 99) &&
        a < ((L[y + 1] ?? [])[x] ?? 99) &&
        a < (L[y][x - 1] ?? 99) &&
        a < (L[y][x + 1] ?? 99)
      ) {
        sizes.push(size(L, x, y));
      }
    }
  }
  s = sort(sizes);
  print(s.at(-1) * s.at(-2) * s.at(-3));
}

function size(L, x0, y0) {
  let marked = L.map((line) => line.map((e) => false));
  let stack = [[x0, y0]];
  let count = 0;
  while (stack.length > 0) {
    let [x, y] = stack.pop();
    marked[y][x] = true;
    count += 1;
    for (let [dx, dy] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      let X = x + dx;
      let Y = y + dy;
      if (
        L[Y] !== undefined &&
        L[Y][X] !== undefined &&
        !marked[Y][X] &&
        L[Y][X] > L[y][x] &&
        L[Y][X] < 9
      ) {
        stack.push([X, Y]);
      }
    }
  }
  return count;
}
