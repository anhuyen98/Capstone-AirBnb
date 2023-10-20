import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListLocationThunk } from "store/location";

export const ManageLocationTemplate = () => {
  const { listLocation } = useSelector((state: RootState) => state.location);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getListLocationThunk())
  }, [dispatch])
  return (
    <div>
      ManageLocationTemplate
      {listLocation?.map((location) => {
        return (
          <div>
            <span className="mr-5">{location.id}</span>
            <span className="mr-5">{location.quocGia}</span>
            <span className="mr-5">{location.tenViTri}</span>
            <span className="mr-5">{location.tinhThanh}</span>
            <img src={location.hinhAnh} className="w-[400px]" />
          </div>
        );
      })}
    </div>
  );
}
