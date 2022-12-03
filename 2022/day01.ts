import { sort, max, int, clog, sum, getInput } from "./utils";

let dataString = getInput("day01.in");

let L = dataString.split(/\n\n/g).map((a) => sum(a.split(/\n/g).map(int)));

// Part 1
clog(max(L));

// Part 2
clog(sum(sort(L).slice(-3)));
