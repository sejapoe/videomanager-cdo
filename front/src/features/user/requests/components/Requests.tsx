import {RequestsTable} from "../../../common/requests/components/RequestsTable.tsx";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {useRequests} from "../../../common/requests/api";
import {useCurrentUser} from "../../../auth/authModel.ts";
import {ErrorLoadLayout} from "../../../../ui/layout/ErrorLoadLayout.tsx";

export const Requests = () => {
    const user = useCurrentUser()
    const {data: requests, error, isLoading} = useRequests({
        user: user?.id
    });


    return <ErrorLoadLayout error={error} isLoading={isLoading}>
        <ContentLayout title="Запросы">
            <RequestsTable requests={requests!}/>
        </ContentLayout>
    </ErrorLoadLayout>
}