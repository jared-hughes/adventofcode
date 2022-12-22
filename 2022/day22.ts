import { getInput, clog, ints, range } from "./utils";

const [board, insts] = getInput("day22.in").split(/\n\n/);
const lines = board.split(/\n/g);
const nums = ints(insts);
const turns = [...insts.matchAll(/[RL]/g)].map((v) => v[0]);

function fc(dx: number, dy: number) {
  const F = dx + "," + dy;
  return F == "1,0" ? ">" : F == "0,-1" ? "^" : F == "-1,0" ? "<" : "v";
}

function answer(x: number, y: number, dx: number, dy: number) {
  const u = fc(dx, dy);
  clog(
    1000 * (y + 1) +
      4 * (x + 1) +
      (u == ">" ? 0 : u == "v" ? 1 : u == "<" ? 2 : 3)
  );
}

function part1() {
  let [x, y] = [lines[0].indexOf("."), 0];
  let [dx, dy] = [1, 0];

  const f = (x) => x === undefined || x === " ";

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i]; j++) {
      let [nx, ny] = [x + dx, y + dy];
      if (f(lines[ny]?.[nx])) {
        do {
          nx -= dx;
          ny -= dy;
        } while (!f(lines[ny]?.[nx]));
        nx += dx;
        ny += dy;
      }
      if (lines[ny][nx] !== "#") [x, y] = [nx, ny];
    }
    if (turns[i]) {
      const t = turns[i];
      for (let j = 0; j < (t === "R" ? 3 : 1); j++) {
        [dx, dy] = [dy, -dx];
      }
    }
  }

  answer(x, y, dx, dy);
}

function part2() {
  // example's board
  // const w = (lines.length / 3) | 0;
  // const origin = [
  //   [2 * w, 0],
  //   [0, w],
  //   [w, w],
  //   [2 * w, w],
  //   [2 * w, 2 * w],
  //   [3 * w, 2 * w],
  // ];
  const w = (lines.length / 4) | 0;
  const origin = [
    [w, 0],
    [0, 3 * w],
    [0, 2 * w],
    [w, w],
    [w, 2 * w],
    [2 * w, 0],
  ];
  const numRotLeft = [0, 1, 1, 0, 0, 2];

  let f = 0;
  let [x, y] = [0, 0];
  let [dx, dy] = [1, 0];

  const XY = (f, x, y) => {
    range(numRotLeft[f]).map(() => {
      [x, y] = [y, w - 1 - x];
    });
    return [origin[f][0] + x, origin[f][1] + y];
  };

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i]; j++) {
      let [nf, nx, ny, ndx, ndy] = [f, x + dx, y + dy, dx, dy];
      const rot = nx === w || nx === -1 || ny === w || ny === -1;
      if (nx === w) {
        // dx = 1, dy = 0
        [nf, nx, ny, ndx, ndy] =
          f == 0
            ? [5, w - 1, w - 1 - y, -1, 0]
            : f == 1
            ? [2, 0, y, 1, 0]
            : f == 2
            ? [3, 0, y, 1, 0]
            : f == 3
            ? [5, w - 1 - y, 0, 0, 1]
            : f == 4
            ? [5, 0, y, 1, 0]
            : [0, w - 1, w - 1 - y, -1, 0];
      } else if (nx === -1) {
        // dx = -1, dy=0
        [nf, nx, ny, ndx, ndy] =
          f == 0
            ? [2, y, 0, 0, 1]
            : f == 1
            ? [5, w - 1 - y, w - 1, 0, -1]
            : f == 2
            ? [1, w - 1, y, -1, 0]
            : f == 3
            ? [2, w - 1, y, -1, 0]
            : f == 4
            ? [2, w - 1 - y, w - 1, 0, -1]
            : [4, w - 1, y, -1, 0];
      } else if (ny === w) {
        // dx = 0, dy = 1
        [nf, nx, ny, ndx, ndy] =
          f == 0
            ? [3, x, 0, 0, 1]
            : f == 1
            ? [4, w - 1 - x, w - 1, 0, -1]
            : f == 2
            ? [4, 0, w - 1 - x, 1, 0]
            : f == 3
            ? [4, x, 0, 0, 1]
            : f == 4
            ? [1, w - 1 - x, w - 1, 0, -1]
            : [1, 0, w - 1 - x, 1, 0];
      } else if (ny === -1) {
        // dx = 0, dy=-1
        [nf, nx, ny, ndx, ndy] =
          f == 0
            ? [1, w - 1 - x, 0, 0, 1]
            : f == 1
            ? [0, w - 1 - x, 0, 0, 1]
            : f == 2
            ? [0, 0, x, 1, 0]
            : f == 3
            ? [0, x, w - 1, 0, -1]
            : f == 4
            ? [3, x, w - 1, 0, -1]
            : [3, w - 1, w - 1 - x, -1, 0];
      }
      const pp = XY(nf, nx, ny);
      if (lines[pp[1]][pp[0]] !== "#") {
        [f, x, y, dx, dy] = [nf, nx, ny, ndx, ndy];
      }
    }
    if (turns[i]) {
      const t = turns[i];
      for (let j = 0; j < (t === "R" ? 3 : 1); j++) {
        [dx, dy] = [dy, -dx];
      }
    }
  }

  range(numRotLeft[f]).map((_) => {
    [dx, dy] = [dy, -dx];
  });
  [x, y] = XY(f, x, y);
  answer(x, y, dx, dy);
}

part1();
part2();
