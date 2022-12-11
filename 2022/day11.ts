import { lcm } from "mathjs";
import { getInput, clog, ints, sort, range } from "./utils";

let dataString = getInput("day11.in");

function run(part: 1 | 2) {
  let monkeys = dataString.split(/\n\n/g).map((m) => {
    let lines = m.split(/\n/g);
    return {
      items: ints(lines[1]),
      op: eval("old => " + lines[2].split("=")[1]),
      test: ints(lines[3])[0],
      true: ints(lines[4])[0],
      false: ints(lines[5])[0],
      times: 0,
    };
  });

  let g = monkeys.map((m) => m.test).reduce((a, b) => lcm(a, b), 1);
  let rounds = part == 1 ? 20 : 10000;

  range(rounds).map((_) => {
    for (let m of monkeys) {
      for (let w of m.items) {
        m.items = [];
        if (part == 1) {
          w = Math.floor(m.op(w) / 3);
        } else {
          w = m.op(w) % g;
        }
        m.times++;
        let goto = m[w % m.test == 0 ? "true" : "false"];
        monkeys[goto].items.push(w);
      }
    }
  });
  const t = sort(monkeys.map((m) => m.times)).reverse();
  clog(t[0] * t[1]);
}

run(1);
run(2);
