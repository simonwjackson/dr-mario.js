import uncurryN from 'ramda/es/uncurryN'
import map from 'ramda/es/map'
import { mapIndexed, getRandomInt } from '../../utils'
import compose from 'ramda/es/compose'
import reverse from 'ramda/es/reverse'
import when from 'ramda/es/when'

const initViruses = level => rows => {
  const randomPills = map(() => getRandomInt(0, 3))

  return compose(
    reverse,
    mapIndexed((row, i) => when(() => i <= level, randomPills, row)),
    reverse
  )(rows)
}

export default uncurryN(2, initViruses)
