import {FullRequest, Request} from "../model";
import {FullRequestResDto, RequestParams, RequestResDto} from "../../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {commonKey} from "../../api";


export function mapRequest(requestDto: RequestResDto): Request {
    return requestDto
}

export function mapFullRequest(requestDto: FullRequestResDto): FullRequest {
    return requestDto
}


export const requestsKeys = {
    requests: {
        root: [...commonKey, 'requests'],
        byId: (id: number) => [...requestsKeys.requests.root, id.toString()]
    },
}

export const useRequests = (filter?: {}, params?: RequestParams) =>
    useQuery<Request[], GenericErrorModel, Request[], unknown[]>(
        requestsKeys.requests.root,
        async ({signal}) => {
            const response = await api.getRequests(filter || {}, {
                signal,
                ...params
            })

            return response.data.content?.map(mapRequest) || []
        }
    )

export const useRequest = (id: number, params?: RequestParams) =>
    useQuery<FullRequest, GenericErrorModel, FullRequest, unknown[]>(
        requestsKeys.requests.byId(id),
        async ({signal}) => {
            const response = await api.getRequest(id, {
                signal,
                ...params
            })

            return mapFullRequest(response.data)
        }
    )