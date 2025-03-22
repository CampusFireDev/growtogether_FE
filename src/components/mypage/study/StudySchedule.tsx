import useApiMutation from "../../../hooks/useApiMutation";

const StudySchedule = ({ scheduleId, title, author }: { scheduleId: number; title: string; author: string }): JSX.Element => {
    const { trigger } = useApiMutation("DELETE");

    const handleDelete = async () => {
        if (confirm("일정을 삭제하시겠습니까?")) {
            try {
                await trigger(`http://www.growtogether.store/study/schedules/${scheduleId}`);
                alert("일정이 삭제되었습니다.");
                window.location.reload();
            } catch {
                alert("일정 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <li className="flex items-center justify-between w-full px-[25px] py-[25px] bg-white9 rounded-[5px]">
            <div>
                <p className="text-black4">{title}</p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-[18px] h-[18px] rounded-full overflow-hidden bg-gray5"></div>
                    <p className="text-sm text-black6">{author}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-black6 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path d="M7.36887 1.76258H3.38833C2.06929 1.76258 1 2.83184 1 4.15083V12.1117C1 13.4307 2.06929 14.5 3.38833 14.5H11.3494C12.6685 14.5 13.7377 13.4307 13.7377 12.1117L13.7377 8.13129M4.98055 10.5195L7.87705 9.9359C8.03081 9.90492 8.172 9.8292 8.28288 9.71826L14.767 3.23081C15.0779 2.91978 15.0776 2.4156 14.7665 2.10482L13.3929 0.732849C13.0819 0.422199 12.578 0.422411 12.2672 0.733322L5.78247 7.22144C5.6718 7.33217 5.59623 7.47306 5.56522 7.62651L4.98055 10.5195Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    수정
                </button>
                <button className="flex items-center gap-1 text-sm text-black6 cursor-pointer" onClick={ handleDelete }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                        <path d="M0.666748 3.14706H12.0001M4.91675 11.9706V6.67647M7.75008 11.9706V6.67647M9.16675 15.5H3.50008C2.71768 15.5 2.08341 14.7099 2.08341 13.7353V4.02941C2.08341 3.5421 2.40055 3.14706 2.79175 3.14706H9.87508C10.2663 3.14706 10.5834 3.5421 10.5834 4.02941V13.7353C10.5834 14.7099 9.94915 15.5 9.16675 15.5ZM4.91675 3.14706H7.75008C8.14128 3.14706 8.45842 2.75202 8.45842 2.26471V1.38235C8.45842 0.895043 8.14128 0.5 7.75008 0.5H4.91675C4.52555 0.5 4.20841 0.895043 4.20841 1.38235V2.26471C4.20841 2.75202 4.52555 3.14706 4.91675 3.14706Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    삭제
                </button>
            </div>
        </li>
    )
}
export default StudySchedule;