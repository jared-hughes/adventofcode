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

fs.promises.readFile("day21.in", { encoding: "utf8" }).then((dataString) => {
  solve();
});

function solve() {
  let ps = { "2_0__1_0": 1 };
  let p = 0;
  let wins = [0, 0];
  let dist = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 };
  for (let i = 0; i < 20; i++) {
    let ps2 = {};
    for (let a in ps) {
      for (let b in dist) {
        let [pos, s] = a.split(/__/).map((e) => e.split("_").map(int))[p];
        pos = ((pos + +b - 1) % 10) + 1;
        s += pos;
        let f = ps[a] * dist[b];
        if (s >= 21) {
          wins[p] += f;
        } else {
          let k =
            p == 0
              ? pos + "_" + s + "__" + a.split("__")[1]
              : a.split("__")[0] + "__" + pos + "_" + s;
          ps2[k] = (ps2[k] ?? 0) + f;
        }
      }
    }
    ps = ps2;
    p = 1 - p;
  }
  clog(Math.max(...wins));
}
