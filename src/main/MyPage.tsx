import { Link } from "react-router-dom";
import GenericPost from "../components/common/posts/GenericPost";
import PostInfo from "../components/common/ui/PostInfo";
import { StudyData } from "../types/study";
import TechStackList from "../components/common/ui/TechStackList";
import StatusBadge from "../components/common/ui/StatusBadge";
import { IoIosArrowForward } from "react-icons/io";

const MyPage = ():JSX.Element =>{
    const studyList = [
        {},
    ];

    return (
        <div className="flex gap-10 justify-content items-center w-full h-screen bg-white9 text-nowrap">
            <div className="flex flex-col border border-gray5 w-[250px] bg-white nexon-medium text-black4">
                <div className="flex flex-col gap-3 p-4 border-b border-gray5 justify-center items-center">
                    <img src="/images/profile.png" alt="" className="w-30 pt-5"/>
                    <p className="nexon-bold">닉네임</p>
                    <p className="text-black6 nexon">test@gmail.com</p>
                    <div className="flex justify-center items-center gap-10 bg-white5 text-[14px] px-4 py-2 rounded-full ">
                        <p>내 기술스택 Java, Spring</p>
                        <IoIosArrowForward />
                    </div>
                </div>
                <Link to="/mypage/point">
                    <div className="flex gap-3 p-4 border-b-1 border-gray5 justify-between items-center">
                        <p className="text-[16px]">포인트</p>
                        <p className="nexon-bold">200P</p>   
                    </div>
                </Link>
                <div className="flex flex-col gap-3 p-4 border-b-1 border-gray5">
                    <div className="flex justify-between items-center">
                        <p className="text-[16px]">내 스터디</p>
                        <p className="nexon-bold">2</p>   
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[16px]">좋아요 게시글</p>
                        <p className="nexon-bold">256</p>   
                    </div>
                </div>
                <div className="flex gap-3 p-4 border-b-1 border-gray5 justify-between items-center">
                    <p className="text-[16px]">내 정보 관리</p> 
                </div>
                <div className="flex gap-3 p-4 border-gray5 justify-between items-center">
                    <p className="text-[16px] text-[#F74175]">로그아웃</p> 
                </div>
            </div>
            <div className="flex-1">
                <span className="nexon-bold text-black4 mr-1">내 스터디</span>
                <span className="text-myBlue nexon-bold ">5</span>
                <div className="border border-gray5 bg-white h-[500px] ">
                <div className="flex justify-between items-center border-b border-gray5 py-5 px-7">   
                    
                    <div className="flex items-center gap-5">
                        <StatusBadge status="PROGESS"></StatusBadge>
                        <div className="flex-col">
                            <p className="nexon-bold">스터디 제목</p>
                            <div className="flex gap-5 text-[12px]">
                                <p className="text-myBlue nexon-medium">프로젝트</p>
                                <p>모집인원 5명</p>
                                <p>참여횟수 5</p>
                                <p>사용언어 React, JavaScrpit, TypeScript</p>
                            </div>
                        </div>
                        
                    </div>
                    <IoIosArrowForward className="text-black6"/>
                </div>


                </div>
            </div>
        </div>
    )
}

export default MyPage;