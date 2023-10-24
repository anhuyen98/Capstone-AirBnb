import { apiInstance } from "constant/apiInstance";
import { RoomType } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_ROOM_API
})

export const roomServices = {
    getListRoom: () => api.get<ApiResponse<RoomType[]>>(''),
    getListRoomByLocal: (mvt: number) => api.get<ApiResponse<RoomType[]>>(`/lay-phong-theo-vi-tri?maViTri=${mvt}`)
}