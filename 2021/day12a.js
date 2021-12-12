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

fs.promises.readFile("day12.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L.map((line) => line.split("-")));
});

let adj = {};

function solve(L) {
  for ([a, b] of L) {
    adj[a] ??= [];
    adj[b] ??= [];
    adj[a].push(b);
    adj[b].push(a);
  }
  clog(count("start", []));
}

function count(node, lowerVisited) {
  clog("enter", node);
  if (node[0] > "Z") {
    lowerVisited = [...lowerVisited, node];
  }
  let tot = 0;
  for (a of adj[node]) {
    if (a == "end") {
      tot += 1;
    } else if (!lowerVisited.includes(a)) {
      tot += count(a, lowerVisited);
    }
  }
  clog("exit", node);
  return tot;
}
