import { Heap } from "heap-js";
import { getInput, clog, range, range2 } from "./utils";

let lines = getInput("day24.in").split(/\n/g);

const bz = lines
  .map((l, y) =>
    [...l].map((c, x) => [
      [x, y],
      c === ">"
        ? [1, 0]
        : c === "<"
        ? [-1, 0]
        : c === "^"
        ? [0, -1]
        : c === "v"
        ? [0, 1]
        : [Infinity, Infinity],
    ])
  )
  .flat(1)
  .filter(([_, [dx, dy]]) => isFinite(dx));
const h = lines.length;
const w = lines[0].length;
const m = (x: number, y: number) => ((x % y) + y) % y;
const bzComplement = range((w - 2) * (h - 2)).map((i) => {
  const s = new Set(
    bz.map(([[x, y], [dx, dy]]) =>
      [m(x + dx * i - 1, w - 2) + 1, m(y + dy * i - 1, h - 2) + 1].join(",")
    )
  );
  const S = new Set(
    range2(1, w - 1)
      .map((x) => range2(1, h - 1).map((y) => [x, y]))
      .flat(1)
      .map((u) => u.join(","))
      .filter((p) => !s.has(p))
  );
  S.add("1,0");
  S.add([w - 2, h - 1].join(","));
  return S;
});
const P = (w - 2) * (h - 2);

const goal = (stage) => (stage === 1 ? [1, 0] : [w - 2, h - 1]);

const lower = ([p, s, stage]) => {
  const g = goal(stage);
  const dist =
    Math.abs(g[0] - p[0]) +
    Math.abs(g[1] - p[1]) +
    (2 - stage) * (w - 1 + h - 1);
  return dist + s;
};
const approx = ([p, s, stage]) => {
  const g = goal(stage);
  const dist =
    Math.abs(g[0] - p[0]) +
    Math.abs(g[1] - p[1]) +
    (2 - stage) * (w - 1 + h - 1);
  return scl * dist + s;
};
const visited = new Set<string>();
// [x,y],dist,distest,stage(0,1,2)
const pq = new Heap<[[number, number], number, number, number]>(
  (a, b) => a[2] - b[2]
);
pq.add([[1, 0], 0, lower([[1, 0], 0, 0]), 0]);
const scl = 1;
let best = Infinity;
while (pq.size() > 0) {
  const [[x, y], steps, l, stage] = pq.pop()!;
  const s = [x, y, steps, stage].join(",");
  if (visited.has(s)) continue;
  visited.add(s);
  if (Math.random() < 0.001) clog([[x, y], steps, l, stage, pq.size()]);
  if (isFinite(best) && lower([[x, y], steps, stage]) > best) continue;
  const g = goal(stage);
  for (const [dx, dy] of [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [0, 0],
  ]) {
    const [nx, ny] = [x + dx, y + dy];
    if (stage === 2 && nx === g[0] && ny === g[1]) {
      if (steps < best) {
        best = steps;
        clog("best", best);
      }
      continue;
    }
    const nstage = nx === g[0] && ny === g[1] ? stage + 1 : stage;
    if (
      (nx >= 1 && ny >= 1 && nx <= w - 2 && ny <= h - 2) ||
      (nx === 1 && ny === 0) ||
      (nx === w - 2 && ny === h - 1)
    ) {
      if (bzComplement[steps % P].has([nx, ny].join(","))) {
        pq.push([
          [nx, ny],
          steps + 1,
          approx([[nx, ny], steps + 1, nstage]),
          nstage,
        ]);
      }
    }
  }
}
clog("done");
