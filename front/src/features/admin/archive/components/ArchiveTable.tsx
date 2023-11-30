import {ArchiveFilter, useArchiveEntries} from "../api";
import React, {useState} from "react";
import Pageable from "../../../../ui/table/Pageable.tsx";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import {FormContextProvider} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {bIu, eIu} from "../../../../utils/undefineds.ts";
import {ArchiveTableContent} from "./ArchiveTableContent.tsx";
import {debounce} from "lodash";
import {useMediaQuery} from "react-responsive";
import {ArchiveTableContentMobile} from "./ArchiveTableContentMobile.tsx";

type ArchiveProps = {
    filter?: ArchiveFilter
}

const ArchiveLoader: React.FC<ArchiveProps> = ({filter}) => {
    const {data: entries, isFetching} = useArchiveEntries(filter || {});
    const isMobile = useMediaQuery({
        query: '(max-width: 1280px)'
    })

    return !entries
        ? <CenterSpinner/>
        : <div className="relative">
            <Pageable.FixPage totalPages={entries.totalPages}/>
            {isMobile
                ? <ArchiveTableContentMobile entries={entries}/>
                : <ArchiveTableContent entries={entries}/>
            }
            {isFetching &&
                <div className="absolute rounded top-0 w-full h-full cursor-wait"/>
            }
        </div>
}

const schema = z.object({
    name: z.string(),
    user: z.number().array(),
    institute: z.number().array(),
    department: z.number().array(),
})

export type ArchiveTableFilter = {
    name: string;
    user: number[];
    institute: number[];
    department: number[];
}

export const defaultValues = {
    name: "",
    user: [],
    institute: [],
    department: [],
};

export const ArchiveTable: React.FC<ArchiveProps> = ({filter}) => {
    const [debouncedName, setDebouncedName] = useState("")

    const debounceName = debounce((args) => {
        setDebouncedName(args)
    }, 500)

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
                        <>
                            {debounceName(watch("name"))}
                            <ArchiveLoader filter={{
                                name: bIu(debouncedName),
                                user: eIu(watch("user")),
                                institute: eIu(watch("institute")),
                                department: eIu(watch("department")),
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