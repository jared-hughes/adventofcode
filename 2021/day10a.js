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

function score(line) {
  stack = [];
  for (c of [...line]) {
    if (match[c] !== undefined) {
      stack.push(c);
    } else {
      d = stack.pop();
      if (match[d] !== c) {
        return {
          ")": 3,
          "]": 57,
          "}": 1197,
          ">": 25137,
        }[c];
      }
    }
  }
  return 0;
}

function solve(L) {
  let tot = 0;
  for (let line of L) {
    tot += score(line);
  }
  print(tot);
}
