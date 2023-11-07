import {z} from "zod";
import {commentKeys, useCreateComment} from "../api";
import {useQueryClient} from "@tanstack/react-query";
import {Form} from "../../../../ui/form/Form.tsx";
import {TextAreaField} from "../../../../ui/form/TextareaField.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useRef} from "react";
import clsx from "clsx";

type NewCommentFormProps = { correctionId: number };

const schema = z.object({
    comment: z.string().min(1)
})

type NewCommentValues = {
    comment: string;
}

export const NewCommentForm = ({correctionId}: NewCommentFormProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useCreateComment(correctionId)
    const hiddenSubmitButton = useRef<HTMLButtonElement>(null);
    const hiddenResetButton = useRef<HTMLButtonElement>(null)

    return <Form<NewCommentValues, typeof schema>
        onSubmit={(data, e) => {
            mutate(data.comment, {
                onSuccess: async (_) => {
                    await queryClient.invalidateQueries(commentKeys.comments.byCorrection(correctionId))
                    // hiddenResetButton.current?.click()
                    console.log(hiddenResetButton.current)
                    e?.target?.reset()
                }
            })
        }}
        schema={schema}
    >
        {({register, reset}) => (
            <div className="relative">
                <TextAreaField
                    className="bg-gray-200 resize-none scrollbar-hide pr-6"
                    registration={register("comment")}
                    rows={1}
                    disabled={isLoading}
                />
                <div className="cursor-pointer absolute top-0 right-0 h-full flex items-center"
                     onClick={() => {
                         hiddenSubmitButton.current?.click()
                     }}>
                    <button className="hidden" type="submit" ref={hiddenSubmitButton}/>
                    <button className="hidden" type="reset" ref={hiddenResetButton}/>
                    <FontAwesomeIcon icon={regular("paper-plane")} className={clsx(
                        "mr-3",
                        isLoading ? "opacity-50" : ""
                    )}/>
                </div>
            </div>
        )}
    </Form>
};