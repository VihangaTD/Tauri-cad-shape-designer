import { ShapeDefinition } from "../types/shape";

export const lshape: ShapeDefinition = {
  type: "lshape",
  label: "L Shape",

  defaultParameters: {
    outerWidth: 1200,
    outerHeight: 800,
    thickness: 300,
  },

  fields: [
    {
      key: "outerWidth",
      label: "Outer Width",
      unit: "mm",
      min: 1,
    },
    {
      key: "outerHeight",
      label: "Outer Height",
      unit: "mm",
      min: 1,
    },
    {
      key: "thickness",
      label: "Thickness",
      unit: "mm",
      min: 1,
    },
  ],
};