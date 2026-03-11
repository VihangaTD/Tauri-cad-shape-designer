import type { ShapeDefinition } from "../types/shape";

export const trapezoid: ShapeDefinition = {
  type: "trapezoid",
  label: "Trapezoid",

  defaultParameters: {
    topWidth: 100,
    bottomWidth: 200,
    height: 100,
  },

  fields: [
    {
      key: "topWidth",
      label: "Top Width",
      unit: "mm",
      min: 1,
    },
    {
      key: "bottomWidth",
      label: "Bottom Width",
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