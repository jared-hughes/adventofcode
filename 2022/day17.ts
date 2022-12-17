import { getInput, clog, max } from "./utils";

let jets = getInput("day17.in");

// prettier-ignore
const rocks: [number, number][][] = [
  [[0,0],[1,0],[2,0],[3,0]],
  [[1,0],[0,1],[1,1],[2,1],[1,2]],
  [[0,0],[1,0],[2,0],[2,1],[2,2]],
  [[0,0],[0,1],[0,2],[0,3]],
  [[0,0],[1,0],[0,1],[1,1]]
]

const r = new Set();
let maxY = 0;

let i = 0;
const part2goal = 1000000000000;
// period determined by hand
const period = 1700;
let samples: [number, number][] = [];
for (let rocksAdded = 0; rocksAdded < 5022; ) {
  const currPos = rocks[rocksAdded % rocks.length].map(([x, y]) => [
    x + 2,
    y + maxY + 4,
  ]);
  rocksAdded++;
  while (true) {
    const dir = jets[i++ % jets.length] === ">" ? 1 : -1;
    if (
      currPos.every(([x, y]) => {
        const nx = x + dir;
        return nx >= 0 && nx <= 6 && !r.has(nx + y * 7);
      })
    ) {
      currPos.forEach((p) => {
        p[0] += dir;
      });
    }
    if (
      currPos.every(([x, y]) => {
        const ny = y - 1;
        return ny >= 1 && !r.has(x + ny * 7);
      })
    ) {
      currPos.forEach((p) => {
        p[1] -= 1;
      });
    } else {
      break;
    }
  }
  maxY = Math.max(maxY, max(currPos.map(([x, y]) => y)));
  currPos.map(([x, y]) => r.add(x + y * 7));
  // part 1
  if (rocksAdded === 2022) clog(maxY);
  // part2
  if (rocksAdded % period === part2goal % period)
    samples.push([rocksAdded, maxY]);
}
// part 2
const [_, a, b] = samples;
clog(((part2goal - a[0]) / period) * (b[1] - a[1]) + a[1]);
