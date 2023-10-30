import {Navigate, Route, Routes} from "react-router-dom";
import {Requests} from "../components/Requests.tsx";
import {Request} from "../../../common/requests/components/Request.tsx";

export const UserRequestsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Requests/>}/>
            <Route path=":id" element={<Request commentSection={<div/>}/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}