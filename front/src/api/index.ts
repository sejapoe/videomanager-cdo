import type {HttpResponse, RequestParams,} from './Api.ts'
import {Api, ContentType, ProblemDetailDto} from "./Api.ts";

type GenericErrorModel = HttpResponse<unknown, ProblemDetailDto>

const api = new Api<string>({
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