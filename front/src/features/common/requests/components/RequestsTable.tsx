import {RequestsFilter, useRequests} from "../api";
import React, {useState} from "react";
import {RequestsTableContent} from "./RequestsTableContent.tsx";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {RequestStatus} from "../model";
import {bIu, eIu} from "../../../../utils/undefineds.ts";
import {debounce} from "lodash"
import {useMediaQuery} from "react-responsive";
import {RequestsTableContentMobile} from "./RequestsTableContentMobile.tsx";

type RequestsProps = {
    filter?: RequestsFilter
}

const RequestsLoader: React.FC<RequestsProps> = ({filter}) => {
    const {data: requests, isFetching} = useRequests(filter);
    const isMobile = useMediaQuery({
        query: '(max-width: 1280px)'
    })

    return !requests
        ? <CenterSpinner/>
        : <div className="relative">
            <Pageable.FixPage totalPages={requests.totalPages}/>
            {isMobile
                ? <RequestsTableContentMobile requests={requests}/>
                : <RequestsTableContent requests={requests}/>
            }
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
    name: string,
    user: number[];
    institute: number[];
    department: number[];
    status: number[];
}

export const defaultValues = {
    name: "",
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
    const [debouncedName, setDebouncedName] = useState("")

    const debounceName = debounce((args) => {
        setDebouncedName(args)
    }, 500)

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
                        <>
                            {debounceName(watch("name"))}
                            <RequestsLoader filter={{
                                name: bIu(debouncedName),
                                user: eIu(watch("user")),
                                institute: eIu(watch("institute")),
                                department: eIu(watch("department")),
                                status: eIu(watch("status").map(i => statuses[i])),
                                ...filter,
                                ...sort,
                                ...page
                            }}/>
                        </>
                    )}
                </Pageable>
            }
        </FormContextProvider>
    </>
}