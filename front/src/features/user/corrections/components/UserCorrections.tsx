import {CorrectionsProps} from "../../../common/corrections/components/CorrectionProps.ts";
import {Correction} from "../../../common/corrections/model";
import {Comment, CommentForm} from "../../../common/corrections/components/CommentForm.tsx";
import {CorrectionView} from "../../../common/corrections/components/CorrectionView.tsx";
import {NewCorrection} from "./NewCorrection.tsx";

type CorrectionProps = {
    correction: Correction
}

const UserCorrection = ({correction}: CorrectionProps) => {
    return <CorrectionView correction={correction} commentSection={<>
        <CommentForm label="Комментарий преподавателя" correctionId={correction.id} comment={correction.comment}/>
        <Comment label="Комментарий администратора" comment={correction.adminComment}/>
    </>}/>
}

export const UserCorrections = ({parentRequestId, corrections}: CorrectionsProps) => {
    return <div className="space-y-2">
        {corrections.map(value => (
            <UserCorrection correction={value} key={value.id}/>
        ))}
        <NewCorrection requestId={parentRequestId}/>
    </div>
}