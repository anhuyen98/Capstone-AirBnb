import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z.string().nonempty('Vui lòng nhập tài khoản').min(6, 'Nhập tối thiểu 6 ký tự').max(20, 'Nhập tối đa 20 ký tự'),
    password: z.string().nonempty('Vui lòng nhập mật khẩu'),
    email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    phone: z.string().nonempty('Vui lòng nhập số điện thoại'),
    birthday: z.string().nonempty('Vui lòng nhập ngày/ tháng/ năm sinh'),
    gender: z.boolean(),
    role: z.string().nonempty('Vui lòng nhập chức vụ'),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>