import { createHttp } from "./BaseService";

const http = createHttp(false)

export const login = ({ email, password }) => http.post('/auth/login', { email, password })

// export const signup = ({
//   firstName,
//   lastName,
//   username,
//   email,
//   password,
//   profilePic,
//   foodAlergies,
//   vegan,
//   vegetarian
// }) => http.post('/users', {
//   firstName,
//   lastName,
//   username,
//   email,
//   password,
//   profilePic,
//   foodAlergies,
//   vegan,
//   vegetarian
// })

export const signup = values => http.post('/users', values)