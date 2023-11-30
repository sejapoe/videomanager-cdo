import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {useInstitutes} from "../../../common/institutes/api";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {SelectField} from "../../../../ui/form/SelectField.tsx";
import {NewLecturerDialog} from "../../lecturers/components/NewLecturerDialog.tsx";
import {useLecturers} from "../../lecturers/api";
import {ComboboxField} from "../../../../ui/form/ComboboxField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {GenericErrorModel} from "../../../../api";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";
import {useDialog} from "../../../../providers/DialogProvider.tsx";

const schema = z.object({
    name: z.string().min(1, "Required"),
    lecturer_id: z.number().positive("Required"),
    institute_id: z.string().min(1, "Required"),
    department_id: z.string().min(1, "Required"),
    linkToMoodle: z.string().url("Should be valid url"),
    linkToVideo: z.string().url("Should be valid url")
})

type NewRequestLikeValues = {
    name: string;
    lecturer_id: number;
    institute_id: string;
    department_id: string;
    linkToMoodle: string;
    linkToVideo: string;
}


type NewRequestLikeFormProps = {
    onSuccess: () => void;
    mutationRes: UseMutationResult<any, GenericErrorModel, any, any>
    invalidationKeys: unknown[]
}

export const NewRequestLikeForm = ({
                                       onSuccess,
                                       mutationRes,
                                       invalidationKeys
                                   }: NewRequestLikeFormProps) => {
    const {mutate, isLoading} = mutationRes;

    const queryClient = useQueryClient();

    const {
        data: institutes,
        isLoading: isLoadingInstitutes,
    } = useInstitutes()

    const {
        data: lecturers,
        isLoading: isLoadingLecturers
    } = useLecturers({})

    const open = useDialog({
        title: "Создание преподавателя",
    })

    return (
        <ErrorLoadLayout isLoading={isLoadingLecturers || isLoadingInstitutes}>
            <Form<NewRequestLikeValues, typeof schema>
                onSubmit={(data, onError) => {
                    mutate({
                        name: data.name,
                        lecturer_id: data.lecturer_id,
                        institute_id: parseInt(data.institute_id),
                        department_id: parseInt(data.department_id),
                        linkToMoodle: data.linkToMoodle,
                        linkToVideo: data.linkToVideo
                    }, {
                        onSuccess,
                        onError: err => onError(err.error.detail)
                    })
                }}
                schema={schema}
                className="md:w-1/3"
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
                            options={lecturers?.content?.map(value => ({
                                value: value.id,
                                label: value.fullName,
                            })) || []}
                            error={formState.errors["lecturer_id"]}
                            control={control}
                            notFoundComponent={(query) => (
                                <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                        open({
                                            children: (close) =>
                                                <NewLecturerDialog
                                                    onSubmit={async (data) => {
                                                        await queryClient.invalidateQueries(invalidationKeys)
                                                        close()
                                                        setValue("lecturer_id", data)
                                                    }} defaultName={query}/>
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
                            defaultBlankText={!watch("institute_id") ? " -- выберите институт -- " : undefined}
                            options={
                                institutes
                                    ?.find(v => v.id.toString() == watch("institute_id"))
                                    ?.departments?.map(value => ({
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

                        <InputField type="text"
                                    noAutocomplete
                                    label="Ссылка на видео"
                                    error={formState.errors["linkToVideo"]}
                                    registration={register("linkToVideo")}/>
                        <FieldWrapper error={formState.errors["root"]}>
                            <Button type="submit" isLoading={isLoading}>Создать</Button>
                        </FieldWrapper>
                    </>
                )}
            </Form>
        </ErrorLoadLayout>
    );
};