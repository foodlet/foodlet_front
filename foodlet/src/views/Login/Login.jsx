import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"
import { useFormik } from "formik"
import { loginSchema } from "../../schemas/login.schema"
import FormControl from "../../components/forms/FormControl/FormControl"
import Input from "../../components/forms/Input/Input"
import { login as loginService } from "../../services/AuthService"

const initialValues = {
  email: '',
  password: ''
}

const Login = () => {
  const { login } = useContext(AuthContext)

  const {
    values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError
  } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: values => {
      loginService({ email: values.email, password: values.password })
        .then(response => {
          login(response.accessToken)
        })
        .catch(err => {
          if(err?.response?.data?.message) {
            setFieldError('email', err?.response?.data?.message)
          } else {
            setFieldError('email', err.message)
          }
          setSubmitting(false)
        })
    }
  })

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          />
        </FormControl>

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login