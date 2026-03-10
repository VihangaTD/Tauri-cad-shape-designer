import { ShapeDefinition } from "../types/shape";

export const triangle: ShapeDefinition = {
  type: "triangle",
  label: "Triangle",

  defaultParameters: {
    base: 1200,
    height: 800,
  },

  fields: [
    {
      key: "base",
      label: "Base",
      unit: "mm",
      min: 1,
    },
    {
      key: "height",
      label: "Height",
      unit: "mm",
      min: 1,
    },
  ],
};