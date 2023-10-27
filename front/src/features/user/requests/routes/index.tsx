import {Navigate, Route, Routes} from "react-router-dom";
import {Requests} from "../components/Requests.tsx";

export const UserRequestsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Requests/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}