import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {useCurrentUser} from "../features/auth/authModel.ts";
import {publicRoutes} from "./publicRoutes.tsx";
import {userRoutes} from "./userRoutes.tsx";
import {adminRoutes} from "./adminRoutes.tsx";

export const AppRoutes = () => {
    const user = useCurrentUser()

    const commonRoutes: RouteObject[] = [
        {path: '*', element: <Navigate to="/" replace/>},
    ]

    const routes = user ?
        user.info.role == "ROLE_USER" ? userRoutes :
            user.info.role == "ROLE_ADMIN" ? adminRoutes :
                publicRoutes
        : publicRoutes

    return useRoutes([...routes, ...commonRoutes]);
}