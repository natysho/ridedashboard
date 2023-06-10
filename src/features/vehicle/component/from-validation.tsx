import * as yup from 'yup'
export const vehicleSchema = yup
  .object({
    id: yup.string(),
    model: yup.string().required('model is required'),
    code: yup.string().required('code is required'),
    plate_number: yup.string().required('plate number is required'),
    color: yup.string().required('color is required'),
    vehicle_category: yup.string().required('category is required'),
    vehicle_type: yup.string().required('type is required'),
    capacity: yup.string().required('capacity is required'),
    // is_active: yup.boolean(),
    // bolo_due_date: yup.string(),
    // insurance_certificate_due_date: yup.string(),
    // owner: yup.string(),
  })
  .required()
