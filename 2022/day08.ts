import { getInput, clog, int, max, sum, range, range2 } from "./utils";

let dataString = getInput("day08.in");

let grid = dataString.split(/\n/g).map((x) => [...x].map(int));

let w = grid.length;

// Part 1
clog(
  sum(
    range(w).map((y) =>
      sum(
        range(w).map((x) => {
          let h = grid[y][x];

          return range(x).every((X) => grid[y][X] < h) ||
            range2(x + 1, w).every((X) => grid[y][X] < h) ||
            range(y).every((Y) => grid[Y][x] < h) ||
            range2(y + 1, w).every((Y) => grid[Y][x] < h)
            ? 1
            : 0;
        })
      )
    )
  )
);

// Part 2

// findIndex, defaulting to length of array
let ff = (x: number[], c: (h: number) => boolean) => {
  let i = x.findIndex(c);
  return i >= 0 ? i + 1 : x.length;
};

clog(
  max(
    range(w).map((y) =>
      max(
        range(w).map((x) => {
          let h = grid[y][x];

          return (
            ff(range(x).reverse(), (X) => grid[y][X] >= h) *
            ff(range2(x + 1, w), (X) => grid[y][X] >= h) *
            ff(range(y).reverse(), (Y) => grid[Y][x] >= h) *
            ff(range2(y + 1, w), (Y) => grid[Y][x] >= h)
          );
        })
      )
    )
  )
);
