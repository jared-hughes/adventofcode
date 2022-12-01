export const sort = (arr: number[]) => arr.sort((a, b) => a - b);
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
