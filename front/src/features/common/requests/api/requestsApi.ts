import {Request} from "../model";
import {RequestParams, RequestResDto} from "../../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";


export function mapRequest(requestDto: RequestResDto): Request {
    return requestDto
}

export const requestsKeys = {
    requests: {
        root: ['common', 'requests']
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