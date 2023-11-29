import {Combobox} from "@headlessui/react";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export type Option = {
    value: number
    label: string;
};

type ComboboxOptionsProps = {
    options: Option[];
}
export const ComboboxOptions = ({options}: ComboboxOptionsProps) => options.map((option) => (
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
));