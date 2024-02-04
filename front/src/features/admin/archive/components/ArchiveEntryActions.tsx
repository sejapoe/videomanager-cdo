import {Button} from "../../../../ui/button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {PATH_PAGE} from "../../../../lib/react-router";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useDialog} from "../../../../providers/DialogProvider.tsx";
import {UpdateArchiveEntryForm} from "./UpdateArchiveEntryForm.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {ArchiveEntry} from "../model";
import {ConfirmDeleteArchiveEntryForm} from "./ConfirmDeleteArchiveEntryForm.tsx";
import {archiveKeys} from "../api";

type ArchiveEntryActionsProps = {
    entry: ArchiveEntry
}

export const ArchiveEntryActions = ({entry}: ArchiveEntryActionsProps) => {
    const queryClient = useQueryClient()
    const nav = useNavigate()
    const openConfirmDeleteRequest = useDialog({
        title: "Подтвердите удаление архивной записи",
        children: (close) => <ConfirmDeleteArchiveEntryForm entry={entry} onSubmit={() => {
            nav(PATH_PAGE.app.archive)
            close()
        }}/>
    })
    const openUpdateRequest = useDialog({
        title: "Изменение архивной записи",
        children: (close) => <UpdateArchiveEntryForm entry={entry} onSubmit={async () => {
            await queryClient.invalidateQueries({queryKey: archiveKeys.archive.byId(entry.id)})
            close()
        }}/>
    })

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
    </>;
}