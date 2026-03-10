import { ShapeDefinition } from "../types/shape";

export const trapezoid: ShapeDefinition = {
  type: "trapezoid",
  label: "Trapezoid",

  defaultParameters: {
    topWidth: 800,
    bottomWidth: 1200,
    height: 700,
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