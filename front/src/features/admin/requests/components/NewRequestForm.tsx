import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {useInstitutes} from "../api/institutesApi.ts";
import Spinner from "../../../../ui/spinner";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {SelectField} from "../../../../ui/form/SelectField.tsx";

const schema = z.object({
    name: z.string({required_error: "Required"}),
    lecturer: z.string(),
    institute_id: z.number({required_error: "Required"}).int("Should be integer").gt(0, "Should be positive"),
    department_id: z.number({required_error: "Required"}).int("Should be integer").gt(0, "Should be positive"),
    linkToMoodle: z.string({required_error: "Required"}).url("Should be valid url")
})

type NewRequestValues = {
    name: string;
    lecturer: string;
    institute_id: number;
    department_id: number;
    linkToMoodle: string;
}

export const NewRequestForm = () => {
    const {
        data: institutes,
        isLoading,
        // isError,
        // error
    } = useInstitutes()

    if (isLoading) return <div className="flex justify-center items-center">
        <Spinner/>
    </div>

    return <Form<NewRequestValues, typeof schema>
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
    </Form>;
};