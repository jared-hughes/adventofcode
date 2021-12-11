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

fs.promises.readFile("day11.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L.map((row) => [...row].map(int)));
});

function solve(L) {
  for (i = 0; i < 500; i++) {
    L = L.map((row) => row.map((e) => e + 1));
    changed = true;
    f = 0;
    while (changed) {
      changed = false;
      for (x = 0; x < 10; x++) {
        for (y = 0; y < 10; y++) {
          if (L[y][x] <= 9) continue;
          L[y][x] = -9999;
          changed = true;
          f++;
          for (dx = -1; dx <= 1; dx++) {
            for (dy = -1; dy <= 1; dy++) {
              X = x + dx;
              Y = y + dy;
              if (X >= 0 && X < 10 && Y >= 0 && Y < 10) {
                L[Y][X] += 1;
              }
            }
          }
        }
      }
    }
    if (f === 100) {
      print(i);
    }
    L = L.map((row) => row.map((e) => (e < 0 ? 0 : e)));
  }
}
