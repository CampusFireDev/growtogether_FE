import { useState } from "react";
import { useContentType } from "../context/ContentTypeContext";
import Create from "../views/Create";
import SelectMenu from "../components/form/SelectMenu";
import SelectCalendar from "../components/form/SelectCalendar";
import { InputField } from "../components/login";

const studyPurposeList = [
    { label: "스터디", value: "STUDY" },
    { label: "프로젝트", value: "PROJECT" }
]
const partNumberList = [2,3,4,5,6]; //참여 인원(모집 인원)
const durationList = [30, 45, 60, 70, 80, 90, 100, 120]; // 진행 시간 (단위: 분)

const StudyCreate = ():JSX.Element => {
    const { setcontentType } = useContentType();
    setcontentType("study");

    const [formData, setFormData] = useState({
        type:"",
        maxParticipant: 0,
        studyClosingDate: "",
        title: "",
        content: "",
        mainScheduleList: {
            dates: [] as string[],
            time: "",
            total: 0,
        },
        skillNames: [],
    });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     console.log(">>",e.target);
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };
        
    return(
        <div>
            <Create
                firstTitle="스터디/프로젝트 기본 정보를 입력해주세요" 
                secondTitle="스터디/프로젝트에 대해 소개해주세요." 
                formData={formData}
                setFormData={setFormData}
            >
                <div>
                    <div className="flex gap-5 items-center">
                        <SelectMenu label="스터디 목적(스터디 or 프로젝트)" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="목적을 선택해주세요." options={studyPurposeList} onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}>
                        </SelectMenu>
                        <SelectMenu label="모집 인원" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="모집 인원을 선택해주세요." options={partNumberList} onChange={(e) => setFormData(prev => ({...prev, maxParticipant: Number(e.target.value)}))}>
                        </SelectMenu>
                    </div>
                    <div className="flex gap-5 items-center">
                    </div>
                        <SelectCalendar type="study" label="모집 마감일" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="모집 마감일을 선택해주세요." singleDate={true} onChange={(selectedDates) => setFormData(prev => ({...prev, studyClosingDate: selectedDates[0] || ""}))}>
                        </SelectCalendar>

                        <SelectCalendar type="study" label="참여 날짜" labelClassName="nexon-medium text-sm" 
                            className="my-1 flex-1" placeholder="참여 날짜를 선택해주세요." multiDate={true} 
                            onChange={(selectedDates) => setFormData(prev => ({
                                ...prev,
                                mainScheduleList: {
                                    ...prev.mainScheduleList,
                                    dates: selectedDates
                                },
                            }))}
                            >
                        </SelectCalendar>
                        <div className="flex gap-5 items-center">
                            <InputField label="참여 시간" labelFor="time" labelClassName="nexon-medium text-sm" type="time" id="time"
                                className="my-1 flex-1" placeholder="참여 시간을 선택해주세요." onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    mainScheduleList: {
                                        ...prev.mainScheduleList,
                                        time: e.target.value,
                                    },
                                }))}>
                            </InputField>
                            <SelectMenu label="진행 시간" labelClassName="nexon-medium text-sm " 
                                className="my-1 flex-1" placeholder="진행 시간을 선택해주세요." options={durationList} onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    mainScheduleList: {
                                        ...prev.mainScheduleList,
                                        total: Number(e.target.value),
                                    },
                                }))}>
                            </SelectMenu>
                        </div>
                </div>
            </Create>
        </div>
    )
};

export default StudyCreate;

{/* <SelectMenu label="참여 시간" labelClassName="nexon-medium text-sm" 
    className="my-1 flex-1" placeholder="참여 시간을 선택해주세요." options={timeList}>
</SelectMenu> */}