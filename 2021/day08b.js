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

fs.promises.readFile("day08.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L.map((a) => a.split(" | ").map((b) => b.split(/ /g))));
});

function solve(L) {
  digits = [];
  for (line of L) {
    digits.push(parseInt(get_digits(line).join("")));
  }
  print(sum(digits));
}

M = {
  0: "abcefg",
  1: "cf",
  2: "acdeg",
  3: "acdfg",
  4: "bcdf",
  5: "abdfg",
  6: "abdefg",
  7: "acf",
  8: "abcdefg",
  9: "abcdfg",
};

m = Object.values(M);

function get_digits([given, todo]) {
  const constraints = [...given, ...todo];
  poss = {};
  for (perm of _.permutations([..."abcdefgh"], 7)) {
    if (constraints.every((word) => m.includes(rep(word)))) {
      let r = todo.map((word) => m.indexOf(rep(word)));
      print(r);
      return r;
    }
  }
  return ["0"];
}

function rep(word) {
  return [...word]
    .map((c) => perm[c.charCodeAt() - "a".charCodeAt()])
    .sort()
    .join("");
}
