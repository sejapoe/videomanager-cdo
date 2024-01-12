import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {Lecturer} from "../model";
import {useRenameLecturer} from "../api";

const schema = z.object({
    name: z.string().min(1, "Заполните обязательное поле"),
})

type RenameLecturerValues = {
    name: string;
}

type RenameLecturerFormProps = {
    lecturer: Lecturer;
    onSubmit: () => void;
}

export const RenameLecturerForm = ({lecturer, onSubmit}: RenameLecturerFormProps) => {
    const {mutate, isLoading} = useRenameLecturer()

    return <Form<RenameLecturerValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate({
                ...data,
                id: lecturer.id
            }, {
                onSuccess: onSubmit,
                onError: (err) => onError(err.error.detail)
            })
        }}
        schema={schema}
        options={{
            defaultValues: {
                name: lecturer.fullName,
            }
        }}
        className="w-72"
    >
        {({formState, register}) => <>
            <InputField type="text"
                        noAutocomplete
                        label="ФИО преподавателя"
                        error={formState.errors["name"]}
                        registration={register("name")}/>

            <FieldWrapper error={formState.errors["root"]} className="w-full flex justify-center">
                <Button type="submit" isLoading={isLoading}>Сохранить</Button>
            </FieldWrapper>
        </>}
    </Form>
}