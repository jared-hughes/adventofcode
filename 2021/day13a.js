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

fs.promises.readFile("day13.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString;
  solve(L.split(/\n\n/g));
});

function solve([dots, folds]) {
  dots = dots.split(/\n/g).map((line) => line.split(/,/).map(int));
  folds = folds
    .split(/\n/g)
    .map((line) => line.split(/=/))
    .map(([a, b]) => [[...a].at(-1), int(b)])
    .slice(0, 1);
  w = _.max(dots.map(([x, y]) => x)) + 1;
  h = _.max(dots.map(([x, y]) => y)) + 1;
  let grid = [];
  for (y = 0; y < h; y++) {
    grid.push([]);
    for (x = 0; x < w; x++) {
      grid.at(-1).push(0);
    }
  }
  for ([x, y] of dots) {
    grid[y][x] = 1;
  }

  for ([xy, p] of folds) {
    if (xy == "y") grid = transpose(grid);
    for (let y = 0; y < h; y++) {
      for (let x = p; x < grid[0].length; x++) {
        if (grid[y][x] > 0) {
          grid[y][x] = 0;
          grid[y][2 * p - x] = 1;
        }
      }
    }
    if (xy == "y") grid = transpose(grid);
  }
  print(sum(_.flatMap(grid)));
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}
