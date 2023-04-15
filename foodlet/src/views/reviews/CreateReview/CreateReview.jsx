import { useFormik } from 'formik';
import React from 'react';
import { createReviewSchema } from '../../../schemas/createReview.schema';
import FormControl from '../../../components/forms/FormControl/FormControl';
import Input from '../../../components/forms/Input/Input';
import { createReview } from '../../../services/ReviewService';
import { useNavigate, useParams } from 'react-router-dom';

const INITIAL_VALUES = {
  score: 0,
  text: '',
  image: ''
}

const CreateReview = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError, setFieldValue
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnChange: false,
    validationSchema: createReviewSchema,
    onSubmit: values => {
      const formData = new FormData()

      formData.append('score', values.score)
      formData.append('text', values.text)
      formData.append('image', values.image)

      createReview(id, formData)
        .then(review => {
          navigate(`/recipes/${id}`)
        })
        .catch(err => console.log(err))
    }
  })

  return (
    <div>
      <h2>Create review</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <FormControl text='Score' error={touched.score && errors.score} htmlFor='score'>
          <Input 
            id='score'
            name='score'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.score}
            error={touched.score && errors.score}
            placeholder='Enter your score ...'
            type='number'
          />
        </FormControl>

        <FormControl text='Text' error={touched.text && errors.text} htmlFor='text'>
          <Input 
            id='text'
            name='text'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.text}
            error={touched.text && errors.text}
            placeholder='Enter your text ...'
            type='textarea'
          />
        </FormControl>

        <FormControl text='Image' error={touched.image && errors.image} htmlFor='image'>
          <Input 
            id='image'
            name='image'
            error={touched.image && errors.image}
            type='file'
            onChange={(event) => {
              setFieldValue('image', event.currentTarget.files[0]);
            }}
          />
        </FormControl>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReview;