import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import {RequestsTable} from "../../../common/requests/components/RequestsTable.tsx";


export const Requests = () => {
    const nav = useNavigate()

    return <ContentLayout title="Запросы" titleElement={
        <div className="w-full flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Запросы</h1>
            <Button
                variant="primary"
                size="sm"
                startIcon={solid("plus")}
                onClick={() => nav("/app/requests/new")}
            >
                Создать
            </Button>
        </div>
    }>
        <RequestsTable/>
    </ContentLayout>
}