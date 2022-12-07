import { getInput, clog, int, min, sum, prefixes } from "./utils";

let dataString = getInput("day07.in");

let pos: string[] = [];

let sizes = new Map();

for (let r of dataString.split(/\$/g).slice(1)) {
  r = r.slice(1, -1);
  if (r.startsWith("cd")) {
    const dir = r.slice(3);
    if (dir == "/") pos = [];
    else if (dir == "..") pos.pop();
    else pos.push(dir);
  } else {
    // ls
    for (let line of r.slice(3).split(/\n/g)) {
      if (!line.startsWith("dir")) {
        [[], ...prefixes(pos)].forEach((dir) => {
          let pwd = "/" + dir.join("/");
          sizes.set(pwd, (sizes.get(pwd) ?? 0) + int(line));
        });
      }
    }
  }
}

const vals = [...sizes.values()];

// Part 1
clog(sum(vals.filter((e) => e <= 100000)));

// Part 2
const todelete = sizes.get("/") - 40000000;
clog(min(vals.filter((e) => e >= todelete)));
