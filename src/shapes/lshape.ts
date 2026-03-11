import type { ShapeDefinition } from "../types/shape";

export const lshape: ShapeDefinition = {
  type: "lshape",
  label: "L Shape",

  defaultParameters: {
    width: 400,
    height: 200,
    cutoutWidth: 100,
    cutoutHeight: 100,
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
    {
      key: "cutoutWidth",
      label: "Cutout Width",
      unit: "mm",
      min: 0,
    },
    {
      key: "cutoutHeight",
      label: "Cutout Height",
      unit: "mm",
      min: 0,
    },
  ],
};