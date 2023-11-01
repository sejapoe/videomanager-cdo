import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../api";
import {ActivateUserReqDto, TokenUserResDto} from "../../../api/Api.ts";
import {authKeys} from "./authApi.ts";

type UseActivateUserMutation = UseMutationOptions<
    HttpResponse<TokenUserResDto, unknown>,
    GenericErrorModel,
    ActivateUserReqDto
>

type UseActivateUserOptions = Omit<UseActivateUserMutation, 'mutationFn' | 'mutationKey'>

export const useActivateUser = (options?: UseActivateUserOptions) =>
    useMutation(
        authKeys.mutation.activate(),
        (activation: ActivateUserReqDto) => {
            return api.activate(activation)
        },
        options
    )
