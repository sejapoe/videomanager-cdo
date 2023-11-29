import React, {useState} from "react";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {LecturersFilter, useLecturers} from "../api";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import {UsersTableContent} from "./UsersTableContent.tsx";
import {debounce} from "lodash";
import {bIu, eIu} from "../../../../utils/undefineds.ts";

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
    name: z.string(),
    email: z.string(),
    status: z.number().array()
})

export type UsersTableFilter = {
    name: string;
    email: string;
    status: number[];
}

export const usersFilterDefaultValues = {
    name: "",
    email: "",
    status: [],
}

export const statuses: { [p: number]: boolean } = {
    [1]: true,
    [2]: false,
}
export const UsersTable: React.FC = () => {
    const [debouncedName, setDebouncedName] = useState("")
    const [debouncedEmail, setDebouncedEmail] = useState("")

    const debounceNane = debounce((args) => {
        setDebouncedName(args)
    }, 500)

    const debounceEmail = debounce((args) => {
        setDebouncedEmail(args)
    }, 500)

    return <>
        <FormContextProvider<UsersTableFilter, typeof schema>
            onSubmit={() => {
            }}
            options={{defaultValues: usersFilterDefaultValues}}
            className="space-y-0"
        >
            {({watch}) =>
                <>
                    {debounceNane(watch("name"))}
                    {debounceEmail(watch("email"))}
                    <Pageable defaultPageSize={10}>
                        {({sort, page}) =>
                            <UsersLoader filter={{
                                name: bIu(debouncedName),
                                email: bIu(debouncedEmail),
                                enabled: eIu(watch("status").map(i => statuses[i])),
                                ...sort,
                                ...page
                            }}/>
                        }
                    </Pageable>
                </>
            }
        </FormContextProvider>
    </>
}