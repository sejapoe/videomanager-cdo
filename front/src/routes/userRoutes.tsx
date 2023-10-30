import {Outlet, RouteObject} from "react-router-dom";
import {MainLayout} from "../ui/layout/MainLayout.tsx";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Suspense} from "react";
import Spinner from "../ui/spinner";
import {UserRequestsRoutes} from "../features/user/requests/routes";

const App = () => {
    return (
        <MainLayout navigation={
            [
                {name: "Запросы", to: "./requests", icon: solid("list-check")},
            ]
        }>
            <Suspense fallback={
                <div className="h-full w-full flex items-center justify-center">
                    <Spinner/>
                </div>
            }>
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