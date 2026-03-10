import { rectangle } from "./rectangle";
import { triangle } from "./triangle";
import { lshape } from "./lshape";
import { circle } from "./circle";
import { trapezoid } from "./trapezoid";

export const shapeRegistry = {
  rectangle,
  triangle,
  lshape,
  circle,
  trapezoid,
};

export const shapes = Object.values(shapeRegistry);