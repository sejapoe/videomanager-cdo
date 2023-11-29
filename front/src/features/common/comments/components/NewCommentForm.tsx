import {z} from "zod";
import {commentsKeys, useCreateComment} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {Form} from "../../../../ui/form/Form.tsx";
import {TextAreaField} from "../../../../ui/form/TextareaField.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useRef} from "react";
import clsx from "clsx";
import {Correction} from "../../corrections/model";

type NewCommentFormProps = { correction: Correction };

const schema = z.object({
    comment: z.string().min(1)
})

type NewCommentValues = {
    comment: string;
}

export const NewCommentForm = ({correction}: NewCommentFormProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useCreateComment(correction.id)
    const hiddenSubmitButton = useRef<HTMLButtonElement>(null);

    return <Form<NewCommentValues, typeof schema>
        onSubmit={(data, onError, {reset}) => {
            mutate(data.comment, {
                onSuccess: async (_,) => {
                    await queryClient.invalidateQueries(commentsKeys.comments.byCorrection(correction.id))
                    reset()
                },
                onError: err => onError(err.error.detail)
            })
        }}
        schema={schema}
    >
        {({register, formState}) => (
            <div className="relative">
                <TextAreaField
                    className="bg-gray-200 resize-none scrollbar-hide pr-6"
                    registration={register("comment")}
                    rows={1}
                    error={formState.errors["comment"] || formState.errors["root"]}
                    disabled={correction.closed || isLoading}
                    onKeyDown={event => {
                        if (event.key === "Enter" && event.ctrlKey) {
                            event.preventDefault()
                            hiddenSubmitButton.current?.click()
                        }
                    }}
                />
                {correction.closed ?
                    <div className="cursor-not-allowed absolute top-0 right-0 h-full flex items-center">
                        <FontAwesomeIcon icon={solid("lock")} className={clsx(
                            "mr-3",
                            isLoading ? "opacity-50" : ""
                        )}/>
                    </div>
                    : <div className="cursor-pointer absolute top-0 right-0 h-full flex items-center"
                           onClick={() => {
                               hiddenSubmitButton.current?.click()
                           }}>
                        <button className="hidden" type="submit" ref={hiddenSubmitButton}/>
                        <FontAwesomeIcon icon={regular("paper-plane")} className={clsx(
                            "mr-3",
                            isLoading ? "opacity-50" : ""
                        )}/>
                    </div>}
            </div>
        )}
    </Form>
};