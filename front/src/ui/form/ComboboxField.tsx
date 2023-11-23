import {FieldWrapper, FieldWrapperPassThroughProps} from "./FieldWrapper.tsx";
import React, {Fragment, useState} from "react";
import {Control, Controller} from "react-hook-form";
import {Combobox, Transition} from "@headlessui/react";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

type Option = {
    label: string;
    value: string | number
};

type ComboboxFieldProps = FieldWrapperPassThroughProps & {
    options: Option[];
    name: string;
    className?: string;
    defaultValue?: string | number;
    notFoundComponent?: (query: string) => React.ReactNode;
    control: Control<any, any>;
    multiple?: true | false;
}

export const ComboboxField = ({
                                  options,
                                  className,
                                  defaultValue,
                                  name,
                                  control,
                                  label,
                                  error,
                                  notFoundComponent,
                                  multiple
                              }: ComboboxFieldProps) => {
    const [query, setQuery] = useState("")

    const filteredOptions =
        query === ""
            ? options
            : options.filter(({label}) => label.toLowerCase().includes(query.toLowerCase()));

    const getNameFromValue = (value: string | number) => {
        const option = options.find((option) => option.value == value);
        return option?.label || "";
    }

    // @ts-ignore
    return (
        <Controller
            defaultValue={defaultValue}
            control={control}
            name={name}
            render={({field: {onChange, value, onBlur}}) => (
                <FieldWrapper label={label} error={error}>

                    <Combobox
                        value={value}
                        onChange={onChange}
                        // @ts-ignore
                        multiple={multiple || false}
                    >
                        <div className="relative mt-3">
                            <div className={clsx(
                                "border border-gray-300 bg-gray-200 rounded-md shadow-sm",
                                className
                            )}>
                                <Combobox.Button className="w-full inset-y-0 right-0 flex items-center pr-2">
                                    <Combobox.Input
                                        autoComplete="off"
                                        className="bg-gray-200 w-full border-none pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                                        onChange={event => setQuery(event.target.value)}
                                        displayValue={(value: string | number) => getNameFromValue(value)}
                                        onBlur={onBlur}
                                    />
                                    <FontAwesomeIcon icon={solid("up-down")}/>
                                </Combobox.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery("")}
                            >
                                <Combobox.Options
                                    className={clsx("absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg",
                                        "ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm")}
                                >
                                    {
                                        filteredOptions.length === 0 && query !== "" ? (
                                            <div
                                                className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                {notFoundComponent ? notFoundComponent(query) : "Ничего не найдено"}
                                            </div>
                                        ) : (
                                            filteredOptions.map((option) => (
                                                <Combobox.Option
                                                    value={option.value} key={option.value}
                                                    className={({active}) => (
                                                        clsx("relative cursor-default py-2 pl-10 pr-4",
                                                            active ? "bg-orange-600 text-white" : "text-gray-900",
                                                            "transition-colors"
                                                        )
                                                    )}
                                                >
                                                    {({selected, active}) => (
                                                        <>
                                                    <span
                                                        className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
                                                        {option.label}
                                                    </span>
                                                            {selected ? (
                                                                <span
                                                                    className={clsx("absolute inset-y-0 left-0 flex items-center pl-3",
                                                                        active ? "text-white" : "text-orange-600"
                                                                    )}>
                                                            <FontAwesomeIcon icon={solid("check")} aria-hidden="true"/>
                                                        </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            ))
                                        )
                                    }
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </FieldWrapper>
            )}
        />

    )
}