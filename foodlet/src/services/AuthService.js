import { createHttp } from "./BaseService";

const http = createHttp(false)

export const login = ({ email, password }) => http.post('/auth/login', { email, password })

export const signup = ({
  firstName,
  lastName,
  username,
  email,
  password,
  profilePic,
  foodAlergies,
  vegan = false,
  vegetarian = false
}) => http.post('/users', {
  firstName,
  lastName,
  username,
  email,
  password,
  profilePic,
  foodAlergies,
  vegan,
  vegetarian
})