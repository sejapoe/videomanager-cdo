import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../api";
import {ActivateUserReqDto, TokenUserResDto} from "../../../api/Api.ts";
import {authKeys} from "./authApi.ts";

type UseActivateUserMutation = UseMutationOptions<
    HttpResponse<TokenUserResDto, unknown>,
    GenericErrorModel,
    ActivateUserReqDto,
    unknown
>

type UseActivateUserOptions = Omit<UseActivateUserMutation, 'mutationFn' | 'mutationKey'>

export const useActivateUser = (options?: UseActivateUserOptions) =>
    useMutation({
        mutationKey: authKeys.mutation.activate(),
        mutationFn: (activation: ActivateUserReqDto) => {
            return api.activate(activation)
        },
        ...options
    })
