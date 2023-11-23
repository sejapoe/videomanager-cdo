import {RequestsFilter, useRequests} from "../api";
import React from "react";
import {RequestsTableContent} from "./RequestsTableContent.tsx";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import Spinner from "../../../../ui/spinner";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {m1u} from "../../../../utils/numbers.ts";
import {RequestStatus} from "../model";

type RequestsProps = {
    filter?: RequestsFilter
}

const RequestsLoader: React.FC<RequestsProps> = ({filter}) => {
    const {data: requests, isFetching} = useRequests(filter);

    return !requests
        ? <CenterSpinner/>
        : <div className="relative">
            <RequestsTableContent requests={requests}/>
            {isFetching &&
                <div className="absolute rounded top-0 w-full h-full bg-gray-600/20 flex justify-center items-center">
                    <Spinner/>
                </div>}
        </div>
}

const schema = z.object({
    user: z.number().nullish()
})

export type RequestsTableFilter = {
    user?: number;
    institute?: number;
    department?: number;
    status?: number;
}

export const statuses: { [p: number]: RequestStatus | undefined } = {
    [-1]: undefined,
    [1]: "DENIED",
    [2]: "CREATED",
    [3]: "WIP",
    [4]: "COMPLETE"
}

export const RequestsTable: React.FC<RequestsProps> = ({filter}) => {
    return <>
        <FormContextProvider<RequestsTableFilter, typeof schema>
            onSubmit={() => {
            }}
            className="space-y-0"
        >
            {({watch}) =>
                <Pageable defaultPageSize={10}>
                    {({sort, page}) => (
                        <RequestsLoader filter={{
                            user: m1u(watch("user")),
                            institute: m1u(watch("institute")),
                            department: m1u(watch("department")),
                            status: statuses[watch("status") || -1],
                            ...filter,
                            ...sort,
                            ...page
                        }}/>
                    )}
                </Pageable>
            }
        </FormContextProvider>
    </>
}