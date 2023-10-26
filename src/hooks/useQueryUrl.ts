import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import qs from 'qs'

type QueryParams = Record<string, string>

type SetQueryParams = (params: Record<string, string>) => void

export const useQueryUrl = (): [QueryParams, SetQueryParams] => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, ] = useSearchParams()
    const queryParams = Object.fromEntries(searchParams)
    const setQueryParams = (params: Record<string, string>) => {
        const queryString = qs.stringify(params, {
            addQueryPrefix: true
        })
        navigate(location.pathname + queryString)
    }
    return [queryParams, setQueryParams]
}