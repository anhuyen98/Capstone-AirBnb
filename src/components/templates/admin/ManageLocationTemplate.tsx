import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListLocationThunk } from "store/location";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
export const ManageLocationTemplate = () => {
  const { listLocation } = useSelector((state: RootState) => state.location);

  // Table 
  type DataType = {
    key?: number;
    hinhAnh?: string;
    tenViTri?: string;
    tinhThanh?: string;
    quocGia?: string;
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
      render: (image) => <img width='100px' src={image} alt="" />,
    },
    {
      title: "Vị Trí",
      dataIndex: "tenViTri",
      key: "tenViTri",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
      render: (text) => <p>{text}</p>,
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

  const data: DataType[] = listLocation?.map((location) => {
    return {
      key: location.id,
      hinhAnh: location.hinhAnh,
      tenViTri: location.tenViTri,
      tinhThanh: location.tinhThanh,
      quocGia: location.quocGia,
    };
  });

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getListLocationThunk())
  }, [dispatch])
  return (
    <div>
      ManageLocationTemplate
      {/* Show UI listLocation */}
      <Table columns={columns} dataSource={data} />
      {/* {listLocation?.map((location) => {
        return (
          <div>
            <span className="mr-5">{location.id}</span>
            <span className="mr-5">{location.quocGia}</span>
            <span className="mr-5">{location.tenViTri}</span>
            <span className="mr-5">{location.tinhThanh}</span>
            <img src={location.hinhAnh} className="w-[400px]" />
          </div>
        );
      })} */}
    </div>
  );
}
