import {Request} from "../../../common/requests/model";
import {CreateRequestReqDto, HttpResponse, RequestResDto} from "../../../../api/Api.ts";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {adminKey} from "../../api";


export function mapRequest(requestDto: RequestResDto): Request {
    return requestDto
}

export const requestsKeys = {
    requests: {
        root: [...adminKey, 'requests']
    },

    mutation: {
        create: () => [...requestsKeys.requests.root, 'create']
    }
}

type UseCreateRequestMutation = UseMutationOptions<
    HttpResponse<RequestResDto, unknown>,
    GenericErrorModel,
    CreateRequestReqDto
>

type UseCreateRequestOptions = Omit<UseCreateRequestMutation, 'mutationFn' | 'mutationKey'>

export const useCreateRequest = (options?: UseCreateRequestOptions) =>
    useMutation(
        requestsKeys.mutation.create(),
        (useCreateRequest: CreateRequestReqDto) => {
            return api.createRequest(useCreateRequest)
        },
        options
    )