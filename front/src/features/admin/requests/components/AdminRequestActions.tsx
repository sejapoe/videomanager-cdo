import {ActionProps} from "../../../common/requests/components/ActionProps.ts";
import {Button} from "../../../../ui/button/Button.tsx";
// import {Button} from "../../../../ui/button/Button.tsx";
// import {useQueryClient} from "@tanstack/react-query";
// import {requestsKeys} from "../../../common/requests/api";

export const AdminRequestActions = ({request}: ActionProps) => {
    // const queryClient = useQueryClient()
    // const {mutate} = useUpdateRequestStatus(request.id)

    const disabled = request.status !== "COMPLETE";
    return <div className="w-full flex justify-end pt-2">
        <Button
            variant="inverse"
            disabled={disabled}
            title={disabled ? "Заявка должна быть решена" : ""}
            onClick={() => {
                // mutate(request.status === "COMPLETE" ? "WIP" : "COMPLETE", {
                //     onSuccess: async () => {
                //         await queryClient.invalidateQueries(requestKeys.requests.root)
                //         await queryClient.invalidateQueries(requestsKeys.requests.root)
                //     }
                // })
            }}
        >
            В архив
        </Button>
    </div>;
}