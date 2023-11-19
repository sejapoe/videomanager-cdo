import {CorrectionResDto} from "../../../../api/Api.ts";

export type Correction = {
    id: number;
    startTimeCode: number;
    endTimeCode: number;
    closed: boolean;
}

export const mapCorrection = (dto: CorrectionResDto): Correction => {
    return dto
};