export default {
  level: 1,
  arena: {
    wide: 10,
    tall: 16,
    matrix: undefined,
    resolution: {
      width: undefined,
      height: undefined
    }
  },
  styles: {
    block: {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      size: 25
    }
  },
  player: {
    pos: {
      row: 0,
      column: 4
    },
    matrix: [[0, 0], [3, 2]]
  },
  fps: 1
}
