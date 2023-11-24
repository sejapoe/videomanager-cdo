import {useNavigate} from "react-router-dom";
import {ContentLayout} from "../../../../ui/layout/ContentLayout.tsx";
import {NewRequestLikeForm} from "../../requests/components/NewRequestLikeForm.tsx";
import {PATH_PAGE} from "../../../../lib/react-router";
import {archiveKeys, useCreateArchiveEntry} from "../api";

export const NewArchiveEntry = () => {
    const nav = useNavigate();
    const mutationRes = useCreateArchiveEntry();

    return <ContentLayout title="Создание записи в архиве">
        <NewRequestLikeForm onSuccess={() => nav(PATH_PAGE.app.archive)} mutationRes={mutationRes as any}
                            invalidationKeys={archiveKeys.archive.root}/>
    </ContentLayout>
}