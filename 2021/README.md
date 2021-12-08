## 2021

JavaScript solutions are run with node `v16.7.0` via tye integrated terminal of Visual Studio Code.
For contests I did in real-time, I may have edited them slightly afterward, but no major revisions.

Notes on contests I did:

| Contest Number | End Time 1 | Rank 1 | End Time 2 | Rank 2 | Notes                                                                                                                     | Learned                                                                                                                        |
| -------------- | ---------: | :----- | ---------: | :----- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1              |      02:47 | 1242   |      04:25 | 462    | Messed up with off-by-one error in part 1                                                                                 | Don't mess with `arr.slice().map((e,i) => ...)`. Just avoid using sliced indices and sliced elements elements at the same time |
| 2              |      02:38 | 644    |      03:35 | 232    | No big issues, but barely remembered to log on in time                                                                    | Do `line.split(" ")` instead of `line.startsWith(...)` ...                                                                     |
| 3              |      02:40 | 51     |      09:37 | 75     | Had to wait a minute after submitting a wrong answer due to a typo. Rip                                                   | Read the examples first. The problem description was a bit confusing                                                           |
| 4              |      05:19 | 15     |      08:22 | 31     | Was stuck for a min forgetting to assign `boards.filter()` back to `boards`, but it turned out alright                    | Might want a helper for parsing a grid of numbers                                                                              |
| 5              |      08:38 | 457    |      08:53 | 102    | Woke up 2 minutes before the contest after dying to the Putnam. Did well, considering. Also did part 2 during part 1 lol. | Might want a helper for parsing numbers while skipping through non-number characters. Match all well-formed numbers.           |
| 6              |      09:13 | 2633   |      09:27 | 411    | Pasted the input file wrong. Had to re-save it or something. Annoying                                                     |
| 7              |      04:42 | 12743  |      07:34 | 960    |
| 8              |      05:11 | 308    |      17:28 | 57     |                                                                                                                           | lists → `includes`, strings → `contains`. Also `_.permutations` takes the length of the permutation as second paremeter.       |
