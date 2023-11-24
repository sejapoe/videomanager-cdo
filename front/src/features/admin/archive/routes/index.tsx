import {Navigate, Route, Routes} from "react-router-dom";
import {Archive} from "../components/Archive.tsx";


export const ArchiveRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Archive/>}/>
            {/*<Route path="new" element={<NewRequest/>}/>*/}
            {/*<Route path=":id"*/}
            {/*       element={<RequestView correctionsSection={AdminCorrections} actionsSection={AdminRequestActions}/>}/>*/}
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}