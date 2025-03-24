import { useState, useEffect } from "react";
import { useContentType } from "../context/ContentTypeContext";
import Create from "../views/Create";
import SelectMenu from "../components/form/SelectMenu";
import InputField from "../components/form/InputField";
import SelectCalendar from "../components/form/SelectCalendar";
import Rating from "../components/common/ui/Rating";
import useBootcampProgramCourse from "../hooks/bootcamp/useBootcampProgramCourse";
const BootcampCreate = ():JSX.Element => {
    const { programCourse = [], loading, error } = useBootcampProgramCourse();
    const { setcontentType } = useContentType();
    
    useEffect(() => {
        setcontentType("bootcamp");
    }, []);
    
    const [formData, setFormData] = useState({
        bootCampName: "",
        startdate: "",
        enddate: "",
        programCourse: "",
        learningLevel: 0,
        assistantSatisfaction: 0,
        programSatisfaction: 0,
        title: "",
        content: "",
        skillNames: [],
    });

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>;

    const handleRatingChange = (ratingType: string, newRate: number) => {
        setFormData({
            ...formData,
            [ratingType]: newRate,
        })
    }

    return(
        <div>
            <Create
                firstTitle="부트캠프 기본 정보를 입력해주세요." 
                secondTitle="부트캠프에 대해 소개해주세요." 
                formData={formData}
                setFormData={setFormData}
            >
                <div>
                    <InputField label="부트캠프 명" labelFor="bootCampName" labelClassName="nexon-medium text-sm" type="text" id="bootCampName"
                        name="bootCampName" placeholder="부트캠프명을 입력해주세요." className="text-[13px] my-1" value={formData.bootCampName} onChange={(e) => setFormData(prev => ({...prev, bootCampName: e.target.value}))}>
                    </InputField>
                    <div className="flex gap-5 items-center">
                        <SelectCalendar label="참여 기간" labelClassName="nexon-medium text-sm" 
                            placeholder= "참여기간을 선택해주세요." className="text-[13px] my-1 flex-1" onChange={(selectedDates) => 
                                setFormData(prev => ({
                                    ...prev, 
                                    startdate: selectedDates[0] || "", 
                                    enddate: selectedDates.length > 1 ? selectedDates[selectedDates.length - 1] : ""
                                }))
                            }
                        />
                        <SelectMenu label="프로그램 과정" labelClassName="nexon-medium text-sm" className="my-1 flex-1" 
                            placeholder="프로그램 과정을 선택해주세요." options={programCourse} onChange={(e) => setFormData(prev => ({...prev, programCourse: e.target.value}))}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-30 my-3">
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="nexon-medium text-sm mb-2">강의 만족도</h3>
                            <Rating rate={formData.programSatisfaction} onRateChange={(newRate) => handleRatingChange("programSatisfaction", newRate)}></Rating>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="nexon-medium text-sm mb-2">취업 지원 만족도</h3>
                            <Rating rate={formData.assistantSatisfaction} onRateChange={(newRate) => handleRatingChange("assistantSatisfaction", newRate)} ></Rating>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="nexon-medium text-sm mb-2">학습 난이도</h3>
                            <Rating rate={formData.learningLevel} onRateChange={(newRate) => handleRatingChange("learningLevel", newRate)}></Rating>
                        </div>
                    </div>
                </div>
            </Create>
        </div>
    )
};

export default BootcampCreate;