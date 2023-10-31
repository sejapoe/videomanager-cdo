import {Navigate, Route, Routes} from "react-router-dom";
import {Requests} from "../components/Requests.tsx";
import {NewRequest} from "../components/NewRequest.tsx";
import {RequestView} from "../../../common/requests/components/RequestView.tsx";
import {AdminCorrections} from "../../corrections/components/AdminCorrections.tsx";


export const RequestsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Requests/>}/>
            <Route path="new" element={<NewRequest/>}/>
            <Route path=":id" element={<RequestView correctionsSection={AdminCorrections}/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}