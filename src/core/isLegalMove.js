import all from 'ramda/es/all'
import equals from 'ramda/es/equals'
import juxt from 'ramda/es/juxt'
import uncurryN from 'ramda/es/uncurryN'
import isCollision from './isCollision'
import isBoundary from './isBoundary'

const allFalse = all(equals(false))

const isLegalMove = arena => player => allFalse(
  juxt([isCollision, isBoundary])(arena, player)
)

export default uncurryN(2, isLegalMove)