## 2020

JavaScript solutions are run with node `v10.19.0` via Script package in Atom.

For contests I did in real-time, I may have edited them slightly afterward, but no major revisions.

Notes on contests I did:

| Contest Number | End Time 1 | Rank 1 | End Time 2 | Rank 2 | Notes | Learned
| --- | --: | :-- | --: | :-- | ----- | ---
| 1 | N/A | N/A | N/A | N/A | . | `arr.splice(-1,1)` works as `pop()`; (Oh wait there is an `arr.pop()`). JavaScript defaults to alphabetical sorting. Use `numbers.sort((a, b) => a - b)` to sort numerically. Can use bitwise xor as boolean xor when given booleans.
| 2 | N/A | N/A | N/A | N/A | . | .
| 3 | N/A | N/A | N/A | N/A | . | Reduce with `[start_value, ...array].reduce((accumulator, item) => nextItem)`
| 4 | N/A | N/A | N/A | N/A | . | In regex, capture named groups with `(?<name>regex)` then use `match.groups`. `Object.fromEntries` reconstructs an object from list of `[key, value]` pairs. Use `array.includes(element)`. `array.every(f)` and `array.some(f)` work like Python's `all` and `any` but require functions to map.
| 5 | N/A | N/A | N/A | N/A | . | Use a set with `s=new Set()`, `s.has(elem)`, `s.add(elem)`, and `s.size()`
| 6 | N/A | N/A | N/A | N/A | . | Use `string.slice(start, end)` (inclusive) instead of `array.splice(index, numDelete, newEntries)` when you have a string
| 7  | 09:22 | 143 | 15:36 | 164 | (Started&nbsp;2&nbsp;mins&nbsp;late)&nbsp;Felt&nbsp;good&nbsp;about&nbsp;this one! | Use an object instead of a `Map`, and `Object.keys(map[bag]).length === 0` checks if empty object
| 8  | 06:13 | 817 | 15:17 | 925 | Part 1 was decent-ish, but Part 2 was slow. Hit too many bugs because not cloning properly. Could have used different algorithm possibly | Use `JSON.parse(JSON.stringify(obj))` for quick deep clone when necessary.
| 9  | 03:48 | 187 | 09:19 | 337 | Probably could have been faster by not reading as much of the backstory ;). Also got stuck on Part 2 for a few minutes because thought it said *first* and *last*. Maybe should try one-filing | Use `arr.slice(start, end)` for analog of Python's arr[start:end]
| 10  | 03:08 | 42 | 05:50 | 23 | YES! Lodash helped me go faster, as did skipping the backstory. I didn't have time to test with the smaller cases on part 2, but I didn't need to. I think that's OK in general because bugfixes would take more than a minute anyway. I really had to recognize the DP approach instantly.|
