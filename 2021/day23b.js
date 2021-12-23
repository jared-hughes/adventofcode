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

pos = [2, 4, 6, 8, 0, 1, 3, 5, 7, 9, 10];

let alongFromHall = {
  4: {
    0: [5],
    1: [5, 6],
    2: [5, 6, 7],
    3: [5, 6, 7, 8],
  },
  5: {
    0: [],
    1: [6],
    2: [6, 7],
    3: [6, 7, 8],
  },
  6: {
    0: [],
    1: [],
    2: [7],
    3: [7, 8],
  },
  7: {
    0: [6],
    1: [],
    2: [],
    3: [8],
  },
  8: {
    0: [6, 7],
    1: [7],
    2: [],
    3: [],
  },
  9: {
    0: [6, 7, 8],
    1: [7, 8],
    2: [8],
    3: [],
  },
  10: {
    0: [6, 7, 8, 9],
    1: [7, 8, 9],
    2: [8, 9],
    3: [9],
  },
};

let alongFromRoom = { 0: {}, 1: {}, 2: {}, 3: {} };
for (let i in alongFromHall) {
  for (let j = 0; j < 4; j++) {
    alongFromRoom[j][i] = alongFromHall[i][j];
  }
}

let alongHallHall = {
  "0,1": [6],
  "0,2": [6, 7],
  "0,3": [6, 7, 8],
  "1,2": [7],
  "1,3": [7, 8],
  "2,3": [8],
};

let debugEnergy = () => {};
// let debug = clog;

// Example
// let goal = [
//   [1, 3, 3, 0],
//   [2, 2, 1, 3],
//   [1, 1, 0, 2],
//   [3, 0, 2, 0],
// ];
let goal = [
  [2, 3, 3, 1],
  [3, 2, 1, 0],
  [3, 1, 0, 1],
  [0, 0, 2, 2],
];
function solve0() {
  /*#############
    #...........#
    ###C#D#D#A###
      #D#C#B#A#
      #D#B#A#C#
      #B#A#B#C#
      #########

    #############
    #45.6.7.8.9A#
    ###0#1#2#3###
      # # # # #
      # # # # #
      # # # # #
      #########
   */
  let state = {
    0: [...goal[0]],
    1: [...goal[1]],
    2: [...goal[2]],
    3: [...goal[3]],
    energy: 0,
  };
  print(solve(state));
  // let exampleSteps = [
  //   [3, 10],
  //   [3, 4],
  //   [2, 9],
  //   [2, 8],
  //   [2, 5],
  //   [1, 7],
  //   [1, 6],
  //   [3, 9],
  // ];
  // for (let [room, newPos] of exampleSteps) {
  //   state = updateState(state, room, newPos);
  //   clog(state);
  // }
  debugger;
}

const hallways = [4, 5, 6, 7, 8, 9, 10];

function countGoal(state, goal) {
  return (
    sum(
      [state[0], state[1], state[2], state[3]].map((e) =>
        e.length ? sum(e.map((v) => v === goal)) : 0
      )
    ) + sum(hallways.map((i) => state[i] === goal))
  );
}

function cloneState(state) {
  let newState = {};
  newState.energy = state.energy;
  for (let i = 0; i < 4; i++) {
    newState[i] = [...state[i]];
  }
  for (let i of hallways) {
    newState[i] = state[i];
  }
  return newState;
}

function updateState(state, room, newPos) {
  newState = cloneState(state);
  // remove the top person from the room
  let removed = newState[room].shift();
  // add that person to its new hallway locations
  let E;
  debugEnergy(
    "move",
    room,
    newPos,
    (E = man(room, newPos) + 4 - newState[room].length)
  );
  newState[newPos] = removed;
  newState.energy += 10 ** removed * E;
  let changed = true;
  while (changed) {
    changed = false;
    // remove people from rooms who are already in their room,
    // and they're the only one in their room
    for (let i = 0; i < 4; i++) {
      if (newState[i].length === 1 && newState[i][0] == i) {
        debugEnergy("remove from own room", i);
        newState[i].shift();
        changed = true;
      }
    }

    // remove people from halls who can go straight to their room
    for (let i of hallways) {
      let m = newState[i];
      if (
        m != undefined &&
        newState[m].length == 0 &&
        alongFromHall[i][m].every((p) => newState[p] == undefined)
      ) {
        debugEnergy(
          "remove from hall",
          i,
          m,
          (E = man(i, m) + countGoal(newState, m))
        );
        newState.energy += 10 ** m * E;
        delete newState[i];
        changed = true;
      }
    }

    // remove people from rooms who can go straight to their room
    for (let i = 0; i < 4; i++) {
      let m;
      while (
        newState[i].length > 0 &&
        newState[(m = newState[i][0])].length === 0 &&
        alongHallHall[Math.min(m, i) + "," + Math.max(m, i)].every(
          (p) => newState[p] == undefined
        )
      ) {
        debugEnergy(
          "remove from room",
          i,
          m,
          (E = man(i, m) + 5 - newState[i].length + countGoal(newState, m))
        );
        newState.energy += 10 ** m * E;
        newState[i].shift();
        changed = true;
      }
    }
  }
  return newState;
}

function solve(state) {
  let movesTried = new Set();
  let validMoves = [];
  let allEmpty = true;
  for (let room = 0; room < 4; room++) {
    if (state[room].length > 0) {
      allEmpty = false;
      for (let newPos of hallways) {
        if (
          state[newPos] == undefined &&
          alongFromRoom[room][newPos].every((p) => state[p] == undefined)
        ) {
          let newState = updateState(state, room, newPos);
          let j = JSON.stringify(newState);
          if (!movesTried.has(j)) {
            movesTried.add(j);
            validMoves.push(newState);
          }
        }
      }
    }
  }
  if (allEmpty && hallways.every((e) => state[e] == undefined)) {
    return state.energy;
  } else {
    let minE = Infinity;
    for (let newState of validMoves) {
      let res = solve(newState);
      if (res < minE) {
        minE = res;
      }
    }
    return minE;
  }
}

function man(A, B) {
  let a = pos[A];
  let b = pos[B];
  return Math.abs(a - b);
}

solve0();
