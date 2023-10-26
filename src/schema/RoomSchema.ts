import z from 'zod'

export const RoomSchema = z.object({
    id: z.coerce.number().min(4, 'Nhập ít nhất 4 ký số'),
    tenPhong: z.string().nonempty('Vui lòng nhập trường này'),
    moTa: z.string().nonempty('Vui lòng nhập trường này'),
    khach: z.coerce.number().gt(0, 'Nhập số khách lớn hơn 0'),
    giaTien: z.coerce.number().gt(0, 'Nhập giá tiền lớn hơn 0'),
    hinhAnh: z.string().nonempty('Vui lòng nhập trường này'),
})

export type RoomSchemaType = z.infer<typeof RoomSchema>