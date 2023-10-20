import { apiInstance } from "constant/apiInstance";
import { BookingType } from "types";

const api = apiInstance({
    baseURL: import.meta.env.VITE_BOOKING_API
})

export const bookingServices = {
    getListBooking: () => api.get<ApiResponse<BookingType[]>>('')
}