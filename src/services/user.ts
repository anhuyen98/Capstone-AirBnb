import { apiInstance } from "constant/apiInstance"
import { RegisterSchemaType } from "schema"
import { UserLogin } from "types"

const api = apiInstance({
    baseURL: import.meta.env.VITE_USER_API
})

export const userServices = {
    getUserById: (path: number) => api.get<ApiResponse<UserLogin>>(`/${path}`),
    getListUser: () => api.get<ApiResponse<UserLogin[]>>(''),
    deleteUserById: (id: number) => api.delete<ApiResponse<null>>(`?id=${id}`),
    postUser: (data: RegisterSchemaType) => api.post('', data),
    updateUserById: (path: number, data: UserLogin) => api.put<ApiResponse<UserLogin>>(`/${path}`, data)
}