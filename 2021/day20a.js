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

fs.promises.readFile("day20.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n\n/g);
  solve(
    [...L[0]].map((e) => (e === "#" ? 1 : 0)),
    L[1].split(/\n/g).map((line) => [...line].map((e) => (e === "#" ? 1 : 0)))
  );
});

function solve(M, G) {
  k = M[0];
  for (let i = 0; i < 2; i++) {
    clog(G.map((e) => JSON.stringify(e)));
    let H = [];
    k = M[511 * k];
    for (let y = -1; y <= G.length; y++) {
      let line = [];
      for (let x = -1; x <= G[0].length; x++) {
        let s = 0;
        let v = 256;
        for (let Y of [y - 1, y, y + 1]) {
          for (let X of [x - 1, x, x + 1]) {
            s += (G[Y]?.[X] ?? k) * v;
            v >>= 1;
          }
        }
        clog(y, x, s);
        line.push(M[s]);
      }
      H.push(line);
    }
    G = H;
  }
  clog(G.map((e) => JSON.stringify(e)));
  // clog(G[0]);
  clog(sum(G.map(sum)));
}
