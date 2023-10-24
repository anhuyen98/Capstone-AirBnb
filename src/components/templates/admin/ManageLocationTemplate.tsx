import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getListLocationThunk } from "store/location";
import { Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { handleError } from "utils";
import { Button, Input } from "components";
import { LocationSchema, LocationSchemaType } from "schema/LocationSchema";
import { locationServices } from "services";
export const ManageLocationTemplate = () => {
  const { listLocation } = useSelector((state: RootState) => state.location);
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<LocationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LocationSchema)
  });
  const onSubmit: SubmitHandler<LocationSchemaType> = async (value) => {
    try {
      await locationServices.postLocation(value)
      reset();
      toast.success("Đăng ký thành công");
    } catch (error) {
      handleError(error, "Đăng ký thất bại");
    }
  };
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
      render: (image) => <img width="100px" src={image} alt="" />,
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
  // Modal
  const [isModal1Open, setIsModal1Open] = useState(false);
  // const [isModal2Open, setIsModal2Open] = useState(false);

  useEffect(() => {
    dispatch(getListLocationThunk());
  }, [dispatch]);
  return (
    <div>
      ManageLocationTemplate
      {/* Button QTV+ */}
      <div className="m-5">
        <Button type="primary" onClick={() => setIsModal1Open(true)}>
          Thêm vị trí
        </Button>
      </div>
      {/* Modal QTV+*/}
      <Modal
        title="Thêm quản trị viên"
        open={isModal1Open}
        onCancel={() => {
          setIsModal1Open(false);
          reset();
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="ID"
            name="id"
            placeholder="Nhập id"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.id?.message}
          />
          <Input
            label="Vị trí"
            name="tenViTri"
            placeholder="Nhập vị trí"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.tenViTri?.message}
          />
          <Input
            label="Tỉnh thành"
            name="tinhThanh"
            placeholder="Nhập tỉnh thành"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.tinhThanh?.message}
          />
          <Input
            label="Quốc gia"
            placeholder="Nhập quốc gia"
            name="quocGia"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.quocGia?.message}
          />
          <Input
            label="Hình ảnh"
            placeholder="Nhập hình ảnh"
            type="text"
            name="hinhAnh"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.hinhAnh?.message}
          />
          <div className="text-right">
            <Button htmlType="submit" type="primary" className="mt-5">
              Đăng Ký
            </Button>
          </div>
        </form>
      </Modal>
      {/* Show UI listLocation */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
