import {useNavigate, useParams} from "react-router-dom";
import Page404 from "../../../pages/page-404";
import {Layout} from "../../../ui/layout/Layout.tsx";
import {ActivateForm} from "../components/ActivateForm.tsx";
import {useActivation} from "../api/getActivation.ts";
import Spinner from "../../../ui/spinner";
import {PATH_PAGE} from "../../../lib/react-router";

export const Activate = () => {
    const {uuid} = useParams();
    const {data: user, isLoading} = useActivation(uuid || "");
    const nav = useNavigate();

    if (isLoading) {
        return <div className="h-full w-full flex items-center justify-center">
            <Spinner/>
        </div>
    }

    if (!user) {
        return <Page404/>
    }

    return <Layout title={"Активация аккаунта"}>
        <ActivateForm uuid={uuid!} user={user!} onSuccess={() => nav(PATH_PAGE.app)}/>
    </Layout>
}