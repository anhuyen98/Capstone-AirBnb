import axios, { AxiosHeaders, CreateAxiosDefaults } from "axios";

const tokenCybersoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NyIsIkhldEhhblN0cmluZyI6IjE1LzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNzk1NTIwMDAwMCIsIm5iZiI6MTY3ODk4NjAwMCwiZXhwIjoxNzA4MTAyODAwfQ.YGLcwOu11pM9sD9C2a0dia7O_6vvsYwkCoo1sqcbCFM'

export const apiInstance = (config?: CreateAxiosDefaults) => {
    const api = axios.create(config)
    api.interceptors.request.use((config) => {
        return {
            ...config,
            headers: {
                tokenCybersoft,
            } as unknown as AxiosHeaders
        }
    })
    return api
}