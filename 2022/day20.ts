import { getInput, clog, int, sum, range } from "./utils";

let dataString = getInput("day20.in");

function mod(x: number, m: number) {
  return ((x % m) + m) % m;
}

function solve(part: 1 | 2) {
  const nums = dataString
    .split(/\n/g)
    .map((x) => [int(x) * (part === 1 ? 1 : 811589153)]) as [number][];
  let startNums = [...nums];
  range(part === 1 ? 1 : 10).forEach((_) => {
    for (let n of startNums) {
      const i = nums.indexOf(n);
      const j = mod(n[0] + i, nums.length - 1);
      nums.splice(i, 1);
      nums.splice(j, 0, n);
    }
  });
  const v = nums.map((x) => x[0]);

  const n0 = v.indexOf(0);

  clog(sum([1000, 2000, 3000].map((d) => v[mod(n0 + d, v.length)])));
}

solve(1);
solve(2);
