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

fs.promises.readFile("day19.in", { encoding: "utf8" }).then((dataString) => {
  // Remove the last character (the closing newline)
  dataString = dataString.slice(0, dataString.length - 1);
  const L = dataString.split(/\n*--- scanner \d* ---\n+/g).slice(1);
  solve(L.map((L) => L.split("\n").map((line) => line.split(",").map(int))));
});

function solve(L) {
  let edges = {};
  for (let j = 1; j < L.length; j++) {
    for (let k = j - 1; k >= 0; k--) {
      if (intersect(L[k], L[j]).length >= 12) {
        edges[k] ??= [];
        edges[k].push(j);
        edges[j] ??= [];
        edges[j].push(k);
      }
    }
  }
  let myTree = ag(edges);
  let idtf = math.matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
  let stack = [[idtf, 0]];
  let scannerPos = [];
  while (stack.length) {
    let [tf, v] = stack.pop();
    for (let child of myTree[v] ?? []) {
      let thisTF = getTransform(L[v], L[child]);
      let newtf = math.multiply(tf, thisTF);
      scannerPos.push(math.transpose(newtf).toArray()[3]);
      stack.push([newtf, child]);
    }
  }
  let max = 0;
  for (let p1 of scannerPos) {
    for (let p2 of scannerPos) {
      max = Math.max(max, man(p1, p2));
    }
  }
  print(max);
}

function getTransform(from, to) {
  let I = intersect(from, to);
  let fromPoints = [];
  let toPoints = [];
  for (let [A, B] of I.slice(0, 4)) {
    fromPoints.push([...A, 1]);
    toPoints.push([...B, 1]);
  }
  let div = math.divide(math.transpose(fromPoints), math.transpose(toPoints));
  return div.map((line) => line.map((e) => Math.round(e)));
}

let jstr = (e) => JSON.stringify(e);

function intersect(A, B) {
  let d1 = dists(A);
  let d2 = dists(B);
  let M = [];
  for (let p1 of A) {
    for (let p2 of B) {
      if (intersect12(d1[jstr(p1)], d2[jstr(p2)])) {
        M.push([p1, p2]);
      }
    }
  }
  return M;
}

function dists(A) {
  let d = {};
  for (let p1 of A) {
    d[jstr(p1)] = {};
    for (let p2 of A) {
      d[jstr(p1)][jstr(p2)] = n(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]);
    }
  }
  return d;
}

function man(p1, p2) {
  return (
    Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]) + Math.abs(p2[2] - p1[2])
  );
}

function n(a, b, c) {
  return a * a + b * b + c * c;
}

function intersect12(d, e) {
  let s = new Set(Object.values(e));
  let L = Object.values(d).filter((v) => s.has(v)).length;
  return L >= 12;
}

function ag(edges) {
  included = new Set([0]);
  children = {};
  stack = [0];
  while (stack.length) {
    v = stack.pop();
    for (let k of edges[v]) {
      if (!included.has(k)) {
        included.add(k);
        children[v] ??= [];
        children[v].push(k);
        stack.push(k);
      }
    }
  }
  return children;
}
