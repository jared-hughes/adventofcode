import { readFileSync } from "fs";

/* Misc */
export function getInput(filename: string) {
  return (
    readFileSync(filename, { encoding: "utf-8" })
      // Remove the last character (the closing newline)
      .slice(0, -1)
  );
}
/** single-argument print, returning given value */
export const print = <T>(s: T) => (clog(s), s);
export const clog = console.log;

/* Strings */
export const int = (s: string) => parseInt(s, 10);
export const ints = (s: string) =>
  [...s.matchAll(/[-+]?\d+/g)].map((v) => int(v[0]));
export const unsigned_ints = (s: string) =>
  [...s.matchAll(/\d+/g)].map((v) => int(v[0]));
export const float = (s: string) => parseFloat(s);
export const floats = (s: string) =>
  [...s.matchAll(/[-+]?\d+(?:\.\d+)/)].map((v) => float(v[0]));
export const unsigned_floats = (s: string) =>
  [...s.matchAll(/\d+(?:\.\d+)/)].map((v) => float(v[0]));
export const words = (s: string) =>
  [...s.matchAll(/[a-zA-Z]+/)].map((v) => v[0]);
export const chr = (v: number) => String.fromCodePoint(v);
export const ord = (s: string) => s.codePointAt(0) as number;
export const reverse = (s: string) => [...s].reverse().join("");

/* Arrays */
export const sort = (arr: number[]) => arr.sort((a, b) => a - b);
export const sortByKey = <T>(a: T[], key: (v: T) => number) =>
  a.sort((u, v) => key(u) - key(v));
export const max = (arr: number[]) =>
  arr.reduce((a, b) => Math.max(a, b), -Infinity);
export const min = (arr: number[]) =>
  arr.reduce((a, b) => Math.min(a, b), Infinity);
export const sum = (s: number[]) => s.reduce((a, b) => a + b, 0);
export const prod = (s: number[]) => s.reduce((a, b) => a * b, 1);
export const isAllEqual = (a: any[]) =>
  a.length === 0 || a.every((e) => e === a[0]);
export const isIncreasing = (a: number[]) =>
  a.every((e, i) => i == 0 || e >= a[i - 1]);
export const isStrictlyIncreasing = (a: number[]) =>
  a.every((e, i) => i == 0 || e >= a[i - 1]);
export const isDecreasing = (a: number[]) =>
  a.every((e, i) => i == 0 || e <= a[i - 1]);
export const isStrictlyDecreasing = (a: number[]) =>
  a.every((e, i) => i == 0 || e < a[i - 1]);
export const overlappingSlices = (a: number[], n: number) =>
  a.slice(n - 1).map((_, i) => a.slice(i, i + n));
export const slices = <T>(a: T[], n: number) =>
  range(a.length / n).map((i) => a.slice(i * n, i * n + n));
/** 0, 1, 2, ..., n-1 */
export const range = (n: number) => [...Array(n).keys()];
/** lo, lo + 1, lo + 2, ... hi - 1 (exclusive of hi) */
export const range2 = (lo: number, hi: number) =>
  range(hi - lo).map((x) => x + lo);
/** lo, lo + step, lo + 2*step, ... exclusive of hi */
export const range3 = (lo: number, hi: number, step: number) =>
  range(((hi - lo + step - 1) / step) | 0).map((i) => i * step + lo);
export const index = <T>(arr: T[], indices: number[]) =>
  indices.map((i) => arr[i]);
export function sliceStepped<T>(a: Iterable<T>, start: number, step: number) {
  const L = [...a];
  if (start >= L.length)
    throw new Error("Out of bounds sliceSpaced to the right");
  if (start < 0) start += L.length;
  if (start < 0) throw new Error("Out of bounds sliceSpaced to the left");
  return range(((L.length + step - 1 - start) / step) | 0).map(
    (i) => L[i * step + start]
  );
}
export const uniq = <T>(a: Iterable<T>) => [...set(a)];
export const dropAtIndex = <T>(a: T[], i: number) =>
  a.slice(0, i).concat(a.slice(i + 1));

/* 2D arrays */
export const transpose = <T>(a: T[][]) =>
  range(Math.min(...a.map((row) => row.length))).map((i) =>
    a.map((row) => row[i])
  );
/** Permutations of `s` of length `n` */
export function permutations<T>(a: T[], n: number = a.length): T[][] {
  if (n > a.length)
    throw new Error(
      `Cannot take a permutation of length ${n} from a list of length ${a.length}`
    );
  function _permutations(b: T[], prefix: T[]) {
    if (prefix.length === n) return [prefix];
    return b.flatMap((e, i) =>
      _permutations(dropAtIndex(b, i), prefix.concat([e]))
    );
  }
  return _permutations(a, []);
}
/** Cartesian product of lists */
// TODO: tuple-of-arrays type
export function cartesianProduct<T>(...a: T[][]): T[][] {
  if (a.length === 0) return [[]];
  return cartesianProduct(...a.slice(1)).flatMap((p) =>
    a[0].map((e) => [e].concat(p))
  );
}
export function cartesianPower<T>(a: T[], n: number) {
  return cartesianProduct(...range(n).map((_) => a));
}

/* Sets */
export const set = <T>(a: Iterable<T>) => new Set(a);
export function intersect<T>(...s: Iterable<T>[]): T[] {
  if (s.length === 0)
    throw new Error("Intersect requires at least one argument");
  const a = s[0];
  const B = s.slice(1).map(set);
  return [...a].filter((e) => B.every((s) => s.has(e)));
}
export function union<T>(...s: Iterable<T>[]): T[] {
  const out = new Set<T>();
  for (let u of s) for (let v of u) out.add(v);
  return [...out];
}
export function setdiff<T>(a: Iterable<T>, b: Iterable<T>) {
  let B = set(b);
  return [...a].filter((e) => !B.has(e));
}
export function symdiff<T>(a: Iterable<T>, b: Iterable<T>) {
  return setdiff(a, b).concat(setdiff(b, a));
}
