import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "schema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "components";
import { handleError } from "utils";
import { RootState, useAppDispatch } from "store";
import { authLoginThunk } from "store/auth";
import { useSelector } from 'react-redux'

export const LoginTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isFetchingLogin } = useSelector((state: RootState) => state.auth)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (value) => {
    dispatch(authLoginThunk(value))
      .unwrap()
      .then(() => {
        toast.success("Đăng nhập thành công");
        navigate('/');
      })
      .catch((err) => {
        handleError(err);
      });
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

      <div className="text-right">
        <Button type="primary" loading={isFetchingLogin} danger htmlType="submit" className="my-[20px]">
          Đăng Nhập
        </Button>
      </div>
    </form>
  );
};
