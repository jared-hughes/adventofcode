const fs = require("fs");
// All imported in advance because typing speed
const {
  sort,
  int,
  print,
  clog,
  sum,
  product,
  chr,
  ord,
  isAllEqual,
  isIncreasing,
  isStrictlyIncreasing,
  isDecreasing,
  isStrictlyDecreasing,
  increments,
  allDistinct,
} = require("../utils/utils.js");
require("lodash.combinations");
require("lodash.multicombinations");
require("lodash.permutations");
require("lodash.multipermutations");
require("lodash.product");
const _ = require("lodash");
const math = require("mathjs");

pos = [
  [2, 2],
  [2, 1],
  [4, 2],
  [4, 1],
  [6, 2],
  [6, 1],
  [8, 2],
  [8, 1],
  [0, 0],
  [1, 0],
  [3, 0],
  [5, 0],
  [7, 0],
  [9, 0],
  [10, 0],
];

let goal = [1, 2, 0, 3, 1, 3, 2, 0];
function solve() {
  /*#############
    #...........#
    ###C#D#D#A###
      #B#A#B#C#
      #########

    #############
    #89.A.B.C.DE#
    ###1#3#5#7###
      #0#2#4#6#
      #########
    */
  hallway = [8, 9, 10, 11, 12, 13, 14];
  hallAssignments = _.multipermutations(hallway, 8);
  hallAssignments = hallAssignments.filter(
    (L) =>
      !(L.includes(8) && !L.includes(9)) && !(L.includes(14) && !L.includes(13))
  );
  hallAssignments = hallAssignments.sort((a, b) => energy(a) - energy(b));
  // hallAssignments = [[11, 11, 8, 14, 9, 13, 11, 11]];
  let c = 0;
  for (let ha of hallAssignments) {
    c += 1;
    if (c % 1000 == 0) clog(c);
    if (valid(ha)) {
      clog(energy(ha));
      break;
    }
  }
}

let perms = _.permutations([0, 1, 2, 3], 4).map((L) =>
  _.flatMap(L.map((e) => [2 * e + 1, 2 * e]))
);

// perms = [[3, 5, 2, 4, 1, 0, 7, 6]];

function valid(ha) {
  haInverse = {};
  ha.map((e, i) => (haInverse[e] = i));

  return perms.some((perm) => {
    let occupied = {};
    let released = [0, 0, 0, 0];
    function canTravel(startX, endX) {
      // can travel from startX to endX, inclusive?
      for (let j = startX; ; j += Math.sign(endX - startX)) {
        if (occupied[j] !== undefined) {
          return false;
        }
        if (j == endX) return true;
      }
    }
    v = perm.every((e) => {
      let startX = pos[e][0];
      let endX = pos[ha[e]][0];
      if (!canTravel(startX, endX)) {
        return false;
      }
      occupied[pos[ha[e]][0]] = goal[e];
      released[e >> 1] += 1;
      let changed = true;
      while (changed) {
        changed = false;
        for (let i in occupied) {
          if (released[occupied[i]] == 2) {
            startX = +i;
            endX = pos[2 * occupied[i]][0];
            if (canTravel(startX + Math.sign(endX - startX), endX)) {
              delete occupied[i];
              changed = true;
            }
          }
        }
      }
      return true;
    });
    if (v) {
      clog("ha", ha);
      clog("perm", perm);
    }
    return v;
  });
}

function man(A, B) {
  let a = pos[A];
  let b = pos[B];
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function energy(ha) {
  s = 1111;
  for (let i = 0; i < 8; i++) {
    s += 10 ** goal[i] * (man(i, ha[i]) + man(ha[i], goal[i] * 2 + 1));
  }
  return s;
}

solve();
