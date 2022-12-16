import { getInput, clog, ints, sort, sortByKey, sum } from "./utils";

let dataString = getInput("day16.in");

const data = dataString.split(/\n/g).map((line) => {
  const [a, b] = line.split(";");
  return [
    a.match(/[A-Z]{2}/)![0],
    ints(a)[0],
    [...b.matchAll(/[A-Z]{2}/g)].map((x) => x[0]),
  ] as [string, number, string[]];
});
const theRate = new Map(data.map((x) => [x[0], x[1]]));
const valves = data.map((x) => x[0]);
const dist = new Map<string, number>();
valves.map((a) => valves.map((b) => dist.set(a + b, a === b ? 0 : Infinity)));
data.map(([a, _, t]) => t.map((b) => dist.set(a + b, 1)));
const cost = (i, j) => dist.get(i + j) ?? Infinity;
valves.forEach((k) => {
  valves.forEach((i) => {
    valves.forEach((j) => {
      if (cost(i, k) + cost(k, j) < cost(i, j)) {
        dist.set(i + j, cost(i, k) + cost(k, j));
      }
    });
  });
});
const relevant = data.filter((x) => x[1] > 0).map((x) => x[0]);

function part1() {
  interface S {
    left: string[];
    released_so_far: number;
    time_left: number;
    rate: number;
    curr: string;
  }
  const relevant = data.filter((x) => x[1] > 0).map((x) => x[0]);
  const q: S[] = [
    {
      left: relevant,
      released_so_far: 0,
      rate: 0,
      time_left: 30,
      curr: "AA",
    },
  ];

  function release_if_wait(state: S) {
    return state.released_so_far + state.time_left * state.rate;
  }

  let flow = 0;

  while (q.length > 0) {
    sortByKey(q, release_if_wait);
    const best = q.pop()!;
    const r = release_if_wait(best);
    if (r >= flow) {
      flow = r;
    }
    best.left.forEach((f, i) => {
      const dt = 1 + cost(best.curr, f);
      const tent = {
        left: best.left.slice(0, i).concat(best.left.slice(i + 1)),
        released_so_far: best.released_so_far + best.rate * dt,
        rate: best.rate + theRate.get(f)!,
        time_left: best.time_left - dt,
        curr: f,
      };
      if (dt <= best.time_left) q.push(tent);
    });
  }

  return flow;
}

function part2() {
  interface S {
    left: string[];
    released_so_far: number;
    time_left: number;
    time_earned1: number;
    time_earned2: number;
    rate: number;
    curr: string;
    curr2: string;
  }
  const q: S[] = [
    {
      left: relevant,
      released_so_far: 0,
      rate: 0,
      time_left: 26,
      time_earned1: 0,
      time_earned2: 0,
      curr: "AA",
      curr2: "AA",
    },
  ];

  function release_if_wait(state: S) {
    return state.released_so_far + state.time_left * state.rate;
  }

  function upper_bound_ish(state: S) {
    return (
      release_if_wait(state) +
      sum(
        sort(state.left.map((x) => theRate.get(x)!))
          .reverse()
          .map((r, i) => r * (state.time_left - i))
      )
    );
  }

  let flow = 0;

  while (q.length > 0) {
    // uncomment to be a priority queue
    // sortByKey(q, release_if_wait);
    const best = q.pop()!;
    const r = release_if_wait(best);
    if (r >= flow) {
      flow = r;
    }
    if (upper_bound_ish(best) < flow) continue;
    if (best.time_left >= 1) {
      q.push({
        ...best,
        released_so_far: best.released_so_far + best.rate,
        time_left: best.time_left - 1,
        time_earned1: best.time_earned1 + 1,
        time_earned2: best.time_earned2 + 1,
      });
    }
    best.left.forEach((f, i) => {
      if (1 + cost(best.curr, f) == best.time_earned1) {
        const tent = {
          left: best.left.slice(0, i).concat(best.left.slice(i + 1)),
          released_so_far: best.released_so_far,
          rate: best.rate + theRate.get(f)!,
          time_left: best.time_left,
          time_earned1: 0,
          time_earned2: best.time_earned2,
          curr: f,
          curr2: best.curr2,
        };
        q.push(tent);
      } else if (1 + cost(best.curr2, f) == best.time_earned2) {
        const tent = {
          left: best.left.slice(0, i).concat(best.left.slice(i + 1)),
          released_so_far: best.released_so_far,
          rate: best.rate + theRate.get(f)!,
          time_left: best.time_left,
          time_earned1: best.time_earned1,
          time_earned2: 0,
          curr: best.curr,
          curr2: f,
        };
        q.push(tent);
      }
    });
  }

  return flow;
}

clog(part1());
clog(part2());
