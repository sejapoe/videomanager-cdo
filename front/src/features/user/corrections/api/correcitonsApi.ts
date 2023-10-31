import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel, HttpResponse} from "../../../../api";
import {CorrectionResDto, CreateCorrectionReqDto, EditCorrectionReqDto} from "../../../../api/Api.ts";

export const correctionsKeys = {
    corrections: {
        root: ['user', 'corrections']
    },

    mutation: {
        updateUserComment: () => [...correctionsKeys.corrections.root, 'updateUserComment'],
        create: () => [...correctionsKeys.corrections.root, 'create']
    }
}

export type UseUpdateUserCommentMutation = UseMutationOptions<
    void,
    GenericErrorModel,
    EditCorrectionReqDto,
    unknown
>

type UseUpdateUserCommentOptions = Omit<UseUpdateUserCommentMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateUserComment = (id: number, options?: UseUpdateUserCommentOptions) =>
    useMutation<void,
        GenericErrorModel,
        EditCorrectionReqDto,
        unknown
    >(
        correctionsKeys.mutation.updateUserComment(),
        async (dto: EditCorrectionReqDto) => {
            await api.editUserComment(id, dto)
        },
        options
    )

export type UseCreateCorrectionMutation = UseMutationOptions<
    HttpResponse<CorrectionResDto, void>,
    GenericErrorModel,
    CreateCorrectionReqDto
>

type UseCreateCorrectionOptions = Omit<UseCreateCorrectionMutation, 'mutationFn' | 'mutationKey'>

export const useCreateCorrection = (options?: UseCreateCorrectionOptions) =>
    useMutation<HttpResponse<CorrectionResDto, void>,
        GenericErrorModel,
        CreateCorrectionReqDto>(
        correctionsKeys.mutation.create(),
        api.createCorrection,
        options
    )