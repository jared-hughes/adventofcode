import { getInput, clog, ints, sum } from "./utils";

let dataString = getInput("day18.in");

type Point = [number, number, number];

const pts = dataString.split(/\n/g).map(ints) as Point[];

const dirs = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
] as Point[];

const adj = (p: Point) =>
  dirs.map(([dx, dy, dz]) => [p[0] + dx, p[1] + dy, p[2] + dz] as Point);

const s = new Set(pts.map((p) => p.join(",")));

// Part 1
clog(sum(pts.map((p) => sum(adj(p).map((v) => (s.has(v.join(",")) ? 0 : 1))))));

// Part 2
const reachable = new Set(["0,0,0"]);
const q: Point[] = [[0, 0, 0]];
while (q.length > 0) {
  adj(q.pop()!).map((v) => {
    if (
      v.every((x) => -1 <= x && x < 30) &&
      !reachable.has(v.join(",")) &&
      !s.has(v.join(","))
    ) {
      reachable.add(v.join(","));
      q.push(v);
    }
  });
}
clog(
  sum(
    pts.map((p) => sum(adj(p).map((v) => (reachable.has(v.join(",")) ? 1 : 0))))
  )
);
