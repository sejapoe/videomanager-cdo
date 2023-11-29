import {FormContextConsumer} from "../form/Form.tsx";
import {Popover, Transition} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";
import {TableFilter} from "./TableHeadItem.tsx";
import {Path} from "react-hook-form";
import {Fragment} from "react";
import {eIu} from "../../utils/undefineds.ts";
import {InputField} from "../form/InputField.tsx";

type ComboboxFilterProps<F> = {
    name: Path<F>;
    title: string;
}

export const SearchFilter = <F extends TableFilter>({title, name}: ComboboxFilterProps<F>) => {
    return <FormContextConsumer<F> >
        {({register, watch, resetField}) =>
            <Popover className="relative">
                <Popover.Button as="span" className={clsx(
                    eIu(watch(name)) && "text-green-400"
                )}>
                    {`${title}`}
                </Popover.Button>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Panel
                        className={clsx("absolute z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg",
                            "ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm")}
                    >
                        <div className="py-2 px-4 flex items-center">
                            <InputField
                                noAutocomplete
                                // className="bg-gray-200 w-full border-none pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                                registration={register(name)}
                            />
                            <FontAwesomeIcon
                                icon={solid("xmark")}
                                className={
                                    clsx(!eIu(watch(name)) && "hidden", "ml-2 text-gray-700 cursor-pointer")
                                }
                                onClick={() => resetField(name)}
                            />
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        }
    </FormContextConsumer>
}
