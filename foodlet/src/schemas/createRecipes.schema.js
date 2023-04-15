import * as Yup from 'yup'

export const createRecipesSchema = Yup.object({
  name: Yup
    .string('invalid name')
    .required('required'),
  description: Yup
    .string('invalid description'),
  // ingredients: Yup
  //   .string('invalid ingredient')
  //   .required('required'),
  time: Yup
    .number('invalid time')
    .required('required'),
  // skillLevel: Yup
  //   .string('invalid skill level')
  //   .required('required'),
  // image: Yup
  //   .string('invalid image'),
  // oven: Yup
  //   .string('invalid value')
  //   .required('required'),
  // fridge: Yup
  //   .string('invalid value')
  //   .required('required'),
  // steps: Yup
  //   .string('invalid step')
  //   .required('required')
})