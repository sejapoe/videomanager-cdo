import {Department, Institute} from "../../../common/institutes/model";
import {UseFormReturn} from "react-hook-form";
import {useInstitutes} from "../../../common/institutes/api";
import {SelectField} from "../../../../ui/form/SelectField.tsx";

export type DeleteInstituteValues = Record<string, string>

type DepartmentReplaceFieldProps = {
    excludeInstitute?: Institute;
    department: Department;
    methods: UseFormReturn<DeleteInstituteValues>
}

export const DepartmentReplaceField = ({
                                           excludeInstitute,
                                           department,
                                           methods: {register, watch, setValue, formState}
                                       }: DepartmentReplaceFieldProps) => {
    const {data: allInstitutes} = useInstitutes()

    if (!allInstitutes) return null;

    const institutes = excludeInstitute
        ? allInstitutes.filter(value => value.id != excludeInstitute.id)
        : allInstitutes

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
                        ?.departments
                        ?.filter(value => value.id != department.id)
                        ?.map(value => ({
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