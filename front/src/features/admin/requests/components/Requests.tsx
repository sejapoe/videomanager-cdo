import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import {useRequests} from "../api";
import {RequestsTable} from "../../../common/requests/components/RequestsTable.tsx";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";


export const Requests = () => {
    const {data: requests, error, isLoading} = useRequests();
    const nav = useNavigate()


    return <ErrorLoadLayout error={error} isLoading={isLoading}>
        <ContentLayout title="Запросы">
            <div className="w-full flex flex-1 justify-center">
                <Button
                    size="sm"
                    startIcon={solid("plus")}
                    onClick={() => nav("/app/requests/new")}
                >
                    Создать
                </Button>
            </div>
            <RequestsTable requests={requests!}/>
        </ContentLayout>
    </ErrorLoadLayout>
}