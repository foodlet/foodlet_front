import { useFormik } from 'formik';
import React, { useState } from 'react';
import { createRecipe, editRecipe } from '../../../services/RecipeService';
import { createRecipesSchema } from '../../../schemas/createRecipes.schema';
import FormControl from '../../../components/forms/FormControl/FormControl';
import Input from '../../../components/forms/Input/Input';
import MultiInput from '../../../components/forms/MultiInput/MultiInput';
import Recipe from '../../../components/recipes/Recipe/Recipe';
import { useNavigate } from 'react-router-dom';

const INITIAL_VALUES = {
  name: '',
  description: '',
  ingredients: '',
  time: 0,
  skillLevel: '',
  image: '',
  oven: false,
  fridge: false,
  steps: ''
}

const CreateRecipe = (props) => {
  const { edit, editValues } = props;
  const navigate = useNavigate()
  console.log(editValues)

  const {
    values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError, setFieldValue
  } = useFormik({
    initialValues: editValues || INITIAL_VALUES,
    validateOnChange: false,
    validationSchema: createRecipesSchema,
    onSubmit: values => {
      const formData = new FormData()

      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('time', values.time)
      formData.append('skillLevel', values.skillLevel)
      formData.append('image', values.image)
      // formData.append('ingredients', ingredients)
      formData.append('ingredients', JSON.stringify(ingredients.map(ingredient => {
        return {
          name: ingredient.ingredientName,
          amount: ingredient.ingredientAmount,
          measuringUnit: 'g'
        }
      })))
      formData.append('oven', values.oven)
      formData.append('fridge', values.fridge)
      // formData.append('steps', steps)
      console.log(steps)
      formData.append('steps', JSON.stringify(steps.map(step => {
        return {
          heading: step.stepHeading,
          text: step.stepText
        }
      })))

      // createRecipe(formData)
      console.log(JSON.parse(formData.get('steps')))

      if(edit) {
        editRecipe(editValues._id, formData)
          .then(recipe => {
            console.log('recipe ', recipe)
            navigate(`/recipes/${recipe._id}`)
          })
          .catch(err => console.log(err))
      } else {
        createRecipe(formData)
          .then(recipe => {
            console.log('slay')
            navigate('/profile')
          })
          .catch(err => console.log(err))
      }
    }
  })

  const [ ingredients, setIngredients ] = useState([])
  const [ steps, setSteps ] = useState([])
  const addIngredient = (ingredient) => {
    console.log(ingredient)
    setIngredients([ ...ingredients, ingredient])
  }
  const addStep = step => setSteps([...steps, step])

  return (
    <div className='app-container'>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <h2>{edit ? 'Edit recipe' : 'Create recipe'}</h2>

        <FormControl text='Name' error={touched.name && errors.name} htmlFor='name'>
          <Input 
            id='name'
            name='name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={touched.name && errors.name}
            placeholder="Enter your recipe's name ..."
          />
        </FormControl>

        <FormControl text='Description' error={touched.description && errors.description} htmlFor='description'>
          <Input 
            id='description'
            name='description'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            error={touched.description && errors.description}
            placeholder="Enter your recipe's description ..."
          />
        </FormControl>

        <FormControl text='Time' error={touched.time && errors.time} htmlFor='time'>
          <Input 
            id='time'
            name='time'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.time}
            error={touched.time && errors.time}
            placeholder="Enter your recipe's time ..."
            type='number'
          />
        </FormControl>

        <FormControl text='Skill level' error={touched.skillLevel && errors.skillLevel} htmlFor='skillLevel'>
          <select id='skillLevel' name='skillLevel' value={values.skillLevel} onChange={handleChange}>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='expert'>Expert</option>
          </select>
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

        <FormControl text='ingredients' error={touched.ingredients && errors.ingredients} htmlFor='ingredient'>
          <MultiInput setFunction={addIngredient} values={ingredients} firstInput='ingredientName' secondInput='ingredientAmount'/>
        </FormControl>

        <FormControl text='Oven' error={touched.oven && errors.oven} htmlFor='oven'>
          <select id='oven' name='oven' value={values.oven} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </FormControl>
        
        <FormControl text='Fridge' error={touched.fridge && errors.fridge} htmlFor='fridge'>
          <select id='fridge' name='fridge' value={values.fridge} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </FormControl>

        <FormControl text='steps' error={touched.steps && errors.steps} htmlFor='ingredient'>
          <MultiInput setFunction={addStep} values={steps} firstInput='stepHeading' secondInput='stepText'/>
        </FormControl>

        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;