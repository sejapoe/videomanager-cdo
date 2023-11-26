import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {useCreateInstitute} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys} from "../../../common/institutes/api";

const schema = z.object({
    name: z.string().min(1, "Required")
})

type NewInstituteValues = {
    name: string;
}

type NewInstituteFormProps = { onSubmit: (data: void) => void, close: () => void };

export const NewInstituteForm = ({onSubmit, close}: NewInstituteFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useCreateInstitute()

    return <Form<NewInstituteValues, typeof schema>
        onSubmit={data => {
            mutate(data, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root);
                    onSubmit();
                    close();
                }
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

            <div className="flex flex-row space-x-2">
                <Button className="w-full" type="submit" isLoading={isLoading}>
                    Создать
                </Button>
                <Button className="w-full" variant="inverse" onClick={() => close()}>
                    Закрыть
                </Button>
            </div>

        </>}
    </Form>
};