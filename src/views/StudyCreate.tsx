import Create from "../views/Create";
import SelectMenu from "../components/form/SelectMenu";
import SelectCalendar from "../components/form/SelectCalendar";

const purposeList = ["스터디", "프로젝트"];
const partNumberList = [1,2,3,4,5,6]; //참여 인원(모집 인원)
const timeList = [
    "오전 12시", "오전 1시", "오전 2시", "오전 3시", "오전 4시", "오전 5시", "오전 6시", "오전 7시",
    "오전 8시", "오전 9시", "오전 10시", "오전 11시", "오후 12시", "오후 1시", "오후 2시",
    "오후 3시", "오후 4시", "오후 5시", "오후 6시", "오후 7시", "오후 8시", "오후 9시",
    "오후 10시", "오후 11시"
];
const durationList = ["30분", "45분", "60분", "70분", "80분", "90분"];


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
                        <div className="flex gap-5 items-center">
                            <SelectMenu label="참여 시간" labelClassName="nexon-medium text-sm" 
                                className="my-1 flex-1" placeholder="참여 시간을 선택해주세요." options={timeList}>
                            </SelectMenu>
                            <SelectMenu label="진행 시간" labelClassName="nexon-medium text-sm " 
                                className="my-1 flex-1" placeholder="진행 시간을 선택해주세요." options={durationList}>
                            </SelectMenu>
                        </div>
                </div>
            </Create>
        </div>
    )
};

export default StudyCreate;