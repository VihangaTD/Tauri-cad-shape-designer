import { rectangle } from "./rectangle";
import { triangle } from "./triangle";
import { lshape } from "./lshape";
import { circle } from "./circle";
import { trapezoid } from "./trapezoid";
import type { ShapeConfig, ShapeDefinition, ShapeType } from "../types/shape";

export const shapeRegistry: Record<ShapeType, ShapeDefinition> = {
  rectangle,
  triangle,
  lshape,
  circle,
  trapezoid,
};

export const shapes: ShapeDefinition[] = Object.values(shapeRegistry);

export function getShapeDefinition(type: ShapeType): ShapeDefinition {
  return shapeRegistry[type];
}

export function getDefaultShapeConfig(type: ShapeType): ShapeConfig {
  const definition = getShapeDefinition(type);

  return {
    type,
    parameters: { ...definition.defaultParameters },
    rotation: 0,
    flipX: false,
    flipY: false,
  };
}