import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../api";
import {LoginReqDto, TokenUserResDto} from "../../../api/Api.ts";
import {sessionKeys} from "./authApi.ts";

type UseLoginUserMutation = UseMutationOptions<
    HttpResponse<TokenUserResDto, unknown>,
    GenericErrorModel,
    LoginReqDto,
    unknown
>

type UseLoginUserOptions = Omit<UseLoginUserMutation, 'mutationFn' | 'mutationKey'>

export const useLoginUser = (options?: UseLoginUserOptions) =>
    useMutation({
        mutationKey: sessionKeys.mutation.login(),
        mutationFn: (user: LoginReqDto) => {
            console.log(user)
            return api.login(user);
        },
        ...options,
    } as UseLoginUserOptions)