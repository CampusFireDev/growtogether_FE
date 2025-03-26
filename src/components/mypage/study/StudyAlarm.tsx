import { useParams } from "react-router-dom";
import useStudyVote from "../../../hooks/mypage/study/useStudyVote";
import IconButton from "../../common/ui/IconButton";
import useStudyJoin from "../../../hooks/mypage/study/useStudyJoin";
import useAuth from "../../../hooks/login/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyPageInfo from "../../../hooks/mypage/useMyPageInfo";
import useStudyGetMembers from "../../../hooks/mypage/study/useStudyGetMembers";

interface VoteDetail {
    voteId: number;
    title: string;
    voteType: "KICK" | "CHANGE";
    nickName?: string;
    profileImageUrl?: string;
    content?: string;
    prevStartDate: string;  
    prevStartTime: string; 
    prevEndDate: string;    
    prevEndTime: string;      
    prevTotalTime: number;    
  
    changeStartDate: string;  
    changeStartTime: string;   
    changeEndDate: string;     
    changeEndTime: string;   
    changeTotalTime: number;  
}

const StudyAlarm = (): JSX.Element => {
    const { studyId } = useParams(); // URL에서 studyId 가져오기

    // 로그인한 유저정보 가져오기
    const { info } = useMyPageInfo();

    const { token } = useAuth();

    const { data: statusData } = useStudyGetMembers(Number(studyId), "LEADER");
    const isAlreadyInStudy = statusData?.some((member) => member.nickname === info?.nickName);
    
    const { data: voteList } = useStudyVote(Number(studyId));
    const { data: join } = useStudyJoin(Number(studyId));
    
    const [voteDetails, setVoteDetails] = useState<VoteDetail[]>([]);

    // 모든 voteId에 대해 상세정보 요청
    useEffect(() => {
        const fetchVoteDetails = async () => {
        if (!voteList) return;
        const results: VoteDetail[] = [];

        for (const vote of voteList) {
            try {
            const res = await axios.get(
                `https://www.growtogether.store/study/vote/${vote.voteId}`,
                {
                headers: {
                    Authorization: `${token}`,
                },
                }
            );
            results.push(res.data);
            } catch (err) {
            console.error("투표 상세 조회 실패", err);
            }
        }

        setVoteDetails(results);
        };

        fetchVoteDetails();
    }, [voteList]);

    // 투표 응답 처리 함수
    const handleVote = async (voteId: number, agree: boolean) => {

        try {
            const data = {
                agree: Boolean(agree),
            };

            await axios.post(
                `https://www.growtogether.store/study/vote/${voteId}`,
                data,
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("투표가 완료되었습니다.");
            window.location.reload();
        } catch (err: any) {
            if(err.response.data.description === "이미 투표하셨습니다.") {
                alert("이미 투표하셨습니다.");
            } else {
                alert("투표 실패");
            }
          }
    };

    // 참여 신청 응답
    const acceptJoin = async (studyMemberId: number) => {
        try {
            await axios.put(
                `https://www.growtogether.store/study/join/${studyMemberId}`,
                {},
                {
                    headers: {
                    Authorization: `${token}`,
                    },
                }
            );

            alert("수락되었습니다.");
            window.location.reload();
        } catch (err) {
            alert("수락 실패");
            console.error(err);
        }
    };

    const rejectJoin = async (studyMemberId: number) => {
        try {
          await axios.delete(
            `https://www.growtogether.store/study/join/${studyMemberId}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          alert("거절되었습니다.");
          window.location.reload();
        } catch (err) {
          alert("❌ 거절 실패");
          console.error(err);
        }
      };
    
      const getChangeMessage = (vote: VoteDetail): string => {
        const {
            prevStartDate,
            prevStartTime,
            prevTotalTime,
            changeStartDate,
            changeStartTime,
            changeTotalTime,
        } = vote;

        if (!prevStartDate || !changeStartDate || prevTotalTime == null || changeTotalTime == null || !prevStartTime || !changeStartTime)
        return "";

        const startDateChanged = prevStartDate !== changeStartDate;
        const startTimeChanged = prevStartTime !== changeStartTime;
        const durationChanged = prevTotalTime !== changeTotalTime;

        const dateFormat = (date: string) => {
            const d = new Date(date);
            return `${d.getMonth() + 1}월 ${d.getDate()}일`;
        };

        const startDateMsg = startDateChanged
            ? `시작일이 ${dateFormat(prevStartDate)}에서 ${dateFormat(changeStartDate)}로 변경`
            : "";

        const startTimeMsg = startTimeChanged
            ? `시작시간이 ${prevStartTime}에서 ${changeStartTime}로 변경`
            : "";

        const durationMsg = durationChanged
            ? `진행시간이 ${prevTotalTime}분에서 ${changeTotalTime}분으로 변경`
            : "";

        // 여러 조건 조합해서 메시지 만들기
        const messages = [startDateMsg, startTimeMsg, durationMsg].filter(Boolean);
        return messages.length > 0 ? messages.join(", ") + "되었습니다." : "";
      };

    
    return (
        <div>
            <ul>
                {!isAlreadyInStudy && 
                    join?.map((join) => (
                        <li className="flex items-center justify-between py-[15px] px-[20px] bg-white9" key={join.studyMemberId}>
                        <div className="flex items-center gap-2">
                            <div className="w-[32px] h-[32px] rounded-full bg-gray5 overflow-hidden">
                            {/* 프로필 이미지 URL */}
                            </div>
                            <strong className="nexon text-[15px] text-black4">
                            <span className="text-myBlue">{join.nickname}</span>
                            님의 참가 요청을 보냈습니다.
                            </strong>
                        </div>
                        <div className="flex items-cente gap-3">
                            <IconButton
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C9.09826 1 10.1375 1.25292 11.0625 1.7037M13.6875 3.625L7.5625 9.75L5.8125 8" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            }
                            label="수락하기"
                            color="green"
                            onClick={() => acceptJoin(join.studyMemberId)}
                            />
                            <IconButton
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                <path d="M12 1.5L1 12.5M12 12.5L1 1.5" stroke="#E8463B" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            }
                            label="거절하기"
                            color="red"
                            onClick={() => rejectJoin(join.studyMemberId)}
                            />
                        </div>
                        </li>
                    ))
                }
                {voteDetails.map((vote) => (
                    <li
                        key={vote.voteId}
                        className="flex items-center justify-between py-[15px] px-[20px] bg-white9"
                    >
                        <div className="flex items-center gap-2">
                        <div className="w-[32px] h-[32px] rounded-full bg-gray5 overflow-hidden">
                            {vote.voteType === "KICK" && vote.profileImageUrl && (
                            <img
                                src={vote.profileImageUrl}
                                alt={vote.nickName}
                                className="w-full h-full object-cover"
                            />
                            )}
                        </div>
                        <div>
                            {vote.voteType === "KICK" && (
                            <strong className="text-black4 text-sm">{vote.title}</strong>
                            )}
                            {vote.voteType === "CHANGE" && (
                            <strong className="text-black4 text-sm">
                                {vote.content}의 {getChangeMessage(vote)}
                            </strong>
                            )}
                        </div>
                        </div>
                        <div className="flex items-cente gap-3">
                        <IconButton
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C9.09826 1 10.1375 1.25292 11.0625 1.7037M13.6875 3.625L7.5625 9.75L5.8125 8" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            }
                            label="수락하기"
                            color="green"
                            onClick={() => handleVote(vote.voteId, true)}
                        />
                        <IconButton
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                    <path d="M12 1.5L1 12.5M12 12.5L1 1.5" stroke="#E8463B" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            }
                            label="거절하기"
                            color="red"
                            onClick={() => handleVote(vote.voteId, false)}
                        />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StudyAlarm;