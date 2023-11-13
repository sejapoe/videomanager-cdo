import {Correction} from "../model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx, {ClassValue} from "clsx";
import {Comments} from "../../comments/components/Comments.tsx";
import {useDisclosure} from "../../../../hooks/useDicslosure.ts";
import {Transition} from "@headlessui/react";

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
    return <div className="flex flex-col justify-center items-center">
        <span className="text-xs">{label}</span>
        <div className={clsx(
            "flex text-xl font-['Open_Sans'] py-1 px-4 rounded-md justify-center",
            className
        )}>
            {formatTimeCode(timeCode)}
        </div>
    </div>;
}

type CorrectionProps = {
    correction: Correction
}

export const CorrectionView = ({correction}: CorrectionProps) => {
    const {isOpen, toggle} = useDisclosure(false)

    return <div className="flex justify-center">
        <div className={clsx(
            "text-gray-700 w-2/3 rounded-xl border border-dashed border-gray-500",
            correction.closed ? "bg-gray-300" : ""
        )}>
            <div className="w-full flex flex-col">
                <div className="flex justify-between p-4 cursor-pointer" onClick={toggle}>
                    <div className="relative grid grid-cols-2 gap-4 w-fit">
                        <LabeledTimeCode label="Начало отрезка" timeCode={correction.startTimeCode}
                                         className="text-orange-700 bg-gray-200 shadow shadow-orange-700"/>
                        <div className="absolute w-full h-full flex justify-center items-center">
                            <div className="mt-4">
                                <FontAwesomeIcon icon={solid("arrow-right")}/>
                            </div>
                        </div>
                        <LabeledTimeCode label="Конец отрезка" timeCode={correction.endTimeCode}
                                         className="text-green-800 bg-gray-200 shadow shadow-green-800"/>
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
                    <div className="w-full select-none p-8 pt-4">
                        <Comments correctionId={correction.id}/>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
}
