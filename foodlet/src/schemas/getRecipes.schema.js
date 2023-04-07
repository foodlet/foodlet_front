import * as Yup from 'yup'

export const getRecipesSchema = Yup.object({
  mainIngredient: Yup
    .string('invalid ingredient')
    .required('required')
})