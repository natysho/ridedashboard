export interface Provider {
  id: string
  first_name: string
  last_name: string
  phone_number: string
  address: any
  emergency_contact?: string
  email: string
  passport?: any
  gender: string
  is_active: boolean
  enabled: true
  vehicle_id: string
}
export interface Address {
  city: string
  sub_city: string
  woreda: string
  house_number: String
}
export interface Document {
  id: string
  providerId: string
  filePath: string
  fileType: string
}
export interface Passport {
  id: string
  passportNumber: string
  type: string
  file: Document
}
