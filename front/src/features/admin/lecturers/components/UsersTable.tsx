import {lecturerKeys, useLecturers} from "../api";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";
import {Lecturer} from "../model";
import clsx, {ClassValue} from "clsx";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {NewLecturerDialog} from "./NewLecturerDialog.tsx";
import {useDialog} from "../../../../hooks/useDialog.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useQueryClient} from "@tanstack/react-query";

const statusL10n: Record<"false" | "true", string> = {
    "false": "Неактивен",
    "true": "Активен"
}

const statusColors: Record<"false" | "true", [ClassValue, ClassValue]> = {
    "false": ["bg-red-200", "bg-red-300"],
    "true": ["bg-green-200", "bg-green-300"]
}

const booleanToString = (b: boolean): "false" | "true" => b ? "true" : "false"

type UsersTableProps = {
    users: Lecturer[]
}

const UsersTable = ({users}: UsersTableProps) => {
    return <table className="text-gray-900 table-auto w-full">
        <thead className="text-left text-white">
        <tr className="bg-gray-700">
            <th className="px-4 py-2 border-2 rounded-tl-lg border-gray-100">#</th>
            <th className="px-4 py-2 border-2 border-gray-100">ФИО</th>
            <th className="px-4 py-2 border-2 border-gray-100">Электронная почта</th>
            <th className="px-4 py-2 border-2 rounded-tr-lg border-gray-100">Статус</th>
        </tr>
        </thead>
        <tbody>
        {
            users.map((value, index) => <tr className={clsx(
                    index % 2 == 0 ? "bg-gray-200" : "bg-gray-300",
                    "space-x-2 cursor-pointer relative"
                )}>
                    <td className="px-4 py-2 border-2 border-gray-100">{value.id}</td>
                    <td className="px-4 py-2 border-2 border-gray-100">{value.fullName}</td>
                    <td className="px-4 py-2 border-2 border-gray-100">{value.email}</td>
                    <td className={clsx(
                        "px-4 py-2 border-2 border-gray-100",
                        statusColors[booleanToString(value.enabled)][index % 2]
                    )}>{statusL10n[booleanToString(value.enabled)]}</td>
                </tr>
            )
        }
        </tbody>
    </table>
}

export const Users = () => {
    const queryClient = useQueryClient()
    const {data, isLoading, error} = useLecturers()
    const {Dialog, open} = useDialog<string, number>({
        title: "Создание преподавателя",
    })

    return <ErrorLoadLayout isLoading={isLoading} error={error}>
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
                    onClick={() => open("", async () => {
                        await queryClient.invalidateQueries(lecturerKeys.lecturers.root)
                    })}
                >
                    <FontAwesomeIcon icon={solid("plus")}/> Создать
                </Button>
            </div>
        }>
            <UsersTable users={data!}/>
        </ContentLayout>
    </ErrorLoadLayout>
}