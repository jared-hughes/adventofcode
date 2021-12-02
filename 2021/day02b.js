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
const { kebabCase } = require("lodash");

fs.promises.readFile("day02.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L);
});

function solve(L) {
  x = 0;
  y = 0;
  aim = 0;
  L.map((line) => {
    [k, d] = line.split(" ");
    d = int(d);
    if (k == "forward") {
      x += d;
      y += aim * d;
    }
    if (k == "down") {
      aim += d;
    }
    if (k == "up") {
      aim -= d;
    }
  });
  print(x * y);
}
