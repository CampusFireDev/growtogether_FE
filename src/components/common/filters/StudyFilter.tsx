import { Link } from "react-router-dom";
import DropdownFilter from "./DropdownFilter";

const StudyFilter = (): JSX.Element => {
    return (
        <div className="fixed full-line w-full flex gap-2 py-[15px] bg-white">
            <button className="h-[40px] px-[15px] text-[15px] text-black4 border border-gray5 rounded-[50px]">
                <span className="inline-block mr-1 text-[13px]">❤️</span> 내가 찜한 스터디
            </button>
            <DropdownFilter label="스터디 목적" />
            <DropdownFilter label="기술스택" />
            <DropdownFilter label="모집인원" />
            <DropdownFilter label="기간" />
            <Link to="/study/create">
                <button className="h-[40px] px-[15px] text-[15px] text-white bg-black4 rounded-[5px]">
                    스터디 개설하기
                </button>
            </Link>
        </div>
    )
}
export default StudyFilter;