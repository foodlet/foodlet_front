import React from 'react';
import { signupSchema } from '../../schemas/signup.schema';
import { signup as signupService } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import FormControl from '../../components/forms/FormControl/FormControl';
import Input from '../../components/forms/Input/Input';
import { useFormik } from 'formik';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  foodAlergies: '',
  vegan: false,
  vegetarian: false
}

const Signup = () => {
  const navigate = useNavigate()

  const {
    values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError, setFieldValue
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnChange: false,
    validationSchema: signupSchema,
    onSubmit: values => {
      // signupService({
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   username: values.username, 
      //   email: values.email, 
      //   password: values.password,
      //   profilePic: values.profilePic,
      //   foodAlergies: values.foodAlergies,
      //   vegan: values.vegan,
      //   vegetarian: values.vegetarian 
      // })

      const formData = new FormData()

      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      formData.append('username', values.username)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('profilePic', values.profilePic)
      formData.append('foodAlergies', values.foodAlergies)
      formData.append('vegan', values.vegan)
      formData.append('vegetarian', values.vegetarian)

      signupService(formData)
        .then(response => {
          navigate('/login')
        })
        .catch(err => {
          console.log(err)
          if(err?.response?.data?.errors) {
            err.response.data.errors.keys.forEach(errKey => {
              setFieldError(errKey, err.response.data.errors.errKey)
            })
            // setFieldError('email', err?.response?.data?.message)
          } else {
            setFieldError('email', err.message)
          }
          setSubmitting(false)
        })
    }
  })


  return (
    <div className='app-container'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <FormControl text='First name' error={touched.firstName && errors.firstName} htmlFor='firstName'>
          <Input 
            id='firstName'
            name='firstName'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={touched.firstName && errors.firstName}
            placeholder='Enter your first name ...'
          />
        </FormControl>
        
        <FormControl text='Last name' error={touched.lastName && errors.lastName} htmlFor='lastName'>
          <Input 
            id='lastName'
            name='lastName'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={touched.lastName && errors.lastName}
            placeholder='Enter your last name ...'
          />
        </FormControl>

        <FormControl text='Username' error={touched.username && errors.username} htmlFor='username'>
          <Input 
            id='username'
            name='username'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={touched.username && errors.username}
            placeholder='Enter your username ...'
          />
        </FormControl>

        <FormControl text='Email' error={touched.email && errors.email} htmlFor='email'>
          <Input 
            id='email'
            name='email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
            placeholder='Enter your email ...'
          />
        </FormControl>

        <FormControl text='Password' error={touched.password && errors.password} htmlFor='password'>
          <Input 
            id='password'
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
            placeholder='Enter your password ...'
            type='password'
          />
        </FormControl>

        <FormControl text='Profile picture' error={touched.profilePic && errors.profilePic} htmlFor='profilePic'>
          <Input 
            id='profilePic'
            name='profilePic'
            error={touched.profilePic && errors.profilePic}
            type='file'
            onChange={(event) => {
              setFieldValue('profilePic', event.currentTarget.files[0]);
            }}
          />
        </FormControl>

        <FormControl text='Food alergies, separate by commas and space' error={touched.foodAlergies && errors.foodAlergies} htmlFor='foodAlergies'>
          <Input
            id='foodAlergies'
            name='foodAlergies'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.foodAlergies}
            error={touched.foodAlergies && errors.foodAlergies}
            type='textarea'
          />
        </FormControl>

        <FormControl text='Vegan' error={touched.vegan && errors.vegan} htmlFor='vegan'>
          <select name='vegan' id='vegan' value={values.vegan} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </FormControl>

        <FormControl text='Vegetarian' error={touched.vegetarian && errors.vegetarian} htmlFor='vegetarian'>
          <select name='vegetarian' id='vegetarian' value={values.vegetarian} onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}t>No</option>
          </select>
        </FormControl>

        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;