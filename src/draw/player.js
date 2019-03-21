import { uncurryN } from "ramda"
import block from "./block"

const player = artboard => styles => player => {
  block(
    artboard,
    styles,
    {
      row: player.pos.row,
      column: player.pos.column
    },
    player.matrix[0][0]
  )

  block(
    artboard,
    styles,
    {
      row: player.pos.row + 1,
      column: player.pos.column
    },
    player.matrix[0][1]
  )

  block(
    artboard,
    styles,
    {
      row: player.pos.row,
      column: player.pos.column + 1
    },
    player.matrix[1][0]
  )

  block(
    artboard,
    styles,
    {
      row: player.pos.row + 1,
      column: player.pos.column + 1
    },
    player.matrix[1][1]
  )
}

export default uncurryN(3, player)
