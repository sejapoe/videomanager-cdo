import {Navigate, RouteObject} from "react-router-dom";
import {AuthRoutes} from "../features/auth/routes";
import {PATH_PAGE} from "../lib/react-router";

export const publicRoutes: RouteObject[] = [
    {
        path: "/auth/*",
        element: <AuthRoutes/>
    },
    {path: "/", element: <Navigate to={PATH_PAGE.login} replace/>},
]