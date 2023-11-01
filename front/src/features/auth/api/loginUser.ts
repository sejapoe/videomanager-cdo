import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../api";
import {LoginReqDto, TokenUserResDto} from "../../../api/Api.ts";
import {authKeys} from "./authApi.ts";

type UseLoginUserMutation = UseMutationOptions<
    HttpResponse<TokenUserResDto, unknown>,
    GenericErrorModel,
    LoginReqDto
>

type UseLoginUserOptions = Omit<UseLoginUserMutation, 'mutationFn' | 'mutationKey'>

export const useLoginUser = (options?: UseLoginUserOptions) =>
    useMutation(
        authKeys.mutation.login(),
        (user: LoginReqDto) => {
            return api.login(user);
        },
        options,
    )