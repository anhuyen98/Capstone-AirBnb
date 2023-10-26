import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import {
  deleteBookingByIdThunk,
  getBookingByIdThunk,
  getListBookingThunk,
  postBookingThunk,
  updateBookingByIdThunk,
} from "store/booking";
import { Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Button, Input } from "components";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema, BookingSchemaType } from "schema/BookingSchema";
import { handleError } from "utils";
import { toast } from "react-toastify";
import { fomatDay } from "utils/fomatDay";
import { useQueryUrl } from "hooks";
export const ManageBookingTemplate = () => {
  const { listBooking, booking } = useSelector(
    (state: RootState) => state.booking
  );
  const [queryUrl, setQueryUrl] = useQueryUrl()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    mode: "onChange",
    resolver: zodResolver(BookingSchema),
  });
  const onSubmit: SubmitHandler<BookingSchemaType> = async (value) => {
    try {
      console.log(value);
      await dispatch(postBookingThunk(value));
      reset({
        id: 0,
        maPhong: 0,
        ngayDen: new Date(),
        ngayDi: new Date(),
        soLuongKhach: 0,
      });
      toast.success("Đặt phòng thành công");
    } catch (error) {
      handleError(error, "Đặt phòng thất bại");
    }
  };
  const onUpdate: SubmitHandler<BookingSchemaType> = async (value) => {
    try {
      const payload = {
        id: Number(queryUrl.id),
        dataPayLoad: {
          ...value,
          id: Number(queryUrl.id)
        }
      }
      await dispatch(updateBookingByIdThunk(payload))
      reset({
        id: 0,
        maPhong: 0,
        ngayDen: new Date(),
        ngayDi: new Date(),
        soLuongKhach: 0,
      });
      toast.success('Cập nhật thành công')
    } catch (error) {
      handleError(error)
    }
  }
  const onError: SubmitErrorHandler<BookingSchemaType> = (value) => {
    console.log(value);
  };
  // Table
  type DataType = {
    id?: number;
    maPhong?: number;
    ngayDen?: string;
    ngayDi?: string;
    soLuongKhach?: number;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
          <Button
            onClick={() => {
              setQueryUrl({
                id: String(record.id) || undefined
              })
              dispatch(getBookingByIdThunk(record.id))
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
              dispatch(deleteBookingByIdThunk(record.id))
                .unwrap()
                .then(() => {
                  toast.success("Xóa thành công");
                })
                .catch((errors) => {
                  handleError(errors);
                });
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = listBooking?.map((booking) => {
    return {
      id: booking.id,
      maPhong: booking.maPhong,
      ngayDen: fomatDay(booking.ngayDen.toString()),
      ngayDi: fomatDay(booking.ngayDi.toString()),
      soLuongKhach: booking.soLuongKhach,
    };
  });
  // Modal
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListBookingThunk());
  }, [dispatch]);
  useEffect(() => {
    reset(booking);
  }, [reset, booking]);
  return (
    <div>
      {/* Button Room+ */}
      <div className="m-5">
        <Button type="primary" onClick={() => setIsModal1Open(true)}>
          Đặt phòng mới
        </Button>
      </div>
      {/* Modal đặt phòng */}
      <Modal
        title="Thêm Phòng"
        open={isModal1Open}
        onCancel={() => {
          reset({
            id: 0,
            maPhong: 0,
            ngayDen: new Date(),
            ngayDi: new Date(),
            soLuongKhach: 0,
          });
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
            label="Mã phòng"
            name="maPhong"
            placeholder="Nhập mã phòng"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.maPhong?.message}
          />
          <Input
            label="Ngày đến"
            name="ngayDen"
            placeholder="Nhập ngày đến"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.ngayDen?.message}
          />
          <Input
            label="Ngày đi"
            placeholder="Nhập ngày đi"
            name="ngayDi"
            type="text"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.ngayDi?.message}
          />
          <Input
            label="Số lượng khách"
            placeholder="Nhập số lượng khách"
            type="text"
            name="soLuongKhach"
            className="mt-6 p-[10px] border-red-400 border ml-5 rounded-6"
            register={register}
            errors={errors?.soLuongKhach?.message}
          />
          <div className="text-right">
            <Button htmlType="submit" type="primary" className="mt-5">
              Thêm
            </Button>
          </div>
        </form>
      </Modal>
      {/* Modal Thông tin Đặt phòng */}
      <Modal
        title="Thông tin vị trí"
        open={isModal2Open}
        onCancel={() => {
          setQueryUrl({
            id: undefined
          })
          reset({
            id: 0,
            maPhong: 0,
            ngayDen: new Date(),
            ngayDi: new Date(),
            soLuongKhach: 0,
          });
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
            label="Mã phòng"
            name="maPhong"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.maPhong?.message}
          />
          <Input
            label="Ngày đến"
            name="ngayDen"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.ngayDen?.message}
          />
          <Input
            label="Ngày đi"
            name="ngayDi"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.ngayDi?.message}
          />
          <Input
            label="Số lượng khách"
            name="soLuongKhach"
            className="my-[15px] mx-5 py-3 px-4 bg-slate-400 text-white"
            register={register}
            errors={errors?.soLuongKhach?.message}
          />
        </form>
      </Modal>
      {/* Show UI listBooking */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
