import clsx from 'clsx';
import {UseFormRegisterReturn} from 'react-hook-form';

import {FieldWrapper, FieldWrapperPassThroughProps} from './FieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
    className?: string;
    disabled?: boolean;
    rows?: number;
    cols?: number;
    registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = ({label, className, registration, error, disabled, rows, cols}: TextAreaFieldProps) => {
    return (
        <FieldWrapper label={label} error={error}>
      <textarea
          className={clsx(
              'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
              className
          )}
          disabled={disabled}
          rows={rows}
          cols={cols}
          {...registration}
      />
        </FieldWrapper>
    );
};
