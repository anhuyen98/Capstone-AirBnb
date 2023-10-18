import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "schema";
import { toast } from "react-toastify";
import { authServices } from "services";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { Input } from "components";
import { handleError } from "utils";
export const LoginTemplate = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchemaType> = async (value) => {
    try {
      console.log({ value });
      await authServices.login(value);
      toast.success("Bạn đã đăng ký thành công");
      navigate(PATH.register);
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
      <h2 className="text-30 font-600">Đăng Nhập</h2>
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
        name="password"
        label="Mật khẩu"
        id="password"
        placeholder="Nhập mật khẩu"
        className="mt-4 p-10 w-full bg-[#ecf6a2] rounded-6"
        register={register}
        errors={errors?.password?.message}
      />
      
      
      <button className="mb-10 mt-[20px] py-[10px] w-full border bg-[#020a17] rounded-6 text-[#ecf6a2]">
        Đăng Nhập
      </button>
    </form>
  )
}
