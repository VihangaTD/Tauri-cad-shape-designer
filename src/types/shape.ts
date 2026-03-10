export type ShapeType =
  | "rectangle"
  | "triangle"
  | "lshape"
  | "circle"
  | "trapezoid";

export interface ShapeField {
  key: string;
  label: string;
  unit?: string;
  min?: number;
}

export interface ShapeDefinition {
  type: ShapeType;
  label: string;

  defaultParameters: Record<string, number>;

  fields: ShapeField[];
}