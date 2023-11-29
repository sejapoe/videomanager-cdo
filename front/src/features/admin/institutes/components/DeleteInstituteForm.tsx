import {Button} from "../../../../ui/button/Button.tsx";
import {InstituteWithDepartments} from "../../../common/institutes/model";
import {useDeleteInstitute} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys} from "../../../common/institutes/api";
import {Form} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {DeleteInstituteValues, DepartmentReplaceField} from "./DepartmentReplaceField.tsx";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";
import {useState} from "react";

const schema = z.record(
    z.string().regex(/(institute_id_)|(department_id_)\d+/),
    z.string().regex(/\d+/)
)

type DeleteInstituteDialogProps = {
    institute: InstituteWithDepartments;
    onSubmit: (data: void) => void;
    close: () => void
};

export const DeleteInstituteForm = ({institute, onSubmit, close}: DeleteInstituteDialogProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useDeleteInstitute()
    const [departmentIds, setDepartmentIds] = useState<number[] | null>(null)

    return <Form<DeleteInstituteValues, typeof schema>
        onSubmit={(data, onError) => {
            const replacement =
                Object.fromEntries(
                    Object.entries(data)
                        .filter(v => v[0].startsWith("department_id_"))
                        .map(v => [v[0].replace("department_id_", ""), parseInt(v[1])])
                )

            mutate({
                id: institute.id,
                departmentReplacement: replacement
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(institutesKeys.institutes.root)
                    onSubmit()
                    close()
                },
                onError: err => {
                    if (err.error.status == 409) {
                        setDepartmentIds(err.error.departmentIds)
                    } else {
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
                departmentIds
                    ? <div className="text-gray-900">
                        <span className="text-red-600">
                            Невозможно удалить институт. Выберите замены для следующих кафедр
                        </span>
                        <div className="space-y-4 mt-2">
                            {
                                institute.departments
                                    .filter(value => departmentIds.includes(value.id))
                                    .map(value =>
                                        <DepartmentReplaceField key={value.id} excludeInstitute={institute}
                                                                department={value}
                                                                methods={methods}/>
                                    )
                            }
                        </div>
                    </div>
                    : <p className="text-gray-900">
                        Подтвердите удаление института
                        <strong className="font-bold text-blue-600 italic"> {institute.name}</strong>
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