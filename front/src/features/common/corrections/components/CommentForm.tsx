import {z} from "zod";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useRef, useState} from "react";
import {TextAreaField} from "../../../../ui/form/TextareaField.tsx";
import {Form} from "../../../../ui/form/Form.tsx";
import Spinner from "../../../../ui/spinner";
import {useUpdateComment} from "../api";
import clsx from "clsx";
import {FieldWrapper} from "../../../../ui/form/FieldWrapper.tsx";

const schema = z.object({
    comment: z.string()
})

type CorrectionValues = {
    comment: string;
}

type CommentFormProps = CommentProps & {
    correctionId: number;
}

// TODO: разобраться с overflow по y, когда большой текст

export const CommentForm = ({correctionId, label, comment}: CommentFormProps) => {
    const {mutate, isLoading} = useUpdateComment(correctionId)
    const [disabled, setDisabled] = useState(true)
    const hiddenSubmitButton = useRef<HTMLButtonElement>(null);

    return <Form<CorrectionValues, typeof schema>
        options={{
            defaultValues: {
                comment
            }
        }}
        onSubmit={data => {
            setDisabled(true)
            mutate(data)
        }}
        schema={schema}
    >
        {({register, setFocus}) => (
            <div className="relative p-4">
                <TextAreaField
                    label={label}
                    className="resize-none pr-5 bg-transparent border border-gray-400 w-full h-full row-auto"
                    registration={register("comment")}
                    disabled={disabled}
                    rows={5}
                />
                {
                    isLoading ?
                        <div className="absolute top-10 end-5 cursor-pointer">
                            <Spinner/>
                        </div>
                        :
                        disabled ?
                            <div className="absolute top-10 end-5 cursor-pointer" onClick={() => {
                                setDisabled(false);
                                setFocus("comment")
                            }}>
                                <FontAwesomeIcon icon={solid("edit")}/>
                            </div> :
                            <div className="absolute top-10 end-5 cursor-pointer"
                                 onClick={() => hiddenSubmitButton.current?.click()}>
                                <button className="hidden" type="submit" ref={hiddenSubmitButton}/>
                                <FontAwesomeIcon icon={solid("save")}/>
                            </div>
                }
            </div>
        )}
    </Form>
}

type CommentProps = {
    comment: string;
    label: string;
}

export const Comment = ({comment, label}: CommentProps) => {

    return <FieldWrapper label={label} className="relative pl-0 p-4">
      <textarea
          className={clsx(
              "appearance-none block w-full px-3 py-2 pr-5 border border-gray-300 rounded-md shadow-sm",
              "focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
              "resize-none p-2 bg-transparent border border-black w-full h-full row-auto"
          )}
          disabled
          rows={5}
          value={comment}
      />
    </FieldWrapper>
}