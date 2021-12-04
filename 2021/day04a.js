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

fs.promises.readFile("day04.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const groups = dataString.split(/\n\n/g);
  solve(
    groups[0].split(/,/g).map(int),
    groups.slice(1).map((g) => g.split(/\s+/g).map(int))
  );
});

function solve(L, boards) {
  for (let i of L) {
    for (let board of boards) {
      for (let j = 0; j < 25; j++) {
        if (board[j] == i) {
          board[j] = 0;
          if (winning(board)) {
            print(sum(board) * i);
            return;
          }
        }
      }
    }
  }
}

function winning(b) {
  for (i = 0; i < 5; i++) {
    if ([0, 1, 2, 3, 4].every((j) => b[5 * i + j] == 0)) return true;
    if ([0, 1, 2, 3, 4].every((j) => b[i + 5 * j] == 0)) return true;
  }
}
