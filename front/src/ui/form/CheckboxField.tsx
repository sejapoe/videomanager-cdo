import React from 'react';
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

interface CheckboxFieldProps {
    label: string;
    error?: FieldError;
    registration: UseFormRegisterReturn;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
                                                         label,
                                                         registration,
                                                         error
                                                     }) => {
    return (
        <div>
            <label className="flex space-x-2">
                <input
                    type="checkbox"
                    {...registration}
                />
                <span className="block text-sm font-medium text-gray-700">{label}
                </span>
            </label>
            {error?.message && (
                <div role="alert" aria-label={error.message} className="text-sm font-semibold text-red-500">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default CheckboxField;