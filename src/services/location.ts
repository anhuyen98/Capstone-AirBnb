import { apiInstance } from "constant/apiInstance";
import { LocationSchemaType } from "schema";
import { LocationType } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_LOCATION_API
})

export const locationServices = {
    getListLocation: () => api.get<ApiResponse<LocationType[]>>(`/phan-trang-tim-kiem?pageIndex=1&pageSize=8`),
    postLocation: (data: LocationType) => api.post<ApiResponse<LocationType>>('', data),
    getLocationId: (id: number) => api.get<ApiResponse<LocationType>>(`/${id}`),
    deleteLocationById: (id: number) => api.delete<ApiResponse<null>>(`/${id}`),
    updateLocationById: (id: number, data: LocationSchemaType) => api.put<ApiResponse<LocationType>>(`/${id}`, data)
}