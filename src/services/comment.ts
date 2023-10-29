import { apiInstance } from "constant/apiInstance";
import { CommentType } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_BOOKING_API
})

export const commentServices = {
    postComment: (data: CommentType) => api.post<ApiResponse<CommentType>>('', data),
    getListComment: () => api.get<ApiResponse<CommentType[]>>(''),
    getListCommentByCodeRoom: (codeRoom: number) => api.get<ApiResponse<CommentType[]>>(`/lay-binh-luan-theo-phong/${codeRoom}`)
}