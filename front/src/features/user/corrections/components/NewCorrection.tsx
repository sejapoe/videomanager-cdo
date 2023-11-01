import {Button} from "../../../../ui/button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Transition} from "@headlessui/react";
import {useState} from "react";
import {z} from "zod";
import {Form} from "../../../../ui/form/Form.tsx";
import {TextAreaField} from "../../../../ui/form/TextareaField.tsx";
import clsx, {ClassValue} from "clsx";
import {Control, Controller} from "react-hook-form";
import InputMask from "react-input-mask";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";
import {useCreateCorrection} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {requestsKeys} from "../../../common/requests/api";

type LabeledTimeCodeProps = {
    label: string;
    control: Control<any, any>;
    name: string;
    className?: ClassValue;
}


function TimeCodeField({label, name, control, className}: LabeledTimeCodeProps) {
    return <Controller
        name={name}
        defaultValue="00:00:00"
        control={control}
        render={({field: {onChange, value}, formState}) => (
            <FieldWrapper label={label} error={formState.errors[name] as any} className={clsx(className)}>
                <InputMask mask="99:99:99" value={value} onChange={onChange}>
                    {((inputProps: any) => (
                        <input
                            {...inputProps}
                            type="tel"
                            className={clsx(
                                "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200",
                                "shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                            )}
                        />
                    )) as any}
                </InputMask>
            </FieldWrapper>
        )}
    />
}

const parseTimeCode = (str: string) => {
    const s = str.split(":").map(v => parseInt(v))
    return s[0] * 3600 + s[1] * 60 + s[2];
}

const schema = z.object({
    startTimeCode: z.string().min(8).max(8),
    endTimeCode: z.string().min(8).max(8),
    comment: z.string().min(1)
}).refine(arg => (
    parseTimeCode(arg.endTimeCode) > parseTimeCode(arg.startTimeCode)
), {
    message: ("Конец отрезка должен быть после начала!"),
    path: ['startTimeCode']
})

type NewCorrectionValues = {
    startTimeCode: string;
    endTimeCode: string;
    comment: string;
}

type NewCorrectionFormProps = NewCorrectionProps & {
    close: () => void;
}

export const NewCorrectionForm = ({requestId, close}: NewCorrectionFormProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useCreateCorrection()

    return <Form<NewCorrectionValues, typeof schema>
        schema={schema}
        onSubmit={(data) => {
            mutate({
                startTimeCode: parseTimeCode(data.startTimeCode),
                endTimeCode: parseTimeCode(data.endTimeCode),
                comment: data.comment,
                requestId
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(requestsKeys.requests.byId(requestId))
                    close()
                }
            })
        }}
        onReset={close}
    >
        {({register, formState, control}) => (
            <>
                <div className="p-4 grid grid-cols-3">
                    <div className="col-span-2">
                        <div className="flex flex-col">
                            <div className="relative grid grid-cols-4 grid-rows-4 gap-4 p-4 w-full pb-0">
                                <TimeCodeField className="row-span-1 col-span-2" label={"Начало отрезка"}
                                               name="startTimeCode"
                                               control={control}/>
                                <TimeCodeField className="row-span-1 col-span-2" label={"Конец отрезка"}
                                               name="endTimeCode"
                                               control={control}/>

                                <div className="row-span-2 col-span-2">
                                    <TextAreaField
                                        label="Комментарий"
                                        className="resize-none pr-5 bg-transparent border border-black w-full h-full row-auto"
                                        rows={5}
                                        error={formState.errors["comment"]}
                                        registration={register("comment")}
                                    />
                                </div>

                                <div
                                    className="row-span-2 col-span-2 flex justify-center items-center text-3xl font-serif italic">
                                    Пустое место™
                                </div>

                                <Button isLoading={isLoading} variant="primary" className="row-span-1 col-span-1"
                                        type="submit">
                                    <FontAwesomeIcon size="2x" icon={solid("plus")}/>
                                </Button>
                                <Button disabled={isLoading} variant="danger" className="row-span-1 col-span-1"
                                        type="reset">
                                    <FontAwesomeIcon size="2x" icon={solid("close")}/>
                                </Button>
                            </div>
                            {/*<div className="px-4 pt-2 grid grid-cols-4 gap-4">*/}
                            {/*</div>*/}

                        </div>
                    </div>
                    <div className="bg-gray-600 p-2 col-span-1 text-white">

                    </div>
                </div>
            </>
        )}
    </Form>
}

type NewCorrectionProps = {
    requestId: number;
}

export const NewCorrection = ({
                                  requestId
                              }: NewCorrectionProps) => {
    const [isShow, setShow] = useState(false)

    return <div className="relative">
        <Transition
            show={!isShow}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transform duration-400 transition ease-in-out"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
        >
            <div className="absolute w-full flex justify-center">
                <Button onClick={() => setShow(true)}>
                    <FontAwesomeIcon icon={solid("plus")}/>
                </Button>
            </div>
        </Transition>
        <Transition
            show={isShow}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-95 "
        >
            <div className="absolute w-full border-2 text-gray-700 border-blue-600">
                <NewCorrectionForm requestId={requestId} close={() => setShow(false)}/>
            </div>
        </Transition>

    </div>;
}