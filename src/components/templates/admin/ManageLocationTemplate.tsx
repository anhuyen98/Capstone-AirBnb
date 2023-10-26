import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import {
  deleteLocationByIdThunk,
  getListLocationThunk,
  getLocationIdThunk,
  postLocationThunk,
  updateLocationByIdThunk,
} from "store/location";
import { Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { handleError } from "utils";
import { Button, Input } from "components";
import { LocationSchema, LocationSchemaType } from "schema/LocationSchema";
import { useQueryUrl } from "hooks";
export const ManageLocationTemplate = () => {
  const { listLocation, location } = useSelector(
    (state: RootState) => state.location
  );
  const [queryUrl, setQueryUrl] = useQueryUrl()
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<LocationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LocationSchema),
  });
  const onSubmit: SubmitHandler<LocationSchemaType> = async (value) => {
    try {
      await dispatch(postLocationThunk(value));
      reset({
        hinhAnh: "",
        quocGia: "",
        tenViTri: "",
        tinhThanh: "",
      });
      toast.success("Thêm mới thành công");
    } catch (error) {
      handleError(error, "Thêm mới thất bại");
    }
  };
  const onUpdate: SubmitHandler<LocationSchemaType> = async (value) => {
    try {
      const payload = {
        id: Number(queryUrl.id),
        dataPayLoad: {
          ...value,
          id: Number(queryUrl.id)
        }
      }
      await dispatch(updateLocationByIdThunk(payload))
      reset({
        hinhAnh: "",
        quocGia: "",
        tenViTri: "",
        tinhThanh: "",
      });
      toast.success('Cập nhật thành công')
    } catch (error) {
      handleError(error)
    }
  }
  // Table
  type DataType = {
    id?: number;
    hinhAnh?: string;
    tenViTri?: string;
    tinhThanh?: string;
    quocGia?: string;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
          <Button
            onClick={() => {
              setQueryUrl({
                id: String(record.id) || undefined
              })
              dispatch(getLocationIdThunk(record.id))
                .unwrap()
                .then(() => {
                  setIsModal2Open(true);
                })
                .catch(() => {
                  console.log("Có lỗi");
                });
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteLocationByIdThunk(record.id))
                .unwrap()
                .then(() => {
                  toast.success("Xóa thành công");
                })
                .catch((error) => {
                  handleError(error, "Xóa thất bại");
                });
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = listLocation?.map((location) => {
    return {
      id: location.id,
      hinhAnh: location.hinhAnh,
      tenViTri: location.tenViTri,
      tinhThanh: location.tinhThanh,
      quocGia: location.quocGia,
    };
  });
  // Modal
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  useEffect(() => {
    dispatch(getListLocationThunk());
  }, [dispatch]);

  useEffect(() => {
    reset(location);
  }, [location, reset]);
  return (
    <div>
      {/* Button VịTrí+ */}
      <div className="m-5">
        <Button type="primary" onClick={() => setIsModal1Open(true)}>
          Thêm vị trí
        </Button>
      </div>
      {/* Modal VịTrí*/}
      <Modal
        title="Thêm Vị Trí"
        open={isModal1Open}
        onCancel={() => {
          setIsModal1Open(false);
          reset({
            hinhAnh: "",
            quocGia: "",
            tenViTri: "",
            tinhThanh: "",
          });
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
      {/* Modal Thông tin vị trí */}
      <Modal
        title="Thông tin vị trí"
        open={isModal2Open}
        onCancel={() => {
          setQueryUrl({
            id: undefined
          })
          setIsModal2Open(false);
          reset({
            hinhAnh: "",
            quocGia: "",
            tenViTri: "",
            tinhThanh: "",
          });
        }}
        okButtonProps={{
          htmlType: "submit",
          form: 'updateForm'
        }}
        okText="Cập Nhật"
        cancelText="Hủy"
        footer={(_, { OkBtn, CancelBtn }) => (
          <div>
            <OkBtn />
            <CancelBtn />
          </div>
        )}
      >
        <form id="updateForm" className="my-5" onSubmit={handleSubmit(onUpdate)}>
          <Input
            label="ID"
            name="id"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white disabled:"
            register={register}
          />
          <Input
            label="Tên vị trí"
            name="tenViTri"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.tenViTri?.message}
          />            
          <Input
            label="Tỉnh thành"
            name="tinhThanh"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.tinhThanh?.message}
          />
          <Input
            label="Quốc gia"
            name="quocGia"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.quocGia?.message}
          />
          <Input
            label="Hình ảnh"
            name="hinhAnh"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.hinhAnh?.message}
          />
        </form>
      </Modal>
      {/* Show UI listLocation */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
