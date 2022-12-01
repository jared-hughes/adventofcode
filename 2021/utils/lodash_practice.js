// require('lodash.combinations')
// require('lodash.multicombinations')
// require('lodash.permutations')
// require('lodash.multipermutations')
// require('lodash.product')
const _ = require("lodash")

const arr = [1,2,3,4,5,6,7,8,9,10]

// not Array → Array
// console.log(_.range(2,7,2))

// // # Array → not Array
// console.log(_.indexOf(arr, 3))
// console.log(_.lastIndexOf(arr, 4))
// console.log(_.findIndex(arr, e => e*e > 10))
// console.log(_.findLastIndex(arr, e => e*e < 10))
// console.log(_.isEmpty({}))

// console.log(_.head(arr))
// console.log(_.last(arr))
// console.log(_.nth(arr, 3))

// console.log(_.fromPairs([[1,2],[3,4]]))
// console.log(_.zipObject([1,2],[3,4]))
// console.log(_.zipObjectDeep(['a[0]', 'a[1]', 'b.c', 'd'], [1, 2, 3, 4]))
// console.log(_.join([1,2,3],";"))

// // # Collection → not Collection
// console.log(_.countBy([6.1, 4.2, 4.2, 4.3, 4.4], Math.floor))

// // # Array → Array (select elements)
// console.log(_.slice(arr, 4,6))
// console.log(_.tail(arr))
// console.log(_.initial(arr))
// console.log(_.dropRight(arr, 2))
// console.log(_.dropRightWhile(arr, e => e > 5))
// console.log(_.dropWhile(arr, e => e < 3))
// console.log(_.take(arr, 3))
// console.log(_.takeRight(arr, 3))
// console.log(_.takeRightWhile(arr, e => e > 5))

// // # Array → Array (non-mutating)
// console.log(_.chunk(arr, 3))
// console.log(_.compact([0,0,1,2,3]))
// console.log(_.drop(arr, 2))
// // fill slice from 6 to 9, non-inclusive last argument
// console.log(_.fill(arr, 3, 6, 9))
// const deepArr = [-1, 0, [1,2,3], [4,5,6], [7, [8,9]]];
// console.log(_.flatten(deepArr));
// console.log(_.flattenDeep(deepArr));
// console.log(_.flattenDepth(deepArr, 1))
// console.log(_.uniq([1,4,1,3,4,5,3,4,1,2,3,4]))
// console.log(_.uniqBy([1,4,1,3,4,5,3,4,1,2,3,4], e => Math.floor(e/2)))
// console.log(_.uniqWith([1,4,1,3,4,5,3,4,1,2,3,4], (x,y) => x == y))
// console.log(_.sortedUniq([1,1,2,3,4,4,4,5,6,6,7]))
// console.log(_.unzip([[1,2,3],[4,5,6],[7,8,9]]))
// console.log(  _.zip( [1,2,3],[4,5,6],[7,8,9] ))
// console.log(_.zipWith([1,2,3],[4,5,6],[7,8,9], (a,b,c) => a+b+c))
// console.log(_.without(arr, 2, 3, 4))
// console.log(_.sortBy(arr, e => -e))

// // # Arrays → Array
// console.log(_.concat(arr,4,5,[6,7]))
// console.log(_.difference(arr,[1,3,8]))
// console.log(_.differenceBy([-2,-1,0,1,2,3,4], [1,2], x => x*x))
// console.log(_.differenceWith([-2,-1,0,1,2,3,4], [1,2], (x,y) => Math.abs(x) == Math.abs(y)))
// console.log(_.union([1,2,3,5], [-1,2,3,4]))
// console.log(_.unionWith([1,2,3,5], [-1,2,3,4], (x,y) => Math.abs(x) == Math.abs(y)))
// console.log(_.intersection([1,2,3,5], [-1,2,3,4]))
// console.log(_.intersectionBy([1,2,3,5], [-1,2,3,4], x => x*x))
// console.log(_.intersectionWith([1,2,3,5], [-1,2,3,4], (x,y) => Math.abs(x) == Math.abs(y)))
// console.log(_.xor([1,2,3,4],[2,3,5],[3,5]))
// console.log(_.xorBy([1,2,3,4],[2,3,5],[3,5], x => Math.pow(x-2, 2)))

// // # Array → Array in place
// let arr2 = _.clone(arr)
// _.pull(arr2, 2, 3, 5)
// console.log(arr2)

// let arr2 = _.clone(arr)
// _.pullAll(arr2, [2,3,5])
// console.log(arr2)

// let arr2 = _.clone(arr)
// _.pullAllBy(arr2, [-2,3,5], e => e*e)
// console.log(arr2)

// let arr2 = _.clone(arr)
// _.pullAt(arr2, 2,3,5)
// console.log(arr2)

// let arr2 = _.clone(arr)
// _.reverse(arr2);
// console.log(arr2)

// # Chaining
// console.log(_(arr).map(e => e*e).concat(0,1).tail().value())

// # Lodash combo stuff (requires separate require)
// console.log(_.combinations([1,2,3],2))
// console.log(_.multicombinations([1,2,3],2))
// console.log(_.permutations([1,2,3],2))
// console.log(_.multipermutations([1,2,3],2))
// console.log(_.product([1,2,3],[4,5,6]))
