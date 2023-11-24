import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import {ArchiveTable} from "./ArchiveTable.tsx";


export const Archive = () => {
    const nav = useNavigate()

    return <ContentLayout title="Архив" titleElement={
        <div className="w-full flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Запросы</h1>
            <Button
                variant="primary"
                size="sm"
                startIcon={solid("plus")}
                onClick={() => nav("/app/archive/new")}
            >
                Создать
            </Button>
        </div>
    }>
        <ArchiveTable/>
    </ContentLayout>
}