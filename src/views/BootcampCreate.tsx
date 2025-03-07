import Create from "../views/Create";
import SelectMenu from "../components/form/SelectMenu";
import InputField from "../components/form/InputField";
import SelectCalendar from "../components/form/SelectCalendar";
import Rating from "../components/common/ui/Rating";

const programList = ["프론트엔드", "백엔드","데이터베이스"];

const BootcampCreate = ():JSX.Element => {
    return(
        <div>
            <Create type="bootcamp"
                firstTitle="부트캠프 기본 정보를 입력해주세요." 
                secondTitle="부트캠프에 대해 소개해주세요." 
            >
                <div>
                    <InputField label="부트캠프 명" labelFor="bootcampTitle" labelClassName="nexon-medium text-sm" type="text" 
                        id="bootcampTitle" name="bootcampTitle" placeholder="부트캠프명을 입력해주세요." className="text-[13px] my-1">
                    </InputField>
                    <div className="flex gap-5 items-center">
                        <SelectCalendar label="참여 기간" labelClassName="nexon-medium text-sm" placeholder= "참여기간을 선택해주세요." className="text-[13px] my-1 flex-1"/>
                        <SelectMenu label="프로그램 과정" labelClassName="nexon-medium text-sm" className="my-1 flex-1" placeholder="프로그램 과정을 선택해주세요." options={programList}></SelectMenu>
                    </div>
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
            </Create>
        </div>
    )
};

export default BootcampCreate;