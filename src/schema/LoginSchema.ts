import {z} from 'zod'

export const LoginSchema = z.object({
    email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: z.string().nonempty('Vui lòng nhập mật khẩu')
})

export type LoginSchemaType = z.infer<typeof LoginSchema>