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

fs.promises.readFile("day16.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n/g);

  let bits = [];
  for (let c of [...L[0]]) {
    let k = "0123456789ABCDEF".indexOf(c);
    bits.push(k >> 3);
    bits.push((k >> 2) & 1);
    bits.push((k >> 1) & 1);
    bits.push(k & 1);
  }
  solve(bits);
});

function solve(bits) {
  let parsed = parsePacket(bits, 0);
  print(parsed.value);
}

function e(L) {
  s = 0;
  for (let i = 0; i < L.length; i++) {
    s *= 2;
    s += L[i];
  }
  return s;
}

function parsePacket(bits, i) {
  let V = e(bits.slice(i, i + 3));
  let T = e(bits.slice(i + 3, i + 6));
  if (T == 4) {
    parsed = parseLiteral(bits, i + 6);
    return {
      type: 4,
      value: parsed.value,
      lengthPackets: 1,
      lengthBits: 6 + parsed.lengthBits,
    };
  } else {
    let I = bits[i + 6];
    let myLengthBits = 7;
    let length;
    if (I == 0) {
      length = e(bits.slice(i + 7, i + 7 + 15));
      myLengthBits += 15;
    } else {
      length = e(bits.slice(i + 7, i + 7 + 11));
      myLengthBits += 11;
    }
    let parsed;
    i += myLengthBits;
    let childLengthPackets = 0;
    let childLengthBits = 0;
    let children = [];
    while (true) {
      if (i > bits.length) {
        break;
      }
      parsed = parsePacket(bits, i);
      children.push(parsed.value);
      i += parsed.lengthBits;
      childLengthBits += parsed.lengthBits;
      childLengthPackets += 1;
      if (I == 0 ? childLengthBits >= length : childLengthPackets >= length) {
        break;
      }
    }
    return {
      type: T,
      lengthPackets: childLengthPackets,
      lengthBits: myLengthBits + childLengthBits,
      value:
        T == 0
          ? sum(children)
          : T == 1
          ? product(children)
          : T == 2
          ? Math.min(...children)
          : T == 3
          ? Math.max(...children)
          : T == 5
          ? children[0] > children[1]
          : T == 6
          ? children[0] < children[1]
          : children[0] == children[1],
    };
  }
}

function parseLiteral(bits, i) {
  let s = 0;
  let lengthBits = 0;
  while (true) {
    s *= 16;
    s += e(bits.slice(i + 1, i + 5));
    lengthBits += 5;
    if (bits[i] === 0) {
      break;
    }
    i += 5;
  }
  return {
    value: s,
    lengthBits: lengthBits,
  };
}
