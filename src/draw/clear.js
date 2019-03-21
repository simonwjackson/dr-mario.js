import uncurryN from "ramda/es/uncurryN"

const clear = artboard => resolution =>
  artboard.clearRect(0, 0, resolution.width, resolution.height)

export default uncurryN(2, clear)
