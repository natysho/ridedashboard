export interface Configuration {
  commission: number
  initial_fare: number
  radius: number
  discount: Discount
  award: Award
  last_updated_by: any
}

interface Discount {
  taxi: number
  track: number
}

interface Award {
  point: number
}
