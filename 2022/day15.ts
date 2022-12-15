import { abs } from "mathjs";
import { getInput, clog, ints, max, min } from "./utils";

let dataString = getInput("day15.in");

const dist = (a, b) => abs(a[0] - b[0]) + abs(a[1] - b[1]);

const beacons = new Set();

const data: [[number, number], number][] = dataString.split(/\n/g).map((s) => {
  const [x, y, bx, by] = ints(s);
  beacons.add([bx, by].join(","));
  return [[x, y], dist([x, y], [bx, by])];
});

const x_hi = max(data.map((x) => x[0][0]));

let num = 0;
let y = 2000000;
for (let x = -x_hi; x <= x_hi * 2; x++) {
  if (
    data.some(([s, d]) => dist([x, y], s) <= d) &&
    !beacons.has([x, y].join(","))
  ) {
    num++;
  }
}
clog(num);

const m = 4000000;
for (let y = 3300000; y <= m; y++) {
  for (let x = 0; x <= m; ) {
    const advances = data
      .filter(([s, d]) => dist([x, y], s) - d <= 0)
      .map(([s, d]) => {
        return Math.max(d - abs(s[1] - y) + s[0] - x, 1);
      });
    if (advances.length === 0) {
      clog(4000000 * x + y);
      throw "done";
    }
    x += min(advances);
  }
}
