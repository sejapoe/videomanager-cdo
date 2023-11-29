import {RequestsFilter, useRequests} from "../api";
import React from "react";
import {RequestsTableContent} from "./RequestsTableContent.tsx";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
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
                <div className="absolute rounded top-0 w-full h-full cursor-wait"/>
            }
        </div>
}

const schema = z.object({
    user: z.number().nullish(),
    institute: z.number().nullish(),
    department: z.number().nullish(),
    status: z.number().nullish()
})

export type RequestsTableFilter = {
    user: number[];
    institute: number[];
    department: number[];
    status: number[];
}

export const defaultValues = {
    user: [],
    institute: [],
    department: [],
    status: []
};

export const statuses: { [p: number]: RequestStatus } = {
    [1]: "CREATED",
    [2]: "WIP",
    [3]: "COMPLETED",
    [4]: "ARCHIVED"
}

export const RequestsTable: React.FC<RequestsProps> = ({filter}) => {

    return <>
        <FormContextProvider<RequestsTableFilter, typeof schema>
            onSubmit={() => {
            }}
            className="space-y-0"
            options={{
                defaultValues,
            }}
        >
            {({watch}) =>
                <Pageable defaultPageSize={15}>
                    {({sort, page}) => (
                        <RequestsLoader filter={{
                            user: watch("user"),
                            institute: watch("institute"),
                            department: watch("department"),
                            status: watch("status").map(i => statuses[i]),
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