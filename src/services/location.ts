import { apiInstance } from "constant/apiInstance";
import { LocationType } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_LOCATION_API
})

export const locationServices = {
    getListLocation: () => api.get<ApiResponse<LocationType[]>>('')
}