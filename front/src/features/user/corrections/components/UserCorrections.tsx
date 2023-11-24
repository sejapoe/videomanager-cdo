import {CorrectionsProps} from "../../../common/corrections/components/CorrectionProps.ts";
import {Correction} from "../../../common/corrections/model";
import {CorrectionView} from "../../../common/corrections/components/CorrectionView.tsx";
import {NewCorrection} from "./NewCorrection.tsx";

type CorrectionProps = {
    correction: Correction
}

const UserCorrection = ({correction}: CorrectionProps) => {
    return <CorrectionView correctionId={correction.id}/>
}

export const UserCorrections = ({request}: CorrectionsProps) => {
    return <div className="space-y-2">
        {request.corrections.map(value => (
            <UserCorrection correction={value} key={value.id}/>
        ))}
        {request.status !== "COMPLETED" && <NewCorrection requestId={request.id}/>}
    </div>
}