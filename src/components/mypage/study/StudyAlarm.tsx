import { useParams } from "react-router-dom";
import useStudyVote from "../../../hooks/mypage/study/useStudyVote";
import IconButton from "../../common/ui/IconButton";
import useStudyJoin from "../../../hooks/mypage/study/useStudyJoin";
import useAuth from "../../../hooks/login/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
// import useVoteDetail from "../../../hooks/mypage/study/useVoteDetail";

interface VoteDetail {
    voteId: number;
    title: string;
    voteType: "KICK" | "CHANGE";
    nickName?: string;
    profileImageUrl?: string;
    content?: string;
    prevStartDate?: string;
    prevEndDate?: string;
    changeStartDate?: string;
    changeEndDate?: string;
}

const StudyAlarm = (): JSX.Element => {
    const { studyId } = useParams(); // URL에서 studyId 가져오기

    const { token } = useAuth();

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
        } catch (err) {
            alert("투표 실패");
            console.error("투표 실패", err);
        }
    };
    
    return (
        <div>
            <ul>
                {join?.map((join) => (
                    <li className="flex items-center justify-between py-[15px] px-[20px] bg-white9">
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
                            />
                        </div>
                    </li>
                ))}
                {voteDetails?.map((vote) => (
                    <li className="flex items-center justify-between py-[15px] px-[20px] bg-white9">
                        <div className="flex items-center gap-2">
                            <div className="w-[32px] h-[32px] rounded-full bg-gray5 overflow-hidden">
                                {vote.voteType === "KICK" && vote.profileImageUrl && (
                                <img src={vote.profileImageUrl} alt={vote.nickName} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div>
                                {vote.voteType === "KICK" && (
                                <strong className="text-black4 text-sm">
                                    [{vote.title}] {vote.nickName} 님의 강퇴를 요청했습니다.
                                </strong>
                                )}
                                {vote.voteType === "CHANGE" && (
                                <strong className="text-black4 text-sm">
                                    [{vote.content}]의 일정을
                                    {vote.prevStartDate?.split("T")[0]}에서{" "}
                                    {vote.changeStartDate?.split("T")[0]}로 변경 요청했습니다.
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