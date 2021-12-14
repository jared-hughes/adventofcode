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

fs.promises.readFile("day14.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n\n/g);
  solve(
    L[0],
    L[1].split(/\n/g).map((line) => line.split(/ -> /))
  );
});

function solve(w, repl) {
  c = {};
  for (let [a, b] of repl) {
    c[a] = 0;
  }
  for (let i = 0; i < w.length - 1; i++) {
    c[w[i] + w[i + 1]]++;
  }
  print(c);
  for (let i = 0; i < 40; i++) {
    cn = {};
    for (let [a, b] of repl) {
      cn[a] = 0;
    }
    for (let [a, b] of repl) {
      cn[a[0] + b] += c[a];
      cn[b + a[1]] += c[a];
    }
    c = cn;
  }
  tot = {};
  for (let [a, b] of repl) {
    tot[a[0]] = 0;
  }
  for (let a in c) {
    tot[a[1]] += c[a];
  }
  tot[w[0]]--;
  print(tot);
  print(Math.max(...Object.values(tot)) - Math.min(...Object.values(tot)));
}
