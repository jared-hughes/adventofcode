import { readFileSync } from "fs";
import { int, overlappingSlices } from "./utils";

let dataString = readFileSync("day01.in", { encoding: "utf-8" })
  // Remove the last character (the closing newline)
  .slice(0, -1);
let L = dataString.split(/\n/g).map(int);

console.log(L);
