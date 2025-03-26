import { useState } from "react";
import { StudyData } from "../../types/study";
import IconButton from "../common/ui/IconButton";
import TechStackBadge from "../common/ui/TechStackBadge";
import TextArea from "../form/TextArea";
import StudyJoinInfo from "./StudyJoinInfo";
import axios from "axios";
import useAuth from "../../hooks/login/useAuth";

interface StudyJoinPopupProps {
    onClose: () => void;
    post: StudyData;
  }

const StudyJoinPopup = ({ post, onClose }: StudyJoinPopupProps): JSX.Element => {
    const [ message, setMessage ] = useState("");

    const { token } = useAuth();

    const handleSubmit = async () => {
        try {
            await axios.post(
                `https://www.growtogether.store/study/${post.studyId}/join`,
                { content: message },
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            alert("참여 신청이 완료되었습니다.");
            onClose(); // 팝업 닫기
        } catch(e) {
            console.error("참여 신청 실패", e);
            alert("참여 신청 실패")
        }
    }
    
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50 z-[10]">
            <div className="w-[600px] bg-white rounded-[10px]">
                {/* 상단 타이틀 */}
                <div className="flex items-center justify-between px-[20px] py-[20px] border-b border-gray5">
                    <strong className="nexon-medium text-lg text-black4">참여 신청</strong>
                    <div className="flex items-center gap-5">
                        <IconButton
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C9.09826 1 10.1375 1.25292 11.0625 1.7037M13.6875 3.625L7.5625 9.75L5.8125 8" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            }
                            label="신청하기"
                            color="green"
                            onClick={handleSubmit}
                        />
                        <IconButton
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M10.0588 4.75V3.125C10.0588 2.69402 9.88529 2.2807 9.57641 1.97595C9.26753 1.6712 8.84859 1.5 8.41176 1.5H2.64706C2.21023 1.5 1.7913 1.6712 1.48241 1.97595C1.17353 2.2807 1 2.69402 1 3.125V12.875C1 13.306 1.17353 13.7193 1.48241 14.024C1.7913 14.3288 2.21023 14.5 2.64706 14.5H8.41176C8.84859 14.5 9.26753 14.3288 9.57641 14.024C9.88529 13.7193 10.0588 13.306 10.0588 12.875V11.25M5.11765 8H15M15 8L12.5294 5.5625M15 8L12.5294 10.4375" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            }
                            label="닫기"
                            color="gray"
                            onClick={onClose}
                        />
                    </div>
                </div>
                {/* 팝업 내용 */}
                <div className="px-[20px] py-[20px]">
                    <strong className="block pb-[10px] mb-[20px] nexon-bold text-[22px] text-black4 border-b border-gray5">{post.title}</strong>
                    <ul className="flex flex-wrap mb-6">
                        <StudyJoinInfo label="스터디 목적" value={post.type === "STUDY" ? "스터디" : "프로젝트"} />
                        <StudyJoinInfo label="모집인원" value={`${post.maxParticipant}명`} />
                        <StudyJoinInfo label="모집 마감일" value={post.studyClosingDate} />
                        <StudyJoinInfo label="시작일" value={post.studyStartDate} />
                        <StudyJoinInfo label="종료일" value={post.studyEndDate} />
                        <StudyJoinInfo label="참여횟수" value={post.studyCount} />
                        <li className="flex text-sm text-black4">
                            <strong className="block w-[92px] nexon-medium">사용언어</strong>
                            <ul className="flex gap-2 flex-wrap">
                                {post.skillNames.map((skill, index) => (
                                    <TechStackBadge stack={skill} key={index}/>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <TextArea className="h-[120px]" placeholder="스터디 팀장에게 한마디" onChange={(e) => setMessage(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default StudyJoinPopup;