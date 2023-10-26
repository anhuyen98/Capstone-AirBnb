import z from "zod";

const myError: z.ZodErrorMap = (issue, _ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { message: " Vui lòng nhập đúng định dạng YYYY/MM/DD hoặc YYYY-MM-DD" };
  }
  return { message: _ctx.defaultError };
};
z.setErrorMap(myError);

export const BookingSchema = z.object({
  id: z.coerce.number().min(4, "Vui lòng nhập tối thiểu 4 ký số"),
  maPhong: z.coerce.number().min(4, "Vui lòng nhập tối thiểu 4 ký số"),
  ngayDen: z
    .string()
    .nonempty("Vui lòng nhập trường này")
    .pipe(z.coerce.date({ errorMap: myError })),
  ngayDi: z
    .string()
    .nonempty("Vui lòng nhập trường này")
    .pipe(z.coerce.date({ errorMap: myError })),
  soLuongKhach: z.coerce
    .number()
    .gt(0, "Vui lòng nhập số lượng khách nhiều hơn 0"),
});

export type BookingSchemaType = z.infer<typeof BookingSchema>;
