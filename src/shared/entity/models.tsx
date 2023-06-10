export interface EntityConfiguration {
  title: string
  rootUrl: string
  detailUrl?: string
  visibleColumn: Column[]
  showNewButton?: boolean
  hasDetail?: boolean
  filter?: Filter[]
  newAction?(data: any): void
}

export interface Column {
  name: string
  key: string
  isDate?: boolean
  isNumber?: boolean
  isBoolean?: boolean
}
export interface Filter {
  field: string
  value: any
  name?: string
}
export interface PDF {
  title?: string
  fileName?: any
  unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc'
  size?: 'A1' | 'A2' | 'A3' | 'A4'
  orientation?: 'portrait' | 'landscape'
  visibleColumn?: Column[]
}
export enum PDFSizeOption {
  A1 = 'A1',
  A2 = 'A2',
  A3 = 'A3',
  A4 = 'A4',
}
export enum PDFUnitOption {
  PT = 'pt',
  PX = 'px',
  In = 'in',
  MM = 'mm',
  CM = 'cm',
  Ex = 'ex',
  EM = 'em',
  PC = 'pc',
}
export enum PDFOrientationOption {
  Portrait = 'portrait',
  Landscape = 'landscape',
}
