import type {
    ArticleDto,
    CommentDto,
    GenericErrorModelDto,
    HttpResponse,
    LoginUserDto,
    NewArticleDto,
    NewCommentDto,
    NewUserDto,
    ProfileDto,
    RequestParams,
    UpdateArticleDto,
    UpdateUserDto,
    UserDto,
} from './Api.ts'
import {Api, ContentType} from "./Api.ts";

type GenericErrorModel = HttpResponse<unknown, GenericErrorModelDto>

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
    LoginUserDto,
    NewUserDto,
    UserDto,
    UpdateUserDto,
    ProfileDto,
    ArticleDto,
    NewArticleDto,
    UpdateArticleDto,
    CommentDto,
    NewCommentDto,
    GenericErrorModelDto,
    HttpResponse,
    RequestParams,
    GenericErrorModel
}