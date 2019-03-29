import map from 'ramda/es/map'
import addIndex from 'ramda/es/addIndex'
import uncurryN from 'ramda/es/uncurryN'

export const mapIndexed = addIndex(map)
const _getRandomInt = min => max => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomInt = uncurryN(2, _getRandomInt)
