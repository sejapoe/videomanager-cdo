import type {HttpResponse, RequestParams,} from './Api.ts'
import {Api, ContentType, ProblemDetailDto} from "./Api.ts";

type GenericErrorModel = HttpResponse<unknown, ProblemDetailDto>

const api = new Api<string>({
    baseUrl: import.meta.env.VITE_SERVER_URL, // "http://localhost:8080"
    baseApiParams: {
        headers: {
            'Content-Type': ContentType.Json
        },
        format: "json"
    },
    securityWorker: (token) => {
        return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
    }
})

export default api.api
export const apiProvider = api
export type {
    HttpResponse,
    RequestParams,
    GenericErrorModel
}