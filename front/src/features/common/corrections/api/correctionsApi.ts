import {UseMutationOptions, UseMutationResult} from "@tanstack/react-query";
import {GenericErrorModel} from "../../../../api";
import {EditUserCorrectionReqDto} from "../../../../api/Api.ts";

export type UseUpdateUserCommentMutation = UseMutationOptions<
    void,
    GenericErrorModel,
    EditUserCorrectionReqDto
>


export type UseUpdateCommentMutation =
    (id: number, options?: UseUpdateUserCommentMutation) =>
        UseMutationResult<void, GenericErrorModel, EditUserCorrectionReqDto>