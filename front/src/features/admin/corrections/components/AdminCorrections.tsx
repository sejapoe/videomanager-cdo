import {CorrectionView} from "../../../common/corrections/components/CorrectionView.tsx";
import {Correction} from "../../../common/corrections/model";
import {CorrectionsProps} from "../../../common/corrections/components/CorrectionProps.ts";

type CorrectionProps = {
    correction: Correction
}

const AdminCorrection = ({correction}: CorrectionProps) => {
    return <CorrectionView correctionId={correction.id}/>
}

export const AdminCorrections = ({request}: CorrectionsProps) => {
    return <div className="space-y-2">
        {request.corrections.map(value => (
            <AdminCorrection correction={value} key={value.id}/>
        ))}
    </div>
}