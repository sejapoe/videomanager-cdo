import {Route, Routes} from "react-router-dom";
import {Institutes} from "../components/Institutes.tsx";

export const InstitutesRoutes = () =>
    <Routes>
        <Route path="" element={<Institutes/>}/>
        {/*<Route/>*/}
    </Routes>
