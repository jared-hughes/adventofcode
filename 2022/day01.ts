import { readFileSync } from "fs";
import { sort, max, int, clog, sum } from "./utils";

let dataString = readFileSync("day01.in", { encoding: "utf-8" })
  // Remove the last character (the trailing newline)
  .slice(0, -1);
let L = dataString.split(/\n\n/g).map((a) => sum(a.split(/\n/g).map(int)));

// Part 1
clog(max(L));

// Part 2
clog(sum(sort(L).slice(-3)));
