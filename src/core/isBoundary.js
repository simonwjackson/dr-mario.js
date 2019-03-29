import uncurryN from 'ramda/es/uncurryN'
import and from 'ramda/es/and'
import lt from 'ramda/es/lt'
import gt from 'ramda/es/gt'
import gte from 'ramda/es/gte'
import anyPass from 'ramda/es/anyPass'

const isBoundary = arena => player =>  anyPass([
  () => gte(player.pos.column + 2, 12 /* wide + 2 */),
  () => gte(player.pos.row + 2, 18 /* wide + 2 */),
  () => and(
    lt(player.pos.column, 0),
    gt(player.matrix[0][0], 0)
  ),
  () => and(
    lt(player.pos.column, 0),
    gt(player.matrix[0][1], 0)
  ),
  () => and(
    lt(player.pos.column + 1, 0),
    gt(player.matrix[1][0], 0)
  ),
  () => and(
    lt(player.pos.column + 1, 0),
    gt(player.matrix[1][1], 0)
  )
])()

export default uncurryN(2, isBoundary)