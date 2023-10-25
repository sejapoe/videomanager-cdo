import {Form} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {useCreateLecturer} from "../api/lecturerApi.ts";

const schema = z.object({
    name: z.string().min(1, "Required"),
    email: z.string().min(1, "Required").email("Must be email")
});

type NewLecturerValues = {
    name: string;
    email: string;
}

type NewLecturerDialogProps = {
    defaultName: string;
    onSubmit: (id: number) => void;
    close: () => void;
}

export const NewLecturerDialog = ({defaultName, onSubmit, close}: NewLecturerDialogProps) => {
    const {mutate, isLoading} = useCreateLecturer()

    return <Form<NewLecturerValues, typeof schema>
        onSubmit={(data) => {
            // mutate data
            mutate(data, {
                onSuccess: ({data}) => {
                    onSubmit(data.id)
                    close()
                }
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

                <div className="flex flex-row space-x-2">
                    <Button className="w-full" type="submit" isLoading={isLoading}>
                        Создать
                    </Button>
                    <Button className="w-full" variant="inverse" onClick={() => close()}>
                        Закрыть
                    </Button>
                </div>

            </>
        )}
    </Form>
}