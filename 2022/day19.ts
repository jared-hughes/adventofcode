import * as math from "mathjs";
// prettier-ignore
import {
  /* Misc */ getInput, print, clog,
  /* Strings */ int, ints, unsigned_ints, float, floats, unsigned_floats,
  words, chr, ord, reverse,
  /* Arrays */ sort, sortByKey, max, min, sum, prod, isAllEqual, isAllDistinct, isIncreasing,
  isStrictlyIncreasing, isDecreasing, isStrictlyDecreasing, overlappingSlices,
  slices, range, range2, range3, index, sliceStepped, uniq, dropAtIndex,
  prefixes, suffixes,
  /* 2D Arrays */ transpose, permutations, cartesianProduct, cartesianPower,
  /* Sets */ set, intersect, union, setdiff, symdiff

} from "./utils";

let dataString = getInput("day19.in");

const bps: [number, number, number, number, number, number, number][] =
  dataString.split(/\n/g).map((x) => {
    const [id, ore_ore, ore_clay, ore_obby, clay_obby, ore_geode, obby_geode] =
      ints(x);
    return [id, ore_ore, ore_clay, ore_obby, clay_obby, ore_geode, obby_geode];
  });
type F = [number, number, number, number];
interface S {
  bots: F;
  res: F;
  time: number;
  prevAfford: readonly [boolean, boolean, boolean, boolean];
}
function p(x: F, y: F): F {
  return x.map((a, i) => a + y[i]) as F;
}
function score(
  bp: [number, number, number, number, number, number, number],
  maxTime: number
) {
  const [id, ore_ore, ore_clay, ore_obby, clay_obby, ore_geode, obby_geode] =
    bp;
  function score_upper_ish(s: S) {
    const dt = maxTime - s.time;
    return (
      s.res[3] +
      s.bots[3] * dt +
      Math.floor((s.bots[2] * dt * (dt - 1)) / obby_geode / 2) +
      Math.floor(
        (s.bots[1] * dt * (dt - 1) * (dt - 2)) / obby_geode / clay_obby / 6
      ) +
      Math.floor(
        (s.bots[0] * dt * (dt - 1) * (dt - 2) * (dt - 3)) /
          obby_geode /
          clay_obby /
          ore_clay /
          24
      )
    );
  }
  clog("blueprint", id);
  let best = -1;
  const q: S[] = [
    {
      bots: [1, 0, 0, 0],
      res: [0, 0, 0, 0],
      prevAfford: [false, false, false, false],
      time: 0,
    },
  ];
  const mm = Math.max(ore_ore, ore_clay, ore_obby, ore_geode);
  const seen = new Set();
  while (q.length > 0) {
    const v = q.pop()!;
    const { bots, res, time, prevAfford } = v;
    if (score_upper_ish(v) < best - 4) continue;
    // if (best > 2) clog(best, v);
    // clog({ bots, res, time });
    const j = JSON.stringify(v);
    if (res[0] >= mm + 20) continue;
    if (time < 6 && res[0] >= ore_ore * 2) continue;
    if (time > 10 && bots[1] === 0) continue;
    if (seen.has(j)) continue;
    seen.add(j);
    if (time === maxTime) {
      const est = res[3];
      if (est > best) {
        best = est;
      }
      continue;
    }
    let after = p(res, bots);
    const afford3 = res[0] >= ore_geode && res[2] >= obby_geode;
    const afford2 = res[0] >= ore_obby && res[1] >= clay_obby;
    const afford1 = res[0] >= ore_clay;
    const afford0 = res[0] >= ore_ore;
    const pa = [afford0, afford1, afford2, afford3] as const;
    // if (afford0 && afford1 && afford2 && afford3) continue;
    if (afford3) {
      q.push({
        bots: p(bots, [0, 0, 0, 1]),
        res: p(after, [-ore_geode, 0, -obby_geode, 0]),
        time: time + 1,
        prevAfford: pa,
      });
    }
    if (afford2) {
      q.push({
        bots: p(bots, [0, 0, 1, 0]),
        res: p(after, [-ore_obby, -clay_obby, 0, 0]),
        time: time + 1,
        prevAfford: pa,
      });
    }
    if (bots[3] === 0 && afford1) {
      q.push({
        bots: p(bots, [0, 1, 0, 0]),
        res: p(after, [-ore_clay, 0, 0, 0]),
        time: time + 1,
        prevAfford: pa,
      });
    }
    if (bots[2] === 0 && res[0] <= mm * 2 && afford0 && !prevAfford[0]) {
      q.push({
        bots: p(bots, [1, 0, 0, 0]),
        res: p(after, [-ore_ore, 0, 0, 0]),
        time: time + 1,
        prevAfford: pa,
      });
    }
    if (!(afford0 && afford1 && afford2 && afford3))
      q.push({
        bots,
        res: after,
        time: time + 1,
        prevAfford: pa,
      });
  }
  clog(best);
  return best;
}

// part 1: currently gives 5 too low
clog(sum(bps.map((x, i) => score(x, 24) * x[0])));
// part 2
clog(prod(bps.slice(0, 3).map((x) => score(x, 32))));
