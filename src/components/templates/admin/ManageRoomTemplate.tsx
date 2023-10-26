import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import {
  deleteRoomByIdThunk,
  getListRoomThunk,
  getRoomByIdThunk,
  postRoomThunk,
  updateRoomByIdThunk,
} from "store/room";
import { Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button, Input } from "components";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { RoomSchema, RoomSchemaType } from "schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "utils";
import { toast } from "react-toastify";
import { useQueryUrl } from "hooks";
export const ManageRoomTemplate = () => {
  const [queryUrl, setQueryUrl] = useQueryUrl()
  const { listRoom, room } = useSelector((state: RootState) => state.room);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RoomSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RoomSchema),
  });
  const onSubmit: SubmitHandler<RoomSchemaType> = async (value) => {
    try {
      await dispatch(postRoomThunk(value));
      reset({
        id: 0,
        tenPhong: '',
        moTa: '',
        khach: 0,
        giaTien: 0,
        hinhAnh: ''
      })
      toast.success("Thêm phòng thành công");
    } catch (error) {
      handleError(error);
    }
  };
  const onUpdate: SubmitHandler<RoomSchemaType> = async (value) => {
    try {
      console.log(value)
      const payload = {
        id: Number(queryUrl.id),
        dataPayLoad: {
          ...value,
          id: Number(queryUrl.id)
        }
      }
      await dispatch(updateRoomByIdThunk(payload))
      reset({
        id: 0,
        tenPhong: '',
        moTa: '',
        khach: 0,
        giaTien: 0,
        hinhAnh: ''
      })
      toast.success('Cập nhật thành công')
    } catch (error) {
      handleError(error)
    }
  }
  const onError: SubmitErrorHandler<RoomSchemaType> = (value) => {
    console.log(value);
  };
  // Table
  type DataType = {
    id?: number;
    giaTien?: number;
    tenPhong?: string;
    khach?: number;
    hinhAnh?: string;
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
      render: (image) => <img width="500px" src={image} alt="" />,
    },
    {
      title: "Tên phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (text) => <p style={{ width: "200px" }}>{text}</p>,
    },
    {
      title: "Giá/ Ngày",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (text) => <p style={{ width: "30px" }}>{text} $</p>,
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
          <Button
            onClick={() => {
              setQueryUrl({
                id: String(record.id) || undefined
              })
              dispatch(getRoomByIdThunk(record.id))
                .unwrap()
                .then(() => {
                  setIsModal2Open(true);
                });
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteRoomByIdThunk(record.id))
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

  const data: DataType[] = listRoom?.map((room) => {
    return {
      id: room.id,
      giaTien: room.giaTien,
      tenPhong: room.tenPhong,
      khach: room.khach,
      hinhAnh: room.hinhAnh,
    };
  });
  // Modal
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListRoomThunk());
  }, [dispatch]);

  useEffect(() => {
    reset(room);
  }, [reset, room]);
  return (
    <div>

      {/* Button Room+ */}
      <div className="m-5">
        <Button type="primary" onClick={() => setIsModal1Open(true)}>
          Thêm phòng
        </Button>
      </div>
      {/* Modal Room*/}
      <Modal
        title="Thêm Phòng"
        open={isModal1Open}
        onCancel={() => {
          reset({
            id: 0,
            tenPhong: '',
            moTa: '',
            khach: 0,
            giaTien: 0,
            hinhAnh: ''
          })
          setIsModal1Open(false);
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            label="ID"
            name="id"
            placeholder="Nhập ID"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.id?.message}
          />
          <Input
            label="Tên phòng"
            name="tenPhong"
            placeholder="Nhập tên phòng"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.tenPhong?.message}
          />
          <Input
            label="Mô tả"
            name="moTa"
            placeholder="Nhập mô tả"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.moTa?.message}
          />
          <Input
            label="Giá tiền"
            placeholder="Nhập giá tiền"
            name="giaTien"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.giaTien?.message}
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
          <Input
            label="Khách"
            placeholder="Nhập số khách"
            type="text"
            name="khach"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.khach?.message}
          />
          <div className="text-right">
            <Button htmlType="submit" type="primary" className="mt-5">
              Đăng Ký
            </Button>
          </div>
        </form>
      </Modal>
      {/* Modal Thông tin Room */}
      <Modal
        title="Thông tin vị trí"
        open={isModal2Open}
        onCancel={() => {
          setQueryUrl({
            id: undefined
          })
          reset({
            id: 0,
            tenPhong: '',
            moTa: '',
            khach: 0,
            giaTien: 0,
            hinhAnh: ''
          })
          setIsModal2Open(false);
        }}
        okText="Cập Nhật"
        okButtonProps={{
          htmlType: "submit",
          form: 'updateForm'
        }}
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
            errors={errors?.id?.message}
          />
          <Input
            label="Tên phòng"
            name="tenPhong"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.tenPhong?.message}
          />
          <Input
            label="Mô tả"
            name="moTa"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.moTa?.message}
          />
          <Input
            label="Giá tiền"
            name="giaTien"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.giaTien?.message}
          />
          <Input
            label="Số lượng khách"
            name="khach"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.khach?.message}
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
      {/* Show UI listRoom */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
