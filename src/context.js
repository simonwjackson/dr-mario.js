import compose from 'ramda/es/compose'
import mergeDeepRight from 'ramda/es/mergeDeepRight'
import applySpec from 'ramda/es/applySpec'
import multiply from 'ramda/es/multiply'
import assocPath from 'ramda/es/assocPath'
import path from 'ramda/es/path'
import uncurryN from 'ramda/es/uncurryN'
import tap from 'ramda/es/tap'

const create = defaults => options => {
  // eslint-disable-next-line fp/no-let
  let state = compose(
    mergeDeepRight(defaults),
    applySpec({
      arena: {
        resolution: {
          width: multiply(defaults.arena.wide),
          height: multiply(defaults.arena.tall)
        }
      }
    })
  )(defaults.styles.block.size)

  const get = arr => path(arr, state)
  // eslint-disable-next-line fp/no-mutation
  const set = path => data => compose(
    tap(obj => state = obj),
    assocPath
  )(path, data, state)

  // eslint-disable-next-line fp/no-mutation
  const setWith = fn => path =>
    compose(
      tap(obj => state = obj),
      assocPath
    )(path, fn(get(path)), state)

  return {
    state,
    get,
    set: uncurryN(2, set),
    setWith: uncurryN(2, setWith)
  }
}

export default uncurryN(2, create)
