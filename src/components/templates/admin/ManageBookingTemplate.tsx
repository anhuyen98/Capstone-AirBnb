import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListBookingThunk } from "store/booking";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
export const ManageBookingTemplate = () => {
  const { listBooking } = useSelector((state: RootState) => state.booking);

  // Table
  type DataType = {
    key?: number;
    maPhong?: number;
    ngayDen?: string;
    ngayDi?: string;
    soLuongKhach?: number;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Số lượng khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
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

  const data: DataType[] = listBooking?.map((booking) => {
    return {
      key: booking.id,
      maPhong: booking.maPhong,
      ngayDen: booking.ngayDen,
      ngayDi: booking.ngayDi,
      soLuongKhach: booking.soLuongKhach,
    };
  });

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getListBookingThunk())
  }, [dispatch])
  return (
    <div>
      ManageBookingTemplate

      {/* Show UI listBooking */}
      <Table columns={columns} dataSource={data} />

      {/* {listBooking?.map((booking) => {
        return (
          <div>
            <span className="mr-5">{booking.id}</span>
            <span className="mr-5">{booking.maPhong}</span>
            <span className="mr-5">{booking.ngayDen}</span>
            <span className="mr-5">{booking.ngayDi}</span>
            <span className="mr-5">{booking.soLuongKhach}</span>
          </div>
        );
      })} */}
    </div>
  );
}
