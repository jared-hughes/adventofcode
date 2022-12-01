export const sort = (arr: number[]) => arr.sort((a, b) => a - b);
export const sortByKey = <T>(a: T[], key: (v: T) => number) =>
  a.sort((u, v) => key(u) - key(v));
export const max = (arr: number[]) =>
  arr.reduce((a, b) => Math.max(a, b), -Infinity);
export const min = (arr: number[]) =>
  arr.reduce((a, b) => Math.min(a, b), Infinity);
export const int = (s: string) => parseInt(s, 10);
export const clog = console.log;
// single-argument print, returning given value
export const print = <T>(s: T) => (clog(s), s);
export const sum = (s: number[]) => s.reduce((a, b) => a + b, 0);
export const prod = (s: number[]) => s.reduce((a, b) => a * b, 1);
export const chr = (v: number) => String.fromCodePoint(v);
export const ord = (s: string) => s.codePointAt(0);
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
export const range = (n: number) => [...Array(n).keys()];
export const transpose = <T>(a: T[][]) =>
  range(Math.min(...a.map((row) => row.length))).map((i) =>
    a.map((row) => row[i])
  );
export const uniq = <T>(a: T[]) => [...new Set(a)];
export const dropAtIndex = <T>(a: T[], i: number) =>
  a.slice(0, i).concat(a.slice(i + 1));
/** Permutations of `s` of length `n` */
export function permutations<T>(a: T[], n: number = a.length) {
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
