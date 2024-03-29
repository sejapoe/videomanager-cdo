import {z} from "zod";
import {Form} from "../../../../../ui/form/Form.tsx";
import {InputField} from "../../../../../ui/form/InputField.tsx";
import {Button} from "../../../../../ui/button/Button.tsx";
import {useCreateInstitute} from "../../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys} from "../../../../common/institutes/api";
import {FieldWrapper} from "../../../../../ui/form/FieldWrapper.tsx";

const schema = z.object({
    name: z.string().min(1, "Заполните обязательное поле")
})

type NewInstituteValues = {
    name: string;
}

type NewInstituteFormProps = {
    onSubmit: (data: void) => void;
};

export const NewInstituteForm = ({onSubmit}: NewInstituteFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useCreateInstitute()

    return <Form<NewInstituteValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate(data, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root);
                    onSubmit();
                },
                onError: (err) => onError(err.error.detail)
            })
        }}
        schema={schema}
    >
        {({register, formState}) => <>
            <InputField
                label="Название института"
                registration={register("name")}
                noAutocomplete
                error={formState.errors["name"]}
            />

            <FieldWrapper error={formState.errors["root"]}>
                <Button className="w-full" type="submit" isLoading={isLoading}>
                    Создать
                </Button>
            </FieldWrapper>
        </>}
    </Form>
};