import {z} from "zod";
import {Form} from "../../../ui/form/Form.tsx";
import {InputField} from "../../../ui/form/InputField.tsx";
import {Button} from "../../../ui/button/Button.tsx";
import {useLoginUser} from "../api/loginUser.ts";
import {addUser} from "../authModel.ts";

const schema = z.object({
    email: z.string().min(1, "Это поле обязательное").email("Should be email"),
    password: z.string().min(1, "Это поле обязательное").min(8, "Must be at least 8 symbols")
});

type LoginValues = {
    email: string;
    password: string;
}

type LoginFormProps = {
    onSuccess: () => void;
};

export const LoginForm = ({onSuccess}: LoginFormProps) => {
    const {mutate, isLoading,} = useLoginUser();

    return (
        <div>
            <Form<LoginValues, typeof schema>
                onSubmit={(data, onError) => {
                    mutate(data, {
                        onSuccess: (response) => {
                            addUser(response.data)
                            onSuccess()
                        },
                        onError: err => onError(err.error.detail)
                    })
                }}
                schema={schema}
            >
                {({register, formState}) => (
                    <>
                        <InputField type="email"
                                    label="Электронная почта"
                                    error={formState.errors["email"]}
                                    registration={register("email")}/>
                        <InputField type="password"
                                    label="Пароль"
                                    error={formState.errors["password"]}
                                    registration={register("password")}/>
                        <div>
                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Войти
                            </Button>
                            {formState.errors["root"]?.message && (
                                <div role="alert" aria-label={formState.errors["root"].message}
                                     className="text-sm font-semibold text-red-500">
                                    {formState.errors["root"].message}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Form>
        </div>
    )
}