import type {HttpResponse, RequestParams,} from './Api.ts'
import {Api, ContentType, ProblemDetailDto} from "./Api.ts";

type GenericErrorModel = HttpResponse<unknown, ProblemDetailDto>

// const timeoutFetch = (...args: Parameters<typeof fetch>) => {
//     return new Promise<Response>((resolve) => {
//         setTimeout(() => {
//             resolve(fetch(...args));
//         }, 500);
//     });
// };

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
    },
    // customFetch: timeoutFetch
})

export default api.api
export const apiProvider = api
export type {
    HttpResponse,
    RequestParams,
    GenericErrorModel
}