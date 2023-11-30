import {useQueryClient} from "@tanstack/react-query";
import {Form} from "../../../../../ui/form/Form.tsx";
import {DeleteInstituteValues, DepartmentReplaceField} from "./DepartmentReplaceField.tsx";
import {Button} from "../../../../../ui/button/Button.tsx";
import {Department} from "../../../../common/institutes/model";
import {z} from "zod";
import {useDeleteDepartment} from "../../api";
import {institutesKeys} from "../../../../common/institutes/api";
import {FieldWrapper} from "../../../../../ui/form/FieldWrapper.tsx";

const schema = z.record(
    z.string().regex(/(institute_id_)|(department_id_)\d+/),
    z.string().regex(/\d+/)
)

type DeleteDepartmentDialogProps = {
    department: Department;
    onSubmit: (data: void) => void;
};

export const DeleteDepartmentForm = ({department, onSubmit}: DeleteDepartmentDialogProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading, error} = useDeleteDepartment()

    return <Form<DeleteInstituteValues, typeof schema>
        onSubmit={(data, onError) => {
            console.log(data)

            const replacement =
                Object.entries(data)
                    .find(v => v[0].startsWith("department_id_"))?.[1]

            mutate({
                id: department.id,
                replacementId: replacement ? parseInt(replacement) : undefined
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root)
                    onSubmit()
                },
                onError: err => {
                    if (err.error.status != 409) {
                        onError(err.error.detail)
                    }
                }
            })
        }}
        schema={schema}
        className="space-y-4"
    >
        {(methods) => <>
            {
                (!!error && error.status === 409) ? <div className="text-gray-900">
                <span className="text-red-600">
                    Невозможно удалить кафедру
                </span>
                        <div className="mt-2">
                            <DepartmentReplaceField key={department.id}
                                                    department={department}
                                                    methods={methods}/>
                        </div>
                    </div> :
                    <p className="text-gray-900">
                        Подтвердите удаление кафедры <strong
                        className="font-bold text-blue-600 italic">{department.name}</strong>
                    </p>
            }

            <FieldWrapper error={methods.formState.errors["root"]}>
                <Button className="w-full mt-2"
                        isLoading={isLoading}
                        type="submit"
                >
                    Подтвердить
                </Button>
            </FieldWrapper>
        </>}
    </Form>
}