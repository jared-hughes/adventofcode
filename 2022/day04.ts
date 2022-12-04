import { getInput, int, clog } from "./utils";

let values = getInput("day04.in")
  .split(/\n/g)
  .map((s) => s.split(/[^0-9]/).map(int));

// Part 1
let contains = (a, b, c, d) => a <= c && b >= d;

clog(
  values.filter(([a, b, c, d]) => contains(a, b, c, d) || contains(c, d, a, b))
    .length
);

// Part 2
let overlap = (a, b, c, d) => a <= c && c <= b;

clog(
  values.filter(([a, b, c, d]) => overlap(a, b, c, d) || overlap(c, d, a, b))
    .length
);
