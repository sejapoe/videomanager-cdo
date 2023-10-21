import {z} from "zod";
import {Form} from "../../../ui/form/Form.tsx";
import {InputField} from "../../../ui/form/InputField.tsx";
import {Button} from "../../../ui/button/Button.tsx";
import {useLoginUser} from "../api/loginUser.ts";
import {addUser} from "../authModel.ts";

const schema = z.object({
    email: z.string().min(1, "Required").email("Should be email"),
    password: z.string().min(1, "Required").min(8, "Must be at least 8 symbols")
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
                onSubmit={(data) => {
                    mutate(data, {
                        onSuccess: (response) => {
                            addUser(response.data)
                            onSuccess()
                        }
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
                        </div>
                    </>
                )}
            </Form>
        </div>
    )
}