import {RouteObject, useNavigate} from "react-router-dom";
import {Layout} from "../ui/layout/Layout.tsx";
import {Button} from "../ui/button/Button.tsx";
import {logout} from "../features/auth/api/logoutUser.ts";
import {useQueryClient} from "@tanstack/react-query";
import {PATH_PAGE} from "../lib/react-router";

const Test = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return <Layout title="Success">
        <div className="flex space-y-5 justify-center flex-col items-center py-10">
            <h1 className="text-gray-500">Authorized</h1>
            <Button className="w-full" onClick={() => {
                logout(queryClient)
                navigate(PATH_PAGE.login);
            }}>Выйти</Button>
        </div>
    </Layout>
}

export const userRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Test/>
    }
]