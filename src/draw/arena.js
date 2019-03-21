import uncurryN from "ramda/es/uncurryN";
import {mapIndexed} from '../utils'
import block from './block'

export const arena = artboard => styles => arena => {
  mapIndexed((columns, row) => {
    mapIndexed((type, column) => {
      block(artboard, styles, { row, column }, type);
    }, columns);
  }, arena.matrix);
};

export default uncurryN(3, arena)