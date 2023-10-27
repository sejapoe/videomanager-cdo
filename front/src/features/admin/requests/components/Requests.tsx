import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import {useRequests} from "../api/requestsApi.ts";
import Spinner from "../../../../ui/spinner";
import {RequestsTable} from "../../../common/requests/components/RequestsTable.tsx";


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