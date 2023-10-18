import { apiInstance } from "constant/apiInstance";
import { LoginSchemaType, RegisterSchemaType } from "schema";
const api = apiInstance({
    baseURL: import.meta.env.VITE_AUTH_API
})
export const authServices = {
    register: (data: RegisterSchemaType) => api.post('/signup', data),
    login: (data: LoginSchemaType) => api.post('/signin', data)
}