import {ActionProps} from "../../../common/requests/components/ActionProps.ts";
import {Button} from "../../../../ui/button/Button.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {useUpdateRequestStatus} from "../api";
import {requestsKeys} from "../../../common/requests/api";

export const UserRequestActions = ({request}: ActionProps) => {
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useUpdateRequestStatus(request.id)

    const disabled = request.status != "COMPLETED" && !request.corrections.every(value => value.closed);
    return <div className="w-full flex">
        <Button
            isLoading={isLoading}
            variant="inverse"
            disabled={disabled}
            title={disabled ? "Resolve all comments first" : ""}
            onClick={() => {
                mutate(request.status === "COMPLETED" ? "WIP" : "COMPLETED", {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries(requestsKeys.requests.root)
                    }
                })
            }}
        >
            {request.status === "COMPLETED" ? "Reopen" : "Resolve"}
        </Button>
    </div>;
}