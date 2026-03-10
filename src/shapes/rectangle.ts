import { ShapeDefinition } from "../types/shape";

export const rectangle: ShapeDefinition = {
  type: "rectangle",
  label: "Rectangle",

  defaultParameters: {
    width: 1200,
    height: 800,
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