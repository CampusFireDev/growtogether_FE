import { Link } from "react-router-dom";
import SelectMenu from "../components/form/SelectMenu";
import InputField from "../components/form/InputField";
import TextArea from "../components/form/TextArea";
import FormButton from "../components/form/FormButton";
import Rating from "../components/common/ui/Rating";
import SelectCalendar from "../components/form/SelectCalender";

const optionsList = ["프론트엔드", "백엔드","데이터베이스"];
const techList = ["React", "Java Script","Type Script","Spring"];

const Create = ():JSX.Element => {
    return (
        <div className="w-full max-w-[1200px] my-10">
            {/* 1 */}
            <div className="mb-6">
                <div className="flex gap-3">
                    <div className="relative w-7 h-7 bg-myBlue rounded-full">
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white nexon-bold text-[15px]">1</p>
                    </div>
                    <h2 className="nexon-bold text-[18px] mb-5 flex ">부트캠프 기본 정보를 입력해주세요. </h2>
                </div>

                <InputField label="부트캠프 명" labelFor="bootcampTitle" labelClassName="nexon-medium text-sm" type="text" id="bootcampTitle" name="bootcampTitle" placeholder="부트캠프명을 입력해주세요." className="text-[13px] my-1"></InputField>
                <div className="flex gap-5 items-center">
                    <SelectCalendar label="참여 기간" labelClassName="nexon-medium text-sm" className="text-[13px] my-1 flex-1"/>
                    <SelectMenu label="프로그램 과정" labelClassName="nexon-medium text-sm" className="text-[13px] my-1 flex-1" placeholder="프로그램 과정을 선택해주세요." options={optionsList}></SelectMenu>
                </div>
                <SelectMenu label="사용 언어" labelClassName="nexon-medium text-sm" className="text-[13px] my-1" placeholder="사용 언어를 선택해주세요." options={techList}></SelectMenu>
                <div className="flex justify-center items-center gap-30 my-3">
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="nexon-medium text-sm mb-2">강의 만족도</h3>
                        <Rating></Rating>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="nexon-medium text-sm mb-2">취업 지원 만족도</h3>
                        <Rating></Rating>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="nexon-medium text-sm mb-2">학습 난이도</h3>
                        <Rating></Rating>
                    </div>
                    
                </div>
            </div>
            {/* 2 */}
            <div className="mb-6">
                <div className="flex gap-3 ">
                    <div className="relative w-7 h-7 bg-myBlue rounded-full">
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white nexon-bold text-[15px]">2</p>
                    </div>
                    <h2 className="nexon-bold text-[18px] mb-5 flex-shrink-0">부트캠프에 대해 소개해주세요.</h2>
                </div>
                <InputField label="제목" labelFor="title" labelClassName="nexon-medium text-sm" type="text" id="title" name="title" placeholder="글 제목을 입력해주세요." className="text-[13px] my-1 "></InputField>
                <TextArea label="내용" labelFor="content" labelClassName="nexon-medium text-sm" placeholder="내용을 입력해주세요." id="content" name="content" className="text-[13px] h-[180px]"></TextArea>
            </div>

            <div className="flex justify-center items-center gap-3 text-[13px]">
                <FormButton type="submit" className="bg-myBlue !w-[80px] !h-[40px] flex justify-center items-center">등록하기</FormButton>
                <Link to="/bootcamp">
                    <FormButton type="button" className="!w-[80px] !h-[40px] flex justify-center items-center">목록</FormButton>
                </Link>
            </div>

        </div>
    )
};

export default Create;