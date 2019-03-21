import uncurryN from "ramda/es/uncurryN";

const create = ({width, height}) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return { canvas, artboard: canvas.getContext('2d') };
};

export default create