import {FormContextConsumer} from "../form/Form.tsx";
import {ComboboxField} from "../form/ComboboxField.tsx";
import {Popover} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";
import {TableFilter} from "./TableHeadItem.tsx";
import {Path} from "react-hook-form";

type ComboboxFilterProps<F> = {
    name: Path<F>;
    options: { value: number, label: string }[]
}

export const ComboboxFilter = <F extends TableFilter>({name, options}: ComboboxFilterProps<F>) => {
    return <FormContextConsumer<F> >
        {({formState, control, watch, resetField}) =>
            <div className="flex items-center">
                <ComboboxField name={name}
                               defaultValue={-1}
                               className="-mt-3"
                               options={options}
                               error={formState.errors[name] as any}
                               control={control}/>
                <Popover.Button as="div">
                    <FontAwesomeIcon icon={regular("circle-xmark")} className={clsx(
                        "ml-2 text-xl text-gray-200 cursor-pointer",
                        watch(name) ? "text-gray-200" : "cursor-block"
                    )} onClick={() => {
                        resetField(name, {
                            defaultValue: -1 as any,
                        })
                    }}/>
                </Popover.Button>
            </div>
        }
    </FormContextConsumer>
}
