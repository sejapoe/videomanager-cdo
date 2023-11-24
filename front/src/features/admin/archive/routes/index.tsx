import {Navigate, Route, Routes} from "react-router-dom";
import {Archive} from "../components/Archive.tsx";
import {ArchiveEntryView} from "../components/ArchiveEntryView.tsx";
import {NewArchiveEntry} from "../components/NewArchiveEntry.tsx";


export const ArchiveRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Archive/>}/>
            <Route path="new" element={<NewArchiveEntry/>}/>
            <Route path=":id" element={<ArchiveEntryView/>}/>
            <Route path="*" element={<Navigate to={"."}/>}/>
        </Routes>
    )
}