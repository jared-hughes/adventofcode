import * as math from "mathjs";
// prettier-ignore
import {
  /* Misc */ getInput, print, clog,
  /* Strings */ int, ints, unsigned_ints, float, floats, unsigned_floats,
  words, chr, ord, reverse,
  /* Arrays */ sort, sortByKey, max, min, sum, prod, isAllEqual, isAllDistinct, isIncreasing,
  isStrictlyIncreasing, isDecreasing, isStrictlyDecreasing, overlappingSlices,
  slices, range, range2, range3, index, sliceStepped, uniq, dropAtIndex,
  /* 2D Arrays */ transpose, permutations, cartesianProduct, cartesianPower,
  /* Sets */ set, intersect, union, setdiff, symdiff

} from "./utils";

let dataString = getInput("day00.in");

clog(dataString.split(/\n/g));
