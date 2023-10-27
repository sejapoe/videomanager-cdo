import {RequestsTable} from "../../../common/requests/components/RequestsTable.tsx";
import Spinner from "../../../../ui/spinner";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {useRequests} from "../api/requestsApi.ts";

export const Requests = () => {
    const {data: requests} = useRequests();


    return <ContentLayout title="Запросы">
        <div>
            {requests ? <RequestsTable requests={requests}/> : <Spinner/>}
        </div>
    </ContentLayout>
}