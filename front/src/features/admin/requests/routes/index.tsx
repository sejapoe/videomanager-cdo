import {Navigate, Route, Routes} from "react-router-dom";
import {Requests} from "../Requests.tsx";

export const RequestsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Requests/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}