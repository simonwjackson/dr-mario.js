import uncurryN from 'ramda/es/uncurryN'
import compose from 'ramda/es/compose'
import tryCatch from 'ramda/es/tryCatch'
import T from 'ramda/es/T'
import F from 'ramda/es/F'

const event = name => fn => tryCatch(
  compose(
    T,
    window.addEventListener
  ),
  F
)(name, fn)

export default uncurryN(2, event)