import { format, parseISO } from "date-fns"

export const fomatDay = (argument: string) => {
  return format(parseISO(argument), 'dd/MM/yyyy')
}
