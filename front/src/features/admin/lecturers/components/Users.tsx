import {useQueryClient} from "@tanstack/react-query";
import {lecturerKeys} from "../api";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {UsersTable} from "./UsersTable.tsx";
import {useDialog} from "../../../../providers/DialogProvider.tsx";
import {NewLecturerDialog} from "./NewLecturerDialog.tsx";

export const Users = () => {
    const queryClient = useQueryClient()
    const open = useDialog({
        title: "Создание пользователя",
        children: (close) =>
            <NewLecturerDialog
                onSubmit={async () => {
                    await queryClient.invalidateQueries(lecturerKeys.lecturers.root);
                    close()
                }}
                defaultName={""}
            />
    })

    return <>
        <ContentLayout title="Пользователи" titleElement={
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">{"Пользователи"}</h1>
                <Button
                    size="sm"
                    startIcon={solid("plus")}
                    onClick={() => open({})}
                >
                    Создать
                </Button>
            </div>
        }>
            <UsersTable/>
        </ContentLayout>
    </>
}