import { readFileSync } from "fs";
// prettier-ignore
import {
  getInput, sort, sortByKey, max, min, int, clog, print, sum, prod, chr, ord, isAllEqual,
  isIncreasing, isStrictlyDecreasing, isStrictlyIncreasing, overlappingSlices, slices,
  range, transpose, uniq, dropAtIndex, permutations, cartesianPower,
  cartesianProduct, set, intersect, setdiff, symdiff, union
} from "./utils";

let dataString = readFileSync("day00.in", { encoding: "utf-8" })
  // Remove the last character (the closing newline)
  .slice(0, -1);

clog(dataString.split(/\n/g));
