import React from "react";
import {FieldWrapper, FieldWrapperPassThroughProps} from "./FieldWrapper.tsx";
import {UseFormRegisterReturn} from "react-hook-form";
import clsx from "clsx";

type Option = {
    label: React.ReactNode;
    value: string | number | string[]
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
    options: Option[]
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    registration: Partial<UseFormRegisterReturn>
};

export const SelectField = ({
                                label,
                                options,
                                error,
                                className,
                                defaultValue,
                                registration,
                                placeholder
                            }: SelectFieldProps) => {
    return (
        <FieldWrapper label={label} error={error}>
            <select
                placeholder={placeholder}
                className={clsx(
                    "mt-1 block w-full pl-3 pr-10 py-2 text-base",
                    "border border-gray-300 bg-gray-200 rounded-md shadow-sm",
                    "focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                    className
                )}
                defaultValue={defaultValue}
                {...registration}
            >
                {options.map(({label, value}) => (
                    <option key={label?.toString()} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </FieldWrapper>
    )

}