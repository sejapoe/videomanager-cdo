import {Navigate, Route, Routes} from "react-router-dom";

import {Users} from "../components/Users.tsx";
import {LecturerView} from "../components/LecturerView.tsx";

export const UsersRoutes = () =>
    <Routes>
        <Route path="" element={<Users/>}/>
        {/*<Route path="new" element={<NewRequest/>}/>*/}
        <Route path=":id"
               element={<LecturerView/>}/>
        <Route path="*" element={<Navigate to={"."}/>}/>
    </Routes>