import { getInput, clog, max, min } from "./utils";

let dataString = getInput("day23.in");
let positions = dataString
  .split(/\n/g)
  .flatMap((line, y) =>
    [...line].map((e, x) => (e === "#" ? [x, y] : undefined)).filter((x) => x)
  ) as Point[];
type Point = [number, number];

const a = (p: Point, q: Point) => [p[0] + q[0], p[1] + q[1]] as Point;
const r = (d: Point) => [-d[1], d[0]] as Point;

for (let i = 0; ; i++) {
  const dirs0 = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  const dirs = dirs0.slice(i % 4).concat(dirs0.slice(0, i % 4)) as Point[];
  function open(p: Point) {
    return !pos.has(p.join(","));
  }
  const pos = new Set(positions.map((x) => x.join(",")));
  const cnt = {};
  const proposed = positions.map((p) => {
    const options = dirs.filter(
      (d) =>
        open(a(p, d)) && open(a(p, a(d, r(d)))) && open(a(p, a(d, r(r(r(d))))))
    );
    const ret =
      options.length === 4 || options.length === 0
        ? [Infinity, 0]
        : a(p, options[0]);
    cnt[ret.join(",")] ??= 0;
    cnt[ret.join(",")] += 1;
    return ret;
  }) as Point[];
  let moved = false;
  positions = positions.map((p, i) =>
    cnt[proposed[i].join(",")] === 1 ? ((moved = true), proposed[i]) : p
  );
  if (i === 9)
    clog(
      "part 1:",
      -~(max(positions.map((p) => p[0])) - min(positions.map((p) => p[0]))) *
        -~(max(positions.map((p) => p[1])) - min(positions.map((p) => p[1]))) -
        positions.length
    );
  if (!moved) {
    clog("part 2:", i + 1);
    break;
  }
}
