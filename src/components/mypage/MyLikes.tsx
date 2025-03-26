import { Link } from "react-router-dom";
import StatusBadge from "../common/ui/StatusBadge";
import BootcampCourseBadge from "../common/ui/BootcampCourseBadge";
import { IoIosArrowForward } from "react-icons/io";
import useMyLikes from "../../hooks/mypage/useMyLikes";


const type: { [key: string]: string } = {
    BootCamp: "부트캠프",
    STUDY: "스터디",
    PROJECT: "프로젝트",
};

const MyLikes = ():JSX.Element => {
    const { myLikes } = useMyLikes();
    return (
        <>
            <strong className="block nexon-bold text-xl text-black4 mb-2">
                좋아요한 게시글
                <span className="inline-block ml-1 text-myBlue">{myLikes.length}</span>
            </strong>
            <div className="border border-gray5 bg-white">
                {
                    myLikes.length > 0 ? (
                        myLikes.map((like, index) => (
                            <Link to={`/${like.type === "PROJECT" ? "study" : like.type.toLowerCase()}/${like.postId}`} key={index}>
                                <div className="flex justify-between items-center border-b border-gray5 py-5 px-7">  
                                    <div className="flex items-center gap-5">
                                        {like.status && <StatusBadge status={like.status} />}
                                        {like.programCourse && <BootcampCourseBadge type={like.programCourse}></BootcampCourseBadge>}
                                        <div className="flex-col">
                                            <strong className="block nexon-bold text-lg text-black4 mb-1">{like.title}</strong>
                                            <ul className="flex text-[14px] text-black6">
                                                <li>
                                                    <em className="nexon-medium text-myBlue">{type[like.type]}</em>
                                                    <span className="after:content-['·'] after:mx-2 after:text-gray-400"></span>
                                                </li>
                                                <li>
                                                    {like.people && 
                                                    <>
                                                        <em className="inline-block mr-1">모집인원</em>
                                                        <strong className="nexon-medium">{like.people}</strong>
                                                        <span className="after:content-['·'] after:mx-2 after:text-gray-400"></span>
                                                    </>
                                                    } 
                                                </li>
                                                <li>
                                                    <>
                                                        <em className="inline-block mr-1">사용 언어</em>
                                                        <strong className="nexon-medium">{like.skillName || like.bootcampSkillNames}</strong>
                                                    </>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <IoIosArrowForward className="text-black6"/>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">좋아요한 게시글이 없습니다.</p>
                    )
                }
            </div>
                
        </>
    )
}
export default MyLikes;