import { getInput, clog, int } from "./utils";

let dataString = getInput("day21.in");

const lines = dataString
  .split(/\n/g)
  .map((line) => line.replace(":", "").split(" "));

let vals = new Map(
  lines.filter((w) => w.length === 2).map(([a, v]) => [a, int(v)])
);

let defs = new Map(
  lines
    .filter((w) => w.length === 4)
    .map(([a, x, op, y]) => [a, [x, op, y] as [string, string, string]])
);

function value(name: string): number {
  if (vals.has(name)) return vals.get(name)!;
  const [X, op, Y] = defs.get(name)!;
  const [x, y] = [value(X), value(Y)];
  return op === "+" ? x + y : op === "-" ? x - y : op === "*" ? x * y : x / y;
}

function part1() {
  clog(value("root"));
}

function part2() {
  defs.get("root")![1] = "-";
  vals.set("humn", NaN);
  // get humn, assuming value(name) = val
  function getHumn(name: string, val: number) {
    if (name === "humn") return val;
    let [left, op, right] = defs.get(name)!;
    const [x, y] = [value(left), value(right)];
    const humnLeft = isNaN(x);
    return getHumn(
      humnLeft ? left : right,
      op === "+"
        ? val - (humnLeft ? y : x)
        : op === "-"
        ? humnLeft
          ? val + y
          : x - val
        : op === "/"
        ? humnLeft
          ? val * y
          : x / val
        : val / (humnLeft ? y : x)
    );
  }
  clog(getHumn("root", 0));
}

part1();
part2();
