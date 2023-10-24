import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListRoomThunk } from "store/room";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
export const ManageRoomTemplate = () => {
  const { listRoom } = useSelector((state: RootState) => state.room);

  // Table
  type DataType = {
    key?: number;
    giaTien?: number;
    tenPhong?: string;
    khach?: number;
    hinhAnh?: string;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (image) => <img width='500px' src={image} alt="" />,
    },
    {
      title: "Tên phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (text) => <p style={{width: '200px'}}>{text}</p>,
    },
    {
      title: "Giá/ Ngày",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (text) => <p style={{width: '30px'}}>{text} $</p>,
    },
    {
      title: "Số lượng khách",
      dataIndex: "khach",
      key: "khach",
      render: (text) => <p>{text} người</p>,
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.key}</a>
          <a>Chỉnh sửa</a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = listRoom?.map((room) => {
    return {
      key: room.id,
      giaTien: room.giaTien,
      tenPhong: room.tenPhong,
      khach: room.khach,
      hinhAnh: room.hinhAnh,
    };
  });

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getListRoomThunk())
  }, [dispatch])
  return (
    <div>
      ManageRoomTemplate
      {/* Show UI listRoom */}
      <Table columns={columns} dataSource={data} />
      
      {/* {listRoom?.map((room) => {
        return (
          <div>
            <span className="mr-5">{room.id}</span>
            <span className="mr-5">{room.giaTien}$</span>
            <span className="mr-5">{room.tenPhong}</span>
            <span className="mr-5">{room.khach}</span>
            <img src={room.hinhAnh} className="w-[400px]" />
          </div>
        );
      })} */}
    </div>
  );
}
