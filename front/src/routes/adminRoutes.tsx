import {Navigate, Outlet, RouteObject} from "react-router-dom";
import {MainLayout} from "../ui/layout/MainLayout.tsx";
import {Suspense} from "react";
import Spinner from "../ui/spinner";
import {RequestsRoutes} from "../features/admin/requests/routes";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {ContentLayout} from "../ui/layout/ContentLayout.tsx";
import shark from '../assets/shark.gif';
import {PATH_PAGE} from "../lib/react-router";

const App = () => {
    return (
        <MainLayout navigation={
            [
                {name: "Запросы", to: "./requests", icon: solid("list-check")},
                {name: "Архив", to: "./archive", icon: solid("box-archive")},
                {name: "Пользователи", to: "./users", icon: solid("users")},
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

// todo: remove
const Shark = () => {
    return <ContentLayout title={"Акулка"}>
        <img src={shark} alt="shark"/>
    </ContentLayout>
}

export const adminRoutes: RouteObject[] = [
    {
        path: "/app",
        element: <App/>,
        children: [
            {path: "requests/*", element: <RequestsRoutes/>},
            {path: "archive/*", element: <div className="text-gray-600">Тут будет архив</div>},
            {path: "", element: <Shark/>},
            {path: "*", element: <Shark/>}
        ]
    },
    {
        path: "/", element: <Navigate to={PATH_PAGE.app} replace/>
    }
]