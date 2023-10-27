import {Request} from "../../../common/requests/model";
import {CreateRequestReqDto, HttpResponse, RequestParams, RequestResDto} from "../../../../api/Api.ts";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";


export function mapRequest(requestDto: RequestResDto): Request {
    return requestDto
}

export const requestsKeys = {
    requests: {
        root: ['requests']
    },

    mutation: {
        create: () => [...requestsKeys.requests.root, 'create']
    }
}

type UseCreateRequestMutation = UseMutationOptions<
    HttpResponse<RequestResDto, unknown>,
    GenericErrorModel,
    CreateRequestReqDto,
    unknown
>

type UseCreateRequestOptions = Omit<UseCreateRequestMutation, 'mutationFn' | 'mutationKey'>

export const useCreateRequest = (options?: UseCreateRequestOptions) =>
    useMutation({
        mutationKey: requestsKeys.mutation.create(),
        mutationFn: (useCreateRequest: CreateRequestReqDto) => {
            return api.createRequest(useCreateRequest)
        },
        ...options
    })

export const useRequests = (filter?: {}, params?: RequestParams) =>
    useQuery<Request[], GenericErrorModel, Request[], string[]>({
        queryKey: requestsKeys.requests.root,
        queryFn: async ({signal}) => {
            const response = await api.getRequests(filter || {}, {
                signal,
                ...params
            })

            return response.data.content?.map(mapRequest) || []
        }
    })