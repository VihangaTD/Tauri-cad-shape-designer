import { ShapeDefinition } from "../types/shape";


export const circle: ShapeDefinition = {
  type: "circle",
  label: "Circle",

  defaultParameters: {
    radius: 500,
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