import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {useUpdateArchiveEntry} from "../api";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {ArchiveEntry} from "../model";
import {bIu} from "../../../../utils/undefineds.ts";
import {TextAreaField} from "../../../../ui/form/TextareaField.tsx";

const schema = z.object({
    name: z.string().min(1, "Заполните обязательное поле"),
    linkToVideo: z.string().min(1, "Заполните обязательное поле").url(),
    linkToMoodle: z.string().min(1, "Заполните обязательное поле").url(),
    description: z.string()
})

type UpdateArchiveEntryValues = {
    name: string;
    linkToMoodle: string;
    linkToVideo: string;
    description: string;
}

type UpdateArchiveEntryFormProps = {
    entry: ArchiveEntry;
    onSubmit: () => void;
}

export const UpdateArchiveEntryForm = ({entry, onSubmit}: UpdateArchiveEntryFormProps) => {
    const {mutate, isLoading} = useUpdateArchiveEntry()

    return <Form<UpdateArchiveEntryValues, typeof schema>
        onSubmit={(data, onError) => {
            mutate({
                ...data,
                description: bIu(data.description),
                id: entry.id
            }, {
                onSuccess: onSubmit,
                onError: (err) => onError(err.error.detail)
            })
        }}
        schema={schema}
        options={{
            defaultValues: {
                name: entry.name,
                linkToMoodle: entry.linkToMoodle,
                linkToVideo: entry.linkToVideo,
                description: entry.description || ""
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

            <TextAreaField
                label="Описание"
                className="resize-none pr-5 bg-transparent border border-gray-400 w-full h-full row-auto"
                rows={5}
                error={formState.errors["description"]}
                registration={register("description")}/>

            <FieldWrapper error={formState.errors["root"]} className="w-full flex justify-center">
                <Button type="submit" isLoading={isLoading}>Сохранить</Button>
            </FieldWrapper>
        </>}
    </Form>
}