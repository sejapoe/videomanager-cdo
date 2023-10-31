import {CorrectionView} from "../../../common/corrections/components/CorrectionView.tsx";
import {Comment, CommentForm} from "../../../common/corrections/components/CommentForm.tsx";
import {Correction} from "../../../common/corrections/model";
import {CorrectionsProps} from "../../../common/corrections/components/CorrectionProps.ts";
import {useUpdateAdminComment} from "../api/correctionsApi.ts";

type CorrectionProps = {
    correction: Correction
}

const AdminCorrection = ({correction}: CorrectionProps) => {
    return <CorrectionView correction={correction} commentSection={<>
        <Comment label="Комментарий преподавателя" comment={correction.comment}/>
        <CommentForm label="Комментарий администратора" comment={correction.adminComment} correctionId={correction.id}
                     useMutation={useUpdateAdminComment}/>
    </>}/>
}

export const AdminCorrections = ({corrections}: CorrectionsProps) => {
    return <div className="space-y-2">
        {corrections.map(value => (
            <AdminCorrection correction={value} key={value.id}/>
        ))}
    </div>
}