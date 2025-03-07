/**
 * 게시글 작성 컴포넌트
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/form/InputField";
import SelectMenu from "../components/form/SelectMenu";
import TextArea from "../components/form/TextArea";
import FormButton from "../components/form/FormButton";
import TechStackBadge from "../components/common/ui/TechStackBadge";

const techList = ["React", "Javascript", "Typescript", "Spring"];

interface CreateProps {
    type: string;
    firstTitle: string;
    secondTitle: string;
    children: React.ReactNode;
};

const Create = ({ type, firstTitle, secondTitle, children }:CreateProps):JSX.Element => {
    const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
     

    const handleTechStackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedTechStacks(prevSelectedTechStacks => 
            Array.from(new Set([...prevSelectedTechStacks, ...value])) 
        );
    };

    return (
        <div className="w-full max-w-[1200px] my-10">
            {/* 1 */}
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
                <SelectMenu label="사용 언어" labelClassName="nexon-medium text-sm" className="my-1" placeholder="사용 언어를 선택해주세요." options={techList} onChange={handleTechStackChange}/>
                <div className="mt-3">
                    {selectedTechStacks.map((stack, index) => (
                        <TechStackBadge key={index} stack={stack} className="mr-3 mb-2"/>
                    ))}
                </div>
            </div>

            {/* 2 */}
            <div className="mb-6">
                <div className="flex gap-3 ">
                    <div className="relative w-7 h-7 bg-myBlue rounded-full">
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white nexon-bold text-[15px]">2</p>
                    </div>
                    <h2 className="nexon-bold text-[18px] mb-5 flex-shrink-0">{secondTitle}</h2>
                </div>
                <InputField label="제목" labelFor="title" labelClassName="nexon-medium text-sm" type="text" id="title" name="title" placeholder="글 제목을 입력해주세요." className="text-[13px] my-1"></InputField>
                <TextArea label="내용" labelFor="content" labelClassName="nexon-medium text-sm" placeholder="내용을 입력해주세요." id="content" name="content" className="text-[13px] h-[180px] p-3"></TextArea>
            </div>

            {/* 등록하기, 목록 버튼 */}
            <div className="flex justify-center items-center gap-3 text-[13px]">
                <FormButton type="submit" className="bg-myBlue !w-[80px] !h-[40px] flex justify-center items-center">등록하기</FormButton>
                <Link to={`/${type}`}>
                    <FormButton type="button" className="!w-[80px] !h-[40px] flex justify-center items-center">목록</FormButton>
                </Link>
            </div>

        </div>
    )
};

export default Create;