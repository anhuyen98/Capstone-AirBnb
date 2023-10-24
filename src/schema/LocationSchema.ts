import z from 'zod'

export const LocationSchema = z.object({
    id: z.number(),
    tenViTri: z.string().nonempty('Vui lòng nhập trường này'),
    tinhThanh: z.string().nonempty('Vui lòng nhập trường này'),
    quocGia: z.string().nonempty('Vui lòng nhập trường này'),
    hinhAnh: z.string().nonempty('Vui lòng nhập trường này'),
})

export type LocationSchemaType = z.infer<typeof LocationSchema>