import { getInput, clog, sum } from "./utils";

let dataString = getInput("day13.in");

type Packet = number | Packet[];

const pairs = dataString
  .split(/\n\n/g)
  .map((x) => x.split(/\n/).map(eval) as [Packet, Packet]);

// <0 if right order
// 0 if tie
// >0 if wrong order
function cmp(a: Packet, b: Packet): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else if (typeof a === "number") {
    return cmp([a], b);
  } else if (typeof b === "number") {
    return cmp(a, [b]);
  } else {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      let c = cmp(a[i], b[i]);
      if (c != 0) return c;
    }
    return a.length - b.length;
  }
}

clog(sum(pairs.map(([a, b], i) => (cmp(a, b) < 0 ? i + 1 : 0))));

const lines = dataString
  .split(/\n/g)
  .filter((x) => x)
  .map(eval) as Packet[];
let x = [[2]];
let y = [[6]];
const sorted = lines.concat([x, y]).sort(cmp);

clog((sorted.indexOf(x) + 1) * (sorted.indexOf(y) + 1));
