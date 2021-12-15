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

fs.promises.readFile("day15.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L.map((line) => [...line].map(int)));
});

function solve(L) {
  let unvisited = [];
  let dist = _.cloneDeep(L);

  for (let x = 0; x < L.length; x++) {
    for (let y = 0; y < L.length; y++) {
      dist[y][x] = Infinity;
      unvisited.push([x, y]);
    }
  }
  dist[0][0] = 0;

  while (unvisited.length > 0) {
    let [x, y] = unvisited.shift();
    unvisited = unvisited.filter(([x0, y0]) => x0 != x || y0 != y);
    for (let [X, Y] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (unvisited.find(([x0, y0]) => x0 == X && y0 == Y)) {
        let alt = dist[y][x] + L[Y][X];
        if (alt < dist[Y][X]) {
          dist[Y][X] = alt;
        }
      }
    }
    unvisited.sort(([x0, y0], [x1, y1]) => dist[y0][x0] - dist[y1][x1]);
  }
  print(dist[L.length - 1][L.length - 1]);
}
