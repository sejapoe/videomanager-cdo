import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {NewRequestForm} from "./NewRequestForm.tsx";


export const NewRequest = () => {
    return <ContentLayout title="Создание запроса">
        <NewRequestForm/>
    </ContentLayout>
}