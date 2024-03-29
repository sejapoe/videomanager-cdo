import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../../api";
import {CorrectionResDto, CreateCorrectionReqDto} from "../../../../api/Api.ts";
import {correctionsKeys} from "../../../common/corrections/api";

export const userCorrectionsKeys = {
    mutation: {
        create: () => [...correctionsKeys.corrections.root, 'create'],
        updateStatus: (id: number) => [...correctionsKeys.corrections.root, 'update', id]
    }
}

export type UseCreateCorrectionMutation = UseMutationOptions<
    HttpResponse<CorrectionResDto, void>,
    GenericErrorModel,
    CreateCorrectionReqDto
>

type UseCreateCorrectionOptions = Omit<UseCreateCorrectionMutation, 'mutationFn' | 'mutationKey'>

export const useCreateCorrection = (options?: UseCreateCorrectionOptions) =>
    useMutation<HttpResponse<CorrectionResDto, void>, GenericErrorModel, CreateCorrectionReqDto>(
        userCorrectionsKeys.mutation.create(),
        api.createCorrection,
        options
    )


export type UseUpdateCorrectionStatusMutation = UseMutationOptions<
    HttpResponse<CorrectionResDto>,
    GenericErrorModel,
    boolean
>

type UseUpdateCorrectionStatusOptions = Omit<UseUpdateCorrectionStatusMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateCorrectionStatus = (id: number, options?: UseUpdateCorrectionStatusOptions) =>
    useMutation<HttpResponse<CorrectionResDto>, GenericErrorModel, boolean>(
        userCorrectionsKeys.mutation.updateStatus(id),
        isClosed => api.updateCorrectionStatus({
            id,
            isClosed
        }),
        options
    )
