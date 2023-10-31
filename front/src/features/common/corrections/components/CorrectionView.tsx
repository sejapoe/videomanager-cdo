import {Correction} from "../model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx, {ClassValue} from "clsx";
import React from "react";

const pad = (num: number, size: number) => {
    const s = "000000000" + num;
    return s.slice(s.length - size);
};

const formatTimeCode = (seconds: number) => {
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


function LabeledTimeCode({label, timeCode, className}: LabeledTimeCodeProps) {
    return <div className="flex flex-col justify-center items-center">
        <span className="text-xs">{label}</span>
        <div className={clsx(
            "flex text-xl font-['Open_Sans'] py-1 px-4 rounded-md justify-center text-white",
            className
        )}>
            {formatTimeCode(timeCode)}
        </div>
    </div>;
}

type CorrectionProps = {
    correction: Correction
    commentSection: React.ReactNode;
}

export const CorrectionView = ({correction, commentSection}: CorrectionProps) => {
    return <div className="text-gray-700 border-2 border-orange-500 p-4">
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                <div className="flex flex-col">
                    <div className="relative grid grid-cols-2 gap-4 w-fit p-4 pb-0">
                        <LabeledTimeCode label="Начало отрезка" timeCode={correction.startTimeCode}
                                         className="bg-orange-400 shadow-lg"/>
                        <div className="absolute w-full h-full flex justify-center items-center">
                            <div className="mt-8">
                                <FontAwesomeIcon icon={solid("arrow-right")}/>
                            </div>
                        </div>
                        <LabeledTimeCode label="Конец отрезка" timeCode={correction.endTimeCode}
                                         className="bg-green-600"/>
                    </div>
                    <div className="grid grid-cols-2">
                        {commentSection}
                    </div>
                </div>
            </div>
            <div className="bg-gray-600 p-2 col-span-1 text-white">
            </div>
        </div>
    </div>
}
