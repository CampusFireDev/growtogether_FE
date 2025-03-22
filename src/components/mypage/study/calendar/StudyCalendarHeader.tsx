import ButtonStyle1 from "../../../common/ui/ButtonStyle1";

const StudyCalendarHeader = ({ onPrev, onNext, onToday, onOpenPopup, year, month }: {
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
    onOpenPopup: () => void;
    year: number;
    month: number;
}) => {
    return (
        <div className="relative flex items-center justify-between py-[30px] px-[30px]">
            <div className="flex items-center gap-2">
                <ButtonStyle1 type="button" className="bg-black6 text-white" label="채팅방 입장" />
                <ButtonStyle1 type="button" className="bg-myGreen text-white" label="일정 등록" onClick={onOpenPopup} />
            </div>

            {/* 캘린더 네비게이션 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-5 z-[0]">
                <button onClick={onPrev} className="flex items-center justify-center w-[40px] h-[40px] border border-gray5 rounded-full">
                    {"<"}
                </button>
                <strong className="nexon-bold text-2xl text-black4">
                    {year}년 {month}월
                </strong>
                <button onClick={onNext} className="flex items-center justify-center w-[40px] h-[40px] border border-gray5 rounded-full">
                    {">"}
                </button>
            </div>

            <div>
                <button onClick={onToday} className="nexon-medium h-[40px] px-[20px] text-sm text-black4 border border-gray5 rounded-[50px]">Today</button>
            </div>
        </div>
    );
};

export default StudyCalendarHeader;
