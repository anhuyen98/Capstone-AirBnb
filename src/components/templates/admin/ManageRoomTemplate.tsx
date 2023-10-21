import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListRoomThunk } from "store/room";
export const ManageRoomTemplate = () => {
  const { listRoom } = useSelector((state: RootState) => state.room);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getListRoomThunk())
  }, [dispatch])
  return (
    <div>
      ManageRoomTemplate
      {listRoom?.map((room) => {
        return (
          <div>
            <span className="mr-5">{room.id}</span>
            <span className="mr-5">{room.giaTien}$</span>
            <span className="mr-5">{room.tenPhong}</span>
            <span className="mr-5">{room.khach}</span>
            <img src={room.hinhAnh} className="w-[400px]" />
          </div>
        );
      })}
    </div>
  );
}
