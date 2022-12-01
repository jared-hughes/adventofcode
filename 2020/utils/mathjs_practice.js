import * as math from 'mathjs'
import { print } from './utils'

print(math.round(math.e, 3))
print(math.atan2(3, -3)/math.pi)
// log defaults to base math.e
print(math.log(10000))
print(math.log(10000, 10))
print(math.sqrt(-4))
print(math.pow(4, 5))
// matrix power
print(math.pow([[2,0],[0,2]], 2))

let pos = [0, 1]
print(math.add(pos, [1,2]))
print(math.matrix([1,2]))
print(math.fraction(7, 3))
print(math.fraction("0.08(3)"))
print(math.complex(2,3))

print(math.mod(-2, 3))
