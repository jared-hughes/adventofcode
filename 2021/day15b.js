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
  let grid = L.map((line) => [...line].map(int));
  grid = grid.map((line) =>
    _.flatMap([0, 1, 2, 3, 4].map((d) => line.map((a) => a + d)))
  );
  grid = [
    ...grid,
    ...grid.map((line) => line.map((a) => a + 1)),
    ...grid.map((line) => line.map((a) => a + 2)),
    ...grid.map((line) => line.map((a) => a + 3)),
    ...grid.map((line) => line.map((a) => a + 4)),
  ];
  grid = grid.map((line) => line.map((a) => ((a - 1) % 9) + 1));
  solve(grid);
});

function solve(L) {
  let dist = _.cloneDeep(L);
  let unvisited = _.cloneDeep(L);
  let unedged = _.cloneDeep(L);
  let pq = [];

  for (let x = 0; x < L.length; x++) {
    for (let y = 0; y < L.length; y++) {
      dist[y][x] = x + y === 0 ? 0 : Infinity;
    }
  }
  pq.push([0, 0]);

  while (pq.length > 0) {
    let [x, y] = pq.shift();
    unvisited[y][x] = 0;
    for (let [X, Y] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (unvisited[Y]?.[X]) {
        let alt = dist[y][x] + L[Y][X];
        if (alt < dist[Y][X]) {
          if (unedged[Y][X]) {
            pq.push([X, Y]);
          }
          unedged[Y][X] = 0;
          dist[Y][X] = alt;
        }
      }
    }
    pq.sort(([x0, y0], [x1, y1]) => dist[y0][x0] - dist[y1][x1]);
  }
  print(dist[L.length - 1][L.length - 1]);
}
