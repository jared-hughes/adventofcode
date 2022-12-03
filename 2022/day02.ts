import { int, clog, sum, getInput } from "./utils";

let dataString = getInput("day02.in");

let L = dataString.split(/\n/);

// Part 1
let outcomeScores = `A X 3
A Y 6
A Z 0
B X 0
B Y 3
B Z 6
C X 6
C Y 0
C Z 3`.split("\n");

clog(
  sum(
    L.map(
      (a) =>
        int(outcomeScores.find((e) => e.startsWith(a))![4]!) +
        { X: 1, Y: 2, Z: 3 }[a[2]]!
    )
  )
);

// Part 2
let itemScores = `A X 3
A Y 1
A Z 2
B X 1
B Y 2
B Z 3
C X 2
C Y 3
C Z 1`.split("\n");

clog(
  sum(
    L.map(
      (a) =>
        int(itemScores.find((e) => e.startsWith(a))![4]!) +
        { X: 0, Y: 3, Z: 6 }[a[2]]!
    )
  )
);
