/**
 * 게시글 컴포넌트
 */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useContentType } from "../context/ContentTypeContext"; 
import { IoEyeOutline } from "react-icons/io5";
import FormButton from "../components/form/FormButton";
import StudyTypeBadge from "../components/common/ui/StudyTypeBadge";
import LikeBtn from "../components/common/ui/LikeBtn";
import CommentList from "../components/common/ui/CommentList";
import { BootcampData  } from "../types/bootcamp";
import { StudyData } from "../types/study";
import { formatDate } from "../components/common/utils/formatDate";
import useMyPageInfo from "../hooks/mypage/useMyPageInfo";
import StudyJoinPopup from "../components/study/StudyJoinPopup";
import useStudyGetMembers from "../hooks/mypage/study/useStudyGetMembers";
import useAuth from "../hooks/login/useAuth";

interface PostProps {
post: BootcampData | StudyData;
postTitle: string;
infoTitle: string;
children: React.ReactNode;
}

const Post = ({ post, postTitle, infoTitle, children }: PostProps):JSX.Element =>{
	const [likeCount, setLikeCount] = useState(post.likeCount);
	const { contentType } = useContentType();

	// 로그인한 사용자 닉네임 가져오기
	const { isAuthenticated } = useAuth();
	const info = isAuthenticated ? useMyPageInfo().info : null;

	// 팝업 상태 관리
	const [ isPopupOpen, setIsPopupOpen ] = useState(false); 

	useEffect(() => {
		setLikeCount(post.likeCount); 
	}, [post.likeCount]);

	const isBootcampPost = (post: BootcampData | StudyData): post is BootcampData => {
		return (post as BootcampData).bootCampName !== undefined;
	};
	
	// 스터디에 참여했거나 강퇴당했거나 본인일때 참여 신청 막기
	const studyId = !isBootcampPost(post) && post.studyId;
	const { data: memberList = [] } = useStudyGetMembers(Number(studyId), "LEADER,NORMAL,PENDING,KICK");
	const isAlreadyInStudy = memberList?.some((member) => member.nickname === info?.nickName);

  
  return(
    <div className="w-full max-w-[1200px] my-10">  
        <StudyTypeBadge type={post.type}/>
        <h2 className="nexon-bold text-[20px] my-3">{postTitle}</h2>
        <div className="border-y border-gray5 flex items-center justify-between">    
            <div className="flex items-center gap-2 text-black4 text-[13px] text-nowrap py-3">
			<img src={post.profileImageUrl?.trim() ? post.profileImageUrl : "/images/noImage20.png"} alt="프로필 이미지" className="w-6 h-6"/>
                <span className="nexon-medium">{post.author} | 작성일</span>
                <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex text-black6 items-center gap-1">
                <IoEyeOutline className="w-4 h-4" />
                <p className="text-[11px]">{post.viewCount}</p>
            </div>
        </div>

			{/* 게시글 상세 정보*/}
			{children}
		
			{/* 후기 / 모집글 작성*/}
			<div className="border-b border-gray5 py-5">
				<p className="nexon-bold text-black4 text-[14px] lg:text-[17px] mb-3">{infoTitle}</p>
				{/* <p className="nexon-bold text-[14px] lg:text-[17px] ">{post.title}</p> */}
				<p className="text-[13px] lg:text-[15px] my-2">{post.content}</p>
			</div>

			{/* 좋아요, 목록 버튼*/}
			<div className="flex justify-center items-center gap-2 my-5">
				<LikeBtn likeCount={likeCount} postId={isBootcampPost(post) ? post.id : post.studyId}/>
				<Link to={`/${contentType}`}>
				<FormButton type="button" className="!w-[80px] bg-black6">목록</FormButton>
				</Link>
				{!isAlreadyInStudy && contentType === "study" && (
					<FormButton type="button" className="!w-[150px] bg-myBlue" onClick={() => setIsPopupOpen(true)}>
						참여신청
					</FormButton>
				)}
				{/* 참가 신청 팝업 */}
				{!isBootcampPost(post) && isPopupOpen && (
					<StudyJoinPopup post={post} onClose={() => setIsPopupOpen(false)} />
				)}
			</div>

			{/* 댓글 창*/}
			<CommentList postId={isBootcampPost(post) ? post.id : post.studyId} />
		</div>
	)
}

export default Post;