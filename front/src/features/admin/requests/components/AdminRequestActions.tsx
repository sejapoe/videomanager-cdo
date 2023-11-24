import {ActionProps} from "../../../common/requests/components/ActionProps.ts";
import {Button} from "../../../../ui/button/Button.tsx";
import {useArchiveRequest} from "../api";
import {queryClient} from "../../../../lib/react-query";
import {requestsKeys} from "../../../common/requests/api";

export const AdminRequestActions = ({request}: ActionProps) => {
    const {mutate} = useArchiveRequest()

    const disabled = request.status !== "COMPLETED";
    return <div className="w-full flex pt-2">
        <Button
            variant="inverse"
            disabled={disabled}
            title={disabled ? "Заявка должна быть решена" : ""}
            onClick={() => {
                mutate(request.id, {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries(requestsKeys.requests.root)
                    }
                })
            }}
        >
            В архив
        </Button>
    </div>;
}