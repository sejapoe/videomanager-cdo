import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {Button} from "../../../../ui/button/Button.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import {Request, useRequests} from "../api/requestsApi.ts";
import Spinner from "../../../../ui/spinner";


type RequestTableProps = {
    requests: Request[];
}

const RequestsTable = ({requests}: RequestTableProps) => {
    return <span className="text-gray-900 text-xl">{requests.length} запрос</span>
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