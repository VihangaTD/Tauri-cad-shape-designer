import type { ShapeDefinition } from "../types/shape";

export const triangle: ShapeDefinition = {
  type: "triangle",
  label: "Triangle",

  defaultParameters: {
    width: 150,
    height: 100,
  },

  fields: [
    {
      key: "width",
      label: "Width",
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