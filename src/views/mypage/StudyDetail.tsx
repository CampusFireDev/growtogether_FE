import { Link } from "react-router-dom";
import StudyTypeBadge from "../../components/common/ui/StudyTypeBadge";
import StudyAlarmList from "../../components/mypage/study/StudyAlarmList";
// import StudyCalendar from "../../components/mypage/study/StudyCalendar";
import StudyMemeberList from "../../components/mypage/study/StudyMemberList";
import StudyScheduleList from "../../components/mypage/study/StudyScheduleList";

const StudyDetail = ():JSX.Element =>{
    return (
        <div>
            {/* 참여 신청 팝업 */}
            <div className="hidden fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50 z-[10]">
                <div className="w-[600px] bg-white rounded-[10px]">
                    {/* 상단 타이틀 */}
                    <div className="flex items-center justify-between px-[20px] py-[20px] border-b border-gray5">
                        <strong className="nexon-medium text-lg text-black4">
                            <span className="text-myBlue">유재석</span>
                            님의 참여 신청
                        </strong>
                        <button className="flex items-center gap-1 text-sm text-black6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                                <path d="M0.666748 3.14706H12.0001M4.91675 11.9706V6.67647M7.75008 11.9706V6.67647M9.16675 15.5H3.50008C2.71768 15.5 2.08341 14.7099 2.08341 13.7353V4.02941C2.08341 3.5421 2.40055 3.14706 2.79175 3.14706H9.87508C10.2663 3.14706 10.5834 3.5421 10.5834 4.02941V13.7353C10.5834 14.7099 9.94915 15.5 9.16675 15.5ZM4.91675 3.14706H7.75008C8.14128 3.14706 8.45842 2.75202 8.45842 2.26471V1.38235C8.45842 0.895043 8.14128 0.5 7.75008 0.5H4.91675C4.52555 0.5 4.20841 0.895043 4.20841 1.38235V2.26471C4.20841 2.75202 4.52555 3.14706 4.91675 3.14706Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            닫기
                        </button>
                    </div>
                    {/* 팝업 내용 */}
                    <div className="px-[20px] py-[20px]">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-5">
                                <div className="w-[72px] h-[72px] rounded-full bg-gray5"></div>
                                <div>
                                    <strong className="block text-xl text-black4 nexon-bold">유재석</strong>
                                    <p className="flex items-center gap-2 text-black6"><span className="nexon-medium">기술 스택</span>Java, Spring, Vue.js</p>
                                </div>
                            </div>
                        </div>
                        <p className="w-full h-[120px] px-[15px] py-[15px] text-black4 border border-gray5 rounded-[5px]">
                            잘부탁드립니다!
                        </p>
                    </div>
                </div>
            </div>
            {/* 모집 게시글로 이동 & 수정 */}
            <div className="flex justify-between items-center mb-2">
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

            <div className="border border-gray5 bg-white">
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
                    {/* <StudyCalendar studyId={1} /> */}
                </div>
                {/* 일정 상세 영역 */}
                <div className="py-[30px] px-[30px]">
                    <strong className="block text-xl text-black4 nexon-bold mb-3">2월 4일</strong>
                    <StudyScheduleList studyId={1} />
                </div>
            </div>


        </div>
    )
}

export default StudyDetail;