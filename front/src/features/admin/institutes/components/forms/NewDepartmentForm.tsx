import {z} from "zod";
import {Form} from "../../../../../ui/form/Form.tsx";
import {InputField} from "../../../../../ui/form/InputField.tsx";
import {Button} from "../../../../../ui/button/Button.tsx";
import {useCreateDepartment} from "../../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys, useInstitutes} from "../../../../common/institutes/api";
import {ComboboxField} from "../../../../../ui/form/ComboboxField.tsx";
import {FieldWrapper} from "../../../../../ui/form/FieldWrapper.tsx";
import {bIu} from "../../../../../utils/undefineds.ts";

const schema = z.object({
    institute_id: z.number().positive(),
    name: z.string().min(1, "Заполните обязательное поле"),
    shortName: z.string().max(10, "Слишком длинное название")
})

type NewDepartmentValues = {
    institute_id: number;
    name: string;
    shortName: string;
}

type NewDepartmentFormProps = {
    instituteId: number;
    onSubmit: (data: void) => void;
};

export const NewDepartmentForm = ({onSubmit, instituteId}: NewDepartmentFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useCreateDepartment()
    const {data: institutes} = useInstitutes()

    return <Form<NewDepartmentValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate({
                institute_id: data.institute_id,
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
                institute_id: instituteId,
            }
        }}
    >
        {({register, formState, control}) => <>
            <ComboboxField
                label="Институт"
                defaultValue={instituteId}
                options={
                    institutes?.map(value => ({
                        value: value.id,
                        label: value.name
                    })) || []
                }
                error={formState.errors["institute_id"]}
                name={"institute_id"}
                control={control}
            />

            <InputField
                label="Название кафедры"
                registration={register("name")}
                noAutocomplete
                error={formState.errors["name"]}
            />

            <InputField
                label="Сокращенное название кафедры может быть пустым)"
                registration={register("shortName")}
                noAutocomplete
                error={formState.errors["shortName"]}
            />

            <FieldWrapper error={formState.errors["root"]}>
                <Button className="w-full" type="submit" isLoading={isLoading}>
                    Создать
                </Button>
            </FieldWrapper>

        </>}
    </Form>
};