import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {useNavigate} from "react-router-dom";
import {PATH_PAGE} from "../../../../lib/react-router";
import {lecturerKeys} from "../../lecturers/api";
import {NewRequestLikeForm} from "./NewRequestLikeForm.tsx";
import {useCreateRequest} from "../api";


export const NewRequest = () => {
    const nav = useNavigate();
    const mutationRes = useCreateRequest();

    return <ContentLayout title="Создание запроса">
        <NewRequestLikeForm onSuccess={() => nav(PATH_PAGE.app.requests)} mutationRes={mutationRes as any}
                            invalidationKeys={lecturerKeys.lecturers.root}/>
    </ContentLayout>
}