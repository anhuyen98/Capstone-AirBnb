import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState, useAppDispatch } from "store"
import { useEffect } from "react"
import { getBookingByIdThunk } from "store/booking"

export const BookingUser = () => {
    const { booking } = useSelector((state: RootState) => state.booking)   
    const params = useParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getBookingByIdThunk(Number(params.bookingById)))
    }, [dispatch, params])

  return (
    <div>
       <h1> BookingUser</h1>
       <div>
        <p>{booking?.maPhong}</p>
        <p>{booking?.maNguoiDung}</p>
        <p>{booking?.soLuongKhach}</p>
       </div>
    </div>
  )
}

