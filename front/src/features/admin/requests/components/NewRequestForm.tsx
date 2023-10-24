import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {useInstitutes} from "../api/institutesApi.ts";
import Spinner from "../../../../ui/spinner";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {SelectField} from "../../../../ui/form/SelectField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useState} from "react";
import {NewLecturerDialog} from "./NewLecturerDialog.tsx";
import {useLecturers} from "../api/lecturerApi.ts";

const schema = z.object({
    name: z.string({required_error: "Required"}),
    lecturer: z.string(),
    institute_id: z.number({required_error: "Required"}).int("Should be integer").gt(0, "Should be positive"),
    department_id: z.number({required_error: "Required"}).int("Should be integer").gt(0, "Should be positive"),
    linkToMoodle: z.string({required_error: "Required"}).url("Should be valid url")
})

type NewRequestValues = {
    name: string;
    lecturer_id: number;
    institute_id: number;
    department_id: number;
    linkToMoodle: string;
}

export const NewRequestForm = () => {
    const {
        data: institutes,
        isLoading: isLoadingInstitutes,
        // isError,
        // error
    } = useInstitutes()

    const {
        data: lecturers,
        isLoading: isLoadingLecturers
    } = useLecturers()

    const [isNewLecturerDialogOpen, setIsNewLecturerDialogOpen] = useState(false)

    if (isLoadingInstitutes || isLoadingLecturers) return <div className="flex justify-center items-center">
        <Spinner/>
    </div>

    return (
        <>
            <NewLecturerDialog isOpen={isNewLecturerDialogOpen} setOpen={setIsNewLecturerDialogOpen}/>
            <Form<NewRequestValues, typeof schema>
                onSubmit={data => {
                    console.log(data)
                }}
            >
                {({register, formState, watch}) => (
                    <>
                        <InputField type="text"
                                    label="Наименование"
                                    error={formState.errors["name"]}
                                    registration={register("name")}/>

                        <div className="flex w-full space-x-3">
                            <SelectField
                                // className=
                                options={lecturers?.map(value => ({
                                    value: value.id,
                                    label: value.fullName,
                                })) || []}
                                error={formState.errors["lecturer_id"]}
                                registration={register("lecturer_id")}
                            />

                            <Button onClick={() => setIsNewLecturerDialogOpen(true)}><FontAwesomeIcon
                                icon={solid("plus")}/></Button>
                        </div>

                        <SelectField
                            options={institutes?.map(value => ({
                                value: value.id,
                                label: value.name
                            })) || []}
                            label={"Институт"}
                            error={formState.errors["institute_id"]}
                            registration={register("institute_id")}/>

                        <SelectField
                            options={institutes?.find(v => v.id == watch("institute_id"))?.departments?.map(value => ({
                                value: value.id,
                                label: value.name
                            })) || []}
                            label={"Кафедра"}
                            error={formState.errors["department_id"]}
                            registration={register("department_id")}/>

                        <InputField type="text"
                                    label="Ссылка СДО"
                                    error={formState.errors["linkToMoodle"]}
                                    registration={register("linkToMoodle")}/>
                    </>
                )}
            </Form>
        </>
    );
};