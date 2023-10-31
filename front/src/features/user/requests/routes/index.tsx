import {Navigate, Route, Routes} from "react-router-dom";
import {Requests} from "../components/Requests.tsx";
import {RequestView} from "../../../common/requests/components/RequestView.tsx";
import {UserCorrections} from "../../corrections/components/UserCorrections.tsx";


export const UserRequestsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Requests/>}/>
            <Route path=":id" element={<RequestView correctionsSection={UserCorrections}/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}