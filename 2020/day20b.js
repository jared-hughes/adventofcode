const fs = require('fs')
// All imported in advance because typing speed
import {
  sort, int, print, clog, sum, product, chr, ord, isAllEqual, isIncreasing,
  isStrictlyIncreasing, isDecreasing, isStrictlyDecreasing, increments,
  allDistinct
} from '../utils/utils.js'
require('lodash.combinations')
require('lodash.multicombinations')
require('lodash.permutations')
require('lodash.multipermutations')
require('lodash.product')
const _ = require('lodash')
import * as math from 'mathjs'

fs.promises.readFile("day20.in", {encoding: 'utf8'})
  .then((dataString) => {
    // Remove the last character (the closing newline)
    dataString = dataString.slice(0, dataString.length-1)
    const L = dataString.split(/\n\n/g)
    solve(L.map(tile => ({
      id: tile.split(/\n/g)[0].match(/Tile (\d+):/)[1],
      borders: _.zip(...borders(tile.split(/\n/g).slice(1)
        .map(line => [...line].map(c => c == "#" ? 1 : 0))).map(prints)),
      center: center(tile.split(/\n/g).slice(1).map(line => [...line].map(c => c == "#" ? 1 : 0)))
    })))
  })

function prints(border) {
  return [
    parseInt(border.join(""), 2),
    parseInt(_.reverse([...border]).join(""), 2)
  ]
}

function flip(border) {
  clog("flipping", border)
  return ((border & 1)<<9) + ((border & 2)<<7) + ((border & 4)<<5) + ((border & 8)<<3)
   + ((border & 16)<<1) + ((border & 32)>>1) + ((border&64)>>3) + ((border&128)>>5)
   + ((border&256)>>7) + ((border & 512)>>9)
}

clog(flip(1024))

function center(grid) {
  return grid.slice(1, grid.length-1).map(row => [...row].slice(1, row.length-1))
}

function borders(grid) {
  return [
    grid[0],
    _.zip(...grid)[grid.length-1],
    _.reverse([...grid[grid.length-1]]),
    _.reverse([..._.zip(...grid)[0]])
  ]
}

function rotateRight(grid) {
  return _.zip(..._.reverse([...grid]))
}

function reflectGrid({id, borders, center}) {
  // reflect across main diag
  return {id, borders:[_.reverse([...borders[1]]), _.reverse([...borders[0]])], center:_.zip(...center)}
}

function rotateGrid({id, borders, center}, n) {
  let g = center;
  let s = borders[0];
  for (let i=0; i<n; i++) {
    g = rotateRight(g)
    s = [s[3], s[0], s[1], s[2]]
  }
  return {id, borders:s, center: g};
}
//
// function rotateBorders(ls, n) {
//   let s = ls;
//   for (let i=0; i<n; i++) {
//     s = [s[3], ...s.slice(0, 3)]
//   }
//   return s;
// }

function getGrid(remaining, grid, i, len) {
  if (i == len*len) {
    return [grid];
  }
  let x = i%len;
  let y = Math.floor(i/len);
  clog(y, x)
  let left = x>0 ? flip(grid[y][x-1].borders[1]) : null
  let top = y>0 ? flip(grid[y-1][x].borders[2]) : null
  clog("constrain", left, top)
  let tiles = [...remaining].filter(
    ({id, borders, center}) =>
      (top == null || borders.flat(1).includes(top))
      && (left == null || borders.flat(1).includes(left))
  )
  let possible = []
  for (let t of tiles) {
    for (let tile of [t, reflectGrid(t)]) {
      if ((top == null || tile.borders[0].includes(top))
      && (left == null || tile.borders[0].includes(left))) {
        possible.push(tile)
      }
    }
  }
  let out = []
  possible.map(tile => {
    let r = new Set([...remaining].filter(e => e.id != tile.id))
    let g = _.cloneDeep(grid)
    if (top) {
      g[y][x] = rotateGrid(tile, 4-tile.borders[0].indexOf(top))
    } else {
      clog("I", tile.borders, left)
      g[y][x] = rotateGrid(tile, 3-tile.borders[0].indexOf(left))
    }
    clog(g.map(r => r.map(e => e && e.id)))
    clog(g.map(r => r.map(e => e && e.borders)))
    for (let gg of getGrid(r, g, i+1, len)) {
      out.push(gg)
    }
  })
  return out
  // for (let i=1; i<L.length; i++) {
  //   clog(y, x)
  //   remaining.delete(tile)
  //   clog("T", tile)
  //   grid[y][x] = rotateGrid(tile, 4-tile.borders.indexOf(top))
  //   clog("g", grid[y][x])
  //   for (let x1 of _.range(centerLen)) {
  //     for (let y1 of _.range(centerLen)) {
  //       boolGrid[centerLen * y + y1][centerLen*x + x1] = grid[y][x].center[y1][x1]
  //     }
  //   }
  // }
}

