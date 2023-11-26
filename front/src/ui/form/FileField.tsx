import {FieldWrapper, FieldWrapperPassThroughProps} from "./FieldWrapper.tsx";
import {Control, Controller} from "react-hook-form";
import clsx from "clsx";

type InputFieldProps = FieldWrapperPassThroughProps & {
    accept?: string;
    className?: string;
    name: string;
    control: Control<any, any>;
};

export const FileField = ({
                              label,
                              className,
                              error,
                              accept,
                              name,
                              control
                          }: InputFieldProps) => {
    return (
        <Controller name={name}
                    control={control}
                    render={({field: {value, onChange, ...field}}) =>
                        <FieldWrapper label={label} error={error}>
                            <input
                                {...field}
                                value={value?.fileName}
                                onChange={(event) => {
                                    onChange(event.target.files && event.target.files[0])
                                }}
                                type="file"
                                className={clsx(
                                    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200",
                                    "shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                                    className
                                )}
                                accept={accept}
                            />
                        </FieldWrapper>
                    }/>)
}