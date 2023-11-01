import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../../api";
import {CorrectionResDto, CreateCorrectionReqDto} from "../../../../api/Api.ts";
import {userKey} from "../../api";

export const correctionsKeys = {
    corrections: {
        root: [...userKey, 'corrections']
    },

    mutation: {
        create: () => [...correctionsKeys.corrections.root, 'create']
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
        correctionsKeys.mutation.create(),
        api.createCorrection,
        options
    )