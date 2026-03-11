export type ShapeType =
  | "rectangle"
  | "triangle"
  | "lshape"
  | "circle"
  | "trapezoid"

export type RotationAngle = 0 | 90 | 180 | 270

export interface ShapeField {
  key: string
  label: string
  unit?: string
  min?: number
  max?: number
  step?: number
}

export interface ShapeDefinition {
  type: ShapeType
  label: string
  defaultParameters: Record<string, number>
  fields: readonly ShapeField[]
}

export interface ShapeConfig {
  type: ShapeType
  parameters: Record<string, number>
  rotation: RotationAngle
  flipX: boolean
  flipY: boolean
}