import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx, {ClassValue} from "clsx";
import {Comments} from "../../comments/components/Comments.tsx";
import {useDisclosure} from "../../../../hooks/useDicslosure.ts";
import {Transition} from "@headlessui/react";
import {useCurrentUser} from "../../../auth/authModel.ts";
import {correctionsKeys, useCorrection, useViewCorrection} from "../api";
import {CenterSpinner} from "../../../../ui/layout/CenterSpinner.tsx";
import {ResolveCorrectionButton} from "../../../user/corrections/components/ResolveCorrectionButton.tsx";
import {requestsKeys} from "../../requests/api";
import {useQueryClient} from "@tanstack/react-query";
import {useParams} from "react-router-dom";

const pad = (num: number, size: number) => {
    const s = "000000000" + num;
    return s.slice(s.length - size);
};

export const formatTimeCode = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return [hours, minutes, seconds].map(v => pad(v, 2)).join(":")
}

type LabeledTimeCodeProps = {
    label: string;
    timeCode: number;
    className: ClassValue;
}


export function LabeledTimeCode({label, timeCode, className}: LabeledTimeCodeProps) {
    return <div className="flex flex-col justify-center items-center w-fit">
        <span className="text-xs">{label}</span>
        <div className={clsx(
            "flex text-xl font-['Open_Sans'] py-1 px-2 sm:px-4 rounded-md justify-center",
            className
        )}>
            {formatTimeCode(timeCode)}
        </div>
    </div>;
}

type CorrectionProps = {
    correctionId: number
}

export const CorrectionView = ({correctionId}: CorrectionProps) => {
    const {id} = useParams()
    const queryClient = useQueryClient()
    const user = useCurrentUser()
    const {isOpen, toggle, close} = useDisclosure(false)
    const {data: correction, isLoading} = useCorrection(correctionId)
    const {mutate: view} = useViewCorrection(correctionId)

    if (isLoading || !correction) return <CenterSpinner/>

    return <div className="flex justify-center">
        <div className={clsx(
            "text-gray-700 w-full md:w-2/3 rounded-xl border border-dashed border-gray-500",
            correction.closed ? "bg-gray-300" : "",
            "relative"
        )}>
            <div className="w-full flex flex-col">
                <div className="flex justify-between p-4 cursor-pointer" onClick={() => {
                    if (correction?.isUnread && !isOpen) {
                        view(correctionId, {
                            onSuccess: async () => {
                                await queryClient.invalidateQueries(correctionsKeys.corrections.byId(correctionId))
                            }
                        })
                    }
                    toggle()
                }}>
                    <div className="flex">
                        <div className="relative flex items-center">
                            <LabeledTimeCode label="Начало отрезка" timeCode={correction.startTimeCode}
                                             className="text-orange-700 bg-gray-200 shadow shadow-orange-700
                                             "/>
                            <div className="mt-4 ml-1 mr-1">
                                <FontAwesomeIcon icon={solid("arrow-right")}/>
                            </div>
                            <LabeledTimeCode label="Конец отрезка" timeCode={correction.endTimeCode}
                                             className="text-green-800 bg-gray-200 shadow shadow-green-800"/>
                        </div>

                    </div>
                    <div className="w-2/3 cursor-pointer justify-end flex items-center">
                        <FontAwesomeIcon className={clsx(
                            "text-3xl",
                            "transition-transform duration-[600ms]",
                            isOpen ? "rotate-0" : "rotate-90"
                        )}
                                         icon={solid("chevron-down")}/>
                    </div>
                </div>
                <Transition
                    show={isOpen}
                    enter="overflow-hidden transition-all duration-[600ms]"
                    enterFrom="max-h-0"
                    enterTo="max-h-[1000px]"
                    leave="overflow-hidden transition-all duration-[600ms] ease-in-out"
                    leaveFrom="max-h-[1000px]"
                    leaveTo="max-h-0 opacity-0"
                >
                    <div className="w-full select-none p-8 pt-4 pb-4">
                        <Comments correction={correction}/>
                        {user && user.info.role === "ROLE_USER" && <ResolveCorrectionButton
                            correctionId={correction.id}
                            isClosed={correction.closed}
                            onSuccess={async () => {
                                await queryClient.invalidateQueries(correctionsKeys.corrections.byId(correctionId))
                                await queryClient.invalidateQueries(requestsKeys.requests.byId(parseInt(id || "-1")))
                                if (!correction?.closed) close()
                            }}
                        />}
                    </div>
                </Transition>
            </div>
            {correction.isUnread && <div className="absolute -top-3 -right-1">
                <FontAwesomeIcon className="text-xs text-orange-500" icon={solid("circle")}/>
            </div>}
        </div>
    </div>
}
