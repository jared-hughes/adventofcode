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

const match = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

fs.promises.readFile("day10.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L);
});

function solve(L) {
  let scores = L.map(score);
  scores = scores.filter((s) => s > 0);
  scores = sort(scores);
  print(scores[scores.length / 2 - 0.5]);
}

function score(line) {
  stack = [];
  for (c of [...line]) {
    if (match[c] !== undefined) {
      stack.push(c);
    } else {
      d = stack.pop();
      if (match[d] !== c) {
        return 0;
      }
    }
  }
  sc = 0;
  for (c of _.reverse(stack)) {
    sc *= 5;
    sc += " ([{<".indexOf(c);
  }
  return sc;
}
