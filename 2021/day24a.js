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

fs.promises.readFile("day24.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString;
  solve(L);
});

function solve(L) {
  i = 0;
  R = L.replaceAll(/inp w/g, (_) => `w=a[${i++}]`);
  // L = R.replaceAll(/mul ([w-z]) ([w-z]|-?\d+)/g, (_, a, b) => `${a}*=${b}`)
  //   .replaceAll(/add ([w-z]) ([w-z]|-?\d+)/g, (_, a, b) => `${a}+=${b}`)
  //   .replaceAll(
  //     /eql ([w-z]) ([w-z]|-?\d+)/g,
  //     (_, a, b) => `${a}=${a}==${b}?1:0`
  //   )
  //   .replaceAll(/div ([w-z]) ([w-z]|-?\d+)/g, (_, a, b) => `${a}=(${a}/${b})|0`)
  //   .replaceAll(
  //     /mod ([w-z]) ([w-z]|-?\d+)/g,
  //     (_, a, b) => `${a}=(${a}%${b}+${b})%${b}`
  //   );

  let maxt = [1, 1, 26, 26, 1, 1, 1, 26, 26, 26, 1, 26, 26, 1];
  for (let i = 12; i >= 0; i--) {
    maxt[i] *= maxt[i + 1];
  }
  M = R.replaceAll(
    /w=a\[(\d+)\]\nmul x 0\nadd x z\nmod x 26\ndiv z (-?\d+)\nadd x (-?\d+)\neql x w\neql x 0\nmul y 0\nadd y 25\nmul y x\nadd y 1\nmul z y\nmul y 0\nadd y w\nadd y (-?\d+)\nmul y x\nadd z y/g,
    (_, a, b, c, d) =>
      `w=a[${a}];x=(z%26+26)%26+${c}!=w;z=(z/${b}|0)*(25*x+1)+(w+${d})*x;if(i==${a})return z`
  );
  clog(M);
  fn = eval(`__rt = function(a,i){let x,y,z,w;x=y=z=w=0;${M};return z}`);

  function search(D, i) {
    if (i == 8) print(D);
    if (i === 14) return fn(D) === 0 ? D : null;
    let digs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let scores = digs.map((d) => {
      D = [...D];
      D[i] = d;
      return fn(D, i);
    });
    digs.sort((a, b) => {
      A = (scores[a - 1] / 26) | 0;
      B = (scores[b - 1] / 26) | 0;
      return A === B ? b - a : A - B;
    });
    digs = digs.filter((a) => scores[a - 1] < 1e6);
    for (let d of digs) {
      D = [...D];
      D[i] = d;
      let s = search(D, i + 1);
      if (s != null) {
        return s;
      }
    }
    return null;
  }
  clog(search([], 0));
}
