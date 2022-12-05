import * as math from "mathjs";
// prettier-ignore
import {
  getInput, sort, sortByKey, max, min, int, ints, clog, print, sum, prod, chr, ord, isAllEqual,
  isIncreasing, isStrictlyDecreasing, isStrictlyIncreasing, overlappingSlices, slices,
  range, transpose, uniq, dropAtIndex, permutations, cartesianPower,
  cartesianProduct, set, intersect, setdiff, symdiff, union, reverse
} from "./utils";

let dataString = getInput("day00.in");

clog(dataString.split(/\n/g));
