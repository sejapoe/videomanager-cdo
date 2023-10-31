import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {EditCorrectionReqDto} from "../../../../api/Api.ts";

export const correctionsKeys = {
    corrections: {
        root: ['admin', 'corrections']
    },

    mutation: {
        updateAdminComment: () => [...correctionsKeys.corrections.root, 'updateAdminComment']
    }
}

export type UseUpdateUserCommentMutation = UseMutationOptions<
    void,
    GenericErrorModel,
    EditCorrectionReqDto,
    unknown
>

type UseUpdateUserCommentOptions = Omit<UseUpdateUserCommentMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateAdminComment = (id: number, options?: UseUpdateUserCommentOptions) =>
    useMutation<void,
        GenericErrorModel,
        EditCorrectionReqDto,
        unknown
    >(correctionsKeys.mutation.updateAdminComment(), async (dto: EditCorrectionReqDto) => {
        await api.editAdminComment(id, dto)
    }, options)