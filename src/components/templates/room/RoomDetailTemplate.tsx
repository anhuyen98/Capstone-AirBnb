import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getRoomByIdThunk } from "store/room";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar, Button, Card } from "components";
import { Select } from "antd";
import { DatePicker } from "components";
import type { DatePickerProps } from "components";
import { toast } from "react-toastify";
import { getIdUser } from "utils";
import { BookingType } from "types";
import { bookingServices } from "services";

export const RoomDetailTemplate = () => {
  const { room } = useSelector((state: RootState) => state.room);
  // const { booking } = useSelector((state: RootState) => state.booking)
  const dispatch = useAppDispatch();
  const idUser = getIdUser();
  console.log("idUser: ", idUser);
  const params = useParams();
  console.log("params: ", params);
  const [inputValue1, setInputValue1] = useState<Date>();
  console.log("inputValue1: ", inputValue1);
  const [inputValue2, setInputValue2] = useState<Date>();
  const [people, setPeople] = useState<number>();
  console.log("inputValue2: ", inputValue2);
  const handleChange = (value: string) => {
    setPeople(Number(value));
  };
  const onChange1: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      setInputValue1(new Date(dateString));
      return;
    }
    setInputValue1(undefined);
  };
  const onChange2: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      setInputValue2(new Date(dateString));
      return;
    }
    setInputValue2(undefined);
  };
  let differenceDay: number;
  if (inputValue1 && inputValue2) {
    const differenceTime = inputValue2.getTime() - inputValue1.getTime();
    differenceDay = Math.ceil(differenceTime / (1000 * 3600 * 24));
  }
  const bookingDay = async (value: BookingType) => {
    try {
      const data = await bookingServices.postBooking(value);
      if (data) {
        toast.success("Đặt phòng thành công", {
          position: "bottom-right",
        });
      }
    } catch (err) {
      console.log(err)
      toast.error("Đặt phòng thất bại", {
        position: "bottom-right",
      });
    }
  };
  useEffect(() => {
    if (differenceDay > 0) {
      toast.success("Chọn ngày đặt thành công", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (differenceDay <= 0) {
      toast.warn("Vui lòng đặt ngày trả phòng sau ngày đặt phòng", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.info("Vui lòng ngày đặt phòng", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [differenceDay]);
  useEffect(() => {
    dispatch(getRoomByIdThunk(Number(params.roomId)));
  }, [dispatch, params]);
  return (
    <Container>
      <div className="header-content">
        <div className="grid grid-rows-2 items-center justify-center gap-[50px]">
          <div key={room?.id}>
            <p>{room?.tenPhong}</p>
            <img src={room?.hinhAnh} alt="slider" />
          </div>
          <div className="grid grid-cols-2 gap-[50px]">
            <div className="grid grid-rows-3 gap-[20px]">
              <div className="grid grid-cols-2 gap-[100px]">
                <div>
                  <p className="font-700 text-20">
                    <span>Toàn bộ căn hộ condo</span>
                  </p>
                  <p>
                    <span>{room?.khach} khách</span> ‧{" "}
                    <span>{room?.phongNgu} phòng ngủ</span> ‧{" "}
                    <span>{room?.phongTam} phòng tắm</span>
                  </p>
                </div>
                <div>
                  <Avatar size="large">
                    <i className="fa-regular fa-user text-20"></i>
                  </Avatar>
                </div>
              </div>
              <hr />
              <div>
                <p>{room?.moTa}</p>
              </div>
              <hr />
              <div>
                <p>Tiện nghi</p>
                <div className="grid grid-cols-2 gap-16">
                  <div>
                    <p>
                      <i className="fa-solid fa-utensils"></i> Bếp
                    </p>
                    <p>
                      <i className="fa-solid fa-tv"></i> TV với truyền hình cáp
                      tiêu chuẩn
                    </p>
                    <p>
                      <i className="fa-regular fa-snowflake"></i> Điều hòa nhiệt
                      độ
                    </p>
                    <p>
                      <i className="fa-solid fa-temperature-arrow-up"></i> Lò
                      sưởi trong nhà
                    </p>
                    <p>
                      <i className="fa-solid fa-square-parking"></i> Bãi đỗ xe
                      thu phí nằm ngoài khuôn viên
                    </p>
                  </div>
                  <div>
                    <p>
                      <i className="fa-solid fa-wifi"></i> Wifi
                    </p>
                    <p>
                      <i className="fa-solid fa-elevator"></i> Thang máy
                    </p>
                    <p>
                      <i className="fa-brands fa-windows"></i> Sân hoặc ban công
                    </p>
                    <p>
                      <i className="fa-solid fa-wind"></i> Tủ lạnh
                    </p>
                    <p>
                      <i className="fa-solid fa-calendar-days"></i> Cho phép ở
                      dài hạn
                    </p>
                  </div>
                  <Button>Hiển thị tất cả tiện nghi</Button>
                </div>
              </div>
              <hr />
            </div>
            <div>
              <Card>
                <div>
                  <div className="grid grid-cols-2">
                    <p>${room?.giaTien} / đêm</p>
                    <p>
                      <i className="fa-solid fa-star"></i>(18 đánh giá)
                    </p>
                  </div>
                  <div className="mt-[20px] grid grid-cols-6 gap-5">
                    {/* <Button className="w-1/2">
                      <span>{booking.}</span>
                    </Button> */}
                    <div className="col-span-3 text-center">
                      <span className="w-full inline-block mb-8">
                        NHẬN PHÒNG
                      </span>
                      <DatePicker
                        placeholder="Chọn ngày đến"
                        className="w-full"
                        onChange={onChange1}
                      />
                    </div>
                    <div className="col-span-3 text-center">
                      <span className="w-full inline-block mb-8">
                        TRẢ PHÒNG
                      </span>
                      <DatePicker
                        placeholder="Chọn ngày đi"
                        className="w-full"
                        onChange={onChange2}
                      />
                    </div>
                    {/* <Button className="w-1/2">TRẢ PHÒNG</Button><br />
                      <DatePicker onChange={onChange} /> */}
                    <Select
                      placeholder="Chọn số khách <= 10 / phòng"
                      className="col-span-6 "
                      onChange={handleChange}
                      options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                        { value: "9", label: "9" },
                        { value: "10", label: "10" },
                      ]}
                    />
                  </div>
                  <div className="mt-[20px]">
                    <Button
                      type="primary"
                      className="w-full"
                      onClick={() => {
                        const value = {
                          maPhong: Number(params.roomId),
                          ngayDen: inputValue1,
                          ngayDi: inputValue2,
                          soLuongKhach: people,
                          maNguoiDung: Number(idUser),
                        };
                        bookingDay(value);
                      }}
                    >
                      Đặt phòng
                    </Button>
                    {/* <p className="mt-[20px] text-center">Bạn vẫn chưa bị trừ tiền</p> */}
                  </div>
                  <div className="m-5">
                    <p>Phí dịch vụ: Số người x Giá phòng/ đêm</p>
                    <p>
                      Bạn sử dụng phòng này trong{" "}
                      {differenceDay ? differenceDay : "0"} ngày
                    </p>
                    <p>Số lượng khách: {people ? people : "0"}</p>
                    <hr className="m-10" />
                    <p className="font-600 text-16">
                      Tổng: $
                      {differenceDay
                        ? differenceDay * room?.giaTien * people
                        : "0"}
                    </p>
                  </div>
                </div>
              </Card>
              <p className="mt-[20px] text-center">
                <i className="fa-solid fa-flag"></i> Báo cáo nhà/phòng cho thuê
                này
              </p>
            </div>
          </div>
        </div>
      </div>
      ;
    </Container>
  );
};

const Container = styled.header`
  .header-content {
    max-width: var(--max-width);
    margin: auto;
    padding: 10px 60px;
  }
`;
