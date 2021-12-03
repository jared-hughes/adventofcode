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

fs.promises.readFile("day03.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L);
});

function most(L, i) {
  a = { 0: 0, 1: 0 };
  L.map((l) => (a[l[i]] += 1));

  if (a[1] >= a[0]) {
    return "1";
  }
  return "0";
}
function least(L, i) {
  a = { 0: 0, 1: 0 };
  L.map((l) => (a[l[i]] += 1));

  if (a[1] >= a[0]) {
    return "0";
  }
  return "1";
}

function solve(L) {
  A = L.slice(0);
  B = L.slice(0);
  for (i = 0; i < 12; i++) {
    if (A.length > 1) {
      A = A.filter((l) => l[i] == most(A, i));
    }
    if (B.length > 1) {
      B = B.filter((l) => l[i] == least(B, i));
    }
  }
  print(parseInt(A[0], 2) * parseInt(B[0], 2));
}
