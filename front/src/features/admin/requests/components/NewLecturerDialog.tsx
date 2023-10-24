import React from "react";
import {Dialog} from "@headlessui/react";
import {Form} from "../../../../ui/form/Form.tsx";
import {z} from "zod";
import {InputField} from "../../../../ui/form/InputField.tsx";
import {Button} from "../../../../ui/button/Button.tsx";

const schema = z.object({
    name: z.string().min(1, "Required"),
    email: z.string().min(1, "Required").email("Must be email")
});

type NewLecturerValues = {
    name: string;
    email: string;
}

type NewLecturerDialogProps = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewLecturerDialog = ({isOpen, setOpen}: NewLecturerDialogProps) => {
    return <Dialog open={isOpen} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

        <div className="fixed inset-0 flex w-screen h-screen items-center justify-center p-4">
            <Dialog.Panel className="mx-auto min-w-fit max-w-sm rounded bg-white p-4">
                <Dialog.Title className="text-gray-500 text-xl font-bold mb-4">Создание преподавателя</Dialog.Title>

                <Form<NewLecturerValues, typeof schema>
                    onSubmit={(data) => {
                        // mutate data
                        console.log(data)
                    }}
                    schema={schema}
                >
                    {({register, formState}) => (
                        <>
                            <InputField
                                type="text"
                                label="Полное имя"
                                error={formState.errors["name"]}
                                registration={register("name")}
                            />

                            <InputField
                                type="email"
                                label="Эллектронная почта"
                                error={formState.errors["email"]}
                                registration={register("email")}
                            />

                            <div className="flex flex-row space-x-2">
                                <Button className="w-full" type="submit">
                                    Создать
                                </Button>
                                <Button className="w-full" variant="inverse" onClick={() => setOpen(false)}>
                                    Закрыть
                                </Button>
                            </div>

                        </>
                    )}
                </Form>


            </Dialog.Panel>
        </div>
    </Dialog>
}