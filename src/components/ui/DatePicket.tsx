import { DatePicker as DatePickerA, DatePickerProps as DatePickerPropsA } from 'antd'

export type DatePickerProps = DatePickerPropsA & {
    //
}

export const DatePicker = (props: DatePickerProps) => {
    return <DatePickerA {...props} />
}