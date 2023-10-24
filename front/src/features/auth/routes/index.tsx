import {Route, Routes} from "react-router-dom";
import {Register} from "./Register.tsx";
import {Login} from "./Login.tsx";
import {Activate} from "./Activate.tsx";
import Page404 from "../../../pages/page-404";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="register" element={<Register/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="activate/:uuid" element={<Activate/>}/>
            <Route path="*" element={<Page404/>}/>
        </Routes>
    )
}