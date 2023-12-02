import {ActionProps} from "../../../common/requests/components/ActionProps.ts";
import {Button} from "../../../../ui/button/Button.tsx";
import {useArchiveRequest} from "../api";
import {requestsKeys} from "../../../common/requests/api";
import {useNavigate} from "react-router-dom";
import {PATH_PAGE} from "../../../../lib/react-router";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useDialog} from "../../../../providers/DialogProvider.tsx";
import {ConfirmDeleteRequestForm} from "./ConfirmDeleteRequestForm.tsx";
import {UpdateRequestForm} from "./UpdateRequestForm.tsx";
import {useQueryClient} from "@tanstack/react-query";

export const AdminRequestActions = ({request}: ActionProps) => {
    const queryClient = useQueryClient()
    const nav = useNavigate()
    const {mutate} = useArchiveRequest()
    const openConfirmDeleteRequest = useDialog({
        title: "Подтвердите удаление запроса",
        children: (close) => <ConfirmDeleteRequestForm request={request} onSubmit={() => {
            nav(PATH_PAGE.app.requests)
            close()
        }}/>
    })
    const openUpdateRequest = useDialog({
        title: "Изменение запроса",
        children: (close) => <UpdateRequestForm request={request} onSubmit={async () => {
            await queryClient.invalidateQueries({queryKey: requestsKeys.requests.byId(request.id)})
            close()
        }}/>
    })

    const disabled = request.status !== "COMPLETED";
    return <>
        <Button
            startIcon={solid("edit")}
            className="w-full md:w-fit"
            onClick={() => openUpdateRequest()}
        >
            Изменить
        </Button>

        <Button
            startIcon={solid("trash")}
            className="w-full md:w-fit"
            variant="danger"
            onClick={() => openConfirmDeleteRequest()}
        >
            Удалить
        </Button>

        <Button
            startIcon={solid("box-archive")}
            variant="primary"
            className="w-full md:w-fit"
            disabled={disabled}
            title={disabled ? "Заявка должна быть решена" : ""}
            onClick={() => {
                mutate(request.id, {
                    onSuccess: async (data) => {
                        await queryClient.invalidateQueries(requestsKeys.requests.root)
                        nav(`${PATH_PAGE.app.archive}/${data.id}`)
                    }
                })
            }}
        >
            В архив
        </Button>
    </>;
}