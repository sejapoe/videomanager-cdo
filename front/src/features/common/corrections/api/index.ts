import {commonKey} from "../../api";
import api, {GenericErrorModel, RequestParams} from "../../../../api";
import {useQuery} from "@tanstack/react-query";
import {Correction, mapCorrection} from "../model";

export const correctionsKeys = {
    corrections: {
        root: [...commonKey, 'corrections'],
        byId: (id: number) => [...correctionsKeys.corrections.root, id]
    },
}

export const useCorrection = (correctionId: number, params?: RequestParams) =>
    useQuery<Correction, GenericErrorModel, Correction, unknown[]>(
        correctionsKeys.corrections.byId(correctionId),
        async ({signal}) => {
            const response = await api.getCorrection(correctionId, {
                signal,
                ...params
            })

            return mapCorrection(response.data)
        }
    )
