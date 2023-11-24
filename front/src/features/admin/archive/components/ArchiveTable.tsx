import {ArchiveFilter, useArchiveEntries} from "../api";
import React from "react";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import Spinner from "../../../../ui/spinner";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {m1u} from "../../../../utils/undefineds.ts";
import {ArchiveTableContent} from "./ArchiveTableContent.tsx";

type ArchiveProps = {
    filter?: ArchiveFilter
}

const ArchiveLoader: React.FC<ArchiveProps> = ({filter}) => {
    const {data: entries, isFetching} = useArchiveEntries(filter || {});

    return !entries
        ? <CenterSpinner/>
        : <div className="relative">
            <ArchiveTableContent entries={entries}/>
            {isFetching &&
                <div className="absolute rounded top-0 w-full h-full bg-gray-600/20 flex justify-center items-center">
                    <Spinner/>
                </div>}
        </div>
}

const schema = z.object({
    user: z.number().nullish(),
    institute: z.number().nullish(),
    department: z.number().nullish(),
})

export type ArchiveTableFilter = {
    user: number;
    institute: number;
    department: number;
}

export const defaultValues = {
    user: -1,
    institute: -1,
    department: -1,
};

export const ArchiveTable: React.FC<ArchiveProps> = ({filter}) => {

    return <>
        <FormContextProvider<ArchiveTableFilter, typeof schema>
            onSubmit={() => {
            }}
            className="space-y-0"
            options={{
                defaultValues,
            }}
        >
            {({watch}) =>
                <Pageable defaultPageSize={10}>
                    {({sort, page}) => (
                        <ArchiveLoader filter={{
                            user: m1u(watch("user")),
                            institute: m1u(watch("institute")),
                            department: m1u(watch("department")),
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