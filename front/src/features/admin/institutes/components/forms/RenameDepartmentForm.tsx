import {z} from "zod";
import {Form} from "../../../../../ui/form/Form.tsx";
import {InputField} from "../../../../../ui/form/InputField.tsx";
import {Button} from "../../../../../ui/button/Button.tsx";
import {useRenameDepartment} from "../../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys} from "../../../../common/institutes/api";
import {Department} from "../../../../common/institutes/model";
import {FieldWrapper} from "../../../../../ui/form/FieldWrapper.tsx";
import {bIu} from "../../../../../utils/undefineds.ts";

const schema = z.object({
    name: z.string().min(1, "Заполните обязательное поле"),
    shortName: z.string().max(10, "Слишком длинное название")
})

type RenameDepartmentValues = {
    name: string;
    shortName: string;
}

type RenameDepartmentFormProps = {
    department: Department;
    onSubmit: (data: void) => void;
};

export const RenameDepartmentForm = ({onSubmit, department}: RenameDepartmentFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useRenameDepartment()

    return <Form<RenameDepartmentValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate({
                id: department.id,
                name: data.name,
                short_name: bIu(data.shortName)
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root);
                    onSubmit();
                },
                onError: (err) => onError(err.error.detail)
            })
        }}
        schema={schema}
        options={{
            defaultValues: {
                name: department.name,
                shortName: department.shortName
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

            <InputField
                label="Новое сокращенное название кафедры (может быть пустым)"
                registration={register("shortName")}
                noAutocomplete
                error={formState.errors["shortName"]}
            />

            <FieldWrapper error={formState.errors["root"]}>
                <Button className="w-full" type="submit" isLoading={isLoading}>
                    Подтвердить
                </Button>
            </FieldWrapper>
        </>}
    </Form>
};