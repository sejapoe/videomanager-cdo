import {useQueryClient} from "@tanstack/react-query";
import {lecturerKeys} from "../api";
import {useDialog} from "../../../../hooks/useDialog.tsx";
import {NewLecturerDialog} from "./NewLecturerDialog.tsx";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {UsersTable} from "./UsersTable.tsx";

export const Users = () => {
    const queryClient = useQueryClient()
    const {Dialog, open} = useDialog<string, number>({
        title: "Создание преподавателя",
    })

    return <>
        <Dialog>
            {({args: name, ok, close}) => (
                <NewLecturerDialog onSubmit={ok} defaultName={name} close={close}/>
            )}
        </Dialog>
        <ContentLayout title="Пользователи" titleElement={
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">{"Пользователи"}</h1>
                <Button
                    size="sm"
                    startIcon={solid("plus")}
                    onClick={() => open("", async () => {
                        await queryClient.invalidateQueries(lecturerKeys.lecturers.root)
                    })}
                >
                    Создать
                </Button>
            </div>
        }>
            <UsersTable/>
        </ContentLayout>
    </>
}