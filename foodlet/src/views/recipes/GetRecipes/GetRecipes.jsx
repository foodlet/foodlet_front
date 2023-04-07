import React from 'react';
import FormControl from '../../../components/forms/FormControl/FormControl';
import { getRecipes } from '../../../services/RecipeService';
import { getRecipesSchema } from '../../../schemas/getRecipes.schema';
import { useFormik } from 'formik';
import Input from '../../../components/forms/Input/Input';

const INITIAL_VALUES = {
  mainIngredient: ''
}

const GetRecipes = () => {
  const {
    values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnChange: false,
    validationSchema: getRecipesSchema,
    onSubmit: values => {
      console.log(values)
      getRecipes(values.mainIngredient)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
  })

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl text='Main ingredient' error={touched.mainIngredient && errors.mainIngredient} htmlFor='mainIngredient'>
          <Input 
            id='mainIngredient'
            name='mainIngredient'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mainIngredient}
            error={touched.mainIngredient && errors.mainIngredient}
            placeholder='Enter your main ingredient ...'
          />
        </FormControl>

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default GetRecipes;