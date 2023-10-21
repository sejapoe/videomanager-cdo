import {RouteObject, useRoutes} from "react-router-dom";
import {Loadable} from "../ui/loadable/Loadable";
import {lazy} from "react";
import {useCurrentUser} from "../features/auth/authModel.ts";
import {publicRoutes} from "./publicRoutes.tsx";
import {userRoutes} from "./userRoutes.tsx";
import {adminRoutes} from "./adminRoutes.tsx";

const Page404 = Loadable(lazy(() => import("../pages/page-404")));

export const AppRoutes = () => {
    const user = useCurrentUser()

    const commonRoutes: RouteObject[] = [
        {path: '*', element: <Page404/>}, // todo: fix page 404 behaviour
    ]

    const routes = user ?
        user.role == "USER" ? userRoutes :
            user.role == "ADMIN" ? adminRoutes :
                publicRoutes
        : publicRoutes

    console.log(routes)

    return useRoutes([...routes, ...commonRoutes]);
}