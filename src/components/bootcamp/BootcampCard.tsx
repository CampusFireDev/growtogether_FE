import { Link } from "react-router-dom";
import TechStackList from "../common/ui/TechStackList";
import BootcampCourseBadge from "../common/ui/BootcampCourseBadge";
import { BootcampData } from "../../types/bootcamp";

interface BootcampCardProps {
    bootcamp: BootcampData
    showTechStack?: boolean; // 기술 스택 표시 여부 (현재 급상승 중인 인기글에는 안보임)
}

const BootcampCard = ({ bootcamp, showTechStack = true }: BootcampCardProps): JSX.Element => {
    return (
        <div className="border border-gray5 py-[25px] px-[30px] rounded-[10px]">
            <Link to={`/bootcamp/${bootcamp.id}`}>
                <div className="flex justify-between">
                    <BootcampCourseBadge type={bootcamp.programCourse} />
                </div>
                <p className="mt-[20px] text-black6 nexon-medium">{ bootcamp.bootCampName }</p>
                <strong className="text-xl/[31px] h-[64px] overflow-hidden line-clamp-2 nexon-bold mt-[10px] text-black4 break-keep">{bootcamp.title}</strong>
                <div className="flex align-center text-sm gap-1 mt-[10px] text-black6">
                    <strong>작성일</strong>
                    <span className="text-xs/[21px]">|</span>
                    <p>{bootcamp.createdAt.split("T")[0]}</p>
                </div>
                {/* showTechStack이 true일 때만 기술 스택 표시*/}
                {showTechStack && <TechStackList stacks={bootcamp.skillNames}/>}
                <div className="flex justify-between mt-[15px] pt-[15px] border-t border-gray5">
                    <div className="flex items-center gap-1">
                    <div className="w-[20px] h-[20px] rounded-full overflow-hidden bg-gray5">
                        <img 
                            src={bootcamp.profileImageUrl?.trim() ? bootcamp.profileImageUrl : "/images/noImage20.png"} 
                            alt="" className="w-full h-full object-cover"
                        />
                    </div>
                        <p className="text-sm text-black6">{bootcamp.author}</p>
                    </div>
                    <ul className="flex text-sm text-black6 gap-3">
                        <li className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="18px" height="18px" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2">
                                <path d="M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" />
                                <circle cx="16" cy="16" r="5" />
                            </svg>
                            {bootcamp.viewCount}
                        </li>
                        <li className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 13 13" fill="none">
                                <path d="M10.96 8.46928C11.2262 7.86705 11.3741 7.2008 11.3741 6.5C11.3741 3.80761 9.19167 1.625 6.49954 1.625C3.80741 1.625 1.625 3.80761 1.625 6.5C1.625 9.19239 3.80741 11.375 6.49954 11.375C7.36629 11.375 8.18021 11.1488 8.88547 10.7521L11.375 11.3745L10.96 8.46928Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {bootcamp.commentCount}
                        </li>
                        <li className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.94869 1.56914C2.55632 0.912605 3.38034 0.543782 4.23953 0.543782C5.09872 0.543782 5.92273 0.912605 6.53036 1.56914L7.47975 2.59438L8.42913 1.56914C8.72803 1.23466 9.08557 0.967863 9.48089 0.784322C9.87621 0.600782 10.3014 0.504173 10.7316 0.500132C11.1619 0.496091 11.5885 0.5847 11.9867 0.760788C12.385 0.936875 12.7467 1.19691 13.051 1.52573C13.3552 1.85455 13.5958 2.24557 13.7587 2.67596C13.9216 3.10635 14.0036 3.5675 13.9999 4.03251C13.9961 4.49751 13.9068 4.95705 13.7369 5.38432C13.5671 5.81159 13.3203 6.19802 13.0108 6.52108L7.47975 12.5L1.94869 6.52108C1.34124 5.86434 1 4.97374 1 4.04511C1 3.11649 1.34124 2.22588 1.94869 1.56914Z" stroke="#666666" strokeLinejoin="round"/>
                            </svg>
                            {bootcamp.likeCount}
                        </li>
                    </ul>
                </div>
            </Link>
        </div>
    )
}
export default BootcampCard;