import { useState } from "react";
import { useParams } from "react-router-dom";
import useStudyGetMembers from "../../../hooks/mypage/study/useStudyGetMembers";
import useMyPageInfo from "../../../hooks/mypage/useMyPageInfo";
import useApiMutation from "../../../hooks/useApiMutation";

const StudyMemeberList = (): JSX.Element => {
    const { studyId } = useParams(); // URL에서 studyId 가져오기

    const { trigger } = useApiMutation("POST");

    // 로그인한 사용자 닉네임 가져오기
    const { info } = useMyPageInfo();

    // 선택한 멤버의 ID를 저장 상태
    const [ selectedMemberId, setSelectedMemberId ] = useState<number | null>(null);

    // API
    const { data: leaderData } = useStudyGetMembers(Number(studyId), "LEADER");
    const { data: allMembers } = useStudyGetMembers(Number(studyId), "LEADER,NORMAL");

    // leaderData에 포함된 닉네임이 리더
    const leaderNicknames = leaderData?.map(m => m.nickname);

    // 팝업 상태 
    const [ isOpen, setIsOpen ] = useState(false);

    // 팝업 토글
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    // 추방 투표하기 API 호출
    const handleVote = async () => {
        if (!selectedMemberId) {
            alert("추방할 상태를 선택해주세요.");
            return;
        }

        try {
            await trigger(`http://www.growtogether.store/study/${studyId}/vote`, { studyMemberId: selectedMemberId });
            alert("추방 투표가 등록되었습니다.");
            
            setIsOpen(false); // 팝업 닫기
        } catch(e) {
            alert("투표 요청 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="relative">
            <button type="button" onClick={togglePopup} className="flex items-center gap-1 text-black4 nexon-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
                    <path d="M12.9998 15.2068L13 12.5693C13.0001 11.1124 11.8488 9.93126 10.4285 9.93126H3.57177C2.15169 9.93126 1.00045 11.1121 1.00029 12.5687L1 15.2068M9.57159 3.77645C9.57159 5.23325 8.4203 6.41423 7.00011 6.41423C5.57993 6.41423 4.42864 5.23325 4.42864 3.77645C4.42864 2.31964 5.57993 1.13867 7.00011 1.13867C8.4203 1.13867 9.57159 2.31964 9.57159 3.77645Z" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                { allMembers?.length }명
            </button>
            {/* 팝업: isOpen이 true일 때만 표시 */}
            {isOpen && (
                <div className="absolute right-[0px] top-[30px] w-[280px] px-[20px] py-[20px] bg-white border border-gray5 rounded-[5px] z-[1]">
                    <ul>
                        {allMembers?.map((member) => (
                            <li key={member.studyMemberId} className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="member"
                                        id={`member-${member.studyMemberId}`}
                                        onChange={() => setSelectedMemberId(member.studyMemberId)}
                                    />
                                    <div>
                                        <label htmlFor="member1" className="flex items-center gap-2 text-black4">
                                            <div className="w-[25px] h-[25px] rounded-full overflow-hidden bg-gray5"></div>
                                            {member.nickname}
                                        </label>
                                    </div>
                                </div>
                                {leaderNicknames?.includes(member.nickname)
                                    ? (
                                        <div className="flex items-center gap-1 text-sm nexon-medium text-myYellow">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                <path d="M6.17388 0.212543C6.30728 -0.0708476 6.69272 -0.0708476 6.82612 0.212543L8.55299 3.88106C8.60597 3.9936 8.70836 4.0716 8.82682 4.08964L12.6882 4.67792C12.9865 4.72336 13.1056 5.10769 12.8898 5.32828L10.0956 8.18382C10.0099 8.27142 9.97081 8.39763 9.99104 8.52131L10.6507 12.5534C10.7016 12.8649 10.3898 13.1024 10.123 12.9554L6.66923 11.0517C6.56328 10.9933 6.43671 10.9933 6.33077 11.0517L2.87702 12.9554C2.61022 13.1024 2.29839 12.8649 2.34935 12.5534L3.00896 8.52131C3.02919 8.39763 2.99008 8.27142 2.90437 8.18382L0.110222 5.32828C-0.105623 5.10769 0.0134828 4.72336 0.311774 4.67792L4.17318 4.08964C4.29164 4.0716 4.39403 3.9936 4.44701 3.88106L6.17388 0.212543Z" fill="#FCBC05"/>
                                            </svg>
                                            LEADER
                                        </div>
                                    )
                                    : member.nickname === info?.nickName
                                    ? (
                                        <div className="flex items-center gap-1 text-sm nexon-medium text-myBlue">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                <path d="M0 12.2636C0 9.70726 2.13571 7.63492 6.5 7.63492C10.8643 7.63492 13 9.70726 13 12.2636C13 12.6703 12.7033 13 12.3373 13H0.662745C0.296721 13 0 12.6703 0 12.2636Z" fill="#4385F5"/>
                                                <path d="M8.9375 2.4375C8.9375 3.78369 7.84619 4.875 6.5 4.875C5.15381 4.875 4.0625 3.78369 4.0625 2.4375C4.0625 1.09131 5.15381 0 6.5 0C7.84619 0 8.9375 1.09131 8.9375 2.4375Z" fill="#4385F5"/>
                                            </svg>
                                            나
                                        </div>
                                    )
                                : ""}
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-1 mt-3">
                        <button
                            className="flex-[1] h-[42px] nexon-medium text-sm text-white bg-myRed rounded-[5px]"
                            onClick={handleVote}
                        >
                            추방 투표하기
                        </button>
                        <button onClick={() => setIsOpen(false)} className="flex-[1] h-[42px] nexon-medium text-sm text-white bg-black6 rounded-[5px]">닫기</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default StudyMemeberList;