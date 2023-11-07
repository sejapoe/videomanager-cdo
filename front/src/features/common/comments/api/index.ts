import {commonKey} from "../../api";
import api, {GenericErrorModel, RequestParams} from "../../../../api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {Comment, mapComment} from "../model";

export const commentKeys = {
    comments: {
        root: [...commonKey, 'comments'],
        byCorrection: (correctionId: number) => [...commentKeys.comments.root, {correctionId}]
    },

    mutation: {
        create: () => [...commentKeys.comments.root, 'create']
    }
}

export const useComments = (correctionId: number, params?: RequestParams) =>
    useQuery<Comment[], GenericErrorModel, Comment[], unknown[]>(
        commentKeys.comments.byCorrection(correctionId),
        async ({signal}) => {
            const response = await api.getComments({
                correctionId
            }, {
                signal,
                ...params
            })

            console.log(response)

            return response.data.map(mapComment)
        }
    )

type UseCreateCommentMutation = UseMutationOptions<Comment, GenericErrorModel, string>

type UseCreateCommentOptions = Omit<UseCreateCommentMutation, 'mutationFn' | 'mutationKey'>

export const useCreateComment = (correctionId: number, options?: UseCreateCommentOptions) =>
    useMutation(
        commentKeys.mutation.create(),
        async (text: string) => {
            const response = await api.createComment({
                correctionId,
                text
            })

            return mapComment(response.data)
        },
        options
    )