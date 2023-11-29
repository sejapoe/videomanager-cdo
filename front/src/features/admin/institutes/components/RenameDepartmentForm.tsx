import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {useRenameDepartment} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys} from "../../../common/institutes/api";
import {Department} from "../../../common/institutes/model";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";

const schema = z.object({
    name: z.string().min(1, "Required")
})

type RenameDepartmentValues = {
    name: string;
}

type RenameDepartmentFormProps = {
    department: Department;
    onSubmit: (data: void) => void;
    close: () => void
};

export const RenameDepartmentForm = ({onSubmit, close, department}: RenameDepartmentFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useRenameDepartment()

    return <Form<RenameDepartmentValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate({
                id: department.id,
                name: data.name
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root);
                    onSubmit();
                    close();
                },
                onError: (err) => onError(err.error.detail)
            })
        }}
        schema={schema}
        options={{
            defaultValues: {
                name: department.name
            }
        }}
    >
        {({register, formState}) => <>
            <InputField
                label="Новое название кафедры"
                registration={register("name")}
                noAutocomplete
                error={formState.errors["name"]}
            />

            <FieldWrapper error={formState.errors["root"]}>
                <Button className="w-full" type="submit" isLoading={isLoading}>
                    Подтвердить
                </Button>
            </FieldWrapper>
        </>}
    </Form>
};