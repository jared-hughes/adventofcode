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
    digits.push(...get_digits(line));
  }
  print(sum(digits));
}

function get_digits([given, todo]) {
  return todo.map(
    (word) =>
      ({
        2: 1,
        4: 1,
        7: 1,
        3: 1,
      }[word.length] ?? 0)
  );
}
