import {Outlet, RouteObject} from "react-router-dom";
import {MainLayout} from "../ui/layout/MainLayout.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Suspense} from "react";
import {UserRequestsRoutes} from "../features/user/requests/routes";
import {CenterSpinner} from "../ui/layout/CenterSpinner.tsx";

const App = () => {
    return (
        <MainLayout navigation={
            [
                {name: "Запросы", to: "./requests", icon: solid("list-check")},
            ]
        }>
            <Suspense fallback={<CenterSpinner/>}>
                <Outlet/>
            </Suspense>
        </MainLayout>
    )
}

export const userRoutes: RouteObject[] = [
    {
        path: "/app",
        element: <App/>,
        children: [
            {path: "requests/*", element: <UserRequestsRoutes/>}
        ]
    }
]