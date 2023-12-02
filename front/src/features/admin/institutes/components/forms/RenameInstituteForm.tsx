import {z} from "zod";
import {Form} from "../../../../../ui/form/Form.tsx";
import {InputField} from "../../../../../ui/form/InputField.tsx";
import {Button} from "../../../../../ui/button/Button.tsx";
import {useRenameInstitute} from "../../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys} from "../../../../common/institutes/api";
import {Institute} from "../../../../common/institutes/model";
import {FieldWrapper} from "../../../../../ui/form/FieldWrapper.tsx";

const schema = z.object({
    name: z.string().min(1, "Это поле обязательное")
})

type RenameInstituteValues = {
    name: string;
}

type RenameInstituteFormProps = {
    institute: Institute;
    onSubmit: (data: void) => void;
};

export const RenameInstituteForm = ({onSubmit, institute}: RenameInstituteFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useRenameInstitute()

    return <Form<RenameInstituteValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate({
                id: institute.id,
                name: data.name
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
                name: institute.name
            }
        }}
    >
        {({register, formState}) => <>
            <InputField
                label="Новое название института"
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