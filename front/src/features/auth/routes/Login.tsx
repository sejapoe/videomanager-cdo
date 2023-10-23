import {useNavigate} from "react-router-dom";
import {Layout} from "../../../ui/layout/Layout.tsx";
import {LoginForm} from "../components/LoginForm.tsx";
import {PATH_PAGE} from "../../../lib/react-router";


export const Login = () => {
    const navigate = useNavigate()

    return <Layout title={"Войдите в ваш аккаунт"}>
        <LoginForm onSuccess={() => navigate(PATH_PAGE.app)}/>
    </Layout>
}