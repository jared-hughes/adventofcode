import { getInput, clog } from "./utils";

let dataString = getInput("day12.in");

function run(part: 1 | 2) {
  let S = [0, 0];
  let E = [0, 0];
  let grid = dataString
    .split(/\n/g)
    .map((line, y) =>
      [...line].map((c, x) =>
        c == "S"
          ? ((S = [x, y]), 0)
          : c == "E"
          ? ((E = [x, y]), 25)
          : c.charCodeAt(0) - 97
      )
    );
  let w = grid[0].length;
  let h = grid.length;

  let visited = new Set<string>();
  visited.add(E.join(","));
  let queue = [[E[0], E[1], 0]];
  let i = 0;
  while (true) {
    let [x, y, dist] = queue[i];
    i += 1;
    let tent = [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1],
    ].filter(
      ([u, v]) =>
        u >= 0 &&
        v >= 0 &&
        u <= w - 1 &&
        v <= h - 1 &&
        !visited.has(u + "," + v) &&
        grid[v][u] >= grid[y][x] - 1
    );
    for (let [u, v] of tent) {
      if (part === 1 ? u === S[0] && v === S[1] : grid[v][u] === 0) {
        clog(dist + 1);
        return;
      }
      queue.push([u, v, dist + 1]);
      visited.add(u + "," + v);
    }
  }
}

run(1);
run(2);
