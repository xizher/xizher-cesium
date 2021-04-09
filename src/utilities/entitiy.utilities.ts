import { Color, MaterialProperty } from 'cesium'

export interface IEntityStyle {
  material?: Color | MaterialProperty
  outline?: boolean
  outlineColor?: Color
  outlineWidth?: number
  extrudedHeight?: number
  height?: number
}

export interface IEllipseStyle extends IEntityStyle {
  semiMinorAxis?: number
  semiMajorAxis?: number
  rotation?: number
  stRotation?: number
}


