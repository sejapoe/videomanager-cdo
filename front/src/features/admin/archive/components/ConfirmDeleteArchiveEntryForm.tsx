import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {archiveKeys, useDeleteArchiveEntry} from "../api";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useQueryClient} from "@tanstack/react-query";
import {ArchiveEntry} from "../model";

type ConfirmDeleteRequestValues = {
    name: string;
}

type ConfirmDeleteArchiveEntryFormProps = {
    entry: ArchiveEntry;
    onSubmit: () => void;
}

export const ConfirmDeleteArchiveEntryForm = ({entry, onSubmit}: ConfirmDeleteArchiveEntryFormProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useDeleteArchiveEntry()

    const schema = z.object({
        name: z.string().startsWith(entry.name).endsWith(entry.name)
    })

    return <Form<ConfirmDeleteRequestValues, typeof schema>
        onSubmit={_ => {
            mutate(entry.id, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(archiveKeys.archive.root)
                    onSubmit()
                }
            })
        }}
        schema={schema}
        options={{
            mode: "onChange"
        }}
    >
        {({register, formState}) => <>
            <span className="text-gray-900">Чтобы подтвердить удаление введите:</span>
            <br/>
            <span className="text-blue-600">{entry.name}</span>
            <InputField
                noAutocomplete
                registration={register("name")}
            />

            <Button
                variant="danger"
                type="submit"
                startIcon={solid("trash")}
                className="w-full"
                isLoading={isLoading}
                disabled={!formState.isValid}
            >
                Удалить
            </Button>
        </>}
    </Form>
}