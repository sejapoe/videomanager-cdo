import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {EditCorrectionReqDto} from "../../../../api/Api.ts";

export const correctionsKeys = {
    corrections: {
        root: ['user', 'corrections']
    },

    mutation: {
        updateUserComment: () => [...correctionsKeys.corrections.root, 'updateUserComment']
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
    >(correctionsKeys.mutation.updateUserComment(), async (dto: EditCorrectionReqDto) => {
        await api.editUserComment(id, dto)
    }, options)