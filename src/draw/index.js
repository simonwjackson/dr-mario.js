import map from "ramda/es/map";
import applyTo from "ramda/es/applyTo"; 
import evolve from "ramda/es/evolve";
import partial from "ramda/es/partial";
import __ from "ramda/es/__";
import flip from "ramda/es/flip";

import block from './block'
import arena from './arena'
import player from './player'
import clear from './clear'
import create from './create'
import uncurryN from "ramda/es/uncurryN";

const partialTo = flip(partial)

const draw = artboard => map(applyTo(artboard), {
  player,
  arena,
  block,
  clear,
  create 
})

const _withContext = ({ state }) => artboard => {
  console.log(artboard)
  return evolve({
    clear: partialTo([
      artboard,
      state.arena.resolution
    ]),
    arena: partialTo([artboard, state.styles, state.arena]),
    player: partialTo([artboard, state.styles, state.player]),
    block: applyTo(artboard),
  }, {
    clear,
    arena,
    player,
    block,
    create
  })
}

export const withContext = uncurryN(2, _withContext)
export default draw
