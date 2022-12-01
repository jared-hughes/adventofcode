import { readFileSync } from "fs";
// prettier-ignore
import {
  sort, sortByKey, max, min, int, clog, print, sum, prod, chr, ord, isAllEqual,
  isIncreasing, isStrictlyDecreasing, isStrictlyIncreasing, overlappingSlices,
  range, transpose, uniq, dropAtIndex, permutations, cartesianPower,
  cartesianProduct
} from "./utils";

let dataString = readFileSync("day01.in", { encoding: "utf-8" })
  // Remove the last character (the closing newline)
  .slice(0, -1);
let L = dataString.split(/\n/g).map(int);

clog(L);
