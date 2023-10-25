import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {useInstitutes} from "../api/institutesApi.ts";
import Spinner from "../../../../ui/spinner";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {SelectField} from "../../../../ui/form/SelectField.tsx";
import {NewLecturerDialog} from "./NewLecturerDialog.tsx";
import {lecturerKeys, useLecturers} from "../api/lecturerApi.ts";
import {ComboboxField} from "../../../../ui/form/ComboboxField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {useDialog} from "../../../../hooks/useDialog.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useCreateRequest} from "../api/requestsApi.ts";

const schema = z.object({
    name: z.string().min(1, "Required"),
    lecturer_id: z.number().positive("Required"),
    institute_id: z.string().min(1, "Required"),
    department_id: z.string().min(1, "Required"),
    linkToMoodle: z.string().url("Should be valid url")
})

type NewRequestValues = {
    name: string;
    lecturer_id: number;
    institute_id: string;
    department_id: string;
    linkToMoodle: string;
}

type NewRequestFormProps = {
    onSuccess: () => void;
}

export const NewRequestForm = ({onSuccess}: NewRequestFormProps) => {
    const {mutate, isLoading} = useCreateRequest();

    const queryClient = useQueryClient();

    const {
        data: institutes,
        isLoading: isLoadingInstitutes,
    } = useInstitutes()

    const {
        data: lecturers,
        isLoading: isLoadingLecturers
    } = useLecturers()

    const {Dialog, open} = useDialog<string, number>({
        title: "Создание преподавателя",
    })

    if (isLoadingInstitutes || isLoadingLecturers) return <div className="flex justify-center items-center">
        <Spinner/>
    </div>

    return (
        <>
            <Dialog>
                {({args: name, ok, close}) => (
                    <NewLecturerDialog onSubmit={ok} defaultName={name} close={close}/>
                )}
            </Dialog>
            <Form<NewRequestValues, typeof schema>
                onSubmit={data => {
                    console.log(data)
                    mutate({
                        name: data.name,
                        lecturer_id: data.lecturer_id,
                        institute_id: parseInt(data.institute_id),
                        department_id: parseInt(data.department_id),
                        linkToMoodle: data.linkToMoodle
                    }, {
                        onSuccess
                    })
                }}
                schema={schema}
                className="w-1/3"
            >
                {({register, formState, watch, control, setValue}) => (
                    <>
                        <InputField type="text"
                                    noAutocomplete
                                    label="Наименование"
                                    error={formState.errors["name"]}
                                    registration={register("name")}/>

                        <ComboboxField
                            name="lecturer_id"
                            defaultValue={-1}
                            label="Преподаватель"
                            options={lecturers?.map(value => ({
                                value: value.id,
                                label: value.fullName,
                            })) || []}
                            error={formState.errors["lecturer_id"]}
                            control={control}
                            notFoundComponent={(query) => (
                                <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                        open(query, async (data) => {
                                            await queryClient.invalidateQueries(lecturerKeys.lecturers.root)
                                            // @ts-ignore
                                            setValue("lecturer_id", data)
                                        })
                                    }}
                                >
                                    Создать преподавателя "{query}"
                                </span>
                            )}
                        />

                        <SelectField
                            defaultBlank
                            options={institutes?.map(value => ({
                                value: value.id,
                                label: value.name
                            })) || []}
                            label={"Институт"}
                            error={formState.errors["institute_id"]}
                            registration={register("institute_id", {
                                onChange: () => {
                                    setValue("department_id", "")
                                }
                            })}/>

                        <SelectField
                            defaultBlank
                            options={
                                institutes?.find(v => v.id.toString() == watch("institute_id"))?.departments?.map(value => ({
                                    value: value.id,
                                    label: value.name
                                })) || []
                            }
                            label={"Кафедра"}
                            error={formState.errors["department_id"]}
                            registration={register("department_id")}/>

                        <InputField type="text"
                                    noAutocomplete
                                    label="Ссылка СДО"
                                    error={formState.errors["linkToMoodle"]}
                                    registration={register("linkToMoodle")}/>

                        <Button type="submit" isLoading={isLoading}>Создать</Button>
                    </>
                )}
            </Form>
        </>
    );
};