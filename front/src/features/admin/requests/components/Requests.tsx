import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import {Request, useRequests} from "../api/requestsApi.ts";
import Spinner from "../../../../ui/spinner";
import clsx, {ClassValue} from "clsx";


type RequestTableProps = {
    requests: Request[];
}


type Status = "DENIED" | "CREATED" | "WIP" | "COMPLETE"

const statusL10n: Record<Status, string> = {
    "DENIED": "Отклонена",
    "CREATED": "Создана",
    "WIP": "В работе",
    "COMPLETE": "Завершена"
}

const statusColor: Record<Status, [ClassValue, ClassValue]> = {
    "DENIED": ["bg-red-200", "bg-red-300"],
    "CREATED": ["bg-cyan-200", "bg-cyan-300"],
    "WIP": ["bg-yellow-200", "bg-yellow-300"],
    "COMPLETE": ["bg-green-20", "bg-green-300"],
}

const RequestsTable = ({requests}: RequestTableProps) => {
    return <table className="text-gray-900 table-auto w-full">
        <thead className="text-left text-white">
        <tr className="bg-gray-700">
            <th className="px-4 py-2 border-2 rounded-tl-lg border-gray-100">#</th>
            <th className="px-4 py-2 border-2 border-gray-100">Название</th>
            <th className="px-4 py-2 border-2 border-gray-100">Преподаватель</th>
            <th className="px-4 py-2 border-2 border-gray-100">Институт</th>
            <th className="px-4 py-2 border-2 border-gray-100">Кафедра</th>
            <th className="px-4 py-2 border-2 rounded-tr-lg border-gray-100">Статус</th>
        </tr>
        </thead>
        <tbody className="space-y-1">
        {requests.map((value, index) => (
            <tr className={clsx(
                index % 2 == 0 ? "bg-gray-200" : "bg-gray-300",
                "space-x-2"
            )}>
                <td className="px-4 py-2 border-2 border-gray-100">{value.id}</td>
                <td className="px-4 py-2 border-2 border-gray-100">{value.name}</td>
                <td className="px-4 py-2 border-2 border-gray-100">{value.lecturer.fullName}</td>
                <td className="px-4 py-2 border-2 border-gray-100">{value.institute.name}</td>
                <td className="px-4 py-2 border-2 border-gray-100">{value.department.name}</td>
                <td className={clsx(
                    "px-4 py-2 border-2 border-gray-100",
                    statusColor[value.status][index % 2]
                )}>{statusL10n[value.status]}</td>
            </tr>
        ))}
        </tbody>
    </table>
}

export const Requests = () => {
    const {data: requests} = useRequests();
    const nav = useNavigate()


    return <ContentLayout title="Запросы">
        <div>
            <div className="w-full flex flex-1 justify-center">
                <Button
                    size="sm"
                    startIcon={solid("plus")}
                    onClick={() => nav("/app/requests/new")}
                >
                    Создать
                </Button>
            </div>
            {requests ? <RequestsTable requests={requests}/> : <Spinner/>}
        </div>
    </ContentLayout>
}