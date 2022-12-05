import { getInput, ints, clog, reverse } from "./utils";

let dataString = getInput("day05.in");

const moveLines = dataString.split(/\n\n/)[1].split(/\n/g).map(ints);

let inputStacks = [
  "",
  "BQC",
  "RQWZ",
  "BMRLV",
  "CZHVTW",
  "DZHBNVG",
  "HNPCJFVQ",
  "DGTRWZS",
  "CGMNBWZP",
  "NJBMWQFP",
];

// part 1
let A = structuredClone(inputStacks);
for (const [n, from, to] of moveLines) {
  A[to] += reverse(A[from].slice(-n));
  A[from] = A[from].slice(0, -n);
}

clog(A.map((c) => c.slice(-1)).join(""));

// part 2
A = structuredClone(inputStacks);
for (const [n, from, to] of moveLines) {
  A[to] += A[from].slice(-n);
  A[from] = A[from].slice(0, -n);
}

clog(A.map((c) => c.slice(-1)).join(""));
