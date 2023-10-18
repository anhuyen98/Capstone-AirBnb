import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { toast } from "react-toastify";
import { authServices } from "services";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { Input } from "components";
import { handleError } from "utils";

export const RegisterTemplate = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (value) => {
    try {
      console.log({ value });
      await authServices.register(value);
      toast.success("Bạn đã đăng ký thành công");
      navigate(PATH.login);
    } catch (err) {
      handleError(err, 'Đăng ký thất bại')
      handleError(err)
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-[#020a17]  bg-[#f0b75c]/80 py-[20px] px-[50px] rounded-10"
    >
      <h2 className="text-30 font-600">Đăng Ký</h2>
      <Input
        type="text"
        name="name"
        label="Tài khoản"
        id="name"
        placeholder="Nhập tài khoản"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.name?.message}
      />
      <Input
        type="text"
        name="password"
        label="Mật khẩu"
        id="password"
        placeholder="Nhập mật khẩu"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.password?.message}
      />
      <Input
        type="text"
        name="email"
        label="Email"
        id="email"
        placeholder="Nhập email"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.email?.message}
      />
      <Input
        type="text"
        name="phone"
        label="Số điện thoại"
        id="phone"
        placeholder="Nhập sdt"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.phone?.message}
      />
      <Input
        type="text"
        name="birthday"
        label="Ngày/ tháng/ năm"
        id="birthday"
        placeholder="Nhập ngày/ tháng/ năm"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.birthday?.message}
      />
      <Input
        name="gender"
        label="Giới tính"
        id="gender"
        type="checkbox"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.gender?.message}
      />
      <Input
        label="Chức vụ"
        name="role"
        type="text"
        id="role"
        placeholder="Nhập tài khoản"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.role?.message}
      />
      <button className="mb-10 mt-[20px] py-[10px] w-full border bg-[#020a17] rounded-6 text-[#ecf6a2]">
        Đăng Ký
      </button>
    </form>
  );
};
