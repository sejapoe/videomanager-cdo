import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {FullRequest, RequestStatus} from "../../../common/requests/model";
import {mapFullRequest, requestsKeys} from "../../../common/requests/api";

export const userRequestsKeys = {
    mutation: {
        updateStatus: (id: number) => [...requestsKeys.requests.root, 'updateStatus', id]
    }
}

type UseUpdateRequestStatusMutation = UseMutationOptions<FullRequest, GenericErrorModel, string>

type UseUpdateRequestStatusOptions = Omit<UseUpdateRequestStatusMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateRequestStatus = (requestId: number, options?: UseUpdateRequestStatusOptions) =>
    useMutation(
        userRequestsKeys.mutation.updateStatus(requestId),
        async (status: RequestStatus) => {
            const response = await api.updateRequestStatus({
                id: requestId,
                newStatus: status
            })

            return mapFullRequest(response.data)
        },
        options
    )