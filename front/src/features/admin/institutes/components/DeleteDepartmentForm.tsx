import {useQueryClient} from "@tanstack/react-query";
import {Form} from "../../../../ui/form/Form.tsx";
import {DeleteInstituteValues, DepartmentReplaceField} from "./DepartmentReplaceField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {Department} from "../../../common/institutes/model";
import {z} from "zod";
import {useDeleteDepartment} from "../api";
import {institutesKeys} from "../../../common/institutes/api";

const schema = z.record(
    z.string().regex(/(institute_id_)|(department_id_)\d+/),
    z.string().regex(/\d+/)
)

type DeleteDepartmentDialogProps = {
    department: Department;
    onSubmit: (data: void) => void;
    close: () => void
};

export const DeleteDepartmentForm = ({department, onSubmit, close}: DeleteDepartmentDialogProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading, error} = useDeleteDepartment()

    return <Form<DeleteInstituteValues, typeof schema>
        onSubmit={(data) => {
            console.log(data)

            const replacement =
                Object.entries(data)
                    .find(v => v[0].startsWith("department_id_"))?.[1]

            console.log({
                id: department.id,
                replacementId: replacement ? parseInt(replacement) : undefined
            })

            mutate({
                id: department.id,
                replacementId: replacement ? parseInt(replacement) : undefined
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root)
                    onSubmit()
                    close()
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

            <Button className="w-full mt-2"
                    isLoading={isLoading}
                    type="submit"
            >
                Подтвердить
            </Button>
        </>}
    </Form>
}