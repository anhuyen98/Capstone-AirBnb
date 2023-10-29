import { Button, Input } from "components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import { RootState, useAppDispatch } from "store";
import {
  deleteUserByIdThunk,
  getListUserThunk,
  getUserByIdThunk,
  postUserThunk,
  updateUserByIdThunk,
  userActions,
} from "store/user";
import { Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "utils";
import { useQueryUrl } from "hooks";
export const ManageUserTemplate = () => {
  const dispatch = useAppDispatch();
  const [queryUrl, setQueryUrl] = useQueryUrl();
  const { listUser, user, isEditing } = useSelector(
    (state: RootState) => state.user
  );
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (value) => {
    try {
      await dispatch(postUserThunk(value));
      reset({
        name: "",
        birthday: "",
        email: "",
        gender: false,
        password: "",
        phone: "",
        role: "",
      });
      toast.success("Bạn đã đăng ký thành công");
    } catch (error) {
      handleError(error, "Đăng ký thất bại");
    }
  };
  const onUpdate: SubmitHandler<RegisterSchemaType> = async (value) => {
    try {
      const payload = {
        id: Number(queryUrl.id),
        dataPayLoad: {
          ...value,
          id: Number(queryUrl.id),
        },
      };
      await dispatch(updateUserByIdThunk(payload));
      reset({
        name: "",
        birthday: "",
        email: "",
        gender: false,
        password: "",
        phone: "",
        role: "",
      });
      toast.success("Cập nhật thành công");
    } catch (error) {
      handleError(error);
    }
  };
  const onError: SubmitErrorHandler<RegisterSchemaType> = async (value) => {
    console.log(value);
  };
  // Modal
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  // Table
  type DataType = {
    id?: number;
    avatar?: string;
    birthday?: string;
    email?: string;
    name?: string;
    role?: string;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ngày/ tháng/ năm",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setQueryUrl({
                id: String(record.id) || undefined,
              });
              dispatch(getUserByIdThunk(record.id))
                .unwrap()
                .then(() => {
                  setIsModal2Open(true);
                });
            }}
          >
            Thông tin chi tiết
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteUserByIdThunk(record.id))
                .unwrap()
                .then(() => {
                  toast.success("Xóa thành công");
                })
                .catch((error) => {
                  handleError(error);
                });
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = listUser?.map((user) => ({
    id: user.id,
    avatar: user.avatar,
    birthday: user.birthday,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  // Call API
  useEffect(() => {
    dispatch(getListUserThunk());
  }, [dispatch]);

  // EditForm
  useEffect(() => {
    reset(user);
  }, [user, reset]);

  return (
    <div>
      {/* Button QTV+ */}
      <div className="m-5">
        <Button type="primary" onClick={() => setIsModal1Open(true)}>
          Thêm quản trị viên
        </Button>
      </div>
      {/* Modal QTV+*/}
      <Modal
        title="Thêm quản trị viên"
        open={isModal1Open}
        onCancel={() => {
          setIsModal1Open(false);
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
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Tài khoản"
            name="name"
            placeholder="Nhập tên"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.name?.message}
          />
          <Input
            label="Email"
            name="email"
            placeholder="Nhập email"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.email?.message}
          />
          <Input
            label="Ngày/ tháng/ năm"
            name="birthday"
            placeholder="Nhập ngày/ tháng/ năm"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.birthday?.message}
          />
          <Input
            label="Số điện thoại"
            placeholder="Nhập sđt"
            name="phone"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.phone?.message}
          />
          <Input
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="text"
            name="password"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.password?.message}
          />
          <Input
            label="Giới tính"
            name="gender"
            type="checkbox"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.gender?.message}
          />
          <Input
            label="Chức vụ"
            name="role"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.role?.message}
          />
          <div className="text-right">
            <Button htmlType="submit" type="primary" className="mt-5">
              Đăng Ký
            </Button>
          </div>
        </form>
      </Modal>
      {/* Modal UserInfo */}
      <Modal
        title="Thông tin người dùng"
        open={isModal2Open}
        onCancel={() => {
          setQueryUrl({
            id: undefined,
          });
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
          dispatch(userActions.cancelEditing());
        }}
        okText="Cập Nhật"
        okButtonProps={{
          htmlType: "submit",
          form: "updateForm",
        }}
        cancelText="Hủy"
        footer={(_, { OkBtn, CancelBtn }) => (
          <div>
            <Button
              onClick={() => {
                dispatch(userActions.editingUser());
              }}
            >
              Chỉnh sửa
            </Button>
            <OkBtn />
            <CancelBtn />
          </div>
        )}
      >
        <ContainerForm>
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
              label="Ngày/ tháng/ năm"
              name="birthday"
              className={cn("my-[15px] mx-5 py-3 px-4 pointer-events-none", {
                isEditing: isEditing,
              })}
              register={register}
              errors={errors?.birthday?.message}
            />
            <Input
              type="text"
              label="Email"
              name="email"
              className={cn("my-[15px] mx-5 py-3 px-4 pointer-events-none", {
                isEditing: isEditing,
              })}
              register={register}
              errors={errors?.email?.message}
            />
            <Input
              type="text"
              label="Số điện thoại"
              name="phone"
              className={cn("my-[15px] mx-5 py-3 px-4 pointer-events-none", {
                isEditing: isEditing,
              })}
              register={register}
              errors={errors?.phone?.message}
            />
            <Input
              type="text"
              label="Tên"
              name="name"
              className={cn("my-[15px] mx-5 py-3 px-4 pointer-events-none", {
                isEditing: isEditing,
              })}
              register={register}
              errors={errors?.name?.message}
            />
            <Input
              type="text"
              label="Mật khẩu"
              name="password"
              className={cn("my-[15px] mx-5 py-3 px-4 pointer-events-none", {
                isEditing: isEditing,
              })}
              register={register}
              errors={errors?.password?.message}
            />
            <Input
              type="text"
              label="Chức vụ"
              name="role"
              className={cn("my-[15px] mx-5 py-3 px-4 pointer-events-none", {
                isEditing: isEditing,
              })}
              register={register}
              errors={errors?.role?.message}
            />
            {/* <Button htmlType="submit">Cập nhật nè</Button> */}
          </form>
        </ContainerForm>
      </Modal>
      {/* Show UI list User */}
      <Table rowKey={(record) => record.id} columns={columns} dataSource={data} />
    </div>
  );
};

const ContainerForm = styled.div`
  .isEditing {
    pointer-events: auto;
    border: 1px solid #bdbdbd;
    border-radius: 6px;
  }
`;
