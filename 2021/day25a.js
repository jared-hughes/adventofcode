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

fs.promises.readFile("day25.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(
    L.map((line) => [...line].map((e) => (e == ">" ? 1 : e == "v" ? 2 : 0)))
  );
});

function solve(L) {
  for (let i = 1; ; i++) {
    let changed = false;
    function step(m) {
      let newL = L.map((line) => [...line]);
      let w = L[0].length;
      for (let y = 0; y < L.length; y++) {
        for (let x = 0; x < w; x++) {
          if (L[y][x] == m && L[y][(x + 1) % w] == 0) {
            newL[y][(x + 1) % w] = m;
            newL[y][x] = 0;
            changed = true;
          }
        }
      }
      return newL;
    }
    L = step(1);
    L = _.zip(...L);
    L = step(2);
    L = _.zip(...L);
    if (!changed) {
      clog(i);
      break;
    }
  }
}
