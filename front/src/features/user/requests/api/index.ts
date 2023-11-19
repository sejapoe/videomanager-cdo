import {userKey} from "../../api";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api, {GenericErrorModel} from "../../../../api";
import {FullRequest, RequestStatus} from "../../../common/requests/model";
import {mapFullRequest} from "../../../common/requests/api";

export const requestKeys = {
    requests: {
        root: [...userKey, 'requests']
    },

    mutation: {
        updateStatus: (id: number) => [...requestKeys.requests.root, 'updateStatus', id]
    }
}

type UseUpdateRequestStatusMutation = UseMutationOptions<FullRequest, GenericErrorModel, string>

type UseUpdateRequestStatusOptions = Omit<UseUpdateRequestStatusMutation, 'mutationFn' | 'mutationKey'>

export const useUpdateRequestStatus = (requestId: number, options?: UseUpdateRequestStatusOptions) =>
    useMutation(
        requestKeys.mutation.updateStatus(requestId),
        async (status: RequestStatus) => {
            const response = await api.updateRequestStatus({
                id: requestId,
                newStatus: status
            })

            return mapFullRequest(response.data)
        },
        options
    )