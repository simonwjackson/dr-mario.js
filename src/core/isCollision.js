import uncurryN from 'ramda/es/uncurryN'
import and from 'ramda/es/and'
import lte from 'ramda/es/lt'
import anyPass from 'ramda/es/anyPass'
import hasPath from 'ramda/es/hasPath'
import complement from 'ramda/es/complement'

const noPath = complement(hasPath)

const isCollision = arena => player =>
  anyPass([
    noPath([player.pos.row + 1, player.pos.column]),
    () => and(
      lte(0, arena.matrix[player.pos.row][player.pos.column]),
      lte(0, player.matrix[0][0])
    ),
    () => and(
      lte(0, arena.matrix[player.pos.row + 1][player.pos.column]),
      lte(0, player.matrix[1][0])
    ),
    () => and(
      lte(0, arena.matrix[player.pos.row][player.pos.column + 1]),
      lte(0, player.matrix[0][1])
    ),
    () => and(
      lte(0, arena.matrix[player.pos.row + 1][player.pos.column + 1]),
      lte(0, player.matrix[1][1])
    )
  ])(arena.matrix)

export default uncurryN(2, isCollision)