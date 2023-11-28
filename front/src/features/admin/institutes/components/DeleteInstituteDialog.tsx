import {Button} from "../../../../ui/button/Button.tsx";
import {Department, Institute, InstituteWithDepartments} from "../../../common/institutes/model";
import {useDeleteInstitute} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {institutesKeys, useInstitutes} from "../../../common/institutes/api";
import {SelectField} from "../../../../ui/form/SelectField.tsx";
import {UseFormReturn} from "react-hook-form";
import {Form} from "../../../../ui/form/Form.tsx";
import {z} from "zod";

const schema = z.record(
    z.string().regex(/(institute_id_)|(department_id_)\d+/),
    z.string().regex(/\d+/)
)

type DeleteInstituteValues = Record<string, string>

type DepartmentReplaceFieldProps = {
    excludeInstitute: Institute;
    department: Department;
    methods: UseFormReturn<DeleteInstituteValues>
}

const DepartmentReplaceField = ({
                                    excludeInstitute,
                                    department,
                                    methods: {register, watch, setValue, formState}
                                }: DepartmentReplaceFieldProps) => {
    const {data: allInstitutes} = useInstitutes()

    if (!allInstitutes) return null;

    const institutes = allInstitutes.filter(value => value.id != excludeInstitute.id)

    const instituteFieldName = `institute_id_${department.id}`;
    const departmentFieldName = `department_id_${department.id}`;

    return <div className="p-2 border">
        <span>Замена кафедры <span className="text-red-600">{department.name}</span> в запросах и архиве на:</span>
        <div className="grid grid-cols-2 gap-x-4 mt-2">
            <SelectField
                defaultBlank
                options={institutes.map(value => ({
                    value: value.id,
                    label: value.name
                }))}
                label={"Институт"}
                error={formState.errors[instituteFieldName]}
                registration={register(instituteFieldName, {
                    onChange: () => {
                        setValue(departmentFieldName, "")
                    }
                })}/>

            <SelectField
                defaultBlank
                defaultBlankText={!watch(instituteFieldName) ? " -- выберите институт -- " : undefined}
                options={
                    institutes
                        .find(v => v.id.toString() == watch(instituteFieldName))
                        ?.departments?.map(value => ({
                        value: value.id,
                        label: value.name
                    })) || []
                }
                label={"Кафедра"}
                error={formState.errors[departmentFieldName]}
                registration={register(departmentFieldName)}/>
        </div>

    </div>
}

type DeleteInstituteDialogProps = {
    institute: InstituteWithDepartments;
    onSubmit: (data: void) => void;
    close: () => void
};

export const DeleteInstituteDialog = ({institute, onSubmit, close}: DeleteInstituteDialogProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading, error} = useDeleteInstitute()

    return <Form<DeleteInstituteValues, typeof schema>
        onSubmit={(data) => {
            console.log(data)

            const replacement =
                Object.fromEntries(
                    Object.entries(data)
                        .filter(v => v[0].startsWith("department_id_"))
                        .map(v => [v[0].replace("department_id_", ""), parseInt(v[1])])
                )

            console.log(replacement)

            mutate({
                id: institute.id,
                departmentReplacement: replacement
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
                (!!error && !!error.error.departmentIds) ? <div className="text-gray-900">
                <span className="text-red-600">
                    Невозможно удалить институт. Выберите замены для следующих кафедр
                </span>
                        <div className="space-y-4 mt-2">
                            {
                                institute.departments
                                    .filter(value => error.error.departmentIds.includes(value.id))
                                    .map(value =>
                                        <DepartmentReplaceField key={value.id} excludeInstitute={institute}
                                                                department={value}
                                                                methods={methods}/>
                                    )
                            }
                        </div>
                    </div> :
                    <p className="text-gray-900">
                        Подтвердите удаление института <strong className="font-bold italic">{institute.name}</strong>
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