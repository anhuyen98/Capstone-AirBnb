import { apiInstance } from "constant/apiInstance"
import { UserLogin } from "types"

const api = apiInstance({
    baseURL: import.meta.env.VITE_USER_API
})

export const userServices = {
    getUserById: (path: number) => api.get<ApiResponse<UserLogin>>(`/${path}`),
    getListUser: () => api.get<ApiResponse<UserLogin[]>>('')
}