import uncurryN from 'ramda/es/uncurryN'

const startIntervalWith = firstFn => ms => intervalFn => {
  firstFn()
  return setInterval(intervalFn, ms)
}

export default uncurryN(3, startIntervalWith)