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
        {path: '*', element: <Page404/>},
    ]

    const routes = user ?
        user.info.role == "ROLE_USER" ? userRoutes :
            user.info.role == "ROLE_ADMIN" ? adminRoutes :
                publicRoutes
        : publicRoutes

    return useRoutes([...routes, ...commonRoutes]);
}