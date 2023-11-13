import {useComments} from "../api";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import {useCurrentUser} from "../../../auth/authModel.ts";
import clsx from "clsx";
import {NewCommentForm} from "./NewCommentForm.tsx";

type CommentSide = "MINE" | "YOURS"

type SingleCommentProps = {
    timestamp: Date
    text: string
    side: CommentSide
}

const SingleComment = ({timestamp, text, side}: SingleCommentProps) => {
    return <div className={clsx(
        "flex w-full relative",
        side === "MINE" ? "justify-end" : "justify-start",
    )}
                title={timestamp.toLocaleString()}
    >
        <div className={clsx(
            side === "MINE" ? "bg-purple-800 text-white" : "bg-gray-700 text-white",
            "py-1 px-3 rounded w-fit max-w-[70%] break-words",
        )}>
            {text}
        </div>
    </div>
}

type CommentsProps = {
    correctionId: number;
}

export const Comments = ({correctionId}: CommentsProps) => {
    const user = useCurrentUser()
    const {data: comments, isLoading, isError} = useComments(correctionId)

    if (isLoading) return <CenterSpinner/>

    if (isError || !user) return <div className="text-gray-700">Произошла непредвиденная ошибка</div>

    return <div className="space-y-2">
        {comments?.map(value => (
            <SingleComment timestamp={value.timestamp} text={value.text}
                           side={value.author.role === user.role ? "MINE" : "YOURS"}/>
        ))}
        <NewCommentForm correctionId={correctionId}/>
    </div>;
}