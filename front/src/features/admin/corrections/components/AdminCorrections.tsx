import {CorrectionView} from "../../../common/corrections/components/CorrectionView.tsx";
import {Correction} from "../../../common/corrections/model";
import {CorrectionsProps} from "../../../common/corrections/components/CorrectionProps.ts";

type CorrectionProps = {
    correction: Correction
}

const AdminCorrection = ({correction}: CorrectionProps) => {
    return <CorrectionView correction={correction}/>
}

export const AdminCorrections = ({corrections}: CorrectionsProps) => {
    return <div className="space-y-2">
        {corrections.map(value => (
            <AdminCorrection correction={value} key={value.id}/>
        ))}
    </div>
}