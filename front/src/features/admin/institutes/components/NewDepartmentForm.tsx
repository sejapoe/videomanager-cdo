import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {useCreateDepartment} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys, useInstitutes} from "../../../common/institutes/api";
import {ComboboxField} from "../../../../ui/form/ComboboxField.tsx";

const schema = z.object({
    institute_id: z.number().positive(),
    name: z.string().min(1, "Required")
})

type NewDepartmentValues = {
    institute_id: number;
    name: string;
}

type NewDepartmentFormProps = {
    instituteId: number;
    onSubmit: (data: void) => void;
    close: () => void
};

export const NewDepartmentForm = ({onSubmit, instituteId, close}: NewDepartmentFormProps) => {
    const queryClient = useQueryClient();
    const {mutate, isLoading} = useCreateDepartment()
    const {data: institutes} = useInstitutes()

    return <Form<NewDepartmentValues, typeof schema>
        onSubmit={data => {
            console.log(data)
            mutate(data, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root);
                    onSubmit();
                    close();
                }
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