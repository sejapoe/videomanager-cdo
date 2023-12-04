import {Form} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {useCreateLecturer} from "../api";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";

const schema = z.object({
    name: z.string().min(1, "Заполните обязательное поле"),
    email: z.string().min(1, "Заполните обязательное поле").email("Введите корректную электронную почту")
});

type NewLecturerValues = {
    name: string;
    email: string;
}

type NewLecturerDialogProps = {
    defaultName: string;
    onSubmit: (id: number) => void;
}

export const NewLecturerDialog = ({defaultName, onSubmit}: NewLecturerDialogProps) => {
    const {mutate, isLoading} = useCreateLecturer()

    return <Form<NewLecturerValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate(data, {
                onSuccess: ({data}) => {
                    onSubmit(data.id)
                },
                onError: err => onError(err.error.detail)
            })
        }}
        schema={schema}
    >
        {({register, formState}) => (
            <>
                <InputField
                    type="text"
                    label="Полное имя"
                    defaultValue={defaultName}
                    error={formState.errors["name"]}
                    registration={register("name")}
                />

                <InputField
                    type="email"
                    label="Эллектронная почта"
                    error={formState.errors["email"]}
                    registration={register("email")}
                />

                <FieldWrapper error={formState.errors["root"]}>
                    <Button className="w-full" type="submit" isLoading={isLoading}>
                        Создать
                    </Button>
                </FieldWrapper>
            </>
        )}
    </Form>
}