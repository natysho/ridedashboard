import * as yup from 'yup'
export const schema = yup
  .object({
    first_name: yup.string().required('car name is required'),
    last_name: yup.string().required('car name is required'),
    email: yup.string().required('car name is required'),
    phone_number: yup.string().required('car name is required'),
    gender: yup.string().required('car name is required'),
    user_type: yup.string().required('car name is required'),
    roles: yup.array().required('role is required'),
    emergency_contact: yup.string(),
  })
  .required()
