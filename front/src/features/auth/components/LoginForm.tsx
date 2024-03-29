import {z} from "zod";
import {Form} from "../../../ui/form/Form.tsx";
import {InputField} from "../../../ui/form/InputField.tsx";
import {Button} from "../../../ui/button/Button.tsx";
import {useLoginUser} from "../api/loginUser.ts";
import {addUser} from "../authModel.ts";

const schema = z.object({
    email: z.string().min(1, "Заполните обязательное поле").email("Введите корректную электронную почту"),
    password: z.string().min(8, "Пароль должен содержат как минимум из 8 символов")
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
                            addUser({
                                info: response.data.userInfo,
                                accessToken: response.data.accessToken,
                                refreshToken: response.data.refreshToken
                            })
                            onSuccess()
                        },
                        onError: err =>
                            err.status === 403
                                ? onError("Неверный логин или пароль")
                                : onError(err.error.detail)
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