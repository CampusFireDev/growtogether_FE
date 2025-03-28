import { Routes, Route } from "react-router-dom";
import Home from "../main/Home";
import Study from "../views/Study";
import BootCamp from "../views/BootCamp";
import Notice from "../views/Notice";
import MyPage from "../views/mypage/MyPage.tsx";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Layout from "../layout/Layout";
import FindPassword from "../components/password/FindPassword.tsx";
import ResetPassword from "../components/password/ResetPassword.tsx";
import FindId from "../auth/FindId.tsx";
import BootCampPost from "../views/BootCampPost.tsx";
import StudyPost from "../views/StudyPost.tsx";
import BootcampCreate from "../views/BootcampCreate.tsx";
import StudyCreate from "../views/StudyCreate.tsx";
import Point from "../components/mypage/Point.tsx"
import PointCharge from "../components/mypage/PointCharge.tsx"
import PersonalInfo from "../components/mypage/PersonalInfo.tsx"
import StudyDetail from "../views/mypage/StudyDetail.tsx";
import MypageLayout from "../layout/MypageLayout.tsx";
import KaKaoRedirect from "../components/login/KaKaoRedirect.tsx";
import UserAuthLayout from "../layout/UserAuthLayout.tsx";
import StudyDashboardLayout from "../layout/StudyDashboardLayout.tsx";
import LikedPostsView from "../views/mypage/LikedPostsView.tsx";
import MyStudyListView from "../views/mypage/MyStudyListView.tsx";
import Notification from "../components/mypage/Notification.tsx"
import StudyChatPage from "../views/chat/StudyChatPage.tsx";
import KakaoPayApproval from "../components/mypage/KakaoPayApproval.tsx";

const Router = ():JSX.Element =>{
    return(
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/findpassword" element={<FindPassword/>} />
                <Route path="/resetpassword" element={<ResetPassword/>} />
                <Route path="/study" element={<Study/>} />
                <Route path="/bootcamp" element={<BootCamp/>} />
                <Route path="/bootcamp/:id" element={<BootCampPost/>} />
                <Route path="/study/:id" element={<StudyPost/>} />
                <Route path="/bootcamp/create" element={<BootcampCreate/>} />
                <Route path="/study/create" element={<StudyCreate/>} />
                <Route path="/notice" element={<Notice/>} />
                <Route path="/findId" element={<FindId />} />
                <Route path="/oauth/kakao/callback" element={<KaKaoRedirect />} />
            </Route>
            <Route element={<MypageLayout />}>
                <Route path="/mypage/" element={<MyPage/>} />
                <Route path="/mypage/point" element={<Point />} />
                <Route path="/mypage/point/charge" element={<PointCharge />} />
                <Route path="/payment/approve" element={<KakaoPayApproval />} />
                <Route path="/mypage/personalinfo" element={<PersonalInfo />} />
                <Route path="/mypage/notification" element={<Notification />} />
                <Route path="/mypage/mylikes" element={<LikedPostsView />} />
                <Route path="/mypage/study" element={<MyStudyListView />} />
                <Route path="/findId" element={<FindId />} />
            </Route>
            <Route element={<UserAuthLayout />}>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup/:step?" element={<SignUp/>} />
            </Route>
            <Route element={<StudyDashboardLayout />}>
                <Route path="/mypage/:studyId/study-detail" element={<StudyDetail />} />
            </Route>
            <Route path="/study/:studyId/chat" element={<StudyChatPage />} />
        </Routes>
    )
}

export default Router;