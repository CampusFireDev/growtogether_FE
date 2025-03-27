import { Link } from "react-router-dom";
import StatusBadge from "../../common/ui/StatusBadge";
import { IoIosArrowForward } from "react-icons/io";
import useMyStudyList from "../../../hooks/mypage/study/useMyStudyList";

const MyStudyList = (): JSX.Element => {
    const { studyList } = useMyStudyList();

    return (
        <>
            <strong className="block nexon-bold text-xl text-black4 mb-2">
                내 스터디
                <span className="inline-block ml-1 text-myBlue">{studyList?.length}</span>
            </strong>
            <div className="max-h-117 overflow-x-hidden overflow-y-scroll">
                <div className="border border-gray5 bg-white">
                    {studyList?.map((study, index) => (
                        <Link 
                            to={`/mypage/${study.studyId}/study-detail`} key={study.studyId}
                            className={`block ${index !== studyList.length -1 ? "border-b border-gray5" : ""}`}
                        >
                            <div className="flex justify-between items-center py-5 px-7">   
                                <div className="flex items-center gap-5">
                                    <StatusBadge status={study.studyStatus}></StatusBadge>
                                    <div className="flex-col">
                                        <strong className="block nexon-bold text-lg text-black4 mb-1">{study.title}</strong>
                                        <ul className="flex text-[14px] text-black6">
                                            <li>
                                                <em className="nexon-medium text-myBlue">
                                                    {study.type === "PROJECT" ? "프로젝트" : "스터디"}
                                                </em>
                                                <span className="after:content-['·'] after:mx-2 after:text-gray-400"></span>
                                            </li>
                                            <li>
                                                <em className="inline-block mr-1">참가인원</em>
                                                <strong className="nexon-medium">{study.participant}명</strong>
                                                <span className="after:content-['·'] after:mx-2 after:text-gray-400"></span>
                                            </li>
                                            <li>
                                                <em className="inline-block mr-1">사용 언어</em>
                                                <strong className="nexon-medium">{study.skillNames.join(", ")}</strong>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <IoIosArrowForward className="text-black6"/>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
export default MyStudyList;