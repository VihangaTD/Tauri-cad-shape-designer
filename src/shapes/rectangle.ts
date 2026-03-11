import type { ShapeDefinition } from "../types/shape";

export const rectangle: ShapeDefinition = {
  type: "rectangle",
  label: "Rectangle",

  defaultParameters: {
    width: 100,
    height: 50,
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