import { getInput, clog, int } from "./utils";

let dataString = getInput("day21.in");

function part1() {
  let m = new Map(
    dataString.split(/\n/g).map((line) => {
      const w = line.split(" ");
      return w.length === 2
        ? [w[0].slice(0, -1), () => int(w[1])]
        : [
            w[0].slice(0, -1),
            eval(`() => m.get("${w[1]}")() ${w[2]} m.get("${w[3]}")()`),
          ];
    })
  );

  clog(m.get("root")());
}

function part2() {
  let m;
  m = new Map(
    dataString.split(/\n/g).map((line) => {
      const w = line.split(" ");
      return w.length === 2
        ? [w[0].slice(0, -1), () => (w[0].slice(0, -1) === "humn" ? "x" : w[1])]
        : [
            w[0].slice(0, -1),
            () =>
              "(" +
              m.get(w[1])() +
              (w[0] === "root:" ? "==" : w[2]) +
              m.get(w[3])() +
              ")",
          ];
    })
  );
  // Part 2: paste into Mathematica with Solve[output, x]
  clog(m.get("root")());
}

part1();
part2();
