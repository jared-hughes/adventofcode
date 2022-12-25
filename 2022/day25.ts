import { getInput, clog, sum } from "./utils";

let dataString = getInput("day25.in");

let s = sum(
  dataString.split(/\n/g).map((x) => {
    return [...x]
      .map((c) => "=-012".indexOf(c) - 2)
      .reduce((a, b) => 5 * a + b);
  })
);

let t = "";
while (s > 0) {
  const d = [0, 1, 2, -2, -1][s % 5];
  t = "012=-"[s % 5] + t;
  s -= d;
  s = Math.floor(s / 5);
}

clog(t);
