import map from "ramda/es/map";
import applyTo from "ramda/es/applyTo"; 
import evolve from "ramda/es/evolve";
import partial from "ramda/es/partial";
import __ from "ramda/es/__";

import block from './block'
import arena from './arena'
import player from './player'
import clear from './clear'
import flip from "ramda/es/flip";

const partialTo = flip(partial)

const draw = artboard => map(applyTo(artboard), {
  player,
  arena,
  block,
  clear
})

export const withContext = ({ state }) => artboard => {
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
    player,
    arena,
    block,
  })
}

export default draw