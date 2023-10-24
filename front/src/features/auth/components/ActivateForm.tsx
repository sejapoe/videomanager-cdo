import {User} from "../api/getActivation.ts";
import {z} from "zod";
import {Form} from "../../../ui/form/Form.tsx";
import {InputField} from "../../../ui/form/InputField.tsx";
import {useActivateUser} from "../api/activateUser.ts";
import {addUser} from "../authModel.ts";
import {Button} from "../../../ui/button/Button.tsx";

const schema = z.object({
    password: z.string().min(8, "Пароль должен содержать как минимум 8 символов"),
    confirmPassword: z.string()
}).superRefine(({password, confirmPassword}, ctx) => {
    if (confirmPassword != password) {
        ctx.addIssue({
            code: "custom",
            message: "Пароли должны совпадать",
            path: ['confirmPassword']
        })
    }
})

type ActivateValues = {
    password: string;
    confirmPassword: string;
}

type ActivateFormProps = {
    uuid: string;
    user: User;
    onSuccess: () => void;
}

export const ActivateForm = ({uuid, user, onSuccess}: ActivateFormProps) => {
    const {mutate, isLoading} = useActivateUser();


    return <Form<ActivateValues, typeof schema>
        onSubmit={({password}) => {
            mutate({
                password,
                uuid,
            }, {
                onSuccess: (response) => {
                    addUser(response.data)
                    onSuccess()
                }
            })
        }} schema={schema}>
        {({register, formState}) => (
            <>
                <span className="text-gray-900">Добро пожаловать, {user.fullName}</span>

                <InputField
                    label="Пароль"
                    type="password"
                    error={formState.errors["password"]}
                    registration={register("password")}
                />

                <InputField
                    label="Потдверждение пароля"
                    type="password"
                    error={formState.errors["confirmPassword"]}
                    registration={register("confirmPassword")}
                />

                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full"
                >Подтвердить</Button>
            </>
        )}
    </Form>
}