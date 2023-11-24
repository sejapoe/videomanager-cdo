import api, {GenericErrorModel, RequestParams} from "../../../../api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {Correction, mapCorrection} from "../model";

export const correctionsKeys = {
    corrections: {
        root: ['corrections'],
        byId: (id: number) => [...correctionsKeys.corrections.root, id],
    },

    mutations: {
        view: (id: number) => [...correctionsKeys.corrections.root, id, 'view']
    }
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

export type UseViewCorrectionMutation = UseMutationOptions<void, GenericErrorModel, number, unknown[]>

type UseViewCorrectionOptions = Omit<UseViewCorrectionMutation, 'mutationFn' | 'mutationKey'>

export const useViewCorrection = (correctionId: number, options?: UseViewCorrectionOptions) =>
    useMutation<void, GenericErrorModel, number, unknown[]>(
        correctionsKeys.mutations.view(correctionId),
        async () => {
            await api.viewCorrection(correctionId)
        },
        options
    )
