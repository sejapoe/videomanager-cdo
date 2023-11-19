import {Navigate, Route, Routes} from "react-router-dom";
import {Requests} from "../components/Requests.tsx";
import {RequestView} from "../../../common/requests/components/RequestView.tsx";
import {UserCorrections} from "../../corrections/components/UserCorrections.tsx";
import {UserRequestActions} from "../components/UserRequestActions.tsx";


export const UserRequestsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Requests/>}/>
            <Route path=":id"
                   element={<RequestView correctionsSection={UserCorrections} actionsSection={UserRequestActions}/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}