import * as yup from 'yup'

export const schema = yup
  .object({
    email: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
  })
  .required()
