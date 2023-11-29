import clsx, {ClassValue} from "clsx";
import React from "react";
import Pageable from "./Pageable.tsx";

export type TableFilter = Record<string, any>;

type TableHeadItemProps = {
    field: string;
    className?: ClassValue;
} & ({
    customTitle?: React.ReactNode;
    title: string;
} | {
    customTitle: React.ReactNode;
    title?: string;
})

export const TableHeadItem = ({
                                                         title,
                                                         field,
                                  customTitle,
                                                         className
                              }: TableHeadItemProps) => {
    return <th className={clsx(
        "px-4 py-2 border-2 border-gray-100",
        className
    )}>
        <div className="flex justify-between items-center">
            {customTitle || title}
            <Pageable.SortButton field={field}/>
        </div>
    </th>
}
