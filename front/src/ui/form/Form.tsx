import {zodResolver} from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    useFormContext,
    UseFormProps,
    UseFormReturn
} from "react-hook-form";
import React, {FormEventHandler} from "react";
import {ZodType, ZodTypeDef} from "zod";

type FormProps<TFormValues extends FieldValues, Schema> = {
    className?: string;
    defaultValue?: TFormValues;
    onSubmit: SubmitHandler<TFormValues>;
    onReset?: FormEventHandler;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: UseFormProps<TFormValues>;
    id?: string;
    schema?: Schema;
};

export const Form = <
    TFormValues extends FieldValues = FieldValues,
    Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>({
      onSubmit,
                          onReset,
      children,
      className,
      options,
      id,
      schema,
  }: FormProps<TFormValues, Schema>) => {
    const methods = useForm<TFormValues>({
        ...options,
        resolver: schema && zodResolver(schema)
    })

    return (
        <form
            className={clsx("space-y-6", className)}
            onSubmit={methods.handleSubmit(onSubmit)}
            onReset={onReset}
            id={id}
        >
            {children(methods)}
        </form>
    )
}

type FormContextProps<TFormValues extends FieldValues, Schema> =
    Omit<FormProps<TFormValues, Schema>, 'children'> & ({
    children: React.ReactNode;
} | {
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
})

export const FormContextProvider = <
    TFormValues extends FieldValues = FieldValues,
    Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>(props: FormContextProps<TFormValues, Schema>) => {
    return Form<TFormValues, Schema>({
        ...props,
        children: methods => <FormProvider {...methods}>
            {'function' === typeof props.children ? props.children(methods) : props.children}
        </FormProvider>
    })
}

export type FormContextConsumerProps<TFormValues extends FieldValues> = {
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
}

export const FormContextConsumer = <
    TFormValues extends FieldValues = FieldValues,
>({children}: FormContextConsumerProps<TFormValues>) => {
    const methods = useFormContext<TFormValues>()

    if (methods == null) {
        throw new Error(`<FormContextConsumer /> is missing a parent <FormContextProvider /> component.`)
    }

    return children(methods)
}