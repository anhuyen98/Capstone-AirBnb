import { Button, Input } from "components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListUserThunk } from "store/user";
import { Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
export const ManageUserTemplate = () => {
  const { listUser } = useSelector((state: RootState) => state.user);

  // Table
  type DataType = {
    key?: number;
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
          <a>Invite {record.name}</a>
          <a>Chỉnh sửa</a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = listUser?.map((user) => {
    return {
      key: user.id,
      avatar: user.avatar,
      birthday: user.birthday,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  });
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Call API
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListUserThunk());
  }, [dispatch]);
  return (
    <div>
      ManageUserTemplate
      {/* Button QTV+ */}
      <div className="m-5">
        <Button type="primary" onClick={showModal}>
          Thêm quản trị viên
        </Button>
      </div>
      {/* Modal QTV+ */}
      <Modal
        title="Thêm quản trị viên"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <Input
            label="Tên"
            placeholder="Nhập tên"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
          />
          <Input
            label="Email"
            placeholder="Nhập email"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
          />
          <Input
            label="Tài khoản"
            placeholder="Nhập tài khoản"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
          />
          <Input
            label="Số điện thoại"
            placeholder="Nhập sđt"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
          />
          <Input
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
          />
        </form>
      </Modal>
      {/* Show UI list User */}
      {/* {listUser?.map((user) => {
        return (
          <div>
            <img src={user.avatar} className="mr-5" />
            <span className="mr-5">{user.birthday}</span>
            <span className="mr-5">{user.email}</span>
            <span className="mr-5">{user.id}</span>
            <span className="mr-5">{user.name}</span>
            <span className="mr-5">{user.phone}</span>
            <span className="mr-5">{user.role}</span>
          </div>
        );
      })} */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
