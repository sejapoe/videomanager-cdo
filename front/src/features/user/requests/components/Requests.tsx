import {useCurrentUser} from "../../../auth/authModel.ts";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {RequestsTable} from "../../../common/requests/components/RequestsTable.tsx";

export const Requests = () => {
    const user = useCurrentUser()


    return <ContentLayout title="Запросы">
        <RequestsTable filter={{
            user: [user!.id]
        }}/>
    </ContentLayout>
}