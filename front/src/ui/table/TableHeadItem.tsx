import clsx, {ClassValue} from "clsx";
import React from "react";
import {Path, useFormContext} from "react-hook-form";
import {Popover} from "@headlessui/react";
import {bIu, m1u} from "../../utils/undefineds.ts";
import Pageable from "./Pageable.tsx";

export type TableFilter = Record<string, any>;

type TableHeadItemProps<F extends TableFilter> = {
    title: string;
    field: string;
    className?: ClassValue;
} & ({
    filterInput?: React.ReactNode;
    filterName?: keyof F;
} | {
    filterInput: React.ReactNode;
    filterName: keyof F;
})

export const TableHeadItem = <F extends TableFilter>({
                                                         title,
                                                         field,
                                                         filterInput,
                                                         filterName,
                                                         className
                                                     }: TableHeadItemProps<F>) => {
    const {watch} = useFormContext<F>()

    const value = watch(filterName! as Path<F>) as any;

    const filtered = !!("number" === typeof value ? m1u(value) :
        "string" === typeof value ? bIu(value)
            : value);
    return <th className={clsx(
        "px-4 py-2 border-2 border-gray-100",
        className
    )}>
        <div className="flex justify-between items-center">
            {filterInput ?
                <Popover className="relative w-full">
                    <Popover.Button as="div" className={clsx(
                        "cursor-pointer",
                        filtered ? "text-green-400" : ""
                    )}
                    >
                        {title}
                    </Popover.Button>

                    <Popover.Panel>
                        <div className="absolute z-10 bg-gray-600 opacity-95 w-max rounded shadow shadow-gray-900 p-4">
                            {filterInput}
                        </div>
                    </Popover.Panel>
                </Popover>
                : title}
            <Pageable.SortButton field={field}/>
        </div>
    </th>
}
