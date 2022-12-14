import { getInput, clog, ints, max, overlappingSlices, range } from "./utils";

let dataString = getInput("day14.in");

function solve(part: 1 | 2) {
  const segments = dataString
    .split(/\n/)
    .flatMap((line) =>
      overlappingSlices(line.split("->"), 2).map((x) => x.map(ints))
    ) as [[number, number], [number, number]][];

  let floor = max(segments.map((x) => Math.max(x[0][1], x[1][1]))) + 2;
  if (part === 2) {
    segments.push([
      [-10000, floor],
      [10000, floor],
    ]);
  }

  let filled = new Set();
  for (let segment of segments) {
    let start = segment[0];
    let end = segment[1];

    range(Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]) + 1).map(
      (i) => {
        filled.add(
          [
            start[0] + Math.sign(end[0] - start[0]) * i,
            start[1] + Math.sign(end[1] - start[1]) * i,
          ].join(",")
        );
      }
    );
  }
  let num = 0;
  while (true) {
    let curr = [500, 0];
    while (true) {
      const left = [curr[0] - 1, curr[1] + 1];
      const middle = [curr[0], curr[1] + 1];
      const right = [curr[0] + 1, curr[1] + 1];
      if (!filled.has(middle.join(","))) {
        curr = middle;
      } else if (!filled.has(left.join(","))) {
        curr = left;
      } else if (!filled.has(right.join(","))) {
        curr = right;
      } else {
        break;
      }
      if (part === 1 && curr[1] > floor) return num;
    }
    filled.add(curr.join(","));
    num += 1;
    if (part === 2 && curr.join(",") == "500,0") {
      return num;
    }
  }
}

clog(solve(1));
clog(solve(2));
