import { getInput, ints, clog, reverse, range, transpose } from "./utils";

let dataString = getInput("day05.in");

const [stacks, moves] = dataString.split(/\n\n/);
const inputStacks = [
  "",
  ...transpose(
    stacks
      .split("\n")
      .slice(0, -1)
      .map((line) =>
        range((line.length / 4 + 1) | 0)
          .map((i) => line[i * 4 + 1])
          .reverse()
      )
      .reverse()
  )
    .map((e) => e.join("").trimEnd())
    .reverse(),
];

const moveLines = moves.split(/\n/g).map(ints);

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
