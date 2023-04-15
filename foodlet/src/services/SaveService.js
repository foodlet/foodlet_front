import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true)
const unautheticatedHttp = createHttp(false)

export const createDbSave = (id) => {
  return authenticatedHttp.post(`/save/${id}`)
}
export const createExternalSave = (id) => {
  return authenticatedHttp.post(`/save/external/${id}`)
}

export const deleteDbSave = (id) => {
  return authenticatedHttp.delete(`/save/${id}`)
}

export const deleteExternalSave = (id) => {
  return authenticatedHttp.delete(`/save/external/${id}`)
}

export const getMySaves = () => {
  return authenticatedHttp.get('/save/me')
}