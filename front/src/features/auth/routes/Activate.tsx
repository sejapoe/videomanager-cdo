import {useNavigate, useParams} from "react-router-dom";
import Page404 from "../../../pages/page-404";
import {Layout} from "../../../ui/layout/Layout.tsx";
import {ActivateForm} from "../components/ActivateForm.tsx";
import {useActivation} from "../api/getActivation.ts";
import {PATH_PAGE} from "../../../lib/react-router";
import {ErrorLoadLayout} from "../../../ui/layout/ErrorLoadLayout.tsx";

export const Activate = () => {
    const {uuid} = useParams();
    const {data: user, isLoading, error} = useActivation(uuid || "");
    const nav = useNavigate();

    return <ErrorLoadLayout error={error} isLoading={isLoading} errorElement={<Page404/>}>
        <Layout title={"Активация аккаунта"}>
            <ActivateForm uuid={uuid!} user={user!} onSuccess={() => nav(PATH_PAGE.app.root)}/>
        </Layout>
    </ErrorLoadLayout>
}