import {useUpdateCorrectionStatus} from "../api";
import {Button} from "../../../../ui/button/Button.tsx";
import clsx, {ClassValue} from "clsx";

type ResolveCorrectionButtonProps = {
    correctionId: number;
    isClosed: boolean;
    className?: ClassValue
    onSuccess: () => void
}

export const ResolveCorrectionButton = ({
                                            correctionId,
                                            isClosed,
                                            className,
                                            onSuccess
                                        }: ResolveCorrectionButtonProps) => {
    const {mutate, isLoading} = useUpdateCorrectionStatus(correctionId)

    return <div className={clsx(
        "w-full pt-2 flex justify-end",
        className
    )}>
        <Button
            variant="inverse"
            isLoading={isLoading}
            onClick={() => mutate(!isClosed, {
                onSuccess
            })}
        >
            {isClosed ? "Переоткрыть" : "Закрыть"}
        </Button>
    </div>;
}