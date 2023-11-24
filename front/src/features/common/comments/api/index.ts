import api, {GenericErrorModel, RequestParams} from "../../../../api";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {Comment, mapComment} from "../model";

export const commentsKeys = {
    comments: {
        root: ['comments'],
        byCorrection: (correctionId: number) => [...commentsKeys.comments.root, {correctionId}]
    },

    mutation: {
        create: () => [...commentsKeys.comments.root, 'create']
    }
}

export const useComments = (correctionId: number, params?: RequestParams) =>
    useQuery<Comment[], GenericErrorModel, Comment[], unknown[]>(
        commentsKeys.comments.byCorrection(correctionId),
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
        commentsKeys.mutation.create(),
        async (text: string) => {
            const response = await api.createComment({
                correctionId,
                text
            })

            return mapComment(response.data)
        },
        options
    )