function boolGrid(grid, len) {
  let centerLen = 8
  let boolGrid = [...Array(len*centerLen)].map(_ => [...Array(len*centerLen)].map(e => " "))
  for (let y of _.range(len)) {
    for (let x of _.range(len)) {
      if (grid[y][x] === undefined) {
        continue
      }
      for (let x1 of _.range(centerLen)) {
          for (let y1 of _.range(centerLen)) {
            boolGrid[centerLen * y + y1][centerLen * x + x1] = grid[y][x].center[y1][x1]
          }
        }
    }
  }
  return boolGrid;

}

function countMonsters(bg) {
  let total = 0;
  for (let y=0; y<bg.length-2; y++) {
    for (let x=0; x<bg.length-19; x++) {
      if ([
        [0,18],[1,0],[1,5],[1,6],[1,11],[1,12],[1,17],
        [1,18],[1,19],[2,1],[2,4],[2,7],[2,10],[2,13],[2,16]
      ].every(([dy,dx]) => bg[y+dy][x+dx])) {
        total += 1;
      }
    }
  }
  return total
}

function solve(L) {
  // clog(L.map(e => [e.id, e.borders.map(r => r.join(",")).join(";")]))
  let edges = L.map(e => e.borders).flat(2)
  let centersP = L.filter(({id, borders}) => {
    // find some center piece
    return borders[0].every(e => edges.filter(f => f==e).length > 1)
    // borders.map(flips => {
    //   clog (edges.filter(e => flips.includes(e)).length - 2)
    // })
  })
  let edgesP = L.filter(({id, borders}) => {
    // find some center piece
    return borders[0].filter(e => edges.filter(f => f==e).length > 1).length == 3
    // borders.map(flips => {
    //   clog (edges.filter(e => flips.includes(e)).length - 2)
    // })
  })
  let cornersP = L.filter(({id, borders}) => {
    // find some center piece
    return borders[0].filter(e => edges.filter(f => f==e).length > 1).length == 2
    // borders.map(flips => {
    //   clog (edges.filter(e => flips.includes(e)).length - 2)
    // })
  })
  let len = L.length == 144 ? 12 : 3
  let grid = [...Array(len)].map(_ => [...Array(len)])
  let topLeft = cornersP[0]
  grid[0][0] = rotateGrid(reflectGrid(topLeft), 3)
  let remaining = new Set(L)
  remaining.delete(topLeft)

  clog(grid.map(r => r.map(e => e && e.id)))
  grid = getGrid(remaining, grid, 1, len)[0]
  let bg = boolGrid(grid, len);
  let bgr = _.zip(...bg)
  clog("bg", bgr)
  clog(bgr.map(e => e.join("")).join("\n"))

  clog("C", countMonsters(bgr))

  let numMonsters = _.max(
    [
      bg, rotateRight(bg), rotateRight(rotateRight(bg)), rotateRight(rotateRight(rotateRight(bg))),
      bgr, rotateRight(bgr), rotateRight(rotateRight(bgr)), rotateRight(rotateRight(rotateRight(bgr))),
    ].map(g => countMonsters(g)))
  clog("N", numMonsters)

  // clog(topLeft.borders[0].map(e => edges.filter(f => f==e).length > 1))
  // => [true, true, false, false]
  // so rotate until [false, true, true, false]
  // clog(rotateBorders([true, true, false, false], 1))
  // tried 10, 12
  // for (let i=1; i<L.length; i++) {
  //   clog(y, x)
  //   remaining.delete(tile)
  //   clog("T", tile)
  //   grid[y][x] = rotateGrid(tile, 4-tile.borders.indexOf(top))
  //   clog("g", grid[y][x])
  //   for (let x1 of _.range(centerLen)) {
  //     for (let y1 of _.range(centerLen)) {
  //       boolGrid[centerLen * y + y1][centerLen*x + x1] = grid[y][x].center[y1][x1]
  //     }
  //   }
  // }
  // clog(boolGrid.map(e => e.join("")).join("\n"))
  clog(sum(L.map(e => sum(e.center.map(row => sum(row))))) - numMonsters * 15)
}
