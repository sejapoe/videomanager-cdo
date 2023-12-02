import {FullRequest} from "../../../common/requests/model";
import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {useUpdateRequest} from "../api";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";
import {Button} from "../../../../ui/button/Button.tsx";

const schema = z.object({
    name: z.string().min(1, "Это поле обязательное"),
    linkToVideo: z.string().min(1, "Это поле обязательное").url(),
    linkToMoodle: z.string().min(1, "Это поле обязательное").url()
})

type UpdateRequestValues = {
    name: string;
    linkToMoodle: string;
    linkToVideo: string;
}

type UpdateRequestFormProps = {
    request: FullRequest;
    onSubmit: () => void;
}

export const UpdateRequestForm = ({request, onSubmit}: UpdateRequestFormProps) => {
    const {mutate, isLoading} = useUpdateRequest()

    return <Form<UpdateRequestValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate({
                ...data,
                id: request.id
            }, {
                onSuccess: onSubmit,
                onError: (err) => onError(err.error.detail)
            })
        }}
        schema={schema}
        options={{
            defaultValues: {
                name: request.name,
                linkToMoodle: request.linkToMoodle,
                linkToVideo: request.linkToVideo
            }
        }}
        className="w-72"
    >
        {({formState, register}) => <>
            <InputField type="text"
                        noAutocomplete
                        label="Наименование"
                        error={formState.errors["name"]}
                        registration={register("name")}/>

            <InputField type="text"
                        noAutocomplete
                        label="Ссылка СДО"
                        error={formState.errors["linkToMoodle"]}
                        registration={register("linkToMoodle")}/>

            <InputField type="text"
                        noAutocomplete
                        label="Ссылка на видео"
                        error={formState.errors["linkToVideo"]}
                        registration={register("linkToVideo")}/>

            <FieldWrapper error={formState.errors["root"]} className="w-full flex justify-center">
                <Button type="submit" isLoading={isLoading}>Сохранить</Button>
            </FieldWrapper>
        </>}
    </Form>
}