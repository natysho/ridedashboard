import * as yup from 'yup'

// const phoneRegExp = /^([0][9][0-9]{8}$)|[+][2][5][1][9][0-9]{8}$/
const phoneRegExp = /^([+][2][5][1]([7]|[9])[0-9]{8}$)|[+][2][5][1][9][0-9]{8}$/

export const schema = yup
  .object({
    id: yup.string(),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    phone_number: yup
      .string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'invalid phone number'),
    email: yup.string().email().required('Email is required'),
    address: yup
      .object()
      .shape({
        city: yup.string().required('City is required'),
        sub_city: yup.string().required('SubCity is required'),
        house_number: yup.string().required('House number is required'),
        woreda: yup.string().required('Woreda is required'),
      })
      .required(),
    gender: yup.string().required('Gender is required'),
  })
  .required()
