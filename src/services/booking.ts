import { apiInstance } from "constant/apiInstance";
import { BookingSchemaType } from "schema/BookingSchema";
import { BookingType } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_BOOKING_API
})

export const bookingServices = {
    getListBooking: () => api.get<ApiResponse<BookingType[]>>(''),
    postBooking: (data: BookingSchemaType) => api.post<ApiResponse<BookingType>>('', data),
    getBookingById: (id: number) => api.get<ApiResponse<BookingType>>(`/${id}`),
    deleteBookingById: (id: number) => api.delete<ApiResponse<null>>(`/${id}`),
    updateBookingById: (id: number, data: BookingSchemaType) => api.put<ApiResponse<BookingType>>(`/${id}`, data),
    getListBookingById: (id: number) => api.get<ApiResponse<BookingType[]>>(`/lay-theo-nguoi-dung/${id}`) 
}