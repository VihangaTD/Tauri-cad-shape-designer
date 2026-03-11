import type { ShapeDefinition } from "../types/shape";

export const circle: ShapeDefinition = {
  type: "circle",
  label: "Circle",

  defaultParameters: {
    radius: 100,
  },

  fields: [
    {
      key: "radius",
      label: "Radius",
      unit: "mm",
      min: 1,
    },
  ],
};