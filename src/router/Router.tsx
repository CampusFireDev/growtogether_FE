import { Routes, Route } from "react-router-dom";
import Home from "../main/Home";
import Study from "../views/Study";
import BootCamp from "../views/BootCamp";
import Notice from "../views/Notice";
import MyPage from "../main/MyPage";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Layout from "../layout/Layout";
import FindPassword from "../components/password/findPassword";
import ResetPassword from "../components/password/resetPassword"; 
import FindId from "../auth/FindId.tsx";
import BootCampPost from "../views/BootCampPost.tsx";
import StudyPost from "../views/StudyPost.tsx";
import BootcampCreate from "../views/BootcampCreate.tsx";
import StudyCreate from "../views/StudyCreate.tsx";

const Router = ():JSX.Element =>{
    return(
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup/:step?" element={<SignUp/>} />
                <Route path="/findpassword" element={<FindPassword/>} />
                <Route path="/resetpassword" element={<ResetPassword/>} />
                <Route path="/study" element={<Study/>} />
                <Route path="/bootcamp" element={<BootCamp/>} />
                <Route path="/bootcamp/:id" element={<BootCampPost/>} />
                <Route path="/study/:id" element={<StudyPost/>} />
                <Route path="/bootcamp/create" element={<BootcampCreate/>} />
                <Route path="/study/create" element={<StudyCreate/>} />
                <Route path="/notice" element={<Notice/>} />
                <Route path="/mypage" element={<MyPage/>} />
                <Route path="/findId" element={<FindId />} />
            </Route>
        </Routes>
    )
}

export default Router;