import {Outlet, RouteObject} from "react-router-dom";
import {MainLayout} from "../ui/layout/MainLayout.tsx";
import {Suspense} from "react";
import Spinner from "../ui/spinner";
import {RequestsRoutes} from "../features/admin/requests/routes";

const App = () => {
    return (
        <MainLayout navigation={
            [
                {name: "Запросы", to: "./requests"}
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

export const adminRoutes: RouteObject[] = [
    {
        path: "/app",
        element: <App/>,
        children: [
            {path: "requests", element: <RequestsRoutes/>}
        ]
    }
]