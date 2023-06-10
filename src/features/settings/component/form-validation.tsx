import { Configuration } from 'features/model/Configurtion'
import * as yup from 'yup'

const phoneRegExp = /^([0][9][0-9]{8}$)|[+][2][5][1][9][0-9]{8}$/

export const schema: yup.SchemaOf<Configuration> = yup
  .object()
  .shape({
    commission: yup
      .number()
      .typeError('you must specify a number')
      .required('commission is required'),
    initial_fare: yup
      .number()
      .typeError('you must specify a number')
      .required('Gender is required'),
    radius: yup
      .number()
      .typeError('you must specify a number')
      .required('Gender is required'),
    discount: yup
      .object()
      .shape({
        taxi: yup
          .number()
          .typeError('you must specify a number')
          .required('Gender is required'),
        track: yup
          .number()
          .typeError('you must specify a number')
          .required('Gender is required'),
      })
      .required(),
    award: yup
      .object()
      .shape({
        point: yup
          .number()
          .typeError('you must specify a number')
          .required('Gender is required'),
      })
      .required(),
  })
  .required()
