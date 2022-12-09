import { abs, sign } from "mathjs";
import { getInput, clog, int, range, range2 } from "./utils";

let commands = getInput("day09.in")
  .split(/\n/g)
  .map((x) => x.split(" "));

let visited = new Set();

let h = [0, 0];
let t = [0, 0];
for (let [s, D] of commands) {
  let d = int(D);
  let I = "RULD".indexOf(s);
  range(d).map((__) => {
    visited.add(t.join(","));
    range(I).map((_) => {
      h = [-h[1], h[0]];
      t = [-t[1], t[0]];
    });
    h[0] += 1;
    if (t[0] <= h[0] - 2) {
      t[0] = h[0] - 1;
      t[1] = h[1];
    }
    range(4 - I).map((_) => {
      h = [-h[1], h[0]];
      t = [-t[1], t[0]];
    });
  });
}
visited.add(t.join(","));
clog(visited.size);

// Part 2
visited = new Set();

let knots = range(10).map((_) => [0, 0]);
for (let [s, D] of commands) {
  let d = int(D);
  let I = "RULD".indexOf(s);
  range(d).map((_) => {
    visited.add(knots[9].join(","));
    range(I).map((_) => {
      knots = knots.map((k) => [-k[1], k[0]]);
    });
    knots[0][0] += 1;
    range2(1, 10).map((i) => {
      const e = knots[i];
      const prev = knots[i - 1];
      let dx = e[0] - prev[0];
      let dy = e[1] - prev[1];
      if (abs(dx) >= 2 || abs(dy) >= 2) {
        knots[i] = [e[0] - sign(dx), e[1] - sign(dy)];
      }
    });
    range(4 - I).map((_) => {
      knots = knots.map((k) => [-k[1], k[0]]);
    });
  });
}
visited.add(knots[9].join(","));
clog(visited.size);
