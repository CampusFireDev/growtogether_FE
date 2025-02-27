import { Routes, Route } from "react-router-dom";
import Home from "../main/Home";
import Study from "../views/Study";
import BootCamp from "../views/BootCamp";
import Notice from "../views/Notice";
import MyPage from "../main/MyPage";
import Login from "../auth/Login";
import Layout from "../layout/Layout";
import SignUp from "../auth/SignUp";


const Router = ():JSX.Element =>{
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/study" element={<Study/>} />
                <Route path="/bootcamp" element={<BootCamp/>} />
                <Route path="/notice" element={<Notice/>} />
                <Route path="/mypage" element={<MyPage/>} />
            </Route>
        </Routes>
    )
}

export default Router;