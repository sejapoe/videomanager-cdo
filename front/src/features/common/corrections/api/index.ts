import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {UpdateCorrectionReqDto} from "../../../../api/Api.ts";
import {commonKey} from "../../api";

export const correctionsKeys = {
    corrections: {
        root: [...commonKey, 'corrections']
    },

    mutation: {
        updateComment: () => [...correctionsKeys.corrections.root, 'updateComment']
    }
}

type UseUpdateCommentMutation = UseMutationOptions<
    void,
    GenericErrorModel,
    UpdateCorrectionReqDto
>

type UseUpdateCommentOptions = Omit<UseUpdateCommentMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateComment = (id: number, options?: UseUpdateCommentOptions) =>
    useMutation<void, GenericErrorModel, UpdateCorrectionReqDto>(
        correctionsKeys.mutation.updateComment(),
        async (dto: UpdateCorrectionReqDto) => {
            await api.updateComment(id, dto)
        },
        options
    )