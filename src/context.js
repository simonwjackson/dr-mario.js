import compose from "ramda/es/compose";
import mergeDeepRight from "ramda/es/mergeDeepRight";
import applySpec from "ramda/es/applySpec";
import multiply from "ramda/es/multiply";
import assocPath from "ramda/es/assocPath";
import curry from "ramda/es/curry";
import __ from "ramda/es/__";
import path from "ramda/es/path";
import uncurryN from "ramda/es/uncurryN";

const create = defaults => options => {
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

  const get = path(__, state)
  const set = curry((path, data) =>
    state = assocPath(path, data, state)
  )

  return {
    state,
    get,
    set
  }
}

export default uncurryN(2, create)