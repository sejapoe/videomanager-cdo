import {FullRequest} from "../../../common/requests/model";
import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {useDeleteRequest} from "../api";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useQueryClient} from "@tanstack/react-query";
import {requestsKeys} from "../../../common/requests/api";

type ConfirmDeleteRequestValues = {
    name: string;
}

type ConfirmDeleteRequestFormProps = {
    request: FullRequest;
    onSubmit: () => void;
}

export const ConfirmDeleteRequestForm = ({request, onSubmit}: ConfirmDeleteRequestFormProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useDeleteRequest()

    const schema = z.object({
        name: z.string().startsWith(request.name).endsWith(request.name)
    })

    return <Form<ConfirmDeleteRequestValues, typeof schema>
        onSubmit={_ => {
            mutate(request.id, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(requestsKeys.requests.root)
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
            <span className="text-blue-600">{request.name}</span>
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