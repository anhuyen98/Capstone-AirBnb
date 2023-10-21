import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListBookingThunk } from "store/booking";
export const ManageBookingTemplate = () => {
  const { listBooking } = useSelector((state: RootState) => state.booking);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getListBookingThunk())
  }, [dispatch])
  return (
    <div>
      ManageBookingTemplate
      {listBooking?.map((booking) => {
        return (
          <div>
            <span className="mr-5">{booking.id}</span>
            <span className="mr-5">{booking.maPhong}</span>
            <span className="mr-5">{booking.ngayDen}</span>
            <span className="mr-5">{booking.ngayDi}</span>
            <span className="mr-5">{booking.soLuongKhach}</span>
          </div>
        );
      })}
    </div>
  );
}
