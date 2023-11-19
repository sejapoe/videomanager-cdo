import {Navigate, Outlet, RouteObject} from "react-router-dom";
import {MainLayout} from "../ui/layout/MainLayout.tsx";
import {Suspense} from "react";
import {RequestsRoutes} from "../features/admin/requests/routes";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {ContentLayout} from "../ui/layout/ContentLayout.tsx";
import shark from '../assets/shark.gif';
import {PATH_PAGE} from "../lib/react-router";
import {CenterSpinner} from "../ui/layout/CenterSpinner.tsx";

const App = () => {
    return (
        <MainLayout navigation={
            [
                {name: "Запросы", to: "./requests", icon: solid("list-check")},
                {name: "Архив", to: "./archive", icon: solid("box-archive")},
                {name: "Пользователи", to: "./users", icon: solid("users")},
            ]
        }>
            <Suspense fallback={<CenterSpinner/>}>
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
            {path: "", element: <Navigate to={PATH_PAGE.app.requests} replace/>},
            {path: "*", element: <Shark/>}
        ]
    },
    {
        path: "/", element: <Navigate to={PATH_PAGE.app.root} replace/>
    }
]