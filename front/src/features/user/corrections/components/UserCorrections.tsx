import {Button} from "../../../../ui/button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {CorrectionsProps} from "../../../common/corrections/components/CorrectionProps.ts";
import {Correction} from "../../../common/corrections/model";
import {Comment, CommentForm} from "../../../common/corrections/components/CommentForm.tsx";
import {useUpdateUserComment} from "../api/correcitonsApi.ts";
import {CorrectionView} from "../../../common/corrections/components/CorrectionView.tsx";

type CorrectionProps = {
    correction: Correction
}

const UserCorrection = ({correction}: CorrectionProps) => {
    return <CorrectionView correction={correction} commentSection={<>
        <CommentForm label="Комментарий преподавателя" correctionId={correction.id} comment={correction.comment}
                     useMutation={useUpdateUserComment}/>
        <Comment label="Комментарий администратора" comment={correction.adminComment}/>
    </>}/>
}

export const UserCorrections = ({parentRequestId, corrections}: CorrectionsProps) => {
    return <div className="space-y-2">
        {corrections.map(value => (
            <UserCorrection correction={value} key={value.id}/>
        ))}
        <div>
            <Button>
                <FontAwesomeIcon icon={solid("plus")}/>
            </Button>
        </div>
    </div>
}