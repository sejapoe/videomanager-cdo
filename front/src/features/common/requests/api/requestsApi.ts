import {Request} from "../model";
import {RequestParams, RequestResDto} from "../../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";


export function mapRequest(requestDto: RequestResDto): Request {
    return requestDto
}

export const requestsKeys = {
    requests: {
        root: ['common', 'requests'],
        byId: (id: number) => [...requestsKeys.requests.root, id.toString()]
    },
}

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

export const useRequest = (id: number, params?: RequestParams) =>
    useQuery<Request, GenericErrorModel, Request, string[]>({
        queryKey: requestsKeys.requests.byId(id),
        queryFn: async ({signal}) => {
            const response = await api.getRequest(id, {
                signal,
                ...params
            })

            return mapRequest(response.data)
        }
    })