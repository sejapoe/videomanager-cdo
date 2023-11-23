import {Navigate, Route, Routes} from "react-router-dom";

import {Users} from "../components/Users.tsx";

export const UsersRoutes = () =>
    <Routes>
        <Route path="" element={<Users/>}/>
        {/*<Route path="new" element={<NewRequest/>}/>*/}
        {/*<Route path=":id"*/}
        {/*       element={<RequestView correctionsSection={AdminCorrections} actionsSection={AdminRequestActions}/>}/>*/}
        <Route path="*" element={<Navigate to={"."}/>}/>
    </Routes>