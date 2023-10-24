import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z.string().nonempty('Vui lòng nhập tài khoản').min(6, 'Nhập tối thiểu 6 ký tự').max(20, 'Nhập tối đa 20 ký tự'),
    password: z.string().nonempty('Vui lòng nhập mật khẩu'),
    email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    phone: z.string().nonempty('Vui lòng nhập số điện thoại').min(9, 'Vui lòng nhập tối thiểu 9 số').regex(new RegExp('^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$'), 'Vui lòng nhập đúng định dạng số điện thoại'),
    birthday: z.string().nonempty('Vui lòng nhập ngày/ tháng/ năm sinh'),
    gender: z.boolean(),
    role: z.string().nonempty('Vui lòng nhập chức vụ'),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>