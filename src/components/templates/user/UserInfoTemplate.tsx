import { Avatar, Button, Input, Upload } from "components";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { List, Modal, Space } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getUserByIdThunk, updateUserByIdThunk, userActions } from "store/user";
import styled from "styled-components";
import { userServices } from "services";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError, sleep } from "utils";
import { toast } from "react-toastify";
import { getListRoomThunk } from "store/room";
export const UserInfoTemplate = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const params = useParams();
  const { listRoom } = useSelector((state: RootState) => state.room)
  const dispatch = useAppDispatch();

  type DataType = {
    id?: number,
    tenPhong?: string,
    khach?: number,
    phongNgu?: number,
    giuong?: number,
    phongTam?: number,
    moTa?: string,
    giaTien?: number,
    mayGiat?: boolean,
    banLa?: boolean,
    tivi?: boolean,
    dieuHoa?: boolean,
    wifi?: boolean,
    bep?: boolean,
    doXe?: boolean,
    hoBoi?: boolean,
    banUi?: boolean,
    maViTri?: number,
    hinhAnh?: string
  }
  const data: DataType[] = listRoom?.map((room) => ({
    id: room.id,
    tenPhong: room.tenPhong,
    khach: room.khach,
    phongNgu: room.phongNgu,
    giuong: room.giuong,
    phongTam: room.phongTam,
    moTa: room.moTa,
    giaTien: room.giaTien,
    mayGiat: room.mayGiat,
    banLa: room.banLa,
    tivi: room.tivi,
    dieuHoa: room.dieuHoa,
    wifi: room.wifi,
    bep: room.bep,
    doXe: room.doXe,
    hoBoi: room.hoBoi,
    banUi: room.banUi,
    maViTri: room.maViTri,
    hinhAnh: room.hinhAnh
  }));

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const handleUploadAvatar = async ({ file }) => {
    const fd = new FormData();
    fd.append("formFile", file);
    const data = await userServices.uploadAvatar(fd);
    dispatch(userActions.uploadAva(data.data.content));
  };
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const [isModal2Open, setIsModal2Open] = useState(false);
  const onUpdate: SubmitHandler<RegisterSchemaType> = async (value) => {
    try {
      const payload = {
        id: Number(params.userId),
        dataPayLoad: {
          ...value,
          id: Number(params.userId),
        },
      };
      await dispatch(updateUserByIdThunk(payload))
        .unwrap()
        .then(() => {
          toast.success("Cập nhật thành công");
        })
        .catch((err) => {
          handleError(err);
        });
      sleep(1000);
      setIsModal2Open(false);
    } catch (error) {
      handleError(error);
    }
  };
  const onError: SubmitErrorHandler<RegisterSchemaType> = async (value) => {
    console.log(value);
  };
  useEffect(() => {
    reset(user);
  }, [user, reset]);
  useEffect(() => {
    dispatch(getUserByIdThunk(Number(params.userId)))
    dispatch(getListRoomThunk())
  },[dispatch, params])
  return (
    <ContainerUserInfo>
      <div className="w-3/4 m-auto grid grid-cols-9 gap-5">
        <div className="col-start-1 col-span-3 ">
          <div className="p-5 border border-slate-500 rounded-[25px]">
            <div className="avatar flex flex-col items-center justify-between h-48 my-5">
              <Avatar size={150} src={user?.avatar} />
              <Upload showUploadList={false} customRequest={handleUploadAvatar}>
                <Button className="btnCNA" type="link" onClick={() => {}}>
                  Cập nhật ảnh
                </Button>
              </Upload>
            </div>
            <div className="authenticator">
              <div>
                <i className="fa-solid fa-user-check text-green-500 text-28 pl-10"></i>
                <h6>Xác minh danh tính</h6>
                <p>
                  Xác thực danh tính của bạn với huy hiệu xác minh danh tính
                </p>
                <Button type="primary">Nhận huy hiệu</Button>
              </div>
              <div>
                <h6>{user?.name} đã xác nhận</h6>
                <p>
                  <i className="fa-solid fa-check mr-4 text-green-500 pl-10"></i>{" "}
                  Địa chỉ email
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-4 col-span-6 p-5">
          <div className="bio">
            <h3>Xin chào tôi là {user?.name}</h3>
            <p>Bắt đầu tham gia vào ...</p>
            <Button
              type="dashed"
              danger
              onClick={() => {
                console.log(params.userId);
                dispatch(getUserByIdThunk(Number(params.userId)))
                  .unwrap()
                  .then(() => {
                    setIsModal2Open(true);
                  });
              }}
            >
              Chỉnh sửa hồ sơ
            </Button>
          </div>
          <hr className="border border-stone-300"/>
          <div>
            <h4 className="pl-[25px]">Phòng đã thuê</h4>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText
                      icon={StarOutlined}
                      text="156"
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={LikeOutlined}
                      text="156"
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text="2"
                      key="list-vertical-message"
                    />,
                  ]}
                  extra={
                    <img
                      width={300}
                      alt="..."
                      src={item.hinhAnh}
                    />
                  }
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={item.id} />}
                    title={item.tenPhong}
                    description= {
                      <p className="font-600"> Giá: ${item.giaTien} / ngày</p>
                    }
                  />
                  {item.moTa.substring(0, 100)}. . .
                  <p className="font-600 my-5">
                    Số lượng khách: {item.khach}
                  </p>
                </List.Item>
              )}
            />
          </div>

          <Modal
            title="Thông tin người dùng"
            open={isModal2Open}
            onCancel={() => {
              setIsModal2Open(false);
              reset({
                name: "",
                birthday: "",
                email: "",
                gender: false,
                password: "",
                phone: "",
                role: "",
              });
            }}
            okText="Cập Nhật"
            okButtonProps={{
              htmlType: "submit",
              form: "updateForm",
            }}
            cancelText="Hủy"
            footer={(_, { OkBtn, CancelBtn }) => (
              <div>
                <OkBtn />
                <CancelBtn />
              </div>
            )}
          >
            <form
              id="updateForm"
              className="my-5"
              onSubmit={handleSubmit(onUpdate, onError)}
            >
              <Input
                label="ID"
                name="id"
                className="my-[15px] mx-5 py-3 px-4 pointer-events-none"
                register={register}
              />
              <Input
                type="text"
                label="Tên"
                name="name"
                className="my-[15px] mx-5 py-3 px-4"
                register={register}
                errors={errors?.name?.message}
              />
              <Input
                type="text"
                label="Ngày/ tháng/ năm"
                name="birthday"
                className="my-[15px] mx-5 py-3 px-4"
                register={register}
                errors={errors?.birthday?.message}
              />
              <Input
                type="text"
                label="Email"
                name="email"
                className="my-[15px] mx-5 py-3 px-4"
                register={register}
                errors={errors?.email?.message}
              />
              <Input
                type="text"
                label="Số điện thoại"
                name="phone"
                className="my-[15px] mx-5 py-3 px-4"
                register={register}
                errors={errors?.phone?.message}
              />
              <Input
                type="text"
                label="Mật khẩu"
                name="password"
                className="my-[15px] mx-5 py-3 px-4"
                register={register}
                errors={errors?.password?.message}
              />
              <Input
                type="text"
                label="Chức vụ"
                name="role"
                className="my-[15px] mx-5 py-3 px-4"
                register={register}
                errors={errors?.role?.message}
              />
            </form>
          </Modal>
        </div>
      </div>
    </ContainerUserInfo>
  );
};

export const ContainerUserInfo = styled.div`
  padding-top: 50px;
  .authenticator {
    margin: 30px 15px;
    h6 {
      font-weight: 600;
      font-size: 18px;
      margin: 10px 0;
    }
    Button {
      margin: 10px 0 20px;
    }
  }
  .bio {
    margin-bottom: 30px;
    p {
      color: #8d8d8d;
      font-size: 14px;
      margin: 5px 0 10px;
    }
    h3 {
      font-weight: 700;
      font-size: 25px;
    }
  }
  h4 {
    font-weight: 600;
    font-size: 20px;
    margin: 20px 0 10px;
  }
  div.avatar{
    .ant-avatar-image{
      z-index: -1;
  }

  }
  Button.btnCNA {
    z-index: -1;
  }
`;
