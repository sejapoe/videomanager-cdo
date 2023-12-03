import type {HttpResponse, RequestParams,} from './Api.ts'
import {Api, ContentType, ProblemDetailDto} from "./Api.ts";
import {addUser, deleteToken, sessionStore} from "../features/auth/authModel.ts";

type GenericErrorModel = HttpResponse<unknown, ProblemDetailDto>

const refreshingFetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
    const response = await fetch(...args);
    const user = sessionStore.getState().user

    // If Unauthorized
    if (!response.url.includes("/api/auth") && response.status === 403 && user) {
        try {
            const refreshToken = await api.api.refresh({
                token: user.refreshToken
            });

            addUser({
                info: refreshToken.data.userInfo,
                accessToken: refreshToken.data.accessToken,
                refreshToken: refreshToken.data.refreshToken
            })

            const newAccessToken = refreshToken.data.accessToken;

            // Now set this new token to your headers and re-run the request.
            const [url, options] = args;
            const newOptions = {
                ...options,
                headers: {
                    ...options?.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                },
            };
            return fetch(url, newOptions);
        } catch (e) {
            deleteToken()
            return response
        }
    }

    return response;
};

const api = new Api<string>({
    baseUrl: import.meta.env.VITE_SERVER_URL, // "http://localhost:8080"
    baseApiParams: {
        headers: {
            'Content-Type': ContentType.Json
        },
        format: "json",
        mode: "cors"
    },
    securityWorker: (token) => {
        console.log(token)
        return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
    },
    customFetch: refreshingFetch
})

export default api.api
export const apiProvider = api
export type {
    HttpResponse,
    RequestParams,
    GenericErrorModel
}