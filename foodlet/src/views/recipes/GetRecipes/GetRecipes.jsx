import React, { useContext } from 'react';
import FormControl from '../../../components/forms/FormControl/FormControl';
import { getRecipes } from '../../../services/RecipeService';
import { getRecipesSchema } from '../../../schemas/getRecipes.schema';
import { useFormik } from 'formik';
import Input from '../../../components/forms/Input/Input';
import RecipesContext from '../../../contexts/RecipesContext';
import { useNavigate } from 'react-router-dom';
// import { setCurrentRecipes } from '../../../stores/CurrentRecipesStore';

const INITIAL_VALUES = {
  mainIngredient: ''
}

const GetRecipes = () => {
  const navigate = useNavigate()

  const { setCurrentRecipes } = useContext(RecipesContext)

  const {
    values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnChange: false,
    validationSchema: getRecipesSchema,
    onSubmit: values => {
      console.log(values)
      getRecipes(values.mainIngredient)
        .then(response => {
          setCurrentRecipes(response)
          navigate('/list-recipes')
        })
        .catch(err => console.log(err))
    }
  })

  return (
    <div className='app-container'>
      <form onSubmit={handleSubmit}>
        <h3 style={{color:'#25A244'}}>Get 20 recipes with the ingredient of your choice!</h3>
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

        <button className="btn" style={{backgroundColor:'#25A244', color:'white'}} type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default GetRecipes;