import {Request} from "../../../common/requests/model";
import {CreateRequestReqDto, HttpResponse, RequestResDto} from "../../../../api/Api.ts";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {requestsKeys} from "../../../common/requests/api";
import {ArchiveEntry, mapArchiveEntry} from "../../archive/model";


export function mapRequest(requestDto: RequestResDto): Request {
    return requestDto
}

export const adminRequestsKeys = {
    mutation: {
        create: () => [...requestsKeys.requests.root, 'create'],
        archive: () => [...requestsKeys.requests.root, 'archive'],
        delete: () => [...requestsKeys.requests.root, 'delete']
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
        adminRequestsKeys.mutation.create(),
        (useCreateRequest: CreateRequestReqDto) => {
            return api.createRequest(useCreateRequest)
        },
        options
    )

type UseArchiveRequestMutation = UseMutationOptions<
    ArchiveEntry,
    GenericErrorModel,
    number
>

type UseArchiveRequestOptions = Omit<UseArchiveRequestMutation, 'mutationFn' | 'mutationKey'>

export const useArchiveRequest = (options?: UseArchiveRequestOptions) =>
    useMutation(
        adminRequestsKeys.mutation.archive(),
        async (id: number) => {
            const response = await api.archiveRequest(id);

            return mapArchiveEntry(response.data)
        },
        options
    )

type UseDeleteRequestMutation = UseMutationOptions<
    void,
    GenericErrorModel,
    number
>

type UseDeleteRequestOptions = Omit<UseDeleteRequestMutation, 'mutationFn' | 'mutationKey'>

export const useDeleteRequest = (options?: UseDeleteRequestOptions) =>
    useMutation(
        adminRequestsKeys.mutation.archive(),
        async (id: number) => {
            await api.deleteRequest(id);
        },
        options
    )