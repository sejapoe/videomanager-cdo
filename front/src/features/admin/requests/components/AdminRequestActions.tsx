import {ActionProps} from "../../../common/requests/components/ActionProps.ts";
// import {Button} from "../../../../ui/button/Button.tsx";
// import {useQueryClient} from "@tanstack/react-query";
// import {requestsKeys} from "../../../common/requests/api";

export const AdminRequestActions = ({request}: ActionProps) => {
    // const queryClient = useQueryClient()
    // const {mutate} = useUpdateRequestStatus(request.id)

    // const disabled = request.status != "COMPLETE" && !request.corrections.every(value => value.closed);
    return <div className="w-full flex">
        {/*<Button*/}
        {/*    variant="primary"*/}
        {/*    disabled={disabled}*/}
        {/*    title={disabled ? "Resolve all comments first" : ""}*/}
        {/*    onClick={() => {*/}
        {/*        mutate(request.status === "COMPLETE" ? "WIP" : "COMPLETE", {*/}
        {/*            onSuccess: async () => {*/}
        {/*                await queryClient.invalidateQueries(requestKeys.requests.root)*/}
        {/*                await queryClient.invalidateQueries(requestsKeys.requests.root)*/}
        {/*            }*/}
        {/*        })*/}
        {/*    }}*/}
        {/*>*/}
        {/*    {request.status === "COMPLETE" ? "Reopen" : "Resolve"}*/}
        {/*</Button>*/}
    </div>;
}