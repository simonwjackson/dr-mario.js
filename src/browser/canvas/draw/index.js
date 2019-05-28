import map from 'ramda/es/map'
import applyTo from 'ramda/es/applyTo'
import evolve from 'ramda/es/evolve'

import block from './block'
import arena from './arena'
import player from './player'
import clear from './clear'
import create from './create'
import uncurryN from 'ramda/es/uncurryN'

const draw = artboard =>
  map(applyTo(artboard), {
    player,
    arena,
    block,
    clear,
    create
  })

const _withContext = ({ get }) => artboard =>
  evolve(
    {
      clear: fn => () => fn(artboard, get(['arena', 'resolution'])),
      arena: fn => () => fn(artboard, get(['styles']), get(['arena'])),
      player: fn => () => fn(artboard, get(['styles']), get(['player'])),
      block: applyTo(artboard)
    },
    {
      clear,
      arena,
      player,
      block,
      create,
    }
  )

export const withContext = uncurryN(2, _withContext)
export default draw
