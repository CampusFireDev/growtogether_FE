import { Link } from "react-router-dom";
import StudyTypeBadge from "../common/ui/StudyTypeBadge";
import StatusBadge from "../common/ui/StatusBadge";
import TechStackList from "../common/ui/TechStackList";
import { StudyData } from "../../types/study";

interface StudyCardProps {
    study: StudyData;
    showTechStack?: boolean; // 기술 스택 표시 여부 (현재 급상승 중인 게시글에는 안보임)
}

const StudyCard = ({ study, showTechStack = true }: StudyCardProps): JSX.Element => {
    return(
        <div className="border border-gray5 py-[25px] px-[30px] rounded-[10px]">
            <Link to={`/study/${study.studyId}`}>
                <div className="flex justify-between">
                    <StudyTypeBadge type={study.type} />
                    <StatusBadge status={study.studyStatus} />
                </div>
                <div className="flex align-center text-sm gap-1 mt-[20px] text-black6">
                    <strong>마감일</strong>
                    <span className="text-xs/[21px]">|</span>
                    <p>{study.studyClosingDate}</p>
                </div>
                <strong className="text-xl/[31px] h-[64px] overflow-hidden line-clamp-2 nexon-bold mt-[6px] mb-[15px] text-black4">{study.title}</strong>
                {/* showTechStack이 true일 때만 기술 스택 표시*/}
                {showTechStack && <TechStackList stacks={study.skillNames}/>}
                <div className="flex justify-between mt-[15px] pt-[15px] border-t border-gray5">
                    <div className="flex items-center gap-1">
                        <div className="w-[20px] h-[20px] rounded-full overflow-hidden bg-gray5">
                            <img src="/images/noImage20.png" />
                        </div>
                        <p className="text-sm text-black6">{study.author}</p>
                    </div>
                    <ul className="flex text-sm text-black6 gap-3">
                        <li className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="18px" height="18px" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2">
                                <path d="M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" />
                                <circle cx="16" cy="16" r="5" />
                            </svg>
                            {study.viewCount}
                        </li>
                        <li className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 13 13" fill="none">
                                <path d="M10.96 8.46928C11.2262 7.86705 11.3741 7.2008 11.3741 6.5C11.3741 3.80761 9.19167 1.625 6.49954 1.625C3.80741 1.625 1.625 3.80761 1.625 6.5C1.625 9.19239 3.80741 11.375 6.49954 11.375C7.36629 11.375 8.18021 11.1488 8.88547 10.7521L11.375 11.3745L10.96 8.46928Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            42
                        </li>
                    </ul>
                </div>
            </Link>
        </div>
    )
}

export default StudyCard;