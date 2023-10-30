import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState, useAppDispatch } from "store"
import { getRoomByIdThunk } from "store/room"
import { useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, Card } from "components";
import { Select } from "antd";


export const RoomDetailTemplate = () => {
  const { room } = useSelector((state: RootState) => state.room)
  // const { booking } = useSelector((state: RootState) => state.booking)
  const dispatch = useAppDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getRoomByIdThunk(Number(params.roomId)))
  }, [dispatch, params])
  return (
    <Container>
      <div className="header-content">
        <div className="grid grid-rows-2 items-center justify-center gap-[50px]">
          <div key={room.id}>
            <p>{room.tenPhong}</p>
            <img src={room.hinhAnh} alt="slider" />
          </div>
          <div className="grid grid-cols-2 gap-[50px]">
            <div className="grid grid-rows-3 gap-[20px]">
              <div className="grid grid-cols-2 gap-[100px]">
                <div>
                  <p className="font-700 text-20">
                    <span>Toàn bộ căn hộ condo</span>
                  </p>
                  <p><span>{room.khach} khách</span> ‧ <span>{room.phongNgu} phòng ngủ</span> ‧ <span>{room.phongTam} phòng tắm</span></p>
                </div>
                <div>
                  <Avatar size="large">
                    <i className="fa-regular fa-user text-20"></i>
                  </Avatar>
                </div>
              </div>
              <hr />
              <div>
                <p>{room.moTa}</p>
              </div>
              <hr />
              <div>
                <p>Tiện nghi</p>
                <div className="grid grid-cols-2 gap-16">
                  <div>
                    <p><i className="fa-solid fa-utensils"></i> Bếp</p>
                    <p><i className="fa-solid fa-tv"></i> TV với truyền hình cáp tiêu chuẩn</p>
                    <p><i className="fa-regular fa-snowflake"></i> Điều hòa nhiệt độ</p>
                    <p><i className="fa-solid fa-temperature-arrow-up"></i> Lò sưởi trong nhà</p>
                    <p><i className="fa-solid fa-square-parking"></i> Bãi đỗ xe thu phí nằm ngoài khuôn viên</p>
                  </div>
                  <div>
                    <p><i className="fa-solid fa-wifi"></i> Wifi</p>
                    <p><i className="fa-solid fa-elevator"></i> Thang máy</p>
                    <p><i className="fa-brands fa-windows"></i> Sân hoặc ban công</p>
                    <p><i className="fa-solid fa-wind"></i> Tủ lạnh</p>
                    <p><i className="fa-solid fa-calendar-days"></i> Cho phép ở dài hạn</p>
                  </div>
                  <Button>Hiển thị tất cả tiện nghi</Button>
                </div>
              </div>
              <hr />
            </div>
            <div>
              <Card>
                <div >
                  <div className="grid grid-cols-2">
                    <p>${room.giaTien} / đêm</p>
                    <p><i className="fa-solid fa-star"></i>(18 đánh giá)</p>
                  </div>
                  <div className="mt-[20px]">
                    <Button className="w-1/2">
                      <span>NHẬN PHÒNG</span>
                      {/* <span>{booking.}</span> */}
                    </Button>
                    <Button className="w-1/2">TRẢ PHÒNG</Button><br />
                    <Select className="w-full">{room.khach}</Select>
                  </div>
                  <div className="mt-[20px]">
                    <Button className="w-full">Đặt phòng</Button>
                    <p className="mt-[20px] text-center">Bạn vẫn chưa bị trừ tiền</p>
                  </div>
                  <div>
                    <p></p>
                    <p>Phí dịch vụ</p>
                    <hr />
                    <p>Tổng</p>

                  </div>
                </div>
              </Card>
              <p className="mt-[20px] text-center"><i className="fa-solid fa-flag"></i> Báo cáo nhà/phòng cho thuê này</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.header`
.header-content {
  max-width: var(--max-width);
  margin: auto;
  padding: 10px 60px;
}
`