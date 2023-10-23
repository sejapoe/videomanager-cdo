import {Navigate, Route, Routes} from "react-router-dom";
import {Requests} from "../components/Requests.tsx";
import {NewRequest} from "../components/NewRequest.tsx";

export const RequestsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Requests/>}/>
            <Route path="new" element={<NewRequest/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}