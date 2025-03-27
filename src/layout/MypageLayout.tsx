import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import { IoIosArrowForward } from "react-icons/io";
// import useMemberId from "../hooks/auth/useMemberId";
import useMyPageInfo from "../hooks/mypage/useMyPageInfo";
import { logout } from "../api/authApi";
import useMyStudyList from "../hooks/mypage/study/useMyStudyList";

const MypageLayout = ():JSX.Element => {
    const navigate = useNavigate();

    // 아이디 가져오기
    // const memberId = useMemberId();

    // 회원 정보 가져오기
    const { info } = useMyPageInfo();

    // 참여 스터디 리스트 가져오기
    const { studyList } = useMyStudyList();

    // 로그아웃
    const handleLogout = () => {
        logout();
        if(confirm("로그아웃 하시겠습니까?")) {
            navigate("/");
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <div id="content-wrapper" className="bg-white9 flex-grow">
                <div className="w-full max-w-[1200px] mx-auto mt-[69px] py-[60px]">
                    <div className="flex gap-10 justify-content text-nowrap">
                        {/* 왼쪽 메뉴 */}
                        <div className="flex flex-col border border-gray5 w-[250px] self-start bg-white nexon-medium text-black4">
                            <div className="flex flex-col pt-[30px] pb-[20px] px-[20px] border-b border-gray5 justify-center items-center">
                                <div className="block w-[80px] h-[80px] overflow-hidden mb-3">
                                    <img src={info?.profileImageUrl || "/images/noImage80.png"} alt="" className="w-full"/>
                                </div>
                                <p className="nexon-bold">{info?.nickName}</p>
                                <p className="text-black6 nexon text-sm mt-1">{info?.email}</p>
                                <div className="flex justify-between items-center w-full bg-white5 text-[14px] px-4 py-2 rounded-full mt-4">
                                    <p>
                                        내 기술스택 
                                        <span className="nexon">
                                            {info?.skills?.map((skill) => skill).join(",")}
                                        </span>
                                    </p>
                                    <IoIosArrowForward size={13} className="shrink" />
                                </div>
                            </div>
                            <Link to="/mypage/point">
                                <div className="flex gap-3 p-5 border-b-1 border-gray5 justify-between items-center">
                                    <span className="text-[16px] nexon">포인트</span>
                                    <span className="nexon-bold">{info?.points}P</span>   
                                </div>
                            </Link>
                            <div className="flex flex-col gap-3 p-5 border-b-1 border-gray5">
                                <Link to="/mypage/study" className="flex justify-between items-center">
                                    <em className="text-[16px] nexon">내 스터디</em>
                                    <em className="nexon-bold">{studyList?.length}</em>   
                                </Link>
                                <Link to="/mypage/mylikes">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[16px] nexon">좋아요 게시글</p>
                                        <p className="nexon-bold">{info?.likedPostCount}</p>   
                                    </div>
                                </Link>
                            </div>
                            <Link to="/mypage/personalinfo">
                                <div className="flex gap-3 p-4 border-b-1 border-gray5 justify-between items-center">
                                    <span className="text-[16px]">내 정보 관리</span> 
                                </div>
                            </Link>
                            <div className="flex gap-3 p-4 border-gray5 justify-between items-center">
                                <button onClick={handleLogout} className="text-[16px] text-[#F74175] cursor-pointer">로그아웃</button> 
                            </div>
                        </div>
                        <div className="flex-1">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}

export default MypageLayout;