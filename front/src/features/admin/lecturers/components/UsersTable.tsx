import React from "react";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {LecturersFilter, useLecturers} from "../api";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
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
            <Pageable.FixPage totalPages={lecturers.totalPages}/>
            <UsersTableContent users={lecturers}/>
            {isFetching &&
                <div className="absolute rounded top-0 w-full h-full cursor-wait"/>
            }
        </div>
}

const schema = z.object({
    status: z.number().nullish()
})

export type UsersTableFilter = {
    status: number[];
}

export const usersFilterDefaultValues = {
    status: [],
}

export const statuses: { [p: number]: boolean } = {
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
                            enabled: watch("status").map(i => statuses[i]),
                            ...sort,
                            ...page
                        }}/>
                    }
                </Pageable>
            }
        </FormContextProvider>
    </>
}