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

fs.promises.readFile("day05.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L.map((line) => line.split(" -> ").map((p) => p.split(",").map(int))));
});

function solve(L) {
  collision = [];
  W = 1000;
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < W; j++) {
      collision[W * i + j] = 0;
    }
  }
  for (let line of L) {
    [[x1, y1], [x2, y2]] = line;
    [dx, dy] = [x2 - x1, y2 - y1];
    g = math.gcd(Math.abs(dx), Math.abs(dy));
    DX = dx / g;
    DY = dy / g;
    for (i = 0; ; i++) {
      x = x1 + DX * i;
      y = y1 + DY * i;
      collision[W * x + y]++;
      if (x == x2 && y == y2) {
        break;
      }
    }
  }
  print(sum(collision.map((e) => e >= 2)));
}
