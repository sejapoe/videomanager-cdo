import {FullRequest, Request} from "../model";
import {FullRequestResDto, RequestParams, RequestResDto} from "../../../../api/Api.ts";
import {useQuery} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {mapPage, Page} from "../../model";


export function mapRequest(requestDto: RequestResDto): Request {
    return requestDto
}

export function mapFullRequest(requestDto: FullRequestResDto): FullRequest {
    return requestDto
}


export const requestsKeys = {
    requests: {
        root: ['requests'],
        byFilter: (filter: RequestsFilter) => [...requestsKeys.requests.root, filter],
        byId: (id: number) => [...requestsKeys.requests.root, id.toString()],
    },
}

export type RequestsFilter = {
    /** @format int32 */
    page?: number;
    /** @format int32 */
    size?: number;
    /** @format int64 */
    user?: number;
    /** @format int64 */
    institute?: number;
    /** @format int64 */
    department?: number;
    status?: "CREATED" | "WIP" | "COMPLETED" | "ARCHIVED";
    sorting?: string;
    direction?: "ASC" | "DESC";
}

export const useRequests = (filter?: RequestsFilter, params?: RequestParams) =>
    useQuery<Page<Request>, GenericErrorModel, Page<Request>, unknown[]>(
        requestsKeys.requests.byFilter(filter || {}),
        async ({signal}) => {
            const response = await api.getRequests(filter || {}, {
                signal,
                ...params
            })
            return mapPage(response.data as any, mapRequest)
        },
        {
            keepPreviousData: true
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