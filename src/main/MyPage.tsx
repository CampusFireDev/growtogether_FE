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
        <div className="flex gap-10 justify-content  text-nowrap">
            <div className="flex flex-col border border-gray5 w-[250px] self-start bg-white nexon-medium text-black4">
                <div className="flex flex-col pt-[30px] pb-[20px] px-[20px] border-b border-gray5 justify-center items-center">
                    <div className="block w-[80px] h-[80px] overflow-hidden mb-3">
                        <img src="/images/profile.png" alt=""/>
                    </div>
                    <p className="nexon-bold">닉네임</p>
                    <p className="text-black6 nexon text-sm mt-1">test@gmail.com</p>
                    <div className="flex justify-between items-center w-full bg-white5 text-[14px] px-4 py-2 rounded-full mt-4">
                        <p>내 기술스택 <span className="nexon">Java, Spring</span></p>
                        <IoIosArrowForward size={13} className="shrink" />
                    </div>
                </div>
                <Link to="/mypage/point">
                    <div className="flex gap-3 p-5 border-b-1 border-gray5 justify-between items-center">
                        <p className="text-[16px] nexon">포인트</p>
                        <p className="nexon-bold">200P</p>   
                    </div>
                </Link>
                <div className="flex flex-col gap-3 p-5 border-b-1 border-gray5">
                    <div className="flex justify-between items-center">
                        <p className="text-[16px] nexon">내 스터디</p>
                        <p className="nexon-bold">2</p>   
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[16px] nexon">좋아요 게시글</p>
                        <p className="nexon-bold">256</p>   
                    </div>
                </div>
                <div className="flex gap-3 p-5 border-b-1 border-gray5 justify-between items-center">
                    <p className="text-[16px]">내 정보 관리</p> 
                </div>
                <div className="flex gap-3 p-5 border-gray5 justify-between items-center">
                    <p className="text-[16px] text-[#F74175]">로그아웃</p> 
                </div>
            </div>
            <div className="flex-1">
                <strong className="block nexon-bold text-xl text-black4 mb-2">
                    내 스터디
                    <span className="inline-block ml-1 text-myBlue">5</span>
                </strong>
                <div className="border border-gray5 bg-white min-h-[523px]">
                    <Link to="/mypage/study-detail">
                        <div className="flex justify-between items-center border-b border-gray5 py-5 px-7">   
                            <div className="flex items-center gap-5">
                                <StatusBadge status="PROGESS"></StatusBadge>
                                <div className="flex-col">
                                    <strong className="block nexon-bold text-lg text-black4 mb-1">스터디 제목</strong>
                                    <ul className="flex text-[14px] text-black6">
                                        <li>
                                            <em className="nexon-medium text-myBlue">프로젝트</em>
                                            <span className="after:content-['·'] after:mx-2 after:text-gray-400"></span>
                                        </li>
                                        <li>
                                            <em className="inline-block mr-1">모집인원</em>
                                            <strong className="nexon-medium">5명</strong>
                                            <span className="after:content-['·'] after:mx-2 after:text-gray-400"></span>
                                        </li>
                                        <li>
                                            <em className="inline-block mr-1">사용 언어</em>
                                            <strong className="nexon-medium">React, Javascript, Typescript 외 5</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <IoIosArrowForward className="text-black6"/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MyPage;