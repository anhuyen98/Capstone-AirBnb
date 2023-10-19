import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import qs from 'qs'

export const useQueryUrl = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, ] = useSearchParams()
    const queryParams = Object.fromEntries(searchParams)
    const setQueryParams = (params) => {
        const queryString = qs.stringify(params, {
            addQueryPrefix: true
        })
        navigate(location.pathname + queryString)
    }
    return [queryParams, setQueryParams]
}