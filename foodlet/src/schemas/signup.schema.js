import * as Yup from 'yup'

export const signupSchema = Yup.object({
  firstName: Yup
    .string('invalid name')
    .required('required'),
  lastName: Yup
    .string('invalid name')
    .required('required'),
  username: Yup
    .string('invalid username')
    .required('required'),
  email: Yup
    .string('invalid email')
    .email('invalid email')
    .required('required'),
  password: Yup
    .string('invalid password')
    .required('required')
    .min(8, 'must have at least 8 characters'),
  foodAlergies: Yup
    .string('invalid alergies')
})