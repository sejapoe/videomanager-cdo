import {RouteObject} from "react-router-dom";
import {AuthRoutes} from "../features/auth/routes";

export const publicRoutes: RouteObject[] = [
    {
        path: "/auth/*",
        element: <AuthRoutes/>
    }
]