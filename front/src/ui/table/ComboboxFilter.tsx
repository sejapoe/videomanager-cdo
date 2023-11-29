import {FormContextConsumer} from "../form/Form.tsx";
import {Combobox, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";
import {TableFilter} from "./TableHeadItem.tsx";
import {Controller, Path} from "react-hook-form";
import {Fragment, useState} from "react";
import {eIu} from "../../utils/undefineds.ts";
import {ComboboxOptions, Option} from "../form/ComboboxOptions.tsx";

type ComboboxFilterProps<F> = {
    name: Path<F>;
    title: string;
    options: Option[]
}

export const ComboboxFilter = <F extends TableFilter>(props: ComboboxFilterProps<F>) => {
    const [query, setQuery] = useState("")

    const {title, name, options} = props

    const filteredOptions =
        query === ""
            ? options
            : options.filter(({label}) => label.toLowerCase().includes(query.toLowerCase()));

    return <FormContextConsumer<F> >
        {({control, watch, resetField}) =>
            <Controller
                control={control}
                name={name}
                render={({field: {onChange, value, onBlur}}) => (
                    <Combobox
                        value={value}
                        onChange={onChange}
                        // @ts-ignore
                        // multiple={multiple || false}
                        multiple
                    >
                        <div className="relative">
                            <Combobox.Button as="span" className={clsx(
                                eIu(watch(name)) && "text-green-400"
                            )}>
                                {`${title}`}
                            </Combobox.Button>

                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery("")}
                            >
                                <Combobox.Options
                                    className={clsx("absolute z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg",
                                        "ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm")}
                                >
                                    <div className="py-2 px-4 flex items-center">
                                        <Combobox.Input
                                            placeholder="Поиск..."
                                            autoComplete="off"
                                            className="bg-gray-200 w-full border-none pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                                            onChange={event => setQuery(event.target.value)}
                                            onBlur={onBlur}
                                        />
                                        <FontAwesomeIcon
                                            icon={solid("xmark")}
                                            className={
                                                clsx(!eIu(watch(name)) && "hidden", "text-gray-700 cursor-pointer")
                                            }
                                            onClick={() => resetField(name, {
                                                defaultValue: [] as any,
                                            })}
                                        />
                                    </div>
                                    {
                                        filteredOptions.length === 0 && query !== "" ? (
                                            <div
                                                className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                Ничего не найдено
                                            </div>
                                        ) : <ComboboxOptions options={filteredOptions}/>
                                    }
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                )}
            />
        }
    </FormContextConsumer>
}
