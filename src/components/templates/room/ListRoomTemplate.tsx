import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { useEffect } from "react";
import { getListRoomByLocalThunk } from "store/room";
import { Card } from "antd";
import styled from "styled-components";
import { Tag } from "components";
import { getListLocationThunk } from "store/location";
const { Meta } = Card;

export const ListRoomTemplate = () => {
  const { listRoomByLocal } = useSelector((state: RootState) => state.room);
  let { listLocation } = useSelector((state: RootState) => state.location);
  const dispatch = useAppDispatch();
  const params = useParams();
  if (listLocation) {
    listLocation = listLocation?.filter(
      (location) => location.id === Number(params.roomLocalId)
    );
  }
  useEffect(() => {
    dispatch(getListRoomByLocalThunk(Number(params.roomLocalId)));
    dispatch(getListLocationThunk());
  }, [dispatch, params]);

  return (
    <ListContainer className="grid grid-cols-12">
      <div className="col-start-0 col-span-7">
        <div className="ml-[50px] my-[20px]">
          <span className="opacity-60 text-12">
            Có {listRoomByLocal?.length} chỗ ở tại{" "}
            {listLocation
              ? listLocation?.map((local) => {
                  return local.tenViTri;
                })
              : "..."}
          </span>
          <h3>Chỗ ở tại khu vực đã chọn</h3>
          <div className="tag">
            <Tag color="red">Loại nơi ở</Tag>
            <Tag color="gold">Giá</Tag>
            <Tag color="green">Đặt ngay</Tag>
            <Tag color="cyan">Phòng và phòng ngủ</Tag>
            <Tag color="purple">Bộ lọc khác</Tag>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-6">
          {listRoomByLocal?.map((room) => {
            return (
              <div className="col-span-3 card my-5" key={room.id}>
                <Card
                  hoverable
                  style={{ width: 400 }}
                  cover={<img alt="example" src={room.hinhAnh} />}
                  onClick={() => {
                    console.log(room.id)
                  }}
                >
                  <div className="text-12 opacity-60 mb-4">
                    Toàn bộ căn hộ dịch vụ tại{" "}
                    {listLocation
                      ? listLocation?.map((local) => {
                          return local.tenViTri;
                        })
                      : "..."}
                  </div>
                  <Meta className="text-ellipsis" title={room.tenPhong} />
                  <hr className="my-10" />
                  <div className="w-3/4 text-14 text-slate-400">
                    {room.khach ? `${room.khach} khách` : ""} · Phòng studio
                    {room.phongNgu ? `· ${room.phongNgu} Phòng ngủ ` : ""}
                    {room.phongTam ? `· ${room.phongTam} Phòng tắm ` : ""}
                    {room.giuong ? `· ${room.giuong} Giường ` : ""}
                    {room.bep ? "· Bếp " : ""}
                    {room.hoBoi ? "· Hồ bơi" : ""}
                    {room.wifi ? "· Wifi " : ""}
                    {room.tivi ? "· Tivi " : ""}
                    {room.doXe ? "· Đỗ xe " : ""}
                    {room.dieuHoa ? "· Điều hòa " : ""}
                    {room.mayGiat ? "· Máy giặt " : ""}
                    {room.banLa ? "· Bàn là " : ""}
                    {room.banUi ? "· Bàn ủi." : ""}
                  </div>
                  <div className="text-right mt-10 tagCost">
                    <Tag color="#ff0000">${room.giaTien * 30} / tháng</Tag>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-start-8 col-span-5 mt-[50px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.765283361765!2d106.6777199938648!3d10.775218526283942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1698661842712!5m2!1svi!2s"
          width="600"
          style={{border:"0", height: "100%"}}
          // allowfullscreen=''
          loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Outlet />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  .card {
    .ant-card {
      /* z-index: -1; */
      margin: auto;
    }
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .tag {
    .ant-tag {
      /* z-index: -1; */
      font-size: 12px;
      font-weight: 600;
    }
  }
  .tagCost {
    .ant-tag {
      font-size: 12px;
      padding: 5px 10px;
      font-weight: 700;
    }
  }
`;
