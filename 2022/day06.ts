import { getInput, clog, isAllDistinct, overlappingSlices } from "./utils";

let chars = [...getInput("day06.in")];

// part 1
clog(overlappingSlices([...chars], 4).findIndex(isAllDistinct) + 4);

// part 2
clog(overlappingSlices([...chars], 14).findIndex(isAllDistinct) + 14);
