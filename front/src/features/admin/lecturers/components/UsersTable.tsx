import React from "react";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {LecturersFilter, useLecturers} from "../api";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import Spinner from "../../../../ui/spinner";
import {UsersTableContent} from "./UsersTableContent.tsx";

type UsersLoaderProps = {
    filter: LecturersFilter
}

const UsersLoader = ({filter}: UsersLoaderProps) => {
    const {data: lecturers, isFetching} = useLecturers(filter, undefined, {
        keepPreviousData: true
    })

    return !lecturers
        ? <CenterSpinner/>
        : <div className="relative">
            <UsersTableContent users={lecturers}/>
            {isFetching &&
                <div className="absolute rounded top-0 w-full h-full bg-gray-600/20 flex justify-center items-center">
                    <Spinner/>
                </div>}
        </div>
}

const schema = z.object({
    status: z.number().nullish()
})

export type UsersTableFilter = {
    status: number;
}

export const usersFilterDefaultValues = {
    status: -1,
}

export const statuses: { [p: number]: boolean | undefined } = {
    [-1]: undefined,
    [1]: true,
    [2]: false,
}
export const UsersTable: React.FC = () => {
    return <>
        <FormContextProvider<UsersTableFilter, typeof schema>
            onSubmit={() => {
            }}
            options={{defaultValues: usersFilterDefaultValues}}
            className="space-y-0"
        >
            {({watch}) =>
                <Pageable defaultPageSize={10}>
                    {({sort, page}) =>
                        <UsersLoader filter={{
                            enabled: statuses[watch("status") || -1],
                            ...sort,
                            ...page
                        }}/>
                    }
                </Pageable>
            }
        </FormContextProvider>
    </>
}