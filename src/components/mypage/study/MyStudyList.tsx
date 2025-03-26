import { Link } from "react-router-dom";
import StatusBadge from "../../common/ui/StatusBadge";
import { IoIosArrowForward } from "react-icons/io";

const MyStudyList = (): JSX.Element => {
    return (
        <>
            <strong className="block nexon-bold text-xl text-black4 mb-2">
                내 스터디
                <span className="inline-block ml-1 text-myBlue">5</span>
            </strong>
            <div className="border border-gray5 bg-white">
                <Link to="/mypage/26/study-detail">
                    <div className="flex justify-between items-center border-b border-gray5 py-5 px-7">   
                        <div className="flex items-center gap-5">
                            <StatusBadge status="PROGRESS"></StatusBadge>
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
        </>
    )
}
export default MyStudyList;