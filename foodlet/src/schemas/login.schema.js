import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup
    .string('invalid email')
    .email('invalid email')
    .required('required'),
  password: Yup
    .string('invalid password')
    .min(8, 'must have at least 8 characters')
    .required('required')
})