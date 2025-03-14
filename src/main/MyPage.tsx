import { Link } from "react-router-dom";
import StudyTypeBadge from "../components/common/ui/StudyTypeBadge";
import StudyAlarmList from "../components/mypage/study/StudyAlarmList";
import StudyCalendar from "../components/mypage/StudyCalendar";
import StudyMemeberList from "../components/mypage/study/StudyMemberList";
import StudyNoticeList from "../components/mypage/study/StudyNoticeList";

const MyPage = ():JSX.Element =>{
    return (
        <div>
            {/* 모집 게시글로 이동 & 수정 */}
            <div className="flex justify-between items-center mt-[60px] mb-2">
                <Link to="/" className="flex items-center gap-1 text-sm text-black6">
                    모집 게시글로 이동
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M6.83333 0.625L11 5M11 5L6.83333 9.375M11 5L1 5" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
                <Link to="/" className="flex items-center gap-1 text-sm text-black6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M7.36887 1.76258H3.38833C2.06929 1.76258 1 2.83184 1 4.15083V12.1117C1 13.4307 2.06929 14.5 3.38833 14.5H11.3494C12.6685 14.5 13.7377 13.4307 13.7377 12.1117L13.7377 8.13129M4.98055 10.5195L7.87705 9.9359C8.03081 9.90492 8.172 9.8292 8.28288 9.71826L14.767 3.23081C15.0779 2.91978 15.0776 2.4156 14.7665 2.10482L13.3929 0.732849C13.0819 0.422199 12.578 0.422411 12.2672 0.733322L5.78247 7.22144C5.6718 7.33217 5.59623 7.47306 5.56522 7.62651L4.98055 10.5195Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    수정
                </Link>
            </div>

            <div className="border border-gray5">
                {/* 상단 타이틑 영역 */}
                <div className="flex justify-between items-center py-[30px] px-[30px]">
                    {/* 이전 페이지로 이동 & 타이틀 */}
                    <div className="flex items-center gap-6">
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
                                <path d="M10 19L1 10L10 0.999999" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <strong className="flex items-center nexon-bold text-2xl text-black4 gap-2">
                            <StudyTypeBadge type={`PROJECT`} />
                            [프론트엔드][보수O] 위시버니에서 모바일 초대장 웹 개발자 구합니다! (파트/사이드)
                        </strong>
                    </div>
                    {/* 스터디 인원 */}
                    <StudyMemeberList studyId={1} />
                </div>
                {/* 스터디 알림 리스트 */}
                <StudyAlarmList studyId={5}/>
                {/* 캘린더 영역 */}
                <div>
                    <StudyCalendar studyId={1} />
                </div>
                {/* 일정 상세 영역 */}
                <div className="py-[30px] px-[30px]">
                    <strong className="block text-xl text-black4 nexon-bold mb-3">2월 4일</strong>
                    <StudyNoticeList studyId={1} />
                </div>
            </div>


        </div>
    )
}

export default MyPage;