import Create from "../views/Create";
import SelectMenu from "../components/form/SelectMenu";
import SelectCalendar from "../components/form/SelectCalendar";

const purposeList = ["스터디", "프로젝트"];
const partNumberList = [1,2,3,4,5,6];

const StudyCreate = ():JSX.Element => {
    return(
        <div>

            <Create type="study"
                firstTitle="스터디/프로젝트 기본 정보를 입력해주세요" 
                secondTitle="스터디/프로젝트에 대해 소개해주세요." 
            >
                <div>
                    <div className="flex gap-5 items-center">
                        <SelectMenu label="스터디 목적(스터디 or 프로젝트)" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="목적을 선택해주세요." options={purposeList}>
                        </SelectMenu>
                        <SelectMenu label="모집 인원" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="모집 인원을 선택해주세요." options={partNumberList}>
                        </SelectMenu>
                    </div>
                    <div className="flex gap-5 items-center">
                    </div>
                        <SelectCalendar label="모집 마감일" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="모집 마감일을 선택해주세요." singleDate={true}>
                        </SelectCalendar>
                        <SelectCalendar label="참여 날짜" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="참여 날짜를 선택해주세요." multiDate={true}>
                        </SelectCalendar>
                </div>
            </Create>
        </div>
    )
};

export default StudyCreate;