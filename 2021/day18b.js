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

fs.promises.readFile("day18.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);
  solve(L);
});

function solve(L) {
  let max = 0;
  for (let line of L) {
    for (let b of L) {
      if (line !== b) {
        max = Math.max(max, mag(eval(reduce(`[${line},${b}]`))));
      }
    }
  }
  print(max);
}

function reduce(s) {
  while (((m = kaboom(s)), m != s)) {
    s = m;
  }
  return s;
}

function kaboom(s) {
  let matched = true;
  while (matched) {
    let matches = s.matchAll(/\[\d+,\d+\]/g);
    matched = false;
    // explode
    for (let match of matches) {
      let pre = s.slice(0, match.index);
      let post = s.slice(match.index + match[0].length);
      if (pre.split("[").length - pre.split("]").length > 3) {
        M = eval(match[0]);
        s =
          [
            ...[...pre]
              .reverse()
              .join("")
              .replace(/\d+/, (e) =>
                [...("" + (parseInt([...e].reverse().join("")) + M[0]))]
                  .reverse()
                  .join("")
              ),
          ]
            .reverse()
            .join("") +
          "0" +
          post.replace(/\d+/, (e) => parseInt(e) + M[1]);
        matched = true;
        break;
      }
    }
    // split
    if (!matched) {
      let changed = s.replace(
        /\d{2,}/,
        (s) => `[${(parseInt(s) / 2) | 0},${((parseInt(s) + 1) / 2) | 0}]`
      );
      if (changed !== s) {
        s = changed;
        matched = true;
      }
    }
  }
  return s;
}

function mag(L) {
  if (typeof L === "number") {
    return L;
  } else {
    return 3 * mag(L[0]) + 2 * mag(L[1]);
  }
}
