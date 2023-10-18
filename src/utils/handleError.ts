import { isAxiosError } from "axios"
import {toast} from 'react-toastify'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error?: any, message?: string) => {
    if (isAxiosError<{content: string}>(error)) {
        toast.error(message || error.response.data.content)
    }
}