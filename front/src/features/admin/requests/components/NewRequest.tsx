import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {NewRequestForm} from "./NewRequestForm.tsx";
import {useNavigate} from "react-router-dom";
import {PATH_PAGE} from "../../../../lib/react-router";


export const NewRequest = () => {
    const nav = useNavigate();

    return <ContentLayout title="Создание запроса">
        <NewRequestForm onSuccess={() => nav(PATH_PAGE.app.requests)}/>
    </ContentLayout>
}