import {RequestsTable} from "../../../common/requests/components/RequestsTable.tsx";
import Spinner from "../../../../ui/spinner";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {useRequests} from "../../../common/requests/api/requestsApi.ts";
import {useCurrentUser} from "../../../auth/authModel.ts";

export const Requests = () => {
    const user = useCurrentUser()
    const {data: requests} = useRequests({
        user: user?.id
    });


    return <ContentLayout title="Запросы">
        <div>
            {requests ? <RequestsTable requests={requests}/> : <Spinner/>}
        </div>
    </ContentLayout>
}