import clsx from 'clsx';
import {UseFormRegisterReturn} from 'react-hook-form';

import {FieldWrapper, FieldWrapperPassThroughProps} from './FieldWrapper';
import {TextareaHTMLAttributes} from "react";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
    className?: string;
    disabled?: boolean;
    registration: Partial<UseFormRegisterReturn>;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | keyof UseFormRegisterReturn>;

export const TextAreaField = (props: TextAreaFieldProps) => {
    const {label, className, registration, error} = props;

    return (
        <FieldWrapper label={label} error={error}>
      <textarea
          {...props}
          className={clsx(
              'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
              className
          )}
          {...registration}
      />
        </FieldWrapper>
    );
};
