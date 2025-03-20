/**
 * 게시글 작성 컴포넌트
 */

import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/form/InputField";
import TextArea from "../components/form/TextArea";
// import TiptapEditor from "../components/form/TiptapEditor";
import FormButton from "../components/form/FormButton";
import SkillMenu from "../components/form/SkillMenu";
import useCreate from "../hooks/common/useCreate";

interface CreateProps {
    type: string;
    firstTitle: string;
    secondTitle: string;
    children: React.ReactNode;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>; 
};
const Create = ({ type, firstTitle, secondTitle, children, formData, setFormData }:CreateProps):JSX.Element => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { handleCreate, loading}  = useCreate({type, title, content, formData})
    
    const handleEditorChange = (newContent: string) => {
        setContent(newContent);
    };

    const formDataIsValid = (formData: any, type: string) => {
        if (type === "bootcamp") {
            // 부트캠프에 필요한 필드 검증
            return formData.bootCampName && formData.startdate && formData.enddate && formData.learningLevel && formData.assistantSatisfaction && formData.programSatisfaction && formData.programCourse && formData.skillNames;
        } else if (type === "study") {
            // 스터디에 필요한 필드 검증
            return formData.maxParticipant && formData.studyClosingDate && formData.mainScheduleList && formData.type &&  formData.skillNames; // 예시 필드
        } else {
            // 기타 유형에 대한 검증 로직 추가
            return false;
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && content && formDataIsValid(formData, type)) {
            try {
                await handleCreate(); 
                alert("등록이 완료되었습니다.");
                navigate(`/${type}`); // 등록 완료 후 메인 페이지로 이동
            } catch (error) {
                console.error("등록 오류:", error);
                alert("등록 중 오류가 발생했습니다.");
            }
        } else {
            alert("필수 데이터를 입력해주세요.");
        }
    };

    return (
        <div className="w-full max-w-[1200px] my-10">
            {/* 1 */}
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <div className="flex gap-3">
                        <div className="relative w-7 h-7 bg-myBlue rounded-full">
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white nexon-bold text-[15px]">1</p>
                        </div>
                        <h2 className="nexon-bold text-[18px] mb-5 flex ">{firstTitle} </h2>
                    </div>
                    <div>
                        {children}
                    </div>
                    <SkillMenu setFormData={setFormData} formData={formData}/>
                </div>

                {/* 2 */}
                <div className="mb-6">
                    <div className="flex gap-3 ">
                        <div className="relative w-7 h-7 bg-myBlue rounded-full">
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white nexon-bold text-[15px]">2</p>
                        </div>
                        <h2 className="nexon-bold text-[18px] mb-5 flex-shrink-0">{secondTitle}</h2>
                    </div>
                    <InputField label="제목" labelFor="title" labelClassName="nexon-medium text-sm" type="text" 
                        id="title" name="title" placeholder="글 제목을 입력해주세요." onChange={(e) => setTitle(e.target.value)} className="text-[13px] my-1">
                    </InputField>
                    <TextArea label="내용" labelFor="content" labelClassName="nexon-medium text-sm" placeholder="내용을 입력해주세요." 
                        id="content" name="content" onChange={(e) => setContent(e.target.value)} className="text-[13px] h-[180px] p-3">
                    </TextArea>
                    {/* <TiptapEditor content={content} onChange={handleEditorChange} /> */}
                </div>

                {/* 등록하기, 목록 버튼 */}
                <div className="flex justify-center items-center gap-3 text-[13px] mt-20">
                    <FormButton type="submit" className="bg-myBlue !w-[80px] !h-[40px] flex justify-center items-center" disabled={loading}> 
                        {loading ? "등록 중..." : "등록하기"}
                    </FormButton>
                    <Link to={`/${type}`}>
                        <FormButton type="button" className="!w-[80px] !h-[40px] flex justify-center items-center">목록</FormButton>
                    </Link>
                </div>
            </form>

        </div>
    )
};

export default Create;