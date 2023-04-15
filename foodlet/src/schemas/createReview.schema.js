import * as Yup from 'yup'

export const createReviewSchema = Yup.object({
  score: Yup
    .number('invalid score')
    .max(5, 'the highest possible score is 5')
    .min(1, 'the lowest possible score is 1')
    .required('required'),
  text: Yup
    .string('invalid text')
    .required('required')
})