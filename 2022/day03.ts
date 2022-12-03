import { clog, sum, ord, intersect, slices, getInput } from "./utils";

let dataString = getInput("day03.in");

let rows = dataString
  .split("\n")
  .map((row) =>
    [...row].map((x) =>
      x < "a" ? ord(x) - ord("A") + 27 : ord(x) - ord("a") + 1
    )
  );

clog(sum(rows.map((row) => intersect(...slices(row, row.length / 2))[0])));

clog(sum(slices(rows, 3).map(([a, b, c]) => intersect(a, b, c)[0])));
