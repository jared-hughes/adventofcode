import { abs } from "mathjs";
import { getInput, clog, ints } from "./utils";

let dataString = getInput("day10.in");

let x = 1;
let tot = 0;
let elems = [0];
let i = 0;
let lines = dataString.split(/\n/g);
let s = "";

while (i < elems.length) {
  if (lines[i]) {
    elems.push(0);
    if (lines[i].startsWith("addx")) {
      elems.push(ints(lines[i])[0]);
    }
  }
  x += elems[i];
  // string for part 2
  s += abs((i % 40) - x) <= 1 ? "⎕" : " ";
  i += 1;
  if (i % 40 == 20) {
    // total for part 1
    tot += x * i;
  }
  if (i % 40 == 0) {
    // string line for part 2
    clog(s);
    s = "";
  }
}

clog(tot);
