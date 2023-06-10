export interface Vehicle {
  id?: string
  code: string
  plate_number: string
  model: string
  vehicle_category: string
  vehicle_type: string
  capacity: string
  color: string
  is_active?: boolean
  bolo_due_date?: Date
  insurance_certificate_due_date?: Date
  owner_id?: string
}

export interface careDocument {
  carImage: string
  carOwnerSlip: string
}
