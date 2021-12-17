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

function solve() {
  // target area: x=111..161, y=-154..-101
  for (let y0 = 500; y0 > 0; y0--) {
    for (let x0 = 5; x0 < 261; x0++) {
      let x = 0;
      let vx = x0;
      let maxy = 0;
      for (let t = 1; t < 5000; t++) {
        let y = y0 * t - (t * (t + 1)) / 2;
        maxy = Math.max(maxy, y);
        x += vx;
        vx = Math.max(0, vx - 1);
        if (-154 <= y && y <= -101 && 111 <= x && 161 <= x) {
          // if (-10 <= y && y <= -5 && 20 <= x && x <= 30) {
          return maxy;
        }
      }
    }
  }
  // print(L);
}

print(solve());